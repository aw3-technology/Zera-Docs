/**
 * Test endpoint to debug subdomain resolution
 * Access at: /api/test-subdomain
 */

import type { APIRoute } from 'astro';

const API_BASE_URL = 'https://api.usegately.com/api';

export const GET: APIRoute = async ({ request, url }) => {
  const hostname = url.hostname;
  const forwardedHost = request.headers.get('X-Forwarded-Host') || request.headers.get('X-Original-Host');
  const actualHostname = forwardedHost || hostname;
  
  // Extract subdomain
  const subdomain = actualHostname.replace('.usegately.com', '');
  
  // Test the API call
  const apiUrl = `${API_BASE_URL}/public/projects/by-slug/${encodeURIComponent(subdomain)}`;
  
  let apiResponse = null;
  let apiError = null;
  
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Gately-HelpCenter/1.0',
        'Accept': 'application/json',
      }
    });
    
    const responseText = await response.text();
    
    apiResponse = {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      body: responseText,
      parsed: null as any
    };
    
    try {
      apiResponse.parsed = JSON.parse(responseText);
    } catch (e) {
      apiResponse.parsed = { error: 'Failed to parse JSON', raw: responseText };
    }
  } catch (error) {
    apiError = {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
      stack: error instanceof Error ? error.stack : undefined
    };
  }
  
  return new Response(
    JSON.stringify({
      test: 'subdomain-resolution',
      hostname,
      forwardedHost,
      actualHostname,
      subdomain,
      apiUrl,
      apiResponse,
      apiError,
      timestamp: new Date().toISOString()
    }, null, 2),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
};
