// Force server-side rendering for dynamic subdomain support
export const prerender = false;

import { getArticles, getCategories } from '../lib/api';
import { getProjectIdFromRequest } from '../lib/projectContext';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url, request }) => {
  let projectId: string = import.meta.env.PUBLIC_PROJECT_ID || '6da7042b-22c0-4568-801c-ec608649cd19';

  try {
    // Get project ID from domain/subdomain
    projectId = await getProjectIdFromRequest(url.href, request);
  } catch (err) {
    console.error('[All Articles TXT] Failed to resolve project ID:', err);
  }

  try {
    // Fetch all published articles and categories
    const articles = await getArticles(projectId);
    const categories = await getCategories(projectId);

    if (!articles || articles.length === 0) {
      return new Response('No articles found', { status: 404 });
    }

    const getCategoryName = (categoryId: string | null) => {
      if (!categoryId) return 'Uncategorized';
      const category = categories?.find(c => c.id === categoryId);
      return category ? category.name : 'Uncategorized';
    };

    // Strip HTML and convert to markdown
    const stripHtml = (html: string) => {
      return html
        .replace(/<\/p>/g, '\n\n')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g, '\n## $1\n')
        .replace(/<[^>]*>?/gm, '');
    };

    const allMarkdown = articles
      .map(article => {
        const cleanContent = stripHtml(article.content);
        const categoryName = getCategoryName(article.category_id);
        return `---
Title: ${article.title}
Category: ${categoryName}
---

${cleanContent}

`;
      })
      .join('\n---\n\n');

    return new Response(allMarkdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'inline; filename="all-articles.txt"',
      },
    });
  } catch (err) {
    console.error('[All Articles TXT] Error:', err);
    return new Response('Failed to load articles', { status: 500 });
  }
};
