import { bn, h2, p, bullet, callout, cardGroup, divider, tabs, accordion } from '../../blocks';

export const aceOverviewArticle = {
  id: 'ace-overview',
  title: 'ACE — Authorized Currency Equivalent',
  slug: 'ace-overview',
  excerpt: 'Turn tokens into native citizens of the ZERA Network — pay fees, contribute to staking, all governed by code.',
  category_id: 'ace',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('ACE lets approved tokens pay fees and contribute to validator staking — objective utility that is enforced by code and governed by the community.'),

    callout('info', 'Authorized Currency Equivalent (ACE) is a governance-enabled system that defines which tokens may participate in validator staking and native fee payment on ZERA — and how that participation is maintained. This is not a "wrapper" or a marketing label; it\'s protocol-level utility ratified and enforced on-chain via governance.'),

    h2('Key Outcomes at a Glance'),
    cardGroup(2, [
      { icon: 'hugeicons:coins-01', title: 'Native Fee Utility', body: 'End-users can pay transaction fees with ACE-enabled tokens.' },
      { icon: 'hugeicons:shield-01', title: 'Security Role', body: 'ACE-enabled tokens can contribute directly to validator staking and network security.' },
      { icon: 'hugeicons:refresh', title: 'Objective, Repeatable Use', body: 'These functions happen on every tx — utility beyond speculation.' },
      { icon: 'hugeicons:coins-swap', title: 'ZRA Is Always ACE', body: 'ZERA\'s native coin is permanently ACE-enabled and must hold a minimum share of total stake.' },
    ]),

    divider(),

    h2('Fees & Splits'),
    tabs([
      { label: 'ZRA Fees', body: 'ZRA fees: 25% burn / 25% treasury / 50% validators. The burn reduces circulating supply over time.' },
      { label: 'ACE Token Fees', body: 'ACE-token fees: 50% treasury / 50% validators. No burn component — treasury and validators share equally.' },
    ]),

    divider(),

    h2('How Tokens Gain ACE Status'),
    p('Tokens gain ACE status through governance. The community votes to enable specific tokens for fee payment and staking participation. Once ACE-enabled, the token\'s utility functions are enforced at the protocol level.'),
    bullet('A governance proposal is submitted to enable ACE for a token.'),
    bullet('The community votes on whether the token should receive ACE status.'),
    bullet('If passed, the protocol automatically enforces ACE functionality for that token.'),

    accordion('Is ACE just a marketing label?', 'No. ACE is protocol-level utility — fee payment and staking participation are enforced on-chain via governance. There is no wrapper, no middleman, and no off-chain process.'),
    accordion('Can ACE status be revoked?', 'Yes, through governance. Just as ACE status is granted via a governance proposal, it can be removed the same way if the community decides.'),
  ]),
};
