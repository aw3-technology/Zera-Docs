export const textBlockArticle = {
  id: 'text-block',
  title: 'Text Block',
  slug: 'text-block',
  excerpt: 'Rich text content with headings, paragraphs, lists, tables, and inline code.',
  category_id: 'components',
  is_published: true,
  display_order: 3,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-12T00:00:00Z',
  updated_at: '2024-01-12T00:00:00Z',
  content: `
<h2>Text Block</h2>
<p>The Text block is the core of every article. It renders HTML content stored in the article's <code>content</code> field using Tailwind's <code>prose</code> typography classes.</p>

<h2>Supported HTML elements</h2>
<ul>
  <li><strong>Headings</strong> — <code>h1</code> through <code>h4</code> (h2/h3 appear in the Table of Contents)</li>
  <li><strong>Paragraphs</strong> — <code>p</code></li>
  <li><strong>Lists</strong> — <code>ul</code>, <code>ol</code>, <code>li</code></li>
  <li><strong>Tables</strong> — <code>table</code>, <code>thead</code>, <code>tbody</code>, <code>tr</code>, <code>th</code>, <code>td</code></li>
  <li><strong>Inline code</strong> — <code>code</code></li>
  <li><strong>Code blocks</strong> — <code>pre &gt; code</code> with a <code>language-*</code> class</li>
  <li><strong>Links</strong> — <code>a href="..."</code></li>
  <li><strong>Images</strong> — <code>img src="..."</code></li>
  <li><strong>Blockquotes</strong> — <code>blockquote</code></li>
  <li><strong>Horizontal rules</strong> — <code>hr</code></li>
</ul>

<h2>Example</h2>
<pre><code class="language-ts">// src/data/articles/my-category/my-article.ts
export const myArticle = {
  id: 'my-article',
  title: 'My Article',
  slug: 'my-article',
  category_id: 'my-category',
  is_published: true,
  content: \`
&lt;h2&gt;Introduction&lt;/h2&gt;
&lt;p&gt;This is a paragraph with &lt;strong&gt;bold&lt;/strong&gt; and &lt;em&gt;italic&lt;/em&gt; text.&lt;/p&gt;

&lt;h3&gt;A code example&lt;/h3&gt;
&lt;pre&gt;&lt;code class="language-ts"&gt;const x = 1 + 1;&lt;/code&gt;&lt;/pre&gt;
  \`.trim(),
};</code></pre>

<h2>Table of Contents</h2>
<p>The <code>TableOfContents</code> component automatically scans the rendered article for <code>h2</code> and <code>h3</code> tags and builds a sticky navigation list on the right side of the page. No extra configuration needed.</p>
  `.trim(),
};
