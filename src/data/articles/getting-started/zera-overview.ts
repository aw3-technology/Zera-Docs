import { bn, h2, h3, p, bullet, numbered, codeBlock, callout, tabs, accordion, step, cardGroup, divider, quote, card, expandable } from '../../blocks';

export const zeraOverviewArticle = {
  id: 'zera-overview',
  title: 'ZERA Overview',
  slug: 'zera-overview',
  excerpt: 'Transparent performance tracking, collective governance, automated execution, and real-time network insights.',
  category_id: 'getting-started',
  is_published: true,
  display_order: 2,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('Key Features'),
    p('ZERA provides a comprehensive governance-first infrastructure designed for transparency, automation, and community empowerment.'),

    cardGroup(3, [
      { icon: 'hugeicons:chart-line-data-01', title: 'Transparent Performance Tracking', body: 'Monitor governance efficiency, treasury health, and community participation in real time.' },
      { icon: 'hugeicons:user-group', title: 'Collective Governance', body: 'Protects community assets through enabling seamless adjustment to market and network conditions.' },
      { icon: 'hugeicons:rocket-01', title: 'Automated Proposal Execution', body: 'Once approved, proposals execute on-chain with zero manual delays.' },
      { icon: 'hugeicons:analytics-01', title: 'Real-Time Network Insights', body: 'Live analytics on proposals, votes, and treasury activity across the entire network.' },
      { icon: 'hugeicons:money-bag-02', title: 'Treasury Support', body: 'Treasury funds support the ZERA protocol and governance decisions, funded by network activity.' },
      { icon: 'hugeicons:coins-swap', title: 'Multi-Asset Fee Payments', body: 'Pay fees using any approved currency, not just the native token.' },
    ]),

    divider(),

    h2('Discover ZERA'),
    p('ZERA is accessible across multiple platforms and ecosystems. Explore the network and its assets:'),

    cardGroup(3, [
      { icon: 'hugeicons:blockchain-01', title: 'Native ZERA', body: 'The native network coin powering governance, staking, and transactions on the ZERA blockchain.', href: 'https://zerascan.io' },
      { icon: 'hugeicons:link-circle', title: 'Wrapped ZERA (SOL)', body: 'The wrapped version of ZRA on the Solana network for cross-chain accessibility.', href: 'https://solscan.io' },
      { icon: 'hugeicons:exchange-01', title: 'Raydium Liquidity Pool', body: 'Quick start to enter the ZERA ecosystem through the Raydium DEX on Solana.', href: 'https://dextools.io' },
    ]),

    divider(),

    h2('Build on ZERA with Confidence'),
    p('ZERA provides a predictable, community-governed environment for developers and builders to create with confidence.'),

    cardGroup(2, [
      { icon: 'hugeicons:coins-01', title: 'Smart Coin Lifecycle', body: 'Token creation and management governed by community participation — transparent from mint to utility.' },
      { icon: 'hugeicons:dollar-circle', title: 'Flexible and Predictable Fees', body: 'Pay transaction fees with any approved coin. No surprises, no single-token lock-in.' },
      { icon: 'hugeicons:safe', title: 'Treasury Support', body: 'Funded through network activity, the treasury backs protocol development and governance decisions.' },
      { icon: 'hugeicons:vote', title: 'Decentralized Governance', body: 'On-chain, transparent proposals with verifiable voting and autonomous execution. No gatekeepers.' },
    ]),

    callout('info', 'ZERA governance is fully on-chain — every proposal, vote, and execution is transparent and verifiable by anyone.'),
  ]),
};
