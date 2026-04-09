export const codeBlockArticle = {
  id: 'code-block',
  title: 'Code Block',
  slug: 'code-block',
  excerpt: 'Syntax-highlighted code snippets with a one-click copy button.',
  category_id: 'components',
  is_published: true,
  display_order: 4,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-13T00:00:00Z',
  updated_at: '2024-01-13T00:00:00Z',
  content: `
<h2>Code Block</h2>
<p>Any <code>pre &gt; code</code> element in your article content is automatically upgraded to a syntax-highlighted code block with a copy button. Powered by <code>react-syntax-highlighter</code>.</p>

<h2>Usage</h2>
<p>Add a <code>language-*</code> class to the <code>code</code> tag to enable syntax highlighting:</p>

<pre><code class="language-html">&lt;pre&gt;&lt;code class="language-ts"&gt;
const greeting = 'hello world';
console.log(greeting);
&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Supported languages</h2>
<p>Any language supported by <a href="https://github.com/react-syntax-highlighter/react-syntax-highlighter">react-syntax-highlighter</a> works. Common ones:</p>
<ul>
  <li><code>language-ts</code> / <code>language-tsx</code> — TypeScript</li>
  <li><code>language-js</code> / <code>language-jsx</code> — JavaScript</li>
  <li><code>language-bash</code> / <code>language-sh</code> — Shell</li>
  <li><code>language-json</code> — JSON</li>
  <li><code>language-html</code> — HTML</li>
  <li><code>language-css</code> — CSS</li>
  <li><code>language-python</code> — Python</li>
  <li><code>language-sql</code> — SQL</li>
</ul>

<h2>Copy button</h2>
<p>The copy button is rendered by the <code>CodeBlock</code> UI component in <code>src/components/ui/code-block.tsx</code>. It copies the raw code text to the clipboard and shows a brief "Copied!" confirmation.</p>

<h2>Theming</h2>
<p>Code block colors follow the active theme (light/dark). The theme is toggled via the header button and persisted in <code>localStorage</code>.</p>
  `.trim(),
};
