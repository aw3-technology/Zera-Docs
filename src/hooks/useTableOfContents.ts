import { useEffect } from 'react';

/**
 * Renders a table-of-contents sidebar and keeps a scroll-spy in sync.
 * Listens for the custom `toc-updated` event emitted by ArticleContentViewer.
 */
export function useTableOfContents(isDark: boolean, primaryColor: string) {
  useEffect(() => {
    const handleTocUpdate = (event: any) => {
      const tocItems = event.detail;
      const tocContainer = document.getElementById('toc-container');

      if (!tocContainer || !tocItems || tocItems.length === 0) return;

      tocContainer.innerHTML = `
        <p class="text-xs font-semibold uppercase tracking-wider mb-3 ${
          isDark ? 'text-zinc-500' : 'text-zinc-400'
        }">
          On this page
        </p>
        <nav>
          ${tocItems.map((item: any) => `
            <a
              href="#${item.id}"
              data-toc-id="${item.id}"
              class="block w-full text-left text-sm py-1.5 transition-all duration-200 border-l-2 no-underline ${
                item.level === 1 ? 'pl-3' : item.level === 2 ? 'pl-5' : 'pl-7'
              } ${
                isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-zinc-700'
              }"
              style="border-color: var(--border-color, hsl(var(--border) / 0.2));"
            >
              ${item.text}
            </a>
          `).join('')}
        </nav>
      `;

      // Click handlers for smooth scrolling
      const tocLinks = tocContainer.querySelectorAll('a[data-toc-id]');
      tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const id = link.getAttribute('data-toc-id');
          const element = document.getElementById(id!);
          const container = document.getElementById('article-scroll-container');

          if (element && container) {
            let offsetTop = 0;
            let el: any = element;
            while (el && el !== container) {
              offsetTop += el.offsetTop;
              el = el.offsetParent;
            }

            container.scrollTo({
              top: Math.max(0, offsetTop - 80),
              behavior: 'smooth',
            });

            window.history.pushState(null, '', `#${id}`);

            tocLinks.forEach(l => {
              l.classList.remove('font-medium');
              (l as HTMLElement).style.borderColor = '';
              (l as HTMLElement).style.color = '';
            });
            link.classList.add('font-medium');
            (link as HTMLElement).style.borderColor = primaryColor;
            (link as HTMLElement).style.color = primaryColor;
          }
        });
      });

      // Scroll spy
      const container = document.getElementById('article-scroll-container');
      if (container) {
        const handleScroll = () => {
          let currentId = '';
          for (const item of tocItems) {
            const element = document.getElementById(item.id);
            if (element) {
              let offsetTop = 0;
              let el: any = element;
              while (el && el !== container) {
                offsetTop += el.offsetTop;
                el = el.offsetParent;
              }
              if (container.scrollTop >= offsetTop - 100) {
                currentId = item.id;
              }
            }
          }

          if (currentId) {
            tocLinks.forEach(link => {
              const isActive = link.getAttribute('data-toc-id') === currentId;
              if (isActive) {
                link.classList.add('font-medium');
                (link as HTMLElement).style.borderColor = primaryColor;
                (link as HTMLElement).style.color = primaryColor;
              } else {
                link.classList.remove('font-medium');
                (link as HTMLElement).style.borderColor = '';
                (link as HTMLElement).style.color = '';
              }
            });
          }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('toc-updated', handleTocUpdate);
    return () => window.removeEventListener('toc-updated', handleTocUpdate);
  }, [isDark, primaryColor]);
}
