export const commonErrorsArticle = {
  id: 'common-errors',
  title: 'Common Errors',
  slug: 'common-errors',
  excerpt: 'Solutions to the most frequently encountered errors.',
  category_id: 'troubleshooting',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-02-01T00:00:00Z',
  updated_at: '2024-02-01T00:00:00Z',
  content: `
<h2>Common Errors</h2>

<h3>401 Unauthorized</h3>
<p>Your API key is missing or invalid.</p>
<ul>
  <li>Check that you've set the <code>Authorization: Bearer YOUR_KEY</code> header</li>
  <li>Verify the key hasn't been revoked in your dashboard</li>
  <li>Make sure you're not accidentally including extra whitespace in the key</li>
</ul>

<h3>403 Forbidden</h3>
<p>Your key is valid but doesn't have permission for this action.</p>
<ul>
  <li>Check the key's permission scopes in Settings → API Keys</li>
  <li>Some endpoints require admin-level keys</li>
</ul>

<h3>404 Not Found</h3>
<p>The resource you're requesting doesn't exist.</p>
<ul>
  <li>Double-check the ID or slug in the URL</li>
  <li>The resource may have been deleted</li>
</ul>

<h3>429 Too Many Requests</h3>
<p>You've exceeded the rate limit (1000 req/min).</p>
<ul>
  <li>Check the <code>Retry-After</code> header and wait before retrying</li>
  <li>Implement exponential backoff in your client</li>
  <li>Cache responses where possible to reduce request volume</li>
</ul>

<h3>500 Internal Server Error</h3>
<p>Something went wrong on our end.</p>
<ul>
  <li>Check the <a href="https://status.your-app.com">status page</a> for ongoing incidents</li>
  <li>Retry the request after a short delay</li>
  <li>If the issue persists, contact support with the <code>request_id</code> from the response</li>
</ul>
  `.trim(),
};
