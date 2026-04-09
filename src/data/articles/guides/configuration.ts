export const configurationArticle = {
  id: 'configuration-guide',
  title: 'Configuration Guide',
  slug: 'configuration-guide',
  excerpt: 'All available configuration options explained.',
  category_id: 'guides',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-20T00:00:00Z',
  updated_at: '2024-01-20T00:00:00Z',
  content: `
<h2>Configuration</h2>
<p>All help center settings live in <code>src/data/config.ts</code>. Edit this file to customise branding, layout, and behaviour.</p>

<h2>Full options reference</h2>
<table>
  <thead>
    <tr><th>Option</th><th>Type</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td><code>portal_name</code></td><td>string</td><td>Name shown in the browser tab and header</td></tr>
    <tr><td><code>primary_color</code></td><td>string (hex)</td><td>Brand color used for buttons and accents</td></tr>
    <tr><td><code>welcome_title</code></td><td>string</td><td>Hero section heading</td></tr>
    <tr><td><code>welcome_subtitle</code></td><td>string</td><td>Hero section subheading</td></tr>
    <tr><td><code>theme_mode</code></td><td>'light' | 'dark' | 'auto'</td><td>Default color scheme</td></tr>
    <tr><td><code>logo_url</code></td><td>string | null</td><td>URL or path to your logo image</td></tr>
    <tr><td><code>show_search</code></td><td>boolean</td><td>Show/hide the search bar</td></tr>
    <tr><td><code>show_categories</code></td><td>boolean</td><td>Show/hide the categories grid</td></tr>
    <tr><td><code>sidebar_style</code></td><td>string</td><td>Sidebar visual style (see Sidebar docs)</td></tr>
    <tr><td><code>heading_font</code></td><td>string | null</td><td>Google Font name for headings</td></tr>
    <tr><td><code>body_font</code></td><td>string | null</td><td>Google Font name for body text</td></tr>
    <tr><td><code>header_links</code></td><td>array</td><td>Navigation links in the header</td></tr>
    <tr><td><code>show_primary_button</code></td><td>boolean</td><td>Show a CTA button in the header</td></tr>
    <tr><td><code>primary_button_label</code></td><td>string</td><td>CTA button text</td></tr>
    <tr><td><code>primary_button_url</code></td><td>string</td><td>CTA button destination URL</td></tr>
    <tr><td><code>meta_title</code></td><td>string</td><td>HTML &lt;title&gt; tag content</td></tr>
    <tr><td><code>meta_description</code></td><td>string</td><td>HTML meta description</td></tr>
    <tr><td><code>favicon_url</code></td><td>string | null</td><td>Path to favicon</td></tr>
  </tbody>
</table>
  `.trim(),
};
