/**
 * Debug endpoint to test project ID resolution
 * Access at: /api/debug-resolution
 */

import type { APIRoute } from 'astro';
import { resolveProjectId } from '../../lib/domain';

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const hostname = url.hostname;
    const forwardedHost = request.headers.get('X-Forwarded-Host') || request.headers.get('X-Original-Host');
    
    console.log('[Debug] Starting resolution test');
    console.log('[Debug] URL:', url.href);
    console.log('[Debug] Hostname:', hostname);
    console.log('[Debug] Forwarded Host:', forwardedHost);
    
    const projectId = await resolveProjectId(url.href, request);
    
    return new Response(
      JSON.stringify({
        success: true,
        projectId,
        hostname,
        forwardedHost,
        url: url.href,
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
  } catch (error) {
    console.error('[Debug] Resolution error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString()
      }, null, 2),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};
