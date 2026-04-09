export const ctaBlockArticle = {
  id: 'cta-block',
  title: 'CTA Block',
  slug: 'cta-block',
  excerpt: 'Call-to-action banners with a button, configurable from the portal config.',
  category_id: 'components',
  is_published: true,
  display_order: 5,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-14T00:00:00Z',
  updated_at: '2024-01-14T00:00:00Z',
  content: `
<h2>CTA Block</h2>
<p>The CTA (Call to Action) block renders a prominent banner with a label and a link. It appears in the header when enabled via config.</p>

<h2>Enabling the CTA button</h2>
<p>In <code>src/data/config.ts</code>, set:</p>

<pre><code class="language-ts">show_primary_button: true,
primary_button_label: 'Get Started',
primary_button_url: 'https://your-app.com/signup',</code></pre>

<h2>Header links</h2>
<p>You can also add navigation links to the header:</p>

<pre><code class="language-ts">header_links: [
  { label: 'Home', url: '/' },
  { label: 'Blog', url: 'https://your-app.com/blog' },
  { label: 'Status', url: 'https://status.your-app.com' },
],</code></pre>

<h2>Inline CTA in articles</h2>
<p>You can add a CTA anywhere inside an article's HTML content using a styled blockquote or a simple link:</p>

<pre><code class="language-html">&lt;blockquote&gt;
  &lt;p&gt;Ready to get started? &lt;a href="/quick-start"&gt;Follow the Quick Start guide →&lt;/a&gt;&lt;/p&gt;
&lt;/blockquote&gt;</code></pre>
  `.trim(),
};
