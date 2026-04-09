import type { APIRoute } from 'astro';
import { getHelpCenterConfig } from '../lib/api';
import { getProjectIdFromRequest } from '../lib/projectContext';

export const GET: APIRoute = async ({ request, url }) => {
  try {
    // Resolve project ID from domain (supports custom domains and subdomains)
    const projectId = await getProjectIdFromRequest(url.href, request);
    console.log('[Robots.txt] Generating for project:', projectId);
    
    const config = await getHelpCenterConfig(projectId);
    
    // Get the base URL from the request
    // Check for proxied requests
    let hostname = url.hostname;
    const forwardedHost = request.headers.get('X-Forwarded-Host') || request.headers.get('X-Original-Host');
    if (forwardedHost) {
      hostname = forwardedHost;
    }
    
    const baseUrl = `https://${hostname}`;
    console.log('[Robots.txt] Using base URL:', baseUrl);
    
    // Check if indexing is allowed (default to true for production)
    const allowIndexing = config?.allow_indexing !== false;
    
    const robotsTxt = allowIndexing
      ? `# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin or private paths (if any)
Disallow: /api/
Disallow: /_astro/

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Specific bot rules
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /`
      : `# Disallow all crawlers (staging/development)
User-agent: *
Disallow: /

# Sitemap location (for reference)
Sitemap: ${baseUrl}/sitemap.xml`;
    
    return new Response(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    return new Response('Error generating robots.txt', { status: 500 });
  }
};
