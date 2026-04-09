export const welcomeArticle = {
  id: 'welcome',
  title: 'Welcome to the Help Center',
  slug: 'welcome',
  excerpt: 'Learn how to navigate and get the most out of this help center.',
  category_id: 'getting-started',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: `
<h2>Welcome</h2>
<p>This is your help center. Use the sidebar to browse categories and articles, or use the search bar to find what you need.</p>

<h2>How to navigate</h2>
<ul>
  <li>Browse <strong>categories</strong> on the home page</li>
  <li>Use <strong>Cmd+K</strong> (or Ctrl+K) to open search</li>
  <li>Use the <strong>sidebar</strong> to jump between articles</li>
</ul>

<h2>Need more help?</h2>
<p>If you can't find what you're looking for, reach out to our support team.</p>
  `.trim(),
};
