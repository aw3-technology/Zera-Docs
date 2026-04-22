import { bn, h2, p, bullet, callout, cardGroup, divider, quote, accordion } from '../../blocks';

export const regulatoryResilienceOverviewArticle = {
  id: 'regulatory-resilience-overview',
  title: 'Regulatory Resilience',
  slug: 'regulatory-resilience-overview',
  excerpt: 'How architecture reduces regulatory risk through autonomous execution and decentralized control.',
  category_id: 'regulatory-resilience',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('ZERA\'s governance-first, autonomously executed model helps reduce "managerial reliance" and clarifies token utility. This page presents community perspectives, not legal advice.'),

    callout('warning', 'This page presents community perspectives and opinions, not legal advice.'),

    h2('Why Execution Matters in Law'),
    p('When outcomes are enforced by code (not a core team), reliance on identifiable managers diminishes — addressing critical tests (e.g., "efforts of others" under Howey). Autonomous execution shifts the analysis away from centralized control.'),

    divider(),

    h2('Utility over Speculation'),
    p('Tokens can play concrete roles — governance, fee payment (ACE), native staking / Network Security (ACE) — which clarifies non-speculative utility. Each of these functions occurs on every transaction or staking epoch, providing objective, repeatable use.'),

    cardGroup(2, [
      { icon: 'hugeicons:government', title: 'Governance Participation', body: 'Token holders vote on proposals that execute autonomously — active, functional utility.' },
      { icon: 'hugeicons:coins-01', title: 'Fee Payment (ACE)', body: 'ACE-enabled tokens can pay transaction fees natively on the network.' },
      { icon: 'hugeicons:shield-01', title: 'Network Security', body: 'ACE tokens contribute to validator staking and network security directly.' },
      { icon: 'hugeicons:view', title: 'Transparent Auditability', body: 'Every proposal, vote, and execution leaves a verifiable on-chain record.' },
    ]),

    divider(),

    h2('Decentralized Control'),
    p('Decision-making and execution are community-directed and on-chain, strengthening "sufficient decentralization" narratives used by regulators and courts.'),

    h2('Transparent Auditability'),
    p('Every proposal, vote, and execution leaves a verifiable record — good for audits, public trust, and institutional adoption. The immutable on-chain record provides the transparency that regulators and institutions increasingly expect.'),

    accordion('Does autonomous execution guarantee regulatory compliance?', 'No. Autonomous execution strengthens the architectural argument for decentralization and reduces reliance on identifiable managers, but regulatory outcomes depend on jurisdiction-specific analysis. This content is educational, not legal advice.'),
  ]),
};
