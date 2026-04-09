/**
 * Local help center configuration
 * Replace these values with your own branding/settings
 */
export const helpCenterConfig = {
  portal_name: 'My Help Center',
  primary_color: '#6366f1',
  secondary_color: '#8b5cf6',
  welcome_title: 'How can we help you?',
  welcome_subtitle: 'Search our documentation or browse categories below.',
  theme_mode: 'auto' as 'light' | 'dark' | 'auto',
  logo_url: null as string | null,
  show_search: true,
  show_categories: true,
  ai_answer_enabled: false,
  sidebar_style: 'default' as const,
  header_links: [
    { label: 'Home', url: '/' },
  ],
  show_primary_button: false,
  primary_button_label: 'Get Started',
  primary_button_url: '#',
  heading_font: null as string | null,
  body_font: null as string | null,
  meta_title: 'Help Center',
  meta_description: 'Find answers to your questions.',
  og_image_url: null as string | null,
  favicon_url: null as string | null,
  sub_path: null as string | null,
};
