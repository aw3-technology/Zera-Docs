interface ArticleViewerStylesProps {
  bodyFont: string | null | undefined;
  headingFont: string | null | undefined;
  primaryColor: string;
  isDark: boolean;
}

const MONO = "'Geist Mono','JetBrains Mono','Fira Code',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

export function ArticleViewerStyles({ bodyFont, headingFont, primaryColor, isDark }: ArticleViewerStylesProps) {
  return (
    <style>{`
        @font-face {
          font-family: 'Geist Mono';
          src: url('/Geist_Mono/GeistMono-VariableFont_wght.ttf') format('truetype-variations');
          font-weight: 100 900;
          font-style: normal;
          font-display: swap;
        }

        .bn-viewer .bn-editor,
        .bn-viewer .bn-container,
        .bn-viewer [data-theming-css-variables-demo] { background: transparent !important; padding: 0 !important; }
        .bn-viewer .bn-editor { font-family: ${bodyFont || 'system-ui,sans-serif'} !important; }
        .bn-viewer .bn-editor > .bn-block-group { padding-left: 0 !important; }
        .bn-viewer .bn-side-menu { display: none !important; }
        .bn-viewer .bn-block-content { font-size: 1rem; line-height: 1.75; color: var(--muted-foreground); }
        .bn-viewer .bn-block-outer { margin-bottom: 2px; }
        .bn-viewer .bn-block-outer:has([data-content-type="heading"]) { margin-top: 16px; }
        .bn-viewer .bn-block-outer:first-child:has([data-content-type="heading"]) { margin-top: 0; }

        /* ── Nuke every outline / ring BlockNote or ProseMirror adds ── */
        .bn-viewer * {
          outline: none !important;
          box-shadow: none !important;
        }
        .bn-viewer .ProseMirror-selectednode,
        .bn-viewer .ProseMirror-selectednode > *,
        .bn-viewer .bn-block-content.ProseMirror-selectednode,
        .bn-viewer .bn-block-content.ProseMirror-selectednode > * {
          outline: none !important;
          box-shadow: none !important;
          border-radius: inherit !important;
        }
        .bn-viewer .ProseMirror-selectednode [data-card],
        .bn-viewer .ProseMirror-selectednode [data-callout-type],
        .bn-viewer .ProseMirror-selectednode .callout-block,
        .bn-viewer .ProseMirror-selectednode details,
        .bn-viewer .ProseMirror-selectednode [data-tabs],
        .bn-viewer .ProseMirror-selectednode [data-accordion] {
          border-radius: 1rem !important;
        }

        .bn-viewer [data-content-type="heading"] {
          color: var(--foreground) !important;
          text-transform: uppercase !important;
          letter-spacing: 0.04em !important;
          ${headingFont ? `font-family: ${headingFont} !important;` : "font-family: 'Geist Mono', ui-monospace, monospace !important;"}
        }
        .bn-viewer [data-content-type="heading"][data-level="1"] { font-size: 1.875rem; font-weight: 700; margin: 2rem 0 1rem; line-height: 1.2; }
        .bn-viewer [data-content-type="heading"][data-level="2"] { font-size: 1.5rem;   font-weight: 600; margin: 1.75rem 0 0.75rem; line-height: 1.3; }
        .bn-viewer [data-content-type="heading"][data-level="3"] { font-size: 1.25rem;  font-weight: 600; margin: 1.5rem 0 0.5rem; line-height: 1.4; }
        .bn-viewer [data-content-type="paragraph"] { margin: 0.75rem 0; line-height: 1.7; }
        .bn-viewer a { color: ${primaryColor} !important; text-decoration: underline; }
        .bn-viewer a:hover { opacity: 0.8; }
        .bn-viewer .bn-inline-content a,
        .bn-viewer [data-content-type] a { color: ${primaryColor} !important; }

        /* ── Quote ── */
        .bn-viewer .bn-block-outer:has([data-content-type="quote"]) {
          margin: 1rem 0 !important;
        }
        .bn-viewer .bn-block-outer:has([data-content-type="quote"]) .bn-block-content {
          border: none !important;
          background: transparent !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .bn-viewer [data-content-type="quote"] {
          border: none !important;
          border-left: 3px solid ${primaryColor} !important;
          padding: 0.5rem 1.25rem !important;
          margin: 0 !important;
          background: ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'} !important;
          border-radius: 0 0.75rem 0.75rem 0 !important;
          color: var(--muted-foreground) !important;
          font-style: italic !important;
          display: block !important;
        }

        /* ── Checklist ── */
        .bn-viewer [data-content-type="checkListItem"] {
          display: flex !important;
          align-items: flex-start !important;
          gap: 0.625rem !important;
          padding: 0.125rem 0 !important;
          line-height: 1.6 !important;
        }
        .bn-viewer [data-content-type="checkListItem"] input[type="checkbox"] {
          appearance: none !important;
          -webkit-appearance: none !important;
          width: 1rem !important;
          height: 1rem !important;
          min-width: 1rem !important;
          border: 1.5px solid hsl(var(--border)) !important;
          border-radius: 0.25rem !important;
          margin-top: 0.2rem !important;
          cursor: default !important;
          background: transparent !important;
          position: relative !important;
          flex-shrink: 0 !important;
        }
        .bn-viewer [data-content-type="checkListItem"] input[type="checkbox"]:checked {
          background: ${primaryColor} !important;
          border-color: ${primaryColor} !important;
        }
        .bn-viewer [data-content-type="checkListItem"] input[type="checkbox"]:checked::after {
          content: '' !important;
          position: absolute !important;
          left: 0.2rem !important;
          top: 0.05rem !important;
          width: 0.35rem !important;
          height: 0.6rem !important;
          border: 2px solid #fff !important;
          border-top: none !important;
          border-left: none !important;
          transform: rotate(45deg) !important;
        }
        .bn-viewer [data-content-type="checkListItem"][data-checked="true"] .bn-inline-content {
          text-decoration: line-through !important;
          color: var(--muted-foreground) !important;
          opacity: 0.7 !important;
        }

        /* ── Code Block ── */
        .bn-viewer [data-content-type="codeBlock"] { padding: 0 !important; background: transparent !important; border: none !important; border-radius: 0 !important; }

        .bn-viewer .code-block-wrapper {
          position: relative;
          margin: 1.25rem 0 !important;
          width: 100%;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid var(--code-block-border, hsl(var(--border)));
        }

        .bn-viewer .code-block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1rem;
          background: var(--code-block-header-bg, hsl(var(--muted)));
          border-bottom: 1px solid var(--code-block-border, hsl(var(--border)));
          min-height: 2.25rem;
        }

        .bn-viewer .code-block-lang {
          font-family: ${MONO};
          font-size: 0.6875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: hsl(var(--muted-foreground));
        }

        .bn-viewer .code-copy-button {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.25rem 0.625rem;
          background: transparent;
          border: 1px solid hsl(var(--border));
          border-radius: 0.375rem;
          cursor: pointer;
          font-size: 0.6875rem;
          font-weight: 500;
          color: hsl(var(--muted-foreground));
          transition: background 0.15s, color 0.15s;
          font-family: ${MONO};
        }

        .bn-viewer .code-copy-button:hover {
          background: hsl(var(--accent));
          color: hsl(var(--foreground));
        }

        .bn-viewer .code-copy-button svg {
          width: 13px;
          height: 13px;
          flex-shrink: 0;
        }

        .bn-viewer .code-block-wrapper pre {
          margin: 0 !important;
          width: 100%;
          border: none !important;
          border-radius: 0 !important;
        }

        .bn-viewer pre {
          background: var(--code-block-bg, hsl(var(--muted) / 0.5)) !important;
          padding: 1rem 1.25rem !important;
          font-family: ${MONO} !important;
          font-size: 0.8125rem !important;
          line-height: 1.75 !important;
          overflow-x: auto;
          color: var(--foreground) !important;
          width: 100%;
          box-sizing: border-box;
        }

        .bn-viewer code { font-family: ${MONO} !important; background: hsl(var(--muted)); border: 1px solid hsl(var(--border)); padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.75em; }
        .bn-viewer pre code { background: none !important; border: none !important; padding: 0 !important; font-size: inherit !important; }

        /* Table styles */
        .bn-viewer table,
        .bn-viewer [data-content-type="table"] table,
        .bn-viewer .ProseMirror table,
        .bn-viewer .tableWrapper table {
          border-collapse: separate !important;
          border-spacing: 0 !important;
          width: 100% !important;
          font-size: 0.8125rem !important;
          margin: 1.5rem 0 !important;
          border: 1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} !important;
          border-radius: 0.5rem !important;
          overflow: hidden !important;
        }

        .bn-viewer table tbody tr:first-child,
        .bn-viewer [data-content-type="table"] table tbody tr:first-child,
        .bn-viewer .ProseMirror table tbody tr:first-child {
          background: hsl(var(--muted)) !important;
        }

        .bn-viewer table tbody tr:first-child td,
        .bn-viewer [data-content-type="table"] table tbody tr:first-child td,
        .bn-viewer .ProseMirror table tbody tr:first-child td {
          padding: 8px 12px !important;
          font-weight: 500 !important;
          text-align: left !important;
          color: ${isDark ? '#fafafa' : '#18181b'} !important;
          border: none !important;
          background: hsl(var(--muted)) !important;
          background-color: hsl(var(--muted)) !important;
          text-transform: none !important;
          letter-spacing: normal !important;
        }

        .bn-viewer table tbody tr:first-child td:first-child { border-top-left-radius: 0.5rem !important; }
        .bn-viewer table tbody tr:first-child td:last-child { border-top-right-radius: 0.5rem !important; }

        .bn-viewer td,
        .bn-viewer table td,
        .bn-viewer [data-content-type="table"] td,
        .bn-viewer [data-content-type="table"] table td,
        .bn-viewer .ProseMirror table td {
          padding: 8px 12px !important;
          color: ${isDark ? '#a1a1aa' : '#71717a'} !important;
          border: none !important;
          border-bottom: 1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} !important;
        }

        .bn-viewer table tr:last-child td:first-child { border-bottom-left-radius: 0.5rem !important; }
        .bn-viewer table tr:last-child td:last-child { border-bottom-right-radius: 0.5rem !important; }
        .bn-viewer table tr:last-child td { border-bottom: none !important; }

        .bn-viewer th,
        .bn-viewer table th,
        .bn-viewer thead th,
        .bn-viewer table thead th {
          padding: 8px 12px !important;
          font-weight: 500 !important;
          text-align: left !important;
          color: ${isDark ? '#fafafa' : '#18181b'} !important;
          border: none !important;
          background: hsl(var(--muted)) !important;
          background-color: hsl(var(--muted)) !important;
        }
        /* Subtle divider */
        .bn-viewer [data-content-type="horizontalRule"] hr,
        .bn-viewer hr { border: none !important; border-top: 1px solid hsl(var(--border) / 0.3) !important; margin: 1.5rem 0 !important; }
        .bn-viewer ul { list-style-type: disc !important; padding-left: 1.5rem !important; margin: 1rem 0 !important; }
        .bn-viewer ol { list-style-type: decimal !important; padding-left: 1.5rem !important; margin: 1rem 0 !important; }
        .bn-viewer img { border-radius: 0.75rem; border: 1px solid hsl(var(--border)); max-width: 100%; }

        /* Hide image download button and toolbar in viewer */
        .bn-viewer [data-content-type="image"] button,
        .bn-viewer [data-content-type="image"] .bn-file-download-button,
        .bn-viewer [data-content-type="image"] .bn-file-toolbar,
        .bn-viewer [data-content-type="image"] .bn-image-toolbar,
        .bn-viewer [data-content-type="image"] a[download],
        .bn-viewer [data-image-block] button,
        .bn-viewer [data-image-block] a[download],
        .bn-viewer .bn-file-download-button,
        .bn-viewer .bn-file-toolbar,
        .bn-viewer .bn-image-toolbar,
        .bn-viewer button[aria-label*="download" i],
        .bn-viewer button[aria-label*="Download" i],
        .bn-viewer a[download] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        .bn-viewer img:hover + *,
        .bn-viewer [data-content-type="image"]:hover button,
        .bn-viewer [data-content-type="image"]:hover a,
        .bn-viewer [data-content-type="image"]:hover .bn-file-download-button,
        .bn-viewer [data-image-block]:hover button,
        .bn-viewer [data-image-block]:hover a {
          display: none !important;
          visibility: hidden !important;
        }

        .bn-viewer [data-image-block] img {
          border-radius: inherit !important;
        }

        /* Global: Hide all download buttons */
        button[aria-label*="download" i],
        button[aria-label*="Download" i],
        a[download],
        .bn-file-download-button,
        .bn-file-toolbar,
        .bn-image-toolbar,
        [class*="download" i] button,
        [class*="Download" i] button {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /* ── Multi-column / card grid ── */
        .bn-viewer .bn-block-column-list {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(0, 1fr)) !important;
          gap: 8px !important;
          margin: 0.5rem 0 !important;
          align-items: stretch !important;
        }
        .bn-viewer .bn-block-outer:has(.bn-block-column-list) { margin-bottom: 0 !important; }
        .bn-viewer .bn-block-column { padding: 0 !important; margin: 0 !important; min-width: 0; display: grid !important; grid-template-rows: 1fr; }
        .bn-viewer .bn-block-column .bn-block-outer { padding: 0 !important; margin: 0 !important; display: grid !important; grid-template-rows: 1fr; }
        .bn-viewer .bn-block-column .bn-block-content { padding: 0 !important; margin: 0 !important; display: grid !important; grid-template-rows: 1fr; width: 100% !important; }
        .bn-viewer .bn-block-column .bn-react-node-view-renderer { padding: 0 !important; margin: 0 !important; display: grid !important; grid-template-rows: 1fr; width: 100% !important; }
        .bn-viewer .bn-block-column [data-card] { margin: 0 !important; height: 100% !important; }
        @media (max-width: 640px) { .bn-viewer .bn-block-column-list { grid-template-columns: 1fr !important; } }

        /* CardGroup grid support */
        .bn-viewer [data-card-group] .grid-cols-2 { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
        .bn-viewer [data-card-group] .grid-cols-3 { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 1rem !important; }
        @media (max-width: 768px) {
          .bn-viewer [data-card-group] .grid-cols-2,
          .bn-viewer [data-card-group] .grid-cols-3 { grid-template-columns: 1fr !important; }
        }

        .bn-viewer .bn-react-node-view-renderer { width: 100% !important; }
        .bn-viewer .bn-block-content { width: 100% !important; }
        .bn-viewer details > summary { cursor: pointer; }
      `}</style>
  );
}
