import type { APIRoute } from 'astro';
import { getHelpCenterConfig } from '../lib/localData';

export const GET: APIRoute = async ({ request, url }) => {
  const config = await getHelpCenterConfig();

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

  const robots = `# Zera Docs
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_helio/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Block scrapers
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
};
