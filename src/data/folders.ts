/**
 * Folders group categories into top-level sections shown in the secondary nav bar.
 */

export const folders = [
  {
    id: 'docs',
    name: 'Docs',
    slug: 'docs',
    icon: 'hugeicons:book-open-01',
    description: 'Learn about the ZERA Network — governance, treasury, and tokenomics.',
    is_default: true,
    display_order: 1,
  },
  {
    id: 'developers',
    name: 'Developers',
    slug: 'developers',
    icon: 'hugeicons:code',
    description: 'Build dApps, launch tokens, and integrate with ZERA.',
    is_default: false,
    display_order: 2,
  },
  {
    id: 'blog',
    name: 'Blog',
    slug: 'blog',
    icon: 'hugeicons:quill-write-01',
    description: 'Background papers, guides, and deep dives.',
    is_default: false,
    display_order: 3,
  },
];
