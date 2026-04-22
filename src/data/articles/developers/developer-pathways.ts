import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const developerPathwaysArticle = {
  id: 'developer-pathways',
  title: 'Developer Pathways',
  slug: 'developer-pathways',
  excerpt: 'Launch tokens, build dApps, create interfaces — multiple entry points for developers.',
  category_id: 'developers',
  is_published: true,
  display_order: 4,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('There is no single way to build on ZERA. Whether you want to launch a token, deploy a dApp, or create an interface that earns revenue, the protocol provides a clear path forward.'),

    h2('Developer Pathways'),

    h3('1. Launch a Token'),
    p('Deploy your own token on the ZERA network. Optionally apply for ACE (Approved Community Exchange) status to unlock native fee payment, validator staking, and deeper integration with the protocol.'),
    bullet('Standard token deployment with configurable parameters'),
    bullet('ACE application through governance — community votes on inclusion'),
    bullet('Tokens with ACE status gain native utility across the network'),

    h3('2. Build dApps'),
    p('Write smart contracts with governance hooks, permission layers, and transparent upgrade paths. ZERA dApps are not isolated programs — they are governance-aware participants in the network.'),
    bullet('WASM contracts in Rust, Go, C, or AssemblyScript'),
    bullet('Direct governance integration for community-controlled upgrades'),
    bullet('Optional permission layers for institutional requirements'),

    h3('3. Create Interfaces'),
    p('Build front-ends, wallets, explorers, or tooling and earn sustainably through interface fees. Monetize without custody or gatekeepers — the protocol handles fee distribution.'),
    bullet('Interface fees are configurable and enforced at the protocol level'),
    bullet('No custody requirements — you never hold user funds'),
    bullet('Multiple interfaces can compete on UX while the protocol handles settlement'),

    divider(),

    h2('Funding & Programs'),

    cardGroup(2, [
      { title: 'Treasury Grants', body: 'Fund open-source tools, audits, and ecosystem expansion. Apply through governance — no gatekeepers, no pitch decks.' },
      { title: 'IIT (Innovation Initiatives Token)', body: '30M+ ZERA allocated for experiments, research, and hackathons. Designed to fund the bleeding edge.' },
      { title: 'ZMT (ZERA Marketing Token)', body: 'Support for adoption, education, and awareness campaigns. Community-directed marketing spend.' },
      { title: 'ZIP (ZERA Improvement Protocol)', body: 'Protocol-level upgrades proposed and executed by governance. The formal mechanism for evolving ZERA itself.' },
    ]),

    callout('tips', 'All funding programs are governed by the community. There is no foundation or committee deciding who gets funded — proposals are voted on and executed autonomously.'),
  ]),
};
