import type { APIRoute } from 'astro';
import { getArticles, getCategories, getFolders, getHelpCenterConfig } from '../lib/localData';

export const GET: APIRoute = async ({ request, url }) => {
  const [articles, categories, folders, config] = await Promise.all([
    getArticles(),
    getCategories(),
    getFolders(),
    getHelpCenterConfig(),
  ]);

  // Respect proxied custom domains and sub-path deployments
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

  const now = new Date().toISOString();

  const urls: string[] = [];

  // Homepage
  urls.push(`
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`);

  // Folder pages (non-default folders with names)
  for (const folder of folders) {
    if (folder.is_default || !folder.slug || !folder.name) continue;
    urls.push(`
  <url>
    <loc>${baseUrl}/${folder.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  // Category pages
  for (const cat of categories) {
    const slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    urls.push(`
  <url>
    <loc>${baseUrl}/category/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  // Article pages
  for (const article of articles) {
    const lastmod = new Date(article.updated_at || article.created_at).toISOString();
    urls.push(`
  <url>
    <loc>${baseUrl}/article/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
};
