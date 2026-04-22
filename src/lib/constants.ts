// ── API ─────────────────────────────────────────────────────────────
export const API_BASE_URL = 'https://api.usegately.com/api/v1';

// ── Timing (ms) ─────────────────────────────────────────────────────
export const DELAY_DATA_FETCH     = 1000; // delay before client-side data fetch
export const DELAY_AI_REDIRECT    = 1200; // delay to show "redirecting to AI" message
export const DELAY_AI_LOADING     = 1000; // AI chat loading-stage transition
export const DELAY_DOM_PATCH      =  100; // brief wait for DOM render before patching
export const DELAY_COPY_FEEDBACK  = 2000; // "Copied!" toast / icon duration

// ── Layout ──────────────────────────────────────────────────────────
export const SIDEBAR_TOC_WIDTH    = '16rem';
export const SIDEBAR_CODE_WIDTH   = '360px';

// ── HTTP method badge colours ───────────────────────────────────────
export const METHOD_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  GET:    { bg: '#22c55e1a', text: '#16a34a', border: '#22c55e40' },
  POST:   { bg: '#3b82f61a', text: '#2563eb', border: '#3b82f640' },
  PUT:    { bg: '#f59e0b1a', text: '#d97706', border: '#f59e0b40' },
  PATCH:  { bg: '#f973161a', text: '#ea580c', border: '#f9731640' },
  DELETE: { bg: '#ef44441a', text: '#dc2626', border: '#ef444440' },
};

export const METHOD_COLOR_DEFAULT = { bg: '#6b72801a', text: '#4b5563', border: '#6b728040' };
