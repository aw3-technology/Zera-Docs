import { bn, h2, p, bullet, callout, divider, numbered, quote, accordion } from '../../blocks';

export const visionDemocracyArticle = {
  id: 'vision-democracy',
  title: 'ZERA Democracy',
  slug: 'vision-democracy',
  excerpt: 'Democracy without distortion — constituents guide every decision; the truth is what\'s verifiable on-chain.',
  category_id: 'vision',
  is_published: true,
  display_order: 2,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('A community concept: constituents guide every decision; the truth is what\'s verifiable on-chain.'),

    callout('info', 'This is a community concept — an exploration of what ZERA\'s governance architecture could make possible for civic governance.'),

    h2('The Problem'),
    p('Episodic, partisan, opaque, and media-distorted decision-making. Current democratic systems suffer from infrequent participation, party-line voting, and a lack of verifiable accountability.'),

    divider(),

    h2('The Vision'),
    p('Continuous participation; party-free mandates; immutable accountability. ZERA Democracy reimagines civic governance as a continuous, transparent process rather than an episodic event.'),

    h2('How It Works'),
    numbered('Identity layer — verified constituents with non-transferable vote tokens.'),
    numbered('Continuous referendums — ongoing participation, not just election-day votes.'),
    numbered('Treasury-tied budgets — public spending governed by constituent votes.'),
    numbered('Automatic recalls/audits on divergence — representatives are held accountable in real-time.'),

    divider(),

    h2('Example'),
    p('District vote: a representative is bound to cast the verified outcome. The ledger is the source of truth — not the representative\'s discretion.'),

    quote('In ZERA Democracy, the ledger is the source of truth — every vote is verifiable, every mandate is binding, and every representative is accountable.'),

    accordion('Is this a real product?', 'ZERA Democracy is a community concept — an exploration of what ZERA\'s governance primitives could enable for real-world civic governance. It is not a shipped product, but a vision for what\'s possible.'),
  ]),
};
