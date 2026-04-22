import { bn, h2, h3, p, bullet, numbered, codeBlock, callout, tabs, accordion, step, cardGroup, divider, quote, card, expandable } from '../../blocks';

export const whatIsZeraArticle = {
  id: 'what-is-zera',
  title: 'What is ZERA?',
  slug: 'what-is-zera',
  excerpt: 'ZERA is a governance-first blockchain network redefining decentralization by giving the community direct and autonomous control over every aspect of the protocol.',
  category_id: 'getting-started',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('What is ZERA?'),
    p('ZERA is a governance-first blockchain where community votes execute automatically on-chain. There is no waiting, no middlemen, and no broken promises. When the community decides, the network acts.'),
    p('ZERA eliminates the gap between decision and action. Traditional blockchains treat governance as an afterthought — proposals pass but nothing happens without manual intervention. ZERA flips this model: every approved proposal triggers autonomous execution at the protocol level.'),

    callout('info', 'ZERA is built with a self-sufficient treasury, a WASM-powered smart contract engine, and fully on-chain governance — everything the community needs to run the network independently.'),

    divider(),

    h2('The Problem ZERA Solves'),
    p('In traditional blockchains, governance is a suggestion box. Someone proposes a change, the community votes, and then... maybe it happens. Maybe it does not. Execution depends on a core team, a multisig, or a foundation that may or may not follow through.'),

    cardGroup(2, [
      { icon: 'hugeicons:cancel-circle', title: 'Traditional Blockchains', body: 'Vote → Maybe it happens. Execution depends on centralized teams and manual intervention.' },
      { icon: 'hugeicons:checkmark-circle-02', title: 'ZERA', body: 'Vote → Automatic execution. Approved proposals execute on-chain with zero manual delays.' },
    ]),

    divider(),

    h2('What the Community Controls'),
    p('On ZERA, the community does not just advise — it governs. Every aspect of the protocol is subject to decentralized decision-making:'),

    bullet('Protocol upgrades and network parameters'),
    bullet('Treasury spending and fund allocation'),
    bullet('Marketing initiatives and community outreach'),
    bullet('Research and development priorities'),
    bullet('Token fees and staking rewards'),
    bullet('Bridge deployments and cross-chain integrations'),
    bullet('Every other aspect of the ZERA ecosystem'),

    callout('success', 'If it affects the network, the community controls it. No exceptions.'),

    divider(),

    h2('Types of Governance'),
    p('ZERA governance is organized into specialized proposal categories, each designed to address a different area of the protocol:'),

    cardGroup(3, [
      { icon: 'hugeicons:code', title: 'ZIP', body: 'ZERA Improvement Proposals — technical upgrades and protocol-level changes to the network.' },
      { icon: 'hugeicons:money-bag-02', title: 'Treasury', body: 'Proposals for spending treasury funds on ecosystem development, partnerships, and operations.' },
      { icon: 'hugeicons:bulb', title: 'IIT', body: 'Innovation and Incubation Treasury — funding for new projects with 30M+ ZRA dedicated to innovation.' },
      { icon: 'hugeicons:megaphone-01', title: 'ZMT', body: 'ZERA Marketing Treasury — community-driven marketing campaigns, events, and brand awareness.' },
      { icon: 'hugeicons:coins-01', title: 'ACE', body: 'Approved Community Extensions — token utility proposals for fees, staking, and ecosystem integrations.' },
    ]),

    divider(),

    h2('Security and Infrastructure'),
    p('ZERA takes security seriously. The protocol has been independently audited by SolidProof to ensure the integrity of on-chain governance and smart contract execution.'),

    bullet('Security audit completed by SolidProof'),
    bullet('Solana bridge for cross-chain asset transfers'),
    bullet('Network explorer available at zerascan.io'),

    callout('note', 'Explore the ZERA network in real time at zerascan.io — view transactions, governance proposals, and validator activity.'),

    divider(),

    h2('Key Network Metrics'),
    p('ZERA is built for performance without sacrificing decentralization:'),

    cardGroup(3, [
      { icon: 'hugeicons:rocket-01', title: '3,000+ TPS', body: 'High throughput transaction processing for seamless network activity.' },
      { icon: 'hugeicons:wallet-02', title: '800+ Wallets', body: 'A growing community of active participants and governance voters.' },
      { icon: 'hugeicons:dollar-circle', title: '$0.004 Fees', body: 'Ultra-low transaction fees make participation accessible to everyone.' },
    ]),

    quote('ZERA is not just another blockchain. It is a system where the people who use the network are the people who run the network.'),
  ]),
};
