export const apiIntroductionArticle = {
  id: 'api-introduction',
  title: 'API Introduction',
  slug: 'api-introduction',
  excerpt: 'Overview of the API, base URL, versioning, and response format.',
  category_id: 'api-reference',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-30T00:00:00Z',
  updated_at: '2024-01-30T00:00:00Z',
  content: `
<h2>API Introduction</h2>
<p>The REST API lets you programmatically access and manage your data. All requests use HTTPS and return JSON.</p>

<h2>Base URL</h2>
<pre><code class="language-bash">https://api.your-app.com/v1</code></pre>

<h2>Versioning</h2>
<p>The API version is included in the URL path (<code>/v1</code>). Breaking changes will be released under a new version.</p>

<h2>Response format</h2>
<p>All responses follow this envelope:</p>
<pre><code class="language-json">{
  "data": { ... },
  "error": null,
  "meta": {
    "request_id": "req_abc123"
  }
}</code></pre>

<p>On error:</p>
<pre><code class="language-json">{
  "data": null,
  "error": {
    "code": "not_found",
    "message": "The requested resource was not found."
  }
}</code></pre>

<h2>Rate limits</h2>
<p>The API is rate-limited to <strong>1000 requests per minute</strong> per API key. Exceeding this returns a <code>429 Too Many Requests</code> response with a <code>Retry-After</code> header.</p>
  `.trim(),
};
