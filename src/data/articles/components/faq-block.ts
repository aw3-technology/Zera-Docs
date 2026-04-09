export const faqBlockArticle = {
  id: 'faq-block',
  title: 'FAQ Block',
  slug: 'faq-block',
  excerpt: 'Accordion-style FAQ section rendered on the help center home page.',
  category_id: 'components',
  is_published: true,
  display_order: 6,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-15T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
  content: `
<h2>FAQ Block</h2>
<p>The FAQ block renders an accordion on the help center home page. Each item expands to reveal the answer when clicked. Built with Radix UI's <code>Accordion</code> primitive.</p>

<h2>Adding FAQs</h2>
<p>Edit <code>src/data/faqs.ts</code> to add, edit, or remove FAQ entries:</p>

<pre><code class="language-ts">// src/data/faqs.ts
export const faqs = [
  {
    id: 'faq-1',
    question: 'How do I reset my password?',
    answer: 'Click "Forgot password" on the login page and follow the email instructions.',
    is_published: true,
  },
  {
    id: 'faq-2',
    question: 'Where can I find my API key?',
    answer: 'Go to Settings → API Keys in your dashboard.',
    is_published: true,
  },
];</code></pre>

<h2>Hiding FAQs</h2>
<p>Set <code>is_published: false</code> on any entry to hide it without deleting it.</p>

<h2>Component location</h2>
<p>The FAQ accordion is rendered in <code>src/components/HelpCenterHome.tsx</code> using the <code>Accordion</code> component from <code>src/components/ui/accordion.tsx</code>.</p>
  `.trim(),
};
