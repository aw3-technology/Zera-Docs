import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const supplyManagementArticle = {
  id: 'supply-management',
  title: 'Supply Management',
  slug: 'supply-management',
  excerpt: 'ZERA\'s coin supply is governed by community participation and fully enforced by the network itself.',
  category_id: 'tokenomics',
  is_published: true,
  display_order: 3,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('ZERA\'s coin supply isn\'t managed through mining or printing — it is governed by community participation and fully enforced by the network itself.'),

    callout('info', 'All supply changes — minting, burning, and treasury flows — occur only via governance-enforced mechanisms. No individual or team can alter the supply unilaterally.'),

    h2('Smart Coin Lifecycle'),
    p('The lifecycle of ZRA is designed around predictability and community sovereignty. Supply isn\'t an opaque process controlled behind the scenes — it\'s a transparent, governance-driven system.'),

    step(1, 'Governance Proposal', 'Any supply change begins with a proposal submitted through the governance process.'),
    step(2, 'Community Vote', 'Token holders evaluate and vote on the proposal according to the governance rules.'),
    step(3, 'On-Chain Execution', 'If the proposal passes, the supply change is executed autonomously on-chain — no manual intervention required.'),

    divider(),

    h2('Supply Management Mechanisms'),
    p('ZERA provides a flexible set of supply management tools, all governed by the community:'),

    h3('Parameterized Bucket Burns'),
    p('Governance can configure adaptive burn models to stabilize supply. These models adjust burn rates based on network activity and economic conditions, ensuring long-term sustainability.'),

    h3('Governance-Upgradeable Logic'),
    p('Supply mechanics are not fixed in stone. The community can propose and vote on refinements to supply management logic — evolving the system as the network matures.'),

    h3('Transparency'),
    p('All emissions, burns, and treasury flows are verifiable on-chain. Anyone can audit the current supply state and the history of every change.'),

    cardGroup(3, [
      { icon: 'hugeicons:fire', title: 'Adaptive Burns', body: 'Parameterized burn models respond to network conditions and governance decisions.' },
      { icon: 'hugeicons:code', title: 'Upgradeable Logic', body: 'Supply mechanics can be refined through governance proposals and community votes.' },
      { icon: 'hugeicons:search-01', title: 'Full Transparency', body: 'Every emission, burn, and treasury flow is verifiable on-chain.' },
    ]),

    divider(),

    quote('All changes occur only via governance-enforced mechanisms — the network itself is the final authority on supply.'),

    accordion('Can supply be changed without governance approval?', 'No. Every supply change — minting, burning, or parameter adjustment — must pass through governance. There is no backdoor or admin key.'),
    accordion('How do parameterized bucket burns work?', 'Bucket burns divide supply into configurable segments with independent burn parameters. Governance sets the rules, and the protocol enforces them automatically based on network activity.'),
    accordion('Can the supply management model be changed later?', 'Yes. The logic governing supply is upgradeable through governance proposals. As the network evolves, the community can refine supply mechanics to meet new requirements.'),
  ]),
};
