/**
 * Zera Docs — Documentation Portal
 * Edit this file to configure branding, fonts, SEO, and portal settings.
 */
export const helpCenterConfig = {
  // Branding
  portal_name: 'Zera Docs',
  primary_color: '#E6560A',
  secondary_color: '#C44A08',
  welcome_title: 'Zera Docs',
  welcome_subtitle: 'Community-Governed. Treasury-Supported. Explore the governance-first blockchain.',
  theme_mode: 'dark' as 'light' | 'dark' | 'auto',
  logo_url: '/zera-favicon.png' as string | null,
  favicon_url: '/zera-favicon.png' as string | null,

  // Layout
  show_search: true,
  show_categories: true,
  ai_answer_enabled: true,
  sidebar_style: 'default' as const,

  // Fonts
  heading_font: 'Geist Mono' as string | null,
  body_font: 'Onest' as string | null,

  // Header
  header_links: [
    { label: 'Home', url: 'https://zera.net/', icon: 'hugeicons:home-01' },
    { label: 'Explorer', url: 'https://zerascan.io/', icon: 'hugeicons:search-visual' },
    { label: 'News', url: 'https://zera.news/', icon: 'hugeicons:news-01' },
    { label: 'Wallet', url: 'https://apps.apple.com/us/app/vision-hub-zera-web3-wallet/id6758921523', icon: 'hugeicons:wallet-01' },
    { label: 'Telegram', url: 'https://t.me/ZeraNetwork', icon: 'hugeicons:telegram' },
    { label: 'DexScreener', url: 'https://dexscreener.com/solana/CpaXrJhnLesjnBt893WaBbNkYAEQvpqFZmGExvvA1njg', icon: 'hugeicons:chart-line-data-01' },
    { label: 'GeckoTerminal', url: 'https://www.geckoterminal.com/solana/pools/CpaXrJhnLesjnBt893WaBbNkYAEQvpqFZmGExvvA1njg', icon: 'hugeicons:analytics-01' },
    { label: 'Linktree', url: 'https://linktr.ee/zerachain', icon: 'hugeicons:link-01' },
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
