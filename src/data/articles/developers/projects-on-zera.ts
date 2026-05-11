import { bn, h2, p, cardGroup, divider, callout } from '../../blocks';

export const projectsOnZeraArticle = {
  id: 'projects-on-zera',
  title: 'Projects Building on ZERA',
  slug: 'projects-on-zera',
  excerpt: 'A growing ecosystem of wallets, explorers, indexers, AI tools, and SDKs being built on the ZERA Network.',
  category_id: 'developers',
  is_published: true,
  display_order: 8,
  sidebar_title: 'Projects on ZERA' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('A growing ecosystem of teams and independent builders is shipping real products on top of the ZERA Network — wallets and explorers, indexers and on-chain databases, governance platforms, AI-agent products, and the SDKs that power them. The projects below represent the current frontier of what is being built on ZERA.'),

    divider(),

    h2('Applications & dApps'),

    cardGroup(2, [
      {
        icon: 'hugeicons:wallet-01',
        title: 'Vision Hub',
        body: 'ZERA\'s non-custodial multi-chain ecosystem wallet. Swap tokens, bridge between ZERA and Solana, vote in governance, and interact with dApps while retaining self-custody of keys.',
        href: 'https://visionhub.ch',
      },
      {
        icon: 'hugeicons:government',
        title: 'DemocracyOS',
        body: 'Governance platform powered by ZERA — participatory decision-making and on-chain voting infrastructure.',
        href: 'https://DemocracyOS.app',
      },
      {
        icon: 'hugeicons:robot-01',
        title: 'Zerabook',
        body: 'The social network for AI agents. Autonomous agents showcase capabilities, complete paid tasks, and build reputation through a marketplace and social feed running on the ZERA Network.',
        href: 'https://zerabook.ai',
      },
      {
        icon: 'hugeicons:rocket-01',
        title: 'ZERA.fun',
        body: 'Consumer-facing experiences and community-driven applications on the ZERA Network.',
      },
      {
        icon: 'hugeicons:robot-02',
        title: 'Zerabot',
        body: 'Automation and bot framework built around the ZERA Network.',
      },
      {
        icon: 'hugeicons:ai-chat-02',
        title: 'AINL — AI Native Language',
        body: 'Python-like language and compiler that lets developers write deterministic AI agents as portable intermediate representation, deployable across cloud, edge, and embedded systems. Moves orchestration into compiled code instead of prompt engineering.',
        href: 'https://www.ainativelang.com/',
      },
    ]),

    divider(),

    h2('Explorers, Indexers & Data'),

    cardGroup(2, [
      {
        icon: 'hugeicons:search-01',
        title: 'Zerascan',
        body: 'Block explorer for the ZERA Network. View blocks, transactions, governance proposals, and token information on the ZERA mainnet.',
        href: 'https://zerascan.io',
      },
      {
        icon: 'hugeicons:database',
        title: 'VD Indexer',
        body: 'GET-only indexer API that exposes structured ZERA blockchain data — transactions, blocks, tokens, wallets, governance, DEX, and staking — via JSON endpoints for developers.',
        href: 'https://zerascan.io/docs',
      },
      {
        icon: 'hugeicons:database-02',
        title: 'OCDB — OnChainDB',
        body: 'Structured query, write, deploy, and monitoring platform over ZERA. Read and write on-chain state, deploy smart contracts, and track activity with visual and SQL query tools — no manual RPC or block scanning required.',
        href: 'https://onchaindb.com',
      },
    ]),

    divider(),

    h2('Developer SDKs & Libraries'),

    cardGroup(2, [
      {
        icon: 'hugeicons:github',
        title: 'ZERA.js',
        body: 'TypeScript SDK for the ZERA Network. HD wallets, transactions, smart contract deployment, DEX operations, cross-chain bridging with Solana, and network queries — with full TypeScript declarations and support for Node.js, React Native, and modern browsers.',
        href: 'https://github.com/zera-os/zera.js',
      },
      {
        icon: 'hugeicons:github',
        title: 'ZERA Rust SC SDK',
        body: 'Rust smart-contract SDK (zera-sc) for the ZERA Network. Write contracts in Rust, compile to WebAssembly, and deploy to ZERA validators. Wraps the native host ABI with safe, idiomatic Rust for transfers, state, queries, calls, crypto, and wallet derivation.',
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
