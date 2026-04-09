export const apiAuthenticationArticle = {
  id: 'api-authentication',
  title: 'Authentication',
  slug: 'api-authentication',
  excerpt: 'How to authenticate API requests using API keys and Bearer tokens.',
  category_id: 'api-reference',
  is_published: true,
  display_order: 2,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-31T00:00:00Z',
  updated_at: '2024-01-31T00:00:00Z',
  content: `
<h2>Authentication</h2>
<p>All API requests must be authenticated using an API key passed as a Bearer token in the <code>Authorization</code> header.</p>

<h2>Getting your API key</h2>
<ol>
  <li>Log in to your dashboard</li>
  <li>Go to <strong>Settings → API Keys</strong></li>
  <li>Click <strong>Create new key</strong></li>
  <li>Copy the key — it won't be shown again</li>
</ol>

<h2>Making authenticated requests</h2>
<pre><code class="language-bash">curl https://api.your-app.com/v1/users \\
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre>

<p>Or in TypeScript:</p>
<pre><code class="language-ts">const response = await fetch('https://api.your-app.com/v1/users', {
  headers: {
    Authorization: \`Bearer \${process.env.API_KEY}\`,
  },
});</code></pre>

<h2>Security best practices</h2>
<ul>
  <li>Never expose API keys in client-side code or public repositories</li>
  <li>Use environment variables: <code>process.env.API_KEY</code></li>
  <li>Rotate keys regularly and revoke unused ones</li>
  <li>Use separate keys for development and production</li>
</ul>

<h2>Error responses</h2>
<table>
  <thead>
    <tr><th>Status</th><th>Meaning</th></tr>
  </thead>
  <tbody>
    <tr><td><code>401</code></td><td>Missing or invalid API key</td></tr>
    <tr><td><code>403</code></td><td>Valid key but insufficient permissions</td></tr>
  </tbody>
</table>
  `.trim(),
};
