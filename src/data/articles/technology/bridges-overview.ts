import { bn, h2, p, bullet, callout, cardGroup, divider, accordion } from '../../blocks';

export const bridgesOverviewArticle = {
  id: 'bridges-overview',
  title: 'Bridges',
  slug: 'bridges-overview',
  excerpt: 'Governance-aligned interoperability — Guardians enable non-custodial cross-chain transfers.',
  category_id: 'technology',
  is_published: true,
  display_order: 5,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('A community design for the ZERA-Solana bridge introduces Guardians — a purpose-specific, governance-controlled validator subset.'),

    h2('Why Bridge to ZERA'),
    p('Keep origin identity while unlocking ZERA governance, ACE (fees + staking), and ecosystem reach. Bridging expands what tokens can do without abandoning their home chain.'),
    bullet('Access ZERA governance for your token community.'),
    bullet('Unlock ACE-enabled fee payment and staking.'),
    bullet('Expand your user base across ecosystems.'),

    divider(),

    h2('Guardians'),
    p('Created and directed by governance; non-custodial validation of cross-chain transfers; upgradeable over time. Guardians are a purpose-specific subset of validators that handle bridge operations.'),

    cardGroup(2, [
      { icon: 'hugeicons:court-house', title: 'Governance-Created', body: 'Guardian sets are established and managed through governance proposals.' },
      { icon: 'hugeicons:shield-01', title: 'Non-Custodial', body: 'Guardians validate transfers without ever holding custody of bridged assets.' },
      { icon: 'hugeicons:refresh', title: 'Upgradeable', body: 'Guardian parameters and membership can evolve through governance over time.' },
      { icon: 'hugeicons:view', title: 'Transparent', body: 'All bridge operations are visible and auditable on-chain.' },
    ]),

    divider(),

    h2('Future-Proofing'),
    p('The Guardian pattern is designed for other chains and potential L2s. As ZERA\'s interoperability expands, the same governance-aligned model can be applied to new bridge connections.'),

    accordion('How are Guardians different from typical bridge validators?', 'Guardians are governance-controlled — they are created, configured, and can be replaced through on-chain governance proposals. They operate non-custodially and serve a purpose-specific role, unlike generic bridge validators that often rely on multisig arrangements.'),
  ]),
};
