import { bn, h2, p, bullet, callout, cardGroup, divider, quote, accordion } from '../../blocks';

export const decentralizationOverviewArticle = {
  id: 'decentralization-overview',
  title: 'Decentralization & Autonomy',
  slug: 'decentralization-overview',
  excerpt: 'Decentralization, implemented — not implied. No privileged administrators, no foundation control.',
  category_id: 'decentralization',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('No privileged administrators, no foundation control. ZERA removes trust dependencies by enforcing governance outcomes autonomously with code.'),

    callout('info', 'Decentralization on ZERA is structural — achieved through governance + autonomous execution + transparent contracts, not branding.'),

    h2('By Design, Not Branding'),
    p('Decentralization is achieved structurally: governance + autonomous execution + transparent contracts. Every meaningful decision flows through on-chain governance, and every outcome is enforced by the protocol itself.'),

    bullet('No admin keys or foundation overrides exist in the protocol.'),
    bullet('Supermajority safeguards protect against hasty or malicious changes.'),
    bullet('All governance outcomes are publicly verifiable and immutable.'),

    divider(),

    h2('Autonomous Execution'),
    p('Proposals, once passed, enforce their own transactions. The execution is immutable, manager-free, and time-predictable. There is no gap between a community decision and its implementation.'),

    cardGroup(2, [
      { icon: 'hugeicons:shield-01', title: 'No Key Holders', body: 'No foundation or admin keys exist — the protocol enforces outcomes directly.' },
      { icon: 'hugeicons:code', title: 'Code Is the Authority', body: 'Passed proposals execute as on-chain transactions without human intermediaries.' },
      { icon: 'hugeicons:clock-01', title: 'Time-Predictable', body: 'Execution timing is determined by the protocol, not by individual discretion.' },
      { icon: 'hugeicons:view', title: 'Fully Transparent', body: 'Every proposal, vote, and execution is visible and auditable on-chain.' },
    ]),

    divider(),

    quote('In ZERA, decentralization is not a promise — it is an architectural property enforced by the protocol.'),

    accordion('How does ZERA prevent centralization creep?', 'Supermajority requirements on critical changes, no admin keys, and autonomous execution ensure that no single party can accumulate control. The protocol design makes centralization structurally impossible, not just unlikely.'),
    accordion('What about emergency situations?', 'Even urgent changes must flow through governance. The lifecycle models support adaptive timing for time-sensitive decisions, but always require community consensus — there are no backdoors.'),
  ]),
};
