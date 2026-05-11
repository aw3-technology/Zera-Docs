import { bn, h2, p, cardGroup, divider, callout } from '../../blocks';

export const projectsOnZeraArticle = {
  id: 'projects-on-zera',
  title: 'Projects Building on ZERA',
  slug: 'projects-on-zera',
  excerpt: 'A growing ecosystem of dApps, tools, SDKs, and explorers being built on the ZERA Network.',
  category_id: 'developers',
  is_published: true,
  display_order: 8,
  sidebar_title: 'Projects on ZERA' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('A growing ecosystem of teams and independent builders is shipping real products on top of the ZERA Network — from explorers and indexers to consumer dApps, AI tools, and developer SDKs. The projects below represent the current frontier of what is being built on ZERA.'),

    divider(),

    h2('Applications & dApps'),

    cardGroup(2, [
      {
        icon: 'hugeicons:eye',
        title: 'Vision Hub',
        body: 'Visualization and discovery layer for the ZERA ecosystem.',
        href: 'https://visionhub.ch',
      },
      {
        icon: 'hugeicons:government',
        title: 'DemocracyOS',
        body: 'Governance and participatory democracy platform built on ZERA.',
        href: 'https://DemocracyOS.app',
      },
      {
        icon: 'hugeicons:book-open-01',
        title: 'Zerabook',
        body: 'AI-driven knowledge and reference platform for the ZERA ecosystem.',
        href: 'https://zerabook.ai',
      },
      {
        icon: 'hugeicons:rocket-01',
        title: 'ZERA.fun',
        body: 'Consumer-facing experiences and community-driven applications on ZERA.',
      },
      {
        icon: 'hugeicons:robot-01',
        title: 'Zerabot',
        body: 'Automated assistant and bot framework built around the ZERA Network.',
      },
      {
        icon: 'hugeicons:ai-chat-02',
        title: 'AINL — AI Native Language',
        body: 'AI-native language project designed for on-chain and agent-based workflows.',
        href: 'https://www.ainativelang.com/',
      },
    ]),

    divider(),

    h2('Explorers, Indexers & Data'),

    cardGroup(2, [
      {
        icon: 'hugeicons:search-01',
        title: 'Zerascan',
        body: 'Block explorer for the ZERA Network — transactions, accounts, contracts, and tokens.',
        href: 'https://zerascan.io',
      },
      {
        icon: 'hugeicons:database',
        title: 'VD Indexer',
        body: 'Validator and data indexer documentation powering Zerascan and ecosystem tools.',
        href: 'https://zerascan.io/docs',
      },
      {
        icon: 'hugeicons:database-02',
        title: 'OCDB — OnChainDB',
        body: 'On-chain database product for builders that need queryable, decentralized data.',
        href: 'https://onchaindb.com',
      },
    ]),

    divider(),

    h2('Developer SDKs & Libraries'),

    cardGroup(2, [
      {
        icon: 'hugeicons:github',
        title: 'ZERA.js',
        body: 'TypeScript/JavaScript SDK for the ZERA Network — wallets, transactions, smart contracts, DEX, bridge, and governance.',
        href: 'https://github.com/zera-os/zera.js',
      },
      {
        icon: 'hugeicons:github',
        title: 'ZERA Rust SC Crate',
        body: 'Rust crate (zera-sc) for writing smart contracts targeting the ZERA Network.',
        href: 'https://github.com/zera-os/zera-sc-rust',
      },
    ]),

    divider(),

    callout(
      'info',
      'Building on ZERA? This list is community-maintained and meant to grow. If your project is missing, reach out so it can be added.',
    ),
  ]),
};
