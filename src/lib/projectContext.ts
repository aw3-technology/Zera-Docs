/**
 * Project Context Utility
 * Provides access to globally stored project configuration
 */

import { resolveProjectId } from './domain';

export interface ProjectConfig {
  portal_name: string;
  primary_color: string;
  secondary_color?: string;
  welcome_title?: string;
  welcome_subtitle?: string;
  theme_mode: 'light' | 'dark' | 'auto';
  logo_url?: string | null;
  show_search?: boolean;
  show_categories?: boolean;
  ai_answer_enabled?: boolean;
  subdomain_url?: string | null;
  sidebar_style?: string;
  header_links?: { label: string; url: string }[];
  show_primary_button?: boolean;
  primary_button_label?: string;
  primary_button_url?: string;
  heading_font?: string | null;
  body_font?: string | null;
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
  favicon_url?: string;
  llm_copy_enabled?: boolean;
  chatgpt_link?: string;
  claude_link?: string;
  custom_head_html?: string;
  custom_body_html?: string;
}

export interface ProjectContext {
  config: ProjectConfig;
  projectId: string;
  articles?: any[];
  categories?: any[];
  faqs?: any[];
  getConfig: () => ProjectConfig;
  updateConfig: (newConfig: Partial<ProjectConfig>) => void;
}

/**
 * Get project ID from current request URL
 * Supports proxied requests by checking headers for original hostname
 */
export async function getProjectIdFromRequest(url: string, request?: Request): Promise<string> {
  return await resolveProjectId(url, request);
}

/**
 * Get the global project context
 */
export function getProjectContext(): ProjectContext | null {
  if (typeof window === 'undefined') return null;
  return (window as any).__projectContext || null;
}

/**
 * Get the project config from context or localStorage
 */
export function getProjectConfig(projectId: string): ProjectConfig | null {
  // Try to get from global context first
  const context = getProjectContext();
  if (context && context.config) {
    return context.config;
  }

  // Fallback to localStorage
  if (typeof window === 'undefined') return null;
  
  try {
    const storageKey = `helpcenter_config_${projectId}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const data = JSON.parse(stored);
      return data.config;
    }
  } catch (e) {
    console.debug('Failed to get config from localStorage:', e);
  }

  return null;
}

/**
 * Update the project config
 */
export function updateProjectConfig(updates: Partial<ProjectConfig>): void {
  const context = getProjectContext();
  if (context && context.updateConfig) {
    context.updateConfig(updates);
  }
}

/**
 * Apply theme from config
 */
export function applyTheme(theme: 'light' | 'dark' | 'auto'): void {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'light') {
    root.classList.remove('dark');
  } else if (theme === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}

/**
 * Get the current theme
 */
export function getCurrentTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}
