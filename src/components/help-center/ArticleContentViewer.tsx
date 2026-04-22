import { useEffect, useState, useMemo, useRef } from 'react';
import { BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';
import { withMultiColumn } from '@blocknote/xl-multi-column';
import '@blocknote/react/style.css';
import '@blocknote/shadcn/style.css';
import { cn } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/constants';
import { ArticleFeedback } from './ArticleFeedback';
import { TryItModal } from './TryItModal';
import { ArticleViewerStyles } from './ArticleViewerStyles';
import {
  useApiEndpoint, useCleanDescription, useOpenApiParams,
  useApiParameters, useProcessedContent,
} from './useApiReference';
import { useTableOfContents, type TocItem } from './useTableOfContents';
import {
  useHeadingIds, useCardHeightSync,
  useTableHeaderStyles, useCodeBlockCopyButtons,
} from './useViewerDomEffects';
import {
  calloutBlockSpec, cardBlockSpec, accordionBlockSpec,
  stepsBlockSpec, tabsBlockSpec, iconBlockSpec,
  codeGroupBlockSpec, cardGroupBlockSpec, imageBlockSpec, paramFieldBlockSpec, responseFieldBlockSpec,
  expandableBlockSpec,
} from './viewer-block-specs';

// HTTP method badge component
const METHOD_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  GET:    { bg: '#22c55e1a', text: '#16a34a', border: '#22c55e40' },
  POST:   { bg: '#3b82f61a', text: '#2563eb', border: '#3b82f640' },
  PUT:    { bg: '#f59e0b1a', text: '#d97706', border: '#f59e0b40' },
  PATCH:  { bg: '#f973161a', text: '#ea580c', border: '#f9731640' },
  DELETE: { bg: '#ef44441a', text: '#dc2626', border: '#ef444440' },
};

function MethodBadge({ method, className }: { method: string; className?: string }) {
  const colors = METHOD_COLORS[method.toUpperCase()] || { bg: '#6b72801a', text: '#4b5563', border: '#6b728040' };
  return (
    <span
      className={cn('inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-bold tracking-wide font-mono shrink-0', className)}
      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
    >
      {method.toUpperCase()}
    </span>
  );
}

// Schema mirrors the editor exactly
const viewerSchema = withMultiColumn(BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    image: imageBlockSpec,
    callout: calloutBlockSpec, card: cardBlockSpec,
    accordion: accordionBlockSpec, step: stepsBlockSpec,
    tabs: tabsBlockSpec, iconBlock: iconBlockSpec,
    codeGroup: codeGroupBlockSpec, cardGroup: cardGroupBlockSpec, paramField: paramFieldBlockSpec,
    responseField: responseFieldBlockSpec, expandable: expandableBlockSpec,
  },
}));

function extractBNBlocks(raw: string) {
  const m = raw.match(/<script data-bn type="application\/json">([\s\S]*?)<\/script>/);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch { return null; }
}

interface ArticleContentViewerProps {
  content: string;
  initialBlocks?: any[] | null;
  isDark?: boolean;
  primaryColor?: string;
  className?: string;
  showToc?: boolean;
  onTocGenerated?: (items: TocItem[]) => void;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  headingFont?: string | null;
  bodyFont?: string | null;
  showFeedback?: boolean;
  articleId?: string;
  projectId?: string;
  updatedAt?: string;
  horizontalFeedback?: boolean;
  isApiReference?: boolean;
  apiBaseUrl?: string;
  article?: any;
}

export function ArticleContentViewer({
  content, initialBlocks: initialBlocksProp, isDark = false, primaryColor = '#D97706', className,
  showToc = false, onTocGenerated, scrollContainerRef,
  headingFont, bodyFont, showFeedback = false,
  articleId, projectId, horizontalFeedback = false,
  isApiReference = false, apiBaseUrl = API_BASE_URL, article,
}: ArticleContentViewerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  // ── API Reference hooks ──
  const { method, path, hasEndpoint } = useApiEndpoint(isApiReference, article, apiBaseUrl);
  const cleanDescription = useCleanDescription(isApiReference, article);
  const openApiParams = useOpenApiParams(isApiReference, hasEndpoint, projectId, method, path);
  const parameters = useApiParameters(isApiReference, content, article, openApiParams);
  const processedContent = useProcessedContent(isApiReference, content);

  // ── Block sanitization ──
  const initialBlocks = useMemo(() => {
    const raw = initialBlocksProp ?? extractBNBlocks(processedContent);
    if (!raw) return null;

    const KNOWN_TYPES = new Set([
      'paragraph', 'heading', 'bulletListItem', 'numberedListItem', 'checkListItem',
      'quote', 'codeBlock', 'image', 'table', 'divider', 'file', 'audio', 'video',
      'toggleListItem',
      'callout', 'card', 'accordion', 'step', 'tabs', 'iconBlock',
      'codeGroup', 'cardGroup', 'paramField',
      'columnList', 'column',
    ]);

    const sanitize = (blocks: any[]): any[] =>
      blocks
        .filter(b => KNOWN_TYPES.has(b?.type))
        .map(b => {
          let c = b.content;
          if (c === 'none' || c === '' || c === null || c === undefined) c = [];
          if (typeof c === 'string') c = [{ type: 'text', text: c, styles: {} }];
          return {
            ...b,
            content: c,
            children: Array.isArray(b.children) && b.children.length ? sanitize(b.children) : [],
          };
        });

    try { return sanitize(raw); } catch { return null; }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processedContent]);

  // ── Editor setup ──
  const editor = useCreateBlockNote({
    schema: viewerSchema,
    initialContent: initialBlocks ?? undefined,
  }, [articleId]);

  useEffect(() => { editorRef.current = editor; }, [editor]);

  // Legacy HTML loading
  const legacyLoadedRef = useRef(false);
  useEffect(() => {
    if (!editor || initialBlocks || legacyLoadedRef.current) return;
    if (!processedContent || !processedContent.trim() || processedContent === '<p></p>') return;
    legacyLoadedRef.current = true;
    const cleanHtml = processedContent.replace(/<script[\s\S]*?<\/script>/gi, '');
    try {
      const parsed = editor.tryParseHTMLToBlocks(cleanHtml) as any;
      if (parsed?.length) editor.replaceBlocks(editor.document, parsed);
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  // Reload when content changes
  useEffect(() => {
    if (!editor) return;
    const blocks = extractBNBlocks(processedContent);
    if (blocks) {
      try { editor.replaceBlocks(editor.document, blocks); } catch { /* ignore */ }
      return;
    }
    if (processedContent && processedContent.trim() && processedContent !== '<p></p>') {
      const cleanHtml = processedContent.replace(/<script[\s\S]*?<\/script>/gi, '');
      try {
        const parsed = editor.tryParseHTMLToBlocks(cleanHtml) as any;
        if (parsed?.length) editor.replaceBlocks(editor.document, parsed);
      } catch { /* ignore */ }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processedContent]);

  // ── TOC ──
  useTableOfContents(initialBlocks, content, showToc, onTocGenerated, scrollContainerRef);

  // ── DOM effects ──
  useHeadingIds(containerRef, content);
  useCardHeightSync(containerRef, content);
  useTableHeaderStyles(containerRef, content, isDark, articleId);
  useCodeBlockCopyButtons(containerRef, content, articleId);

  return (
    <>
      <div
        ref={containerRef}
        className={cn('article-viewer', className)}
        style={{ fontFamily: bodyFont || 'system-ui,sans-serif', ['--viewer-primary' as string]: primaryColor }}
      >
        <BlockNoteView
          key={articleId || 'default'}
          editor={editor}
          editable={false}
          theme={isDark ? 'dark' : 'light'}
          className="bn-viewer"
        />

        {showFeedback && articleId && projectId && (
          <ArticleFeedback articleId={articleId} projectId={projectId} horizontal={horizontalFeedback} />
        )}

        <ArticleViewerStyles
          bodyFont={bodyFont}
          headingFont={headingFont}
          primaryColor={primaryColor}
          isDark={isDark}
        />
      </div>

      {isApiReference && hasEndpoint && (
        <TryItModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          method={method}
          path={path}
          baseUrl={apiBaseUrl}
          primaryColor={primaryColor}
          isDark={isDark}
          description={cleanDescription}
          headingFont={headingFont}
          bodyFont={bodyFont}
          parameters={parameters}
        />
      )}
    </>
  );
}

export { MethodBadge, METHOD_COLORS };
