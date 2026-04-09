export const heroBlockArticle = {
  id: 'hero-block',
  title: 'Hero Block',
  slug: 'hero-block',
  excerpt: 'A full-width intro section with title, subtitle, search bar, and optional CTA.',
  category_id: 'components',
  is_published: true,
  display_order: 2,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-11T00:00:00Z',
  updated_at: '2024-01-11T00:00:00Z',
  content: `
<h2>Hero Block</h2>
<p>The Hero block is the first thing visitors see on the help center home page. It renders a full-width section with a welcome title, subtitle, and the search bar.</p>

<h2>Where it lives</h2>
<p>The hero is rendered inside <code>HelpCenterHome.tsx</code>. Its content is driven by the config values in <code>src/data/config.ts</code>:</p>

<pre><code class="language-ts">// src/data/config.ts
welcome_title: 'How can we help you?',
welcome_subtitle: 'Search our documentation or browse categories below.',
primary_color: '#6366f1',</code></pre>

<h2>Customisation</h2>
<ul>
  <li><strong>Title &amp; subtitle</strong> — edit <code>welcome_title</code> and <code>welcome_subtitle</code> in <code>config.ts</code></li>
  <li><strong>Background color</strong> — controlled by <code>primary_color</code></li>
  <li><strong>Search bar</strong> — toggle with <code>show_search: true | false</code></li>
  <li><strong>Logo</strong> — set <code>logo_url</code> to an image path or URL</li>
</ul>

<h2>Props passed to the component</h2>
<pre><code class="language-ts">interface HelpCenterHomeProps {
  config: HelpCenterConfig;  // drives hero content
  articles: Article[];
  categories: Category[];
  faqs: Faq[];
  projectId: string;
}</code></pre>
  `.trim(),
};
