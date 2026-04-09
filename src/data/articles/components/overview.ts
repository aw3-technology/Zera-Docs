export const componentsOverviewArticle = {
  id: 'components-overview',
  title: 'Template Components Overview',
  slug: 'components-overview',
  excerpt: 'A full overview of all available content blocks in the template.',
  category_id: 'components',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-10T00:00:00Z',
  updated_at: '2024-01-10T00:00:00Z',
  content: `
<h2>Template Components</h2>
<p>This help center template is built from a set of composable content blocks. Each block is a React component that renders a specific type of content — from hero sections to code examples to FAQs.</p>

<h2>Available blocks</h2>
<table>
  <thead>
    <tr><th>Block</th><th>Purpose</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Hero</strong></td><td>Full-width intro section with title, subtitle, and CTA</td></tr>
    <tr><td><strong>Text</strong></td><td>Rich text content with headings, lists, and inline code</td></tr>
    <tr><td><strong>Image</strong></td><td>Responsive image with optional caption</td></tr>
    <tr><td><strong>Code Block</strong></td><td>Syntax-highlighted code with copy button</td></tr>
    <tr><td><strong>CTA</strong></td><td>Call-to-action banner with button</td></tr>
    <tr><td><strong>FAQ</strong></td><td>Accordion-style frequently asked questions</td></tr>
    <tr><td><strong>Table of Contents</strong></td><td>Auto-generated from article headings</td></tr>
    <tr><td><strong>Article Feedback</strong></td><td>Thumbs up/down feedback widget</td></tr>
  </tbody>
</table>

<h2>How blocks are rendered</h2>
<p>Article content is stored as HTML strings in <code>src/data/articles/</code>. The <code>ArticleContentViewer</code> component parses and renders this HTML, applying syntax highlighting to code blocks and generating the table of contents from headings.</p>

<h2>Adding a new block</h2>
<ol>
  <li>Write your HTML content in the article's <code>content</code> field</li>
  <li>Use standard HTML tags — headings, lists, tables, pre/code blocks</li>
  <li>The viewer handles styling automatically via Tailwind prose classes</li>
</ol>
  `.trim(),
};
