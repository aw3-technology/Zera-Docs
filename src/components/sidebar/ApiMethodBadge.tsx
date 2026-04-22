import type { Article } from '@/lib/api';
import { METHOD_COLORS, METHOD_COLOR_DEFAULT } from '@/lib/constants';

export function SidebarMethodBadge({ method }: { method: string }) {
  const colors = METHOD_COLORS[method] || METHOD_COLOR_DEFAULT;
  return (
    <span
      className="inline-flex items-center justify-center px-1.5 rounded text-[9px] font-bold tracking-wider font-mono shrink-0 h-4"
      style={{ background: colors.bg, color: colors.text }}
    >
      {method}
    </span>
  );
}

const HTTP_METHOD_RE = /^(GET|POST|PUT|PATCH|DELETE|HEAD)\s+(\/\S*)/i;

function cleanPathTitle(path: string): string {
  const segments = path.split('/').filter(segment => {
    if (!segment) return false;
    if (segment.startsWith('{') || segment.startsWith(':') || segment.startsWith('[')) return false;
    return true;
  });
  const lastSegment = segments[segments.length - 1] || 'API';
  return lastSegment
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function parseApiTitle(article: Article): { method?: string; displayTitle: string } {
  const sidebarTitle = article.sidebar_title?.trim();

  const sidebarMatch = sidebarTitle?.match(HTTP_METHOD_RE);
  if (sidebarMatch) {
    const method = sidebarMatch[1].toUpperCase();
    const titleIsNotPath = !article.title?.match(HTTP_METHOD_RE);
    if (titleIsNotPath && article.title?.trim()) {
      return { method, displayTitle: article.title.trim() };
    }
    return { method, displayTitle: cleanPathTitle(sidebarMatch[2]) };
  }

  const titleMatch = article.title?.match(HTTP_METHOD_RE);
  if (titleMatch) {
    return {
      method: titleMatch[1].toUpperCase(),
      displayTitle: cleanPathTitle(titleMatch[2]),
    };
  }

  return { displayTitle: sidebarTitle || article.title };
}
