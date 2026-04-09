export const quickStartArticle = {
  id: 'quick-start',
  title: 'Quick Start',
  slug: 'quick-start',
  excerpt: 'Get up and running in under 5 minutes.',
  category_id: 'getting-started',
  is_published: true,
  display_order: 3,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-03T00:00:00Z',
  updated_at: '2024-01-03T00:00:00Z',
  content: `
<h2>Quick Start</h2>
<p>Follow these steps to get started in under 5 minutes.</p>

<h3>Step 1: Install</h3>
<pre><code class="language-bash">npm install my-package</code></pre>

<h3>Step 2: Configure</h3>
<pre><code class="language-ts">import { createClient } from 'my-package';

const client = createClient({
  apiKey: 'your-api-key',
});</code></pre>

<h3>Step 3: Make your first call</h3>
<pre><code class="language-ts">const result = await client.doSomething();
console.log(result);</code></pre>

<h2>What's next?</h2>
<p>Now that you're set up, explore the <a href="/category/guides">Guides</a> for deeper walkthroughs, or check the <a href="/category/api-reference">API Reference</a> for all available methods.</p>
  `.trim(),
};
