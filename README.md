# Help Center

A fully-featured, self-hosted help center built with [Astro](https://astro.build), React, and Tailwind CSS. Deploy to Cloudflare Pages in minutes.

## Features

- 📚 Articles & categories with nested folders
- 🔍 Full-text search modal
- 🤖 AI chat widget (optional)
- 📖 API reference viewer (OpenAPI / Scalar)
- 🎨 Custom branding via your API config
- ⚡ Edge-rendered on Cloudflare Pages
- 🌐 Custom domain support

## Quick Start

```bash
cp .env.example .env   # fill in your values
npm install
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `PUBLIC_API_URL` | Your backend API base URL |
| `PUBLIC_PROJECT_ID` | Your project UUID |
| `PUBLIC_SITE_TITLE` | Browser tab / meta title |
| `PUBLIC_BASE_PATH` | Sub-path prefix (optional) |

## API Contract

The help center expects these endpoints on your `PUBLIC_API_URL`:

| Endpoint | Description |
|---|---|
| `GET /public/projects/:id/help-articles` | Published articles |
| `GET /public/projects/:id/help-article-categories` | Categories |
| `GET /public/projects/:id/help-center-config` | Branding & config |
| `GET /public/projects/:id/faqs` | FAQs (optional) |
| `GET /public/projects/:id/openapi` | OpenAPI spec (optional) |
| `GET /public/help-center/resolve-domain?domain=` | Custom domain → project ID |

## Deploy to Cloudflare Pages

```bash
npm run deploy
```

Or connect your repo to Cloudflare Pages with:
- Build command: `npm run build`
- Output directory: `dist`

## License

MIT
