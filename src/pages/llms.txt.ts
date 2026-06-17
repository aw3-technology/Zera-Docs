import type { APIRoute } from 'astro';
import { getArticles, getCategories, getHelpCenterConfig } from '../lib/localData';

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  const [articles, categories, config] = await Promise.all([
    getArticles(),
    getCategories(),
    getHelpCenterConfig(),
  ]);

  // Respect proxied custom domains and sub-path deployments (mirrors sitemap.xml.ts)
  const forwardedHost =
    request.headers.get('X-Forwarded-Host') ||
    request.headers.get('X-Original-Host');
  const actualOrigin = forwardedHost
    ? `${url.protocol}//${forwardedHost}`
    : url.origin;

  const configAny = config as any;
  const subPathDomain = configAny.sub_path_domain || null;
  const subPath = configAny.sub_path || '';
  const publicOrigin = subPathDomain
    ? `${url.protocol}//${subPathDomain}`
    : actualOrigin;
  const publicPathPrefix = subPathDomain && subPath ? subPath : '';
  const baseUrl = `${publicOrigin}${publicPathPrefix}`;

  const title = configAny.portal_name || configAny.welcome_title || 'Zera Docs';
  const summary = configAny.meta_description || configAny.welcome_subtitle || '';

  const lines: string[] = [];
  lines.push(`# ${title}`);
  lines.push('');
  if (summary) {
    lines.push(`> ${summary}`);
    lines.push('');
  }
  lines.push(
    'This is the documentation for ZERA. Each article below links to a plain-text ' +
      'Markdown version (the `.txt` URL) suitable for LLM ingestion. The full corpus ' +
      `is also available at ${baseUrl}/articles.txt.`
  );
  lines.push('');

  // Group published articles by category, preserving category display order.
  const sortedCategories = [...categories];
  const articlesByCategory = new Map<string, typeof articles>();
  for (const article of articles) {
    const key = article.category_id ?? '__uncategorized__';
    if (!articlesByCategory.has(key)) articlesByCategory.set(key, []);
    articlesByCategory.get(key)!.push(article);
  }

  const orderArticles = (list: typeof articles) =>
    [...list].sort(
      (a, b) => (a.display_order ?? 999) - (b.display_order ?? 999)
    );

  const renderArticle = (article: (typeof articles)[number]) => {
    const note = article.excerpt ? `: ${article.excerpt.trim()}` : '';
    return `- [${article.title}](${baseUrl}/article/${article.slug}.txt)${note}`;
  };

  for (const cat of sortedCategories) {
    const list = articlesByCategory.get(cat.id);
    if (!list || !list.length) continue;
    lines.push(`## ${cat.name}`);
    if (cat.description) {
      lines.push('');
      lines.push(cat.description.trim());
    }
    lines.push('');
    for (const article of orderArticles(list)) {
      lines.push(renderArticle(article));
    }
    lines.push('');
  }

  // Any articles not attached to a known category
  const uncategorized = articlesByCategory.get('__uncategorized__');
  if (uncategorized && uncategorized.length) {
    lines.push('## Other');
    lines.push('');
    for (const article of orderArticles(uncategorized)) {
      lines.push(renderArticle(article));
    }
    lines.push('');
  }

  const body = lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
