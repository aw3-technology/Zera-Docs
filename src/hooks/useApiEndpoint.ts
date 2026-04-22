import { useMemo } from 'react';
import { API_BASE_URL } from '@/lib/constants';

interface Article {
  id: string;
  title: string;
  excerpt?: string;
  category_id: string | null;
  sidebar_title?: string;
}

interface Category {
  id: string;
  folder_id?: string | null;
}

interface Folder {
  id: string;
  name: string;
}

interface ApiEndpointResult {
  isApiRefArticle: boolean;
  method: string;
  path: string;
  hasEndpoint: boolean;
}

/**
 * Detects whether an article is an API reference and extracts the
 * HTTP method + path from the title / sidebar_title.
 */
export function useApiEndpoint(
  article: Article,
  categories: Category[],
  folders: Folder[],
  apiBaseUrl: string = API_BASE_URL,
): ApiEndpointResult {
  const isApiRefArticle = useMemo(() => {
    const methodPattern = /^(GET|POST|PUT|PATCH|DELETE|HEAD)\s+\//i;
    if (methodPattern.test((article as any).sidebar_title || '')) return true;
    if (methodPattern.test(article.title || '')) return true;
    const cat = categories.find(c => c.id === article.category_id);
    const folder = cat?.folder_id ? folders.find(f => f.id === cat.folder_id) : null;
    return folder?.name?.toLowerCase().includes('api') ?? false;
  }, [article, categories, folders]);

  const { method, path, hasEndpoint } = useMemo(() => {
    if (!isApiRefArticle) return { method: '', path: '', hasEndpoint: false };

    const sources = [(article as any).sidebar_title, article.title, article.excerpt];
    for (const s of sources) {
      const m = s?.match(/^(GET|POST|PUT|PATCH|DELETE|HEAD)\s+(\/\S*)/i);
      if (m) {
        let extractedPath = m[2];
        try {
          const baseUrlObj = new URL(apiBaseUrl);
          const basePath = baseUrlObj.pathname.replace(/\/$/, '');
          if (basePath && extractedPath.startsWith(basePath)) {
            extractedPath = extractedPath.slice(basePath.length) || '/';
          }
        } catch {
          // If baseUrl is invalid, use path as-is
        }
        return { method: m[1].toUpperCase(), path: extractedPath, hasEndpoint: true };
      }
    }
    return { method: '', path: '', hasEndpoint: false };
  }, [isApiRefArticle, article, apiBaseUrl]);

  return { isApiRefArticle, method, path, hasEndpoint };
}
