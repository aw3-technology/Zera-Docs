import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// The helpcenter is always deployed at root on Cloudflare Pages.
// Sub-path proxying is handled by the Cloudflare Worker on the user's domain.
// At runtime, the sub-path is injected into window.__projectContext.subPath
// by BaseLayout so client-side links can prefix correctly.
// Sub-path is ONLY used when sub_path_domain is set (custom domain deployment).
// On Gately subdomains, the sub-path is not part of the URL.
// Always call getBasePath() as a function — never cache as a constant.
export function getBasePath(config?: { sub_path?: string | null; sub_path_domain?: string | null }): string {
  if (typeof window !== 'undefined') {
    const ctx = (window as any).__projectContext;
    
    // Check if we're on localhost
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // Check if we're on a Gately subdomain (not www.usegately.com or usegately.com)
    // Gately subdomains have format: {project-id}.usegately.com or {project-id}.cloud-cr.usegately.com
    const hostname = window.location.hostname;
    const isGatelySubdomain = (
      (hostname.includes('.usegately.com') && !hostname.startsWith('www.') && hostname !== 'usegately.com') ||
      (hostname.includes('.cloud-cr.usegately.com') && !hostname.startsWith('www.'))
    );
    
    // On Gately subdomains or localhost, never use sub-path (they're root deployments)
    if (isLocalhost || isGatelySubdomain) {
      return '';
    }
    
    // On custom domains (including www.usegately.com, usegately.com, or any other domain),
    // use sub-path if configured
    if (ctx?.subPathDomain || config?.sub_path_domain) {
      const subPath = ctx?.subPath || config?.sub_path || '';
      if (subPath) {
        // Ensure sub-path starts with / and doesn't end with /
        return subPath.startsWith('/') ? subPath : `/${subPath}`;
      }
    }
    
    return '';
  }
  
  // SSR: only apply sub-path if sub_path_domain is configured (custom domain)
  if (config?.sub_path_domain && config?.sub_path) {
    const subPath = config.sub_path;
    return subPath.startsWith('/') ? subPath : `/${subPath}`;
  }
  
  return '';
}

// Keep BASE_PATH as a getter function call for legacy imports
export const BASE_PATH = '';

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
}
