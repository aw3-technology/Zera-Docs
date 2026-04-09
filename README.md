# Help Center Template

A fully-featured, self-hosted help center built with [Astro](https://astro.build), React, and Tailwind CSS. Runs entirely on local data — no external API required. Deploy to Cloudflare Pages in minutes.

## Features

- 📚 Articles & categories with nested structure
- 🔍 Full-text search modal (Cmd+K / Ctrl+K)
- 🎨 Custom branding — colors, fonts, logo, dark mode
- 💡 Composable content blocks (hero, text, code, FAQ, CTA, sidebar)
- 📖 API reference viewer (OpenAPI / Scalar) — optional
- ⚡ Edge-rendered on Cloudflare Pages
- 🌐 Custom domain support
- 🗂️ Local MDX-style data — no database, no API calls

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to see the help center.

---

## Project Structure

```
src/
  data/                     ← all your content lives here
    index.ts                ← central registry (import everything here)
    config.ts               ← branding & portal settings
    faqs.ts                 ← home page FAQ accordion
    categories/             ← one file per category
      getting-started.ts
      components.ts
      guides.ts
      api-reference.ts
      troubleshooting.ts
    articles/               ← one file per article, grouped by category
      getting-started/
        welcome.ts
        installation.ts
        quick-start.ts
      components/
        overview.ts
        hero-block.ts
        text-block.ts
        code-block.ts
        cta-block.ts
        faq-block.ts
        sidebar-block.ts
        search-block.ts
      guides/
        configuration.ts
        theming.ts
        adding-content.ts
      api-reference/
        introduction.ts
        authentication.ts
      troubleshooting/
        common-errors.ts
        performance.ts
  components/               ← React UI components
  pages/                    ← Astro pages (index, article/[slug], category/[slug])
  lib/
    localData.ts            ← data layer (replaces API calls)
  styles/
```

---

## Adding Content

### Add a category

1. Create `src/data/categories/my-category.ts`:

```ts
export const myCategoryCategory = {
  id: 'my-category',
  name: 'My Category',
  description: 'What this category covers.',
  icon: 'hugeicons:star',
  display_order: 6,
  folder_id: null,
  parent_category_id: null,
};
```

2. Register it in `src/data/index.ts`:

```ts
import { myCategoryCategory } from './categories/my-category';

export const categories = [
  // ...existing
  myCategoryCategory,
];
```

### Add an article

1. Create `src/data/articles/my-category/my-article.ts`:

```ts
export const myArticle = {
  id: 'my-article',
  title: 'My Article',
  slug: 'my-article',         // URL: /article/my-article
  excerpt: 'Short description shown in search results.',
  category_id: 'my-category', // must match a category id
  is_published: true,
  display_order: 1,
  sidebar_title: null,
  icon: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: `
<h2>My heading</h2>
<p>Content goes here. Standard HTML — headings, lists, tables, code blocks.</p>

<pre><code class="language-ts">const x = 1 + 1;</code></pre>
  `.trim(),
};
```

2. Register it in `src/data/index.ts`:

```ts
import { myArticle } from './articles/my-category/my-article';

export const articles = [
  // ...existing
  myArticle,
];
```

### Add a FAQ

Edit `src/data/faqs.ts` and add an entry to the array:

```ts
{
  id: 'faq-4',
  question: 'How do I do X?',
  answer: 'You do X by doing Y.',
  is_published: true,
},
```

---

## Configuration

All branding and portal settings are in `src/data/config.ts`:

| Option | Type | Description |
|---|---|---|
| `portal_name` | string | Name shown in the header and browser tab |
| `primary_color` | string | Brand color (hex) for buttons and accents |
| `welcome_title` | string | Hero section heading |
| `welcome_subtitle` | string | Hero section subheading |
| `theme_mode` | `'light' \| 'dark' \| 'auto'` | Default color scheme |
| `logo_url` | string \| null | Path or URL to your logo |
| `show_search` | boolean | Show/hide the search bar |
| `sidebar_style` | string | Sidebar visual style (see below) |
| `heading_font` | string \| null | Google Font name for headings |
| `body_font` | string \| null | Google Font name for body text |
| `header_links` | array | Navigation links in the header |
| `show_primary_button` | boolean | Show a CTA button in the header |
| `primary_button_label` | string | CTA button text |
| `primary_button_url` | string | CTA button destination URL |
| `meta_title` | string | HTML `<title>` content |
| `meta_description` | string | HTML meta description |
| `favicon_url` | string \| null | Path to favicon |

### Sidebar styles

Set `sidebar_style` to one of: `default`, `minimal`, `compact`, `cards`, `modern`, `floating`, `bordered`, `gradient`, `accordion`

---

## Content Blocks

Articles are written as HTML strings in the `content` field. The `ArticleContentViewer` component renders them with:

- Tailwind `prose` typography
- Syntax-highlighted code blocks with copy button (`language-*` class on `<code>`)
- Auto-generated Table of Contents from `h2`/`h3` headings
- Responsive images and tables

See the **Template Components** category in the running help center for full documentation on each block.

---

## Deploy to Cloudflare Pages

```bash
npm run deploy
```

Or connect your repo to Cloudflare Pages:
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18+

No environment variables are required for local data mode.

---

## Tech Stack

- [Astro](https://astro.build) — SSR framework
- [React](https://react.dev) — interactive components
- [Tailwind CSS](https://tailwindcss.com) — styling
- [Radix UI](https://www.radix-ui.com) — accessible primitives
- [Cloudflare Pages](https://pages.cloudflare.com) — hosting & edge rendering

---

## License

MIT
