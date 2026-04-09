/**
 * Domain-based project detection
 * Resolves the current hostname to a project UUID
 */

// In-memory cache: hostname → { projectId | null, expiresAt }
const domainCache = new Map<string, { projectId: string | null; expiresAt: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function getApiBaseUrl(): string {
  try {
    return import.meta.env.PUBLIC_API_URL || 'https://api.usegately.com/api';
  } catch {
    return 'https://api.usegately.com/api';
  }
}

function isUUID(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

/**
 * Calls the resolve-domain API with the full hostname to get a project UUID.
 * Results (including null/"no content") are cached in-memory for CACHE_TTL_MS
 * to avoid hammering the API on every SSR render.
 */
async function resolveHostnameToProjectId(hostname: string): Promise<string | null> {
  // Return cached result if still fresh
  const cached = domainCache.get(hostname);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.projectId;
  }

  let projectId: string | null = null;

  try {
    const apiBase = getApiBaseUrl();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const apiUrl = `${apiBase}/public/help-center/resolve-domain?domain=${encodeURIComponent(hostname)}`;

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Gately-HelpCenter/1.0' }
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const resolved = data.data?.projectId || data.projectId;
      if (resolved && isUUID(resolved)) {
        projectId = resolved;
      }
    }
  } catch (error) {
    console.error('[Domain] resolve-domain fetch failed:', error);
    // Don't cache on network errors — let it retry next time
    return null;
  }

  // Cache both hits and "no content" (null) results to prevent repeated calls
  domainCache.set(hostname, { projectId, expiresAt: Date.now() + CACHE_TTL_MS });
  return projectId;
}

/**
 * Get the effective hostname from the request, checking proxy headers first
 */
function getEffectiveHostname(url: string, request?: Request): string {
  // Always check proxy headers first — the Pages worker sees gately-help-center.pages.dev
  // but the gateway sets X-Forwarded-Host to the original domain
  if (request) {
    const forwardedHost =
      request.headers.get('X-Original-Host') ||
      request.headers.get('X-Forwarded-Host') ||
      request.headers.get('x-original-host') ||
      request.headers.get('x-forwarded-host');

    if (forwardedHost) {
      return forwardedHost;
    }
  }

  const hostname = new URL(url).hostname;
  return hostname;
}

/**
 * Main entry point — resolves any hostname to a project UUID
 *
 * Priority:
 * 1. X-Gately-Project-Id header (set by user's sub-path worker snippet)
 * 2. X-Original-Host / X-Forwarded-Host header (proxied custom domain or cloud-cr subdomain)
 * 3. URL hostname if it's a usegately.com subdomain
 * 4. Env variable PUBLIC_PROJECT_ID
 * 5. Hardcoded safe default
 */
export async function resolveProjectId(url: string, request?: Request): Promise<string> {
  // Highest priority: explicit project ID injected by the user's sub-path worker
  if (request) {
    const explicitId =
      request.headers.get('X-Gately-Project-Id') ||
      request.headers.get('x-gately-project-id');
    if (explicitId && isUUID(explicitId)) {
      return explicitId;
    }
  }

  const hostname = getEffectiveHostname(url, request);

  // Skip resolution for pages.dev or reserved usegately.com system domains
  const reservedHostnames = ['usegately.com', 'www.usegately.com', 'app.usegately.com', 'api.usegately.com'];
  if (hostname.endsWith('.pages.dev') || reservedHostnames.includes(hostname)) {
    // system/pages.dev hostname, skipping API resolution
  } else {
    // For any usegately.com subdomain or custom domain, call the API
    const resolved = await resolveHostnameToProjectId(hostname);
    if (resolved) {
      return resolved;
    }
  }

  // Fallback to env variable
  const envId = import.meta.env.PUBLIC_PROJECT_ID;
  if (envId && isUUID(envId)) {
    return envId;
  }

  return '6da7042b-22c0-4568-801c-ec608649cd19';
}

// Keep these exports for any code that still imports them
export async function getProjectIdFromDomain(url: string, request?: Request): Promise<string | null> {
  return resolveProjectId(url, request);
}

export function getProjectIdFromSubdomain(hostname: string): string | null {
  if (hostname.endsWith('.pages.dev')) return null;
  const parts = hostname.split('.');
  if (parts.length >= 3 && !['www', 'api', 'app', 'admin'].includes(parts[0])) {
    return parts[0];
  }
  return null;
}

export function isCustomDomain(hostname: string): boolean {
  const systemDomains = ['usegately.com', 'pages.dev', 'localhost', '127.0.0.1'];
  return !systemDomains.some(d => hostname.includes(d));
}
