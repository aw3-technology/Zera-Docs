import { bn, h2, p, bullet, callout, cardGroup, divider, quote } from '../../blocks';

export const forTokensOverviewArticle = {
  id: 'for-tokens-overview',
  title: 'Why Tokens Come to ZERA',
  slug: 'for-tokens-overview',
  excerpt: 'Turn your token into a functional powerhouse — fees, staking, governance, and a regulatory-first narrative.',
  category_id: 'for-tokens',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('ZERA can add objective utility — fees, staking, and governance — plus a governance-first narrative.'),

    h2('ACE Utility (The Big One)'),
    p('ACE is the single most compelling reason for tokens to come to ZERA. Once ACE-enabled, a token gains protocol-level utility that occurs on every transaction and staking epoch.'),
    bullet('Pay fees natively — lower friction for end-users.'),
    bullet('Contribute to validator staking — become part of network security.'),

    callout('tips', 'These are objective, non-speculative roles that occur with every transaction or staking epoch. This is functional utility, not a narrative.'),

    divider(),

    h2('Governance-Ready by Design'),
    p('Tokens can deploy networks of governance contracts: supply rules, upgrades for their own ecosystem, specialized pools, and more — fully transparent and collectively executed.'),

    h2('Regulatory Strength'),
    p('Governance can allow autonomously enforced outcomes which can reduce reliance on a core team; visible utility beyond speculation clarifies posture across common frameworks.'),

    h2('Interoperability'),
    p('Bridge designs (e.g., ZERA-Solana) let tokens keep origin-chain identity and gain ZERA\'s governance/ACE utilities — expanding user base and use cases.'),

    divider(),

    h2('Ecosystem Alignment'),
    p('Fee activity contributes to validators and the treasury; the community has a direct, structural incentive to support tokens with ACE roles.'),

    quote('On ZERA, bringing your token doesn\'t mean abandoning your chain — it means unlocking utility that other networks simply don\'t offer.'),
  ]),
};
