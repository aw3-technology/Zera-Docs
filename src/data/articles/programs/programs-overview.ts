import { bn, h2, p, callout, cardGroup, divider } from '../../blocks';

export const programsOverviewArticle = {
  id: 'programs-overview',
  title: 'Programs',
  slug: 'programs-overview',
  excerpt: 'Community programs owned by governance — not "tokens" in the traditional sense, but governance constructs.',
  category_id: 'programs',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('Not "tokens" in the traditional sense — these are governance constructs earmarked for focused goals. Each program is community-owned and operates through on-chain governance.'),

    callout('info', 'Programs are governance channels. Proposals pass, actions execute on-chain — no middlemen, no manual steps.'),

    divider(),

    cardGroup(2, [
      { icon: 'hugeicons:test-tube-01', title: 'IIT — Innovative Initiatives Token', body: 'A dedicated governance channel seeded with 30M+ ZERA to fund research, experiments, open-source tools, or any other governance-dictated items. Monthly two-stage cycle (shortlist then final execution).', href: '/article/iit-background' },
      { icon: 'hugeicons:megaphone-01', title: 'ZMT — ZERA Marketing Token', body: 'A governance channel to support education, awareness, events, and adoption. Proposals pass, then actions execute on-chain.', href: '/article/zmt-background' },
      { icon: 'hugeicons:code', title: 'ZIP — ZERA Improvement Protocol', body: 'Protocol upgrades via required-version transactions. ZIP handles protocol-level upgrades that are autonomously executed when passed.', href: '/article/protocol-upgrades' },
    ]),
  ]),
};
