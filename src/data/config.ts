/**
 * Zera Docs — Documentation Portal
 * Edit this file to configure branding, fonts, SEO, and portal settings.
 */
export const helpCenterConfig = {
  // Branding
  portal_name: 'Zera Docs',
  primary_color: '#D97706',
  secondary_color: '#B45309',
  welcome_title: 'Zera Docs',
  welcome_subtitle: 'Community-Governed. Treasury-Supported. Explore the governance-first blockchain.',
  theme_mode: 'auto' as 'light' | 'dark' | 'auto',
  logo_url: '/zera-favicon.png' as string | null,
  favicon_url: '/zera-favicon.png' as string | null,

  // Layout
  show_search: true,
  show_categories: true,
  ai_answer_enabled: false,
  sidebar_style: 'default' as const,

  // Fonts
  heading_font: 'Geist Mono' as string | null,
  body_font: 'Onest' as string | null,

  // Header
  header_links: [
    { label: 'Home', url: '/' },
    { label: 'Explorer', url: 'https://zerascan.io' },
    { label: 'Bridge', url: 'https://bridge.zeranetwork.io' },
  ],
  show_primary_button: true,
  primary_button_label: 'Get Started',
  primary_button_url: '/article/what-is-zera',

  // SEO
  meta_title: 'Zera Docs — Governance-First Blockchain Documentation',
  meta_description:
    'ZERA is a modern, governance-first blockchain platform designed for high-performance, developer-friendly Web3 applications. Community-governed, treasury-supported.',
  og_image_url: '/zera-social-share.png' as string | null,

  // Misc
  sub_path: null as string | null,
};
