# Helio — Help Center & Documentation Template

Helio is a modern help center and documentation template built with [Astro](https://astro.build) for startups, SaaS products, and developers who want a fast, clean, and professional support site.

It is designed to help you publish documentation, guides, FAQs, and support content with excellent performance and SEO from day one.

If you need a proper help center like Stripe, Vercel, or Notion, Helio gives you the foundation without the complexity.

---

## Features

- 📚 Articles & categories with nested structure
- 🔍 Full-text search modal (Cmd+K / Ctrl+K)
- 🎨 Custom branding — colors, fonts, logo, dark mode
- 💡 Composable content blocks (hero, text, code, FAQ, CTA, sidebar)
- 🗺️ Auto-generated sitemap.xml and robots.txt
- 🔎 Full SEO — Open Graph, Twitter cards, JSON-LD structured data, canonical URLs
- ⚡ Edge-rendered on Cloudflare Pages
- 🌐 Custom domain support
- 🗂️ Local data — no database, no API, no external dependencies

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

---

## Project Structure

```
src/
  data/                     ← all your content lives here
    index.ts                ← central registry (register new content here)
    config.ts               ← branding, fonts, SEO, portal settings
    faqs.ts                 ← home page FAQ accordion
    categories/             ← one file per category
      getting-started.ts
      components.ts
      guides.ts
      api-reference.ts
      troubleshooting.ts
    articles/               ← one file per article, grouped by category folder
      getting-started/
      components/
      guides/
      api-reference/
      troubleshooting/
  components/               ← React UI components
  layouts/
    BaseLayout.astro        ← full SEO head, fonts, structured data
  pages/
    index.astro             ← home page
    article/[slug].astro    ← article page
    category/[slug].astro   ← category page
    sitemap.xml.ts          ← auto-generated sitemap
    robots.txt.ts           ← auto-generated robots.txt
  lib/
    localData.ts            ← data layer (no API calls)
  styles/
    globals.css             ← Tailwind + Onest + Geist Mono fonts
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
  slug: 'my-article',          // URL: /article/my-article
  excerpt: 'Short description shown in search and SEO.',
  category_id: 'my-category',  // must match a category id
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

2. Register it in `src/data/index.ts`.

### Add a FAQ

Edit `src/data/faqs.ts` and add an entry to the array.

---

## Configuration

All settings are in `src/data/config.ts`:

| Option | Type | Description |
|---|---|---|
| `portal_name` | string | Name shown in the header and browser tab |
| `primary_color` | string | Brand color (hex) for buttons and accents |
| `welcome_title` | string | Hero section heading |
| `welcome_subtitle` | string | Hero section subheading |
| `theme_mode` | `'light' \| 'dark' \| 'auto'` | Default color scheme |
| `logo_url` | string \| null | Path or URL to your logo |
| `heading_font` | string \| null | Font name for headings (default: Onest) |
| `body_font` | string \| null | Font name for body text (default: Onest) |
| `show_search` | boolean | Show/hide the search bar |
| `sidebar_style` | string | Sidebar visual style |
| `header_links` | array | Navigation links in the header |
| `show_primary_button` | boolean | Show a CTA button in the header |
| `primary_button_label` | string | CTA button text |
| `primary_button_url` | string | CTA button destination URL |
| `meta_title` | string | HTML `<title>` content |
| `meta_description` | string | HTML meta description |
| `og_image_url` | string \| null | Open Graph image URL |
| `favicon_url` | string \| null | Path to favicon |

### Sidebar styles

`default` · `minimal` · `compact` · `cards` · `modern` · `floating` · `bordered` · `gradient` · `accordion`

---

## Fonts

Helio ships with two fonts:

- **Onest** — clean, modern sans-serif for headings and body text. Loaded from Google Fonts.
- **Geist Mono** — monospace font for code blocks. Bundled locally in `public/Geist_Mono/`.

To change fonts, update `heading_font` and `body_font` in `src/data/config.ts`. Any Google Font name works.

---

## SEO

Every page gets:

- `<title>`, `<meta name="description">`, canonical URL
- Open Graph tags (og:title, og:description, og:image, og:type)
- Twitter card tags
- JSON-LD structured data (WebSite, Article, BreadcrumbList, Organization)
- `/sitemap.xml` — auto-generated from all published articles and categories
- `/robots.txt` — allows all crawlers, blocks common scrapers

---

## Deploy to Cloudflare Pages

```bash
npm run deploy
```

Or connect your repo to Cloudflare Pages:
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18+

No environment variables required.

---

## Tech Stack

- [Astro](https://astro.build) — SSR framework
- [React](https://react.dev) — interactive components
- [Tailwind CSS](https://tailwindcss.com) — styling
- [Radix UI](https://www.radix-ui.com) — accessible primitives
- [Onest](https://fonts.google.com/specimen/Onest) — heading & body font
- [Geist Mono](https://vercel.com/font) — monospace / code font
- [Cloudflare Pages](https://pages.cloudflare.com) — hosting & edge rendering

---

## License

MIT
