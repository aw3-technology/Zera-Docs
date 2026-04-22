import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  build: {
    assets: '_helio',
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  devToolbar: {
    enabled: false
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'tap'
  },
  vite: {
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        '@blocknote/core',
        '@blocknote/react',
        '@blocknote/shadcn',
        '@blocknote/xl-multi-column',
      ],
    },
    ssr: {
      noExternal: ['@iconify/react'],
      external: ['react-syntax-highlighter']
    },
    resolve: {
      alias: {
        '@': '/src',
      },
      dedupe: ['react', 'react-dom'],
    },
    logLevel: 'error',
    server: {
      hmr: {
        overlay: false
      }
    }
  }
});
