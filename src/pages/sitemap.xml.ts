import type { APIRoute } from 'astro';
import { getArticles, getCategories, getHelpCenterConfig } from '../lib/api';
import { getProjectIdFromRequest } from '../lib/projectContext';

export const GET: APIRoute = async ({ request, url }) => {
  const startTime = Date.now();
  console.log('[Sitemap] 🗺️ Generation started');
  
  try {
    // Resolve project ID from domain (supports custom domains and subdomains)
    const projectId = await getProjectIdFromRequest(url.href, request);
    console.log(`[Sitemap] 📋 Generating for project: ${projectId}`);
    
    const fetchStart = Date.now();
    const [articles, categories] = await Promise.all([
      getArticles(projectId),
      getCategories(projectId),
      getHelpCenterConfig(projectId)
    ]);
    console.log(`[Sitemap] ✅ Data fetched in ${Date.now() - fetchStart}ms`);
    
    console.log(`[Sitemap] 📊 Found ${articles.length} articles, ${categories.length} categories`);
    
    // Get the base URL from the request
    // Check for proxied requests
    let hostname = url.hostname;
    const forwardedHost = request.headers.get('X-Forwarded-Host') || request.headers.get('X-Original-Host');
    if (forwardedHost) {
      hostname = forwardedHost;
    }
    
    const baseUrl = `https://${hostname}`;
    console.log('[Sitemap] Using base URL:', baseUrl);
    
    // Generate sitemap entries
    const urls: string[] = [];
    
    // Add homepage
    urls.push(`
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`);
    
    // Add category pages
    categories.forEach((category: any) => {
      const slug = category.name.toLowerCase().replace(/\s+/g, '-');
      urls.push(`
  <url>
    <loc>${baseUrl}/category/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    });
    
    // Add article pages
    articles.forEach((article: any) => {
      const lastmod = article.updated_at || article.created_at;
      urls.push(`
  <url>
    <loc>${baseUrl}/article/${article.slug}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);
    });
    
    console.log(`[Sitemap] ✅ Generated ${urls.length} URLs in ${Date.now() - startTime}ms`);
    
    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.join('')}
</urlset>`;
    
    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
};
