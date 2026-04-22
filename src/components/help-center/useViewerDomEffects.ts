import { useEffect } from 'react';
import { DELAY_DOM_PATCH } from '@/lib/constants';
import { generateId } from './useTableOfContents';

/**
 * Adds heading IDs and loads Iconify script after render.
 */
export function useHeadingIds(
  containerRef: React.RefObject<HTMLDivElement>,
  content: string
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const t = setTimeout(() => {
      el.querySelectorAll('h1,h2,h3').forEach((h) => {
        if (!h.id) h.id = generateId(h.textContent || '');
      });
      if (!document.querySelector('script[src*="iconify"]')) {
        const s = document.createElement('script');
        s.src = 'https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js';
        s.async = true;
        document.head.appendChild(s);
      }
    }, 100);
    return () => clearTimeout(t);
  }, [content]);
}

/**
 * Syncs card heights in multi-column grids.
 */
export function useCardHeightSync(
  containerRef: React.RefObject<HTMLDivElement>,
  content: string
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const syncHeights = () => {
      el.querySelectorAll('.bn-block-column-list').forEach((list) => {
        const columns = Array.from(list.querySelectorAll(':scope > .bn-block-column'));
        if (columns.length < 2) return;
        columns.forEach((col) => {
          (col as HTMLElement).style.height = '';
          col.querySelectorAll('[data-card]').forEach((c) => { (c as HTMLElement).style.height = ''; });
        });
        const maxH = Math.max(...columns.map((c) => (c as HTMLElement).offsetHeight));
        if (maxH > 0) {
          columns.forEach((col) => {
            (col as HTMLElement).style.height = `${maxH}px`;
            col.querySelectorAll('[data-card]').forEach((c) => { (c as HTMLElement).style.height = '100%'; });
          });
        }
      });
    };

    const t = setTimeout(syncHeights, 200);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncHeights) : null;
    if (ro) ro.observe(el);
    return () => { clearTimeout(t); ro?.disconnect(); };
  }, [content]);
}

/**
 * Styles first row of tables as headers (BlockNote doesn't use thead/th).
 */
export function useTableHeaderStyles(
  containerRef: React.RefObject<HTMLDivElement>,
  content: string,
  isDark: boolean,
  articleId: string | undefined
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const applyTableStyles = () => {
      const tables = el.querySelectorAll('table');
      const mutedBg = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim();
      const bgColor = mutedBg ? `hsl(${mutedBg})` : (isDark ? '#27272a' : '#f4f4f5');

      tables.forEach((table) => {
        const firstRow = table.querySelector('tbody tr:first-child');
        if (firstRow) {
          const cells = firstRow.querySelectorAll('td');
          cells.forEach((cell) => {
            const htmlCell = cell as HTMLElement;
            htmlCell.style.backgroundColor = bgColor;
            htmlCell.style.color = isDark ? '#fafafa' : '#18181b';
            htmlCell.style.fontWeight = '500';
          });
        }

        const headers = table.querySelectorAll('th');
        headers.forEach((th) => {
          const htmlTh = th as HTMLElement;
          htmlTh.style.backgroundColor = bgColor;
          htmlTh.style.color = isDark ? '#fafafa' : '#18181b';
          htmlTh.style.fontWeight = '500';
        });
      });
    };

    applyTableStyles();
    const timer = setTimeout(applyTableStyles, DELAY_DOM_PATCH);

    const observer = new MutationObserver(applyTableStyles);
    observer.observe(el, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [content, isDark, articleId]);
}

/**
 * Adds copy buttons to code blocks.
 */
export function useCodeBlockCopyButtons(
  containerRef: React.RefObject<HTMLDivElement>,
  content: string,
  articleId: string | undefined
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const addCopyButtons = () => {
      const codeBlocks = el.querySelectorAll('pre:not(.copy-button-added)');

      codeBlocks.forEach((pre) => {
        if (pre.closest('[data-code-group]')) return;

        pre.classList.add('copy-button-added');

        if (pre.parentElement?.classList.contains('code-block-wrapper')) return;

        const codeEl = pre.querySelector('code');
        const langClass = codeEl?.className?.match(/language-(\w+)/)?.[1] || '';

        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';

        const header = document.createElement('div');
        header.className = 'code-block-header';

        const langLabel = document.createElement('span');
        langLabel.className = 'code-block-lang';
        langLabel.textContent = langClass || '';

        const button = document.createElement('button');
        button.className = 'code-copy-button';
        button.innerHTML = `
          <svg class="copy-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <svg class="check-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span class="copy-label">Copy</span>
        `;

        button.addEventListener('click', async () => {
          const code = codeEl?.textContent || pre.textContent || '';
          try {
            await navigator.clipboard.writeText(code);
            const copyIcon = button.querySelector('.copy-icon') as HTMLElement;
            const checkIcon = button.querySelector('.check-icon') as HTMLElement;
            const label = button.querySelector('.copy-label') as HTMLElement;
            copyIcon.style.display = 'none';
            checkIcon.style.display = 'block';
            if (label) label.textContent = 'Copied!';
            setTimeout(() => {
              copyIcon.style.display = 'block';
              checkIcon.style.display = 'none';
              if (label) label.textContent = 'Copy';
            }, 2000);
          } catch (err) {
            console.error('Failed to copy code:', err);
          }
        });

        header.appendChild(langLabel);
        header.appendChild(button);

        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(header);
        wrapper.appendChild(pre);
      });
    };

    addCopyButtons();
    const timer = setTimeout(addCopyButtons, DELAY_DOM_PATCH);

    const observer = new MutationObserver(addCopyButtons);
    observer.observe(el, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [content, articleId]);
}
