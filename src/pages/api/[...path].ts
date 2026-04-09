/**
 * Astro API endpoint to proxy API requests
 * This allows the help center to call the API from the same domain
 * Handles all /api/* requests and forwards them to the main API
 */

import type { APIRoute } from 'astro';

const API_BASE_URL = 'https://api.usegately.com/api';

export const GET: APIRoute = async ({ params, request, url }) => {
  return proxyRequest(params, request, url, 'GET');
};

export const POST: APIRoute = async ({ params, request, url }) => {
  return proxyRequest(params, request, url, 'POST');
};

export const PUT: APIRoute = async ({ params, request, url }) => {
  return proxyRequest(params, request, url, 'PUT');
};

export const DELETE: APIRoute = async ({ params, request, url }) => {
  return proxyRequest(params, request, url, 'DELETE');
};

export const PATCH: APIRoute = async ({ params, request, url }) => {
  return proxyRequest(params, request, url, 'PATCH');
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
};

// How long to cache each public endpoint at the edge (seconds)
const CACHE_TTL: Record<string, number> = {
  'help-center-config':        300, // 5 min  — config rarely changes
  'help-article-categories':   120, // 2 min
  'help-articles':             120, // 2 min
  'help-folders':              300, // 5 min
  'faqs':                      300, // 5 min
  'resolve-domain':            600, // 10 min
};

function getCacheTtl(apiPath: string): number {
  for (const [key, ttl] of Object.entries(CACHE_TTL)) {
    if (apiPath.includes(key)) return ttl;
  }
  return 0; // no caching for unknown / mutation endpoints
}

async function proxyRequest(
  params: Record<string, string | undefined>,
  request: Request,
  url: URL,
  method: string
): Promise<Response> {
  const apiPath = params.path || '';
  const targetUrl = `${API_BASE_URL}/${apiPath}${url.search}`;
  const isGet = method === 'GET' || method === 'HEAD';
  const ttl = isGet ? getCacheTtl(apiPath) : 0;

  try {
    const fetchOptions: RequestInit & { cf?: Record<string, unknown> } = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Gately-HelpCenter/1.0',
      },
      body: !isGet ? await request.text() : undefined,
    };

    // Use Cloudflare edge cache for GET requests on known public endpoints
    if (ttl > 0) {
      fetchOptions.cf = { cacheTtl: ttl, cacheEverything: true };
    }

    const apiResponse = await fetch(targetUrl, fetchOptions);
    const data = await apiResponse.text();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (ttl > 0 && apiResponse.ok) {
      headers['Cache-Control'] = `public, max-age=${ttl}, s-maxage=${ttl}`;
    } else {
      headers['Cache-Control'] = 'no-store';
    }

    return new Response(data, { status: apiResponse.status, headers });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'API Proxy Error', message: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    );
  }
}
