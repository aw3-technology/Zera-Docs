import { bn, h2, p, bullet, callout, cardGroup, divider } from '../../blocks';

export const institutionsOverviewArticle = {
  id: 'institutions-overview',
  title: 'Institutions',
  slug: 'institutions-overview',
  excerpt: 'Institution-grade control — without central managers. Configurable governance, multi-sig, and audit trails.',
  category_id: 'institutions',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('Configurable governance, class-based multi-sig, and immutable audit trails. ZERA provides the primitives institutions need — without requiring centralized administrators.'),

    h2('Configurable Governance'),
    p('Permissioned or permissionless, adaptive timing, role layers. Institutions can design governance that matches their organizational structure and compliance requirements.'),
    bullet('Permissioned governance for regulated environments.'),
    bullet('Adaptive timing for time-sensitive institutional decisions.'),
    bullet('Role-based participation layers.'),

    divider(),

    h2('Advanced Multi-Sig'),
    p('Class-based quorum (e.g., Ops, Compliance, Directors) with per-class thresholds. This goes beyond simple M-of-N multisig to support real institutional hierarchies.'),

    cardGroup(2, [
      { icon: 'hugeicons:user-group', title: 'Class-Based Quorum', body: 'Define signer classes (Ops, Compliance, Directors) with independent thresholds.' },
      { icon: 'hugeicons:shield-01', title: 'Per-Class Thresholds', body: 'Each class can have its own approval requirements for different action types.' },
      { icon: 'hugeicons:view', title: 'Auditability', body: 'Immutable records; optionally governance-aligned change control.' },
      { icon: 'hugeicons:wrench-01', title: 'Tooling', body: 'Protocol-native functions like expense-ratio create additional institutional use cases.' },
    ]),

    divider(),

    h2('Auditability'),
    p('Immutable records; optionally governance-aligned change control. Every action, approval, and execution is recorded on-chain, providing the transparent audit trail that institutional compliance demands.'),

    h2('Tooling'),
    p('Protocol-native functions like expense-ratio create additional institutional use cases. These features are built into the protocol, not bolted on as afterthoughts.'),

    callout('info', 'ZERA\'s institutional features are designed to satisfy real compliance requirements — not just mimic traditional finance workflows on-chain.'),
  ]),
};
