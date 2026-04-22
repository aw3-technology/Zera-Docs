import { useEffect, useState, useMemo } from 'react';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

const generateId = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export { generateId };

export function useTableOfContents(
  initialBlocks: any[] | null,
  content: string,
  showToc: boolean,
  onTocGenerated: ((items: TocItem[]) => void) | undefined,
  scrollContainerRef: React.RefObject<HTMLElement> | undefined
) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  // Extract headings — prefer BlockNote blocks, fall back to raw HTML regex
  const tocHeadings = useMemo(() => {
    if (initialBlocks?.length) {
      const headings: TocItem[] = [];
      for (const block of initialBlocks) {
        if (block.type === 'heading') {
          const text = (block.content || [])
            .filter((n: any) => n.type === 'text')
            .map((n: any) => n.text)
            .join('');
          if (text) headings.push({ id: generateId(text), text, level: block.props?.level ?? 2 });
        }
      }
      return headings;
    }
    // Legacy HTML fallback
    const headings: TocItem[] = [];
    const regex = /<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/gi;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(content)) !== null) {
      const text = m[2].replace(/<[^>]*>/g, '').trim();
      if (text) headings.push({ id: generateId(text), text, level: parseInt(m[1]) });
    }
    return headings;
  }, [initialBlocks, content]);

  // Dispatch TOC updates
  useEffect(() => {
    const t = setTimeout(() => {
      setTocItems(tocHeadings);
      onTocGenerated?.(tocHeadings);
      if (typeof window !== 'undefined')
        window.dispatchEvent(new CustomEvent('toc-updated', { detail: tocHeadings }));
    }, 0);
    return () => clearTimeout(t);
  }, [tocHeadings, onTocGenerated]);

  // Scroll spy
  useEffect(() => {
    if (!showToc || tocItems.length === 0) return;
    const getRoot = () => {
      if (scrollContainerRef?.current) return scrollContainerRef.current;
      const first = tocItems[0] ? document.getElementById(tocItems[0].id) : null;
      if (first) {
        let p = first.parentElement;
        while (p) {
          const s = window.getComputedStyle(p);
          if (['auto', 'scroll'].includes(s.overflow) || ['auto', 'scroll'].includes(s.overflowY)) return p;
          p = p.parentElement;
        }
      }
      return null;
    };
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { void e.target.id; } }),
      { root: getRoot(), rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    );
    tocItems.forEach((item) => { const el = document.getElementById(item.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [tocItems, showToc, scrollContainerRef]);

  return tocItems;
}
