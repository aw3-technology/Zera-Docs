import { bn, h2, p, bullet, callout, cardGroup, divider, accordion } from '../../blocks';

export const daoOverviewArticle = {
  id: 'dao-overview',
  title: 'DAOs',
  slug: 'dao-overview',
  excerpt: 'DAOs that actually self-execute — votes aren\'t advisory, they\'re binding.',
  category_id: 'dao',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('Votes aren\'t advisory; they\'re binding. Actions can be on-chain and manager-free powered via governance. ZERA DAOs close the gap between decision and execution.'),

    callout('info', 'On ZERA, DAO governance outcomes execute autonomously — no multisig signers, no core team intervention, no "who presses the button?" problem.'),

    h2('Why ZERA for DAOs'),
    p('Autonomous execution closes the "who presses the button?" gap. When a DAO proposal passes on ZERA, the resulting transaction executes automatically — no manual step, no trusted intermediary.'),

    divider(),

    h2('Structural Decentralization'),
    p('No foundations or keyholders; supermajorities protect critical changes. ZERA DAOs inherit the protocol\'s structural decentralization, making centralization structurally impossible.'),
    bullet('No admin keys or foundation overrides.'),
    bullet('Supermajority requirements on critical decisions.'),
    bullet('All actions are transparent and auditable on-chain.'),

    h2('Sustainability'),
    p('Treasury presents long-term protocol support powered by network activity. DAOs on ZERA can tap into treasury funding through governance proposals, creating a sustainable funding model.'),

    divider(),

    h2('Subpages'),
    cardGroup(2, [
      { icon: 'hugeicons:wrench-01', title: 'DAO Tooling', body: 'Lifecycle templates (staged, cycle, multi-stage, adaptive) for building your DAO.' },
      { icon: 'hugeicons:book-open-01', title: 'Case Patterns', body: 'Canonical patterns for community and institution-friendly DAOs.' },
    ]),

    accordion('How is a ZERA DAO different from a Snapshot DAO?', 'Snapshot DAOs produce advisory signals that require someone to implement. ZERA DAOs produce binding on-chain transactions that execute autonomously. The difference is execution — not just voting.'),
  ]),
};
