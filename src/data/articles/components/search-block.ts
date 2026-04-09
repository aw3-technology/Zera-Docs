export const searchBlockArticle = {
  id: 'search-block',
  title: 'Search Modal',
  slug: 'search-block',
  excerpt: 'Full-text search across all articles, triggered by Cmd+K or the search bar.',
  category_id: 'components',
  is_published: true,
  display_order: 8,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-17T00:00:00Z',
  updated_at: '2024-01-17T00:00:00Z',
  content: `
<h2>Search Modal</h2>
<p>The search modal provides instant full-text search across all published articles. It opens as a centered overlay and filters results as you type.</p>

<h2>Triggering search</h2>
<ul>
  <li>Press <strong>Cmd+K</strong> (Mac) or <strong>Ctrl+K</strong> (Windows/Linux)</li>
  <li>Click the search bar in the hero section on the home page</li>
  <li>Click the search icon in the header</li>
</ul>

<h2>How search works</h2>
<p>Search is entirely client-side — no server or index required. It filters the <code>articles</code> array passed as a prop, matching against:</p>
<ul>
  <li>Article <code>title</code></li>
  <li>Article <code>excerpt</code></li>
  <li>Article <code>content</code> (stripped of HTML tags)</li>
</ul>

<h2>Enabling / disabling search</h2>
<pre><code class="language-ts">// src/data/config.ts
show_search: true,  // set to false to hide the search bar</code></pre>

<h2>Component location</h2>
<p>Implemented in <code>src/components/SearchModal.tsx</code>. Uses a <code>Popover</code> from Radix UI for the overlay and keyboard trap.</p>
  `.trim(),
};
