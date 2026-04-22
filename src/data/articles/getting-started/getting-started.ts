import { bn, h2, h3, p, bullet, numbered, codeBlock, callout, tabs, accordion, step, cardGroup, divider, quote, card, expandable } from '../../blocks';

export const gettingStartedArticle = {
  id: 'getting-started-guide',
  title: 'Getting Started with ZERA',
  slug: 'getting-started-guide',
  excerpt: 'How to participate in the ZERA ecosystem — get ZRA, vote on proposals, build on the network.',
  category_id: 'getting-started',
  is_published: true,
  display_order: 3,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('Participate in ZERA Governance'),
    p('ZERA puts the community in control. Getting started as a participant takes just a few steps:'),

    step(1, 'Get ZRA', 'Acquire ZRA tokens through the Raydium liquidity pool on Solana or directly on the ZERA network. ZRA is your key to governance participation.'),
    step(2, 'Vote on Active Proposals', 'Browse active governance proposals on zerascan.io and cast your vote. Every vote counts toward shaping the network.'),
    step(3, 'Submit Your Own Ideas', 'Have an idea to improve the network? Submit a governance proposal — ZIP, Treasury, IIT, ZMT, or ACE — and let the community decide.'),
    step(4, 'Watch Your Decisions Change the Network', 'Once a proposal passes, execution is automatic. No waiting, no middlemen. Your vote directly transforms the protocol.'),

    callout('success', 'Governance on ZERA is not symbolic. When you vote, the result executes autonomously on-chain.'),

    divider(),

    h2('Build on ZERA'),
    p('Developers and creators can build on ZERA with a clear path from idea to deployment:'),

    step(1, 'Create Tokens or Smart Contracts', 'Build tokens or develop smart contracts in your preferred language using the WASM-powered contract engine.'),
    step(2, 'Apply for Treasury Funding (Optional)', 'Submit a governance proposal to request treasury funding for your project through the IIT or Treasury proposal types.'),
    step(3, 'Integrate as an ACE (Optional)', 'Apply to register your token as an Approved Community Extension for added utility across the ZERA ecosystem.'),
    step(4, 'Monetize Through Interface Fees (Optional)', 'Earn revenue through permissionless interface fees — no gatekeepers, no approval process required.'),

    callout('info', 'ZERA supports WASM smart contracts, so you can write in Rust, AssemblyScript, or any language that compiles to WebAssembly.'),

    divider(),

    h2('Resources'),
    p('Everything you need to explore, participate, and build on ZERA:'),

    cardGroup(3, [
      { icon: 'hugeicons:search-01', title: 'ZERA Explorer', body: 'Browse transactions, proposals, and network activity in real time.', href: 'https://zerascan.io' },
      { icon: 'hugeicons:user-group', title: 'Community', body: 'Join the ZERA community to discuss proposals, share ideas, and collaborate with other members.' },
      { icon: 'hugeicons:ai-chat-02', title: 'Zera GPT', body: 'Ask questions and get instant answers about the ZERA protocol, governance, and ecosystem.' },
    ]),

    divider(),

    h2('Join the Network'),
    p('ZERA already has 800+ wallets and growing. Create yours with Vision Hub and become part of a community that governs its own future.'),

    callout('note', '800+ wallets are already participating in ZERA governance. Create yours with Vision Hub and start shaping the network today.'),
  ]),
};
