import { bn, h2, p, bullet, callout, cardGroup, divider, tabs } from '../../blocks';

export const feesOverviewArticle = {
  id: 'fees-overview',
  title: 'Fees',
  slug: 'fees-overview',
  excerpt: 'Where every unit of activity flows — user fees, validator rewards, treasury, and supply impacts.',
  category_id: 'technology',
  is_published: true,
  display_order: 4,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('Understand user fees, validator rewards, treasury contributions, and supply impacts. Fees are configurable by governance, with most transactions costing cents while enhancing usability by leveraging ACE-enabled tokens.'),

    h2('Typical Fee Costs'),
    p('Fees are configurable by governance, with most transactions costing cents. ACE-enabled tokens can be used to pay fees, enhancing usability for end-users across the ecosystem.'),

    divider(),

    h2('Network Fee Flows'),
    tabs([
      { label: 'ZRA Pays Fees', body: 'When ZRA is used to pay fees: 25% burn / 25% treasury / 50% validators. The burn component reduces circulating ZRA supply over time.' },
      { label: 'ACE Token Pays Fees', body: 'When an ACE token is used to pay fees: 50% treasury / 50% validators. No burn component — the treasury and validators share equally.' },
    ]),

    divider(),

    h2('Interface Fees (for App Builders)'),
    p('Interfaces can specify a fixed token amount or a fixed value (via on-chain oracles like ACE) to monetize permissionlessly and non-custodially. This enables developers to earn revenue directly from their applications.'),

    h2('Token Fees (for Projects)'),
    p('Projects can natively implement highly configurable fee flows on top of the base protocol, allowing for additional funding through network activity.'),

    h2('Runtime vs User Fees'),
    p('Users can pay in ACE tokens; smart contract runtime fees are generally denominated in ZRA. This separation allows flexibility while maintaining ZRA\'s anchor role.'),

    divider(),

    h2('Supply Side Effects'),
    p('Burns reduce circulating ZRA supply; supply-management can mint/burn as dictated by governance, and primary exchange flows may augment the treasury.'),

    callout('info', 'The fee structure is designed so that every transaction contributes to validators, the treasury, and (for ZRA fees) supply reduction — aligning incentives across the network.'),
  ]),
};
