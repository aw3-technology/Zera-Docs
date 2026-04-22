import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const interoperabilityArticle = {
  id: 'interoperability',
  title: 'Interoperability',
  slug: 'interoperability',
  excerpt: 'ZERA is built to connect — governance-aligned bridges, origin identity preserved, future-proof design.',
  category_id: 'developers',
  is_published: true,
  display_order: 5,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('ZERA is built to connect. Interoperability is not an afterthought or a third-party plugin — it is a core design principle governed by the same mechanisms that control the rest of the protocol.'),

    h2('Cross-Chain Design'),
    bullet('Governance-aligned bridges — e.g. ZERA-Solana via community-controlled Guardians. Bridge operators are governed, not trusted blindly.'),
    bullet('Origin identity preserved — Bring assets across chains while retaining their provenance. Bridged tokens unlock ACE utility, staking, and governance rights on ZERA.'),
    bullet('Future-proof design — Bridge patterns are adaptable to other chains and L2s. The architecture is not locked to a single partner chain.'),

    h2('The Solana Bridge'),
    p('The ZERA-Solana bridge is the first governance-aligned cross-chain connection, unlocking access to one of the fastest ecosystems in crypto.'),
    bullet('Fast, low-cost cross-chain transactions between ZERA and Solana'),
    bullet('Expanded access to Solana\'s DeFi ecosystem — liquidity, DEXs, lending protocols'),
    bullet('Seamless interoperability without sacrificing governance guarantees'),

    callout('info', 'Developers are encouraged to integrate with the bridge to make their applications accessible to the broader cross-chain community. Bridge integration enables your dApp to serve users on both ZERA and Solana.'),

    h2('Security'),
    p('SolidProof completed a comprehensive audit of the ZERA Network and bridge infrastructure. Security is not optional — it is a prerequisite for governance-aligned interoperability.'),
    bullet('Bridge Guardians are community-controlled through governance votes'),
    bullet('Audited smart contracts on both sides of the bridge'),
    bullet('Transparent operation with on-chain verification of all cross-chain transfers'),

    h2('Interoperability & Governance'),
    p('Governance-aligned bridges allow tokens to retain their origin identity while gaining ACE utility on the ZERA network. This means bridged assets are not second-class citizens — they participate fully in staking, fee payment, and governance.'),

    expandable('How do Guardians work?', 'Guardians are a set of community-elected operators who validate cross-chain transfers. They are governed by the same proposal and voting system as the rest of the protocol. Misbehaving Guardians can be removed by governance vote.'),
    expandable('Which chains are supported?', 'The Solana bridge is live. The bridge architecture is designed to be extended to other chains and L2s as the community votes to add them.'),
  ]),
};
