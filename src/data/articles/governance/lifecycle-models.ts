import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const lifecycleModelsArticle = {
  id: 'lifecycle-models',
  title: 'Governance Lifecycle Models',
  slug: 'lifecycle-models',
  excerpt: 'ZERA supports multiple governance lifecycle models — Staggered, Cycle, Multi-Staged, and Adaptive.',
  category_id: 'governance',
  is_published: true,
  display_order: 2,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('Not every governance decision follows the same rhythm. ZERA supports multiple lifecycle models so that each contract or governance context can choose the timing and structure that fits its needs.'),

    callout('info', 'The lifecycle model is configurable per contract or governance context. A single ZERA deployment can use different models for different decision types.'),

    h2('Lifecycle models'),

    cardGroup(2, [
      { icon: 'hugeicons:clock-01', title: 'Staggered', body: 'Each proposal gets its own fixed voting window. Proposals can be submitted at any time and run independently of each other — simple and permissionless.' },
      { icon: 'hugeicons:refresh', title: 'Cycle', body: 'All proposals are batched into synchronized rounds. Optionally cap the number of proposals per cycle to keep voters focused and reduce fatigue.' },
      { icon: 'hugeicons:filter', title: 'Multi-Staged', body: 'Proposals pass through multiple rounds that narrow the field down to finalists. Useful for competitive grants, elections, or complex decisions requiring deliberation.' },
      { icon: 'hugeicons:settings-02', title: 'Adaptive', body: 'Voting windows and thresholds adjust dynamically based on participation, urgency, or other on-chain signals. Ideal for permissioned or time-sensitive environments.' },
    ]),

    divider(),

    h2('Staggered model'),
    p('The Staggered model is the simplest lifecycle. Each proposal is submitted independently and given a fixed voting window — for example, 7 days. There is no coordination between proposals; they run in parallel.'),
    bullet('Proposals can be submitted at any time.'),
    bullet('Each proposal has its own start and end time.'),
    bullet('Best for open, permissionless governance where proposals are infrequent or independent.'),

    h2('Cycle model'),
    p('The Cycle model batches proposals into synchronized rounds. All proposals submitted during a submission window are voted on together during the voting window.'),
    bullet('Proposals are collected during a submission phase, then voted on together.'),
    bullet('Optional caps limit the number of proposals per cycle to reduce voter fatigue.'),
    bullet('Best for DAOs and treasuries that want structured, predictable governance cadences.'),

    h2('Multi-Staged model'),
    p('The Multi-Staged model runs proposals through multiple rounds. In each round, lower-ranked proposals are eliminated until only finalists remain. This is useful when a governance decision requires deliberation and narrowing.'),
    numbered('Proposals are submitted during an open submission phase.'),
    numbered('An initial vote narrows the field to a shortlist.'),
    numbered('A final vote selects the winning proposal from the shortlist.'),
    bullet('Best for competitive grants, council elections, or budget allocation among many options.'),

    h2('Adaptive model'),
    p('The Adaptive model dynamically adjusts timing and thresholds based on on-chain conditions. For example, if participation is high, the voting window might close early; if a proposal is contentious, additional deliberation time could be added automatically.'),
    bullet('Voting windows can expand or contract based on participation levels.'),
    bullet('Quorum thresholds can shift based on the type or urgency of the proposal.'),
    bullet('Best for permissioned environments, emergency upgrades, or governance contexts that need flexibility.'),

    callout('tips', 'You can combine lifecycle models within the same network. For example, use Staggered for routine parameter changes and Multi-Staged for annual budget allocation.'),

    divider(),

    h2('Choosing a model'),
    tabs([
      {
        label: 'Simple governance',
        body: 'Start with the Staggered model. It requires no coordination and works well for small communities or low-frequency decisions.',
      },
      {
        label: 'Structured governance',
        body: 'Use the Cycle model when you want predictable voting periods and want to batch proposals together for focused deliberation.',
      },
      {
        label: 'Competitive selection',
        body: 'Use the Multi-Staged model when you need to narrow a large set of options down to a winner — grants, elections, or feature prioritization.',
      },
      {
        label: 'Dynamic environments',
        body: 'Use the Adaptive model when conditions change frequently and rigid timelines would slow the network down or cause governance fatigue.',
      },
    ]),

    accordion('Can I change the lifecycle model after deployment?', 'Yes. The lifecycle model is a governance parameter itself, which means it can be changed through a governance proposal. This allows communities to evolve their processes as they grow.'),
    accordion('Can different proposal types use different models?', 'Absolutely. Each governance context — defined per contract or per proposal category — can specify its own lifecycle model independently.'),
  ]),
};
