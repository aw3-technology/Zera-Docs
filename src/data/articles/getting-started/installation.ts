export const installationArticle = {
  id: 'installation',
  title: 'Installation',
  slug: 'installation',
  excerpt: 'How to install and set up the project.',
  category_id: 'getting-started',
  is_published: true,
  display_order: 2,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-02T00:00:00Z',
  updated_at: '2024-01-02T00:00:00Z',
  content: `
<h2>Installation</h2>
<p>Install the package using your preferred package manager:</p>

<pre><code class="language-bash">npm install my-package
# or
yarn add my-package
# or
pnpm add my-package</code></pre>

<h2>Requirements</h2>
<ul>
  <li>Node.js 18+</li>
  <li>npm, yarn, or pnpm</li>
</ul>

<h2>Verify the installation</h2>
<pre><code class="language-bash">npx my-package --version</code></pre>
<p>You should see the current version printed to your terminal.</p>
  `.trim(),
};
