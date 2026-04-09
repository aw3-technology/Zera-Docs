// Force server-side rendering for dynamic subdomain support
export const prerender = false;

import { getArticles, getCategories } from '../../lib/api';
import { getProjectIdFromRequest } from '../../lib/projectContext';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, url, request }) => {
  const { slug } = params;

  let projectId: string = import.meta.env.PUBLIC_PROJECT_ID || '6da7042b-22c0-4568-801c-ec608649cd19';

  try {
    // Get project ID from domain/subdomain
    projectId = await getProjectIdFromRequest(url.href, request);
  } catch (err) {
    console.error('[Markdown TXT] Failed to resolve project ID:', err);
  }

  try {
    // Fetch articles and categories
    const allArticles = await getArticles(projectId);
    const categories = await getCategories(projectId);

    // Find the article by slug
    const article = allArticles.find(a => a.slug === slug);

    if (!article) {
      return new Response('Article not found', { status: 404 });
    }

    // Get category name
    let categoryName = 'Uncategorized';
    if (article.category_id) {
      const category = categories.find(c => c.id === article.category_id);
      if (category) {
        categoryName = category.name;
      }
    }

    // Strip HTML and convert to markdown
    const stripHtml = (html: string) => {
      return html
        .replace(/<\/p>/g, '\n\n')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g, '\n## $1\n')
        .replace(/<[^>]*>?/gm, '');
    };

    const cleanContent = stripHtml(article.content);
    const articleUrl = `${url.origin}/article/${article.slug}`;
    const markdown = `---
URL: ${articleUrl}
Title: ${article.title}
Category: ${categoryName}
---

${cleanContent}`;

    return new Response(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `inline; filename="${slug}.txt"`,
      },
    });
  } catch (err) {
    console.error('[Markdown TXT] Error:', err);
    return new Response('Failed to load article', { status: 500 });
  }
};
