import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const zraOverviewArticle = {
  id: 'zra-overview',
  title: 'ZRA Token',
  slug: 'zra-overview',
  excerpt: 'ZRA anchors security, fees, and governance. Governance-controlled supply, ACE integration, dual fee paths.',
  category_id: 'tokenomics',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('ZRA is the native coin of the ZERA Network. It anchors security, fees, and governance — serving as the foundation for every economic interaction on the protocol.'),

    callout('info', 'ZRA is always ACE-enabled. It holds a permanent role as the governance coin, universal fee token, and validator staking anchor.'),

    h2('Supply Overview'),
    p('ZERA\'s coin supply is designed for transparency, auditability, and community control.'),

    cardGroup(2, [
      { icon: 'hugeicons:shield-01', title: 'Governance-Controlled', body: 'All mint/burn and supply changes occur only via governance-enforced mechanisms.' },
      { icon: 'hugeicons:search-01', title: 'Supply Parameters', body: 'Initial, circulating, and maximum supply are transparent and auditable at all times.' },
      { icon: 'hugeicons:refresh', title: 'Dynamic Adjustments', body: 'Supply management may evolve over time through governance proposals and votes.' },
      { icon: 'hugeicons:balance', title: 'Community Sovereignty', body: 'No central authority controls supply — only the network\'s governance process.' },
    ]),

    divider(),

    h2('ZRA for Network Fees'),
    p('When ZRA is used to pay network fees, the fee is split across three destinations. Network activity continuously reduces circulating supply while supporting the treasury and validators.'),

    cardGroup(3, [
      { icon: 'hugeicons:fire', title: '25% Burned', body: 'A quarter of every ZRA fee is permanently removed from circulation.' },
      { icon: 'hugeicons:money-bag-02', title: '25% To Treasury', body: 'A quarter flows to the network treasury for ecosystem funding.' },
      { icon: 'hugeicons:distributed', title: '50% To Validators', body: 'Half of every fee rewards the validators securing the network.' },
    ]),

    divider(),

    h2('ZRA is Always ACE-Enabled'),
    p('ZRA holds a permanent, non-revocable role as an ACE-enabled coin. This means it can always be used for:'),

    bullet('Governance — ZRA is the final arbiter for network-level decisions and protocol upgrades.'),
    bullet('Network fees — ZRA is universally accepted for transaction fee payment.'),
    bullet('Validator staking — ZRA serves as the anchor asset for staking and network security.'),

    h2('Objective Utility'),
    p('ACE ensures that ZRA has real, functional use beyond speculation. Because it can be used for network fees and network stake, ZRA demonstrates genuine utility — strengthening both its economic role and its regulatory posture.'),

    quote('ZRA isn\'t just a token — it\'s the economic backbone of the ZERA Network.'),

    accordion('What does "governance-controlled supply" mean?', 'It means no individual or team can mint or burn ZRA unilaterally. Every supply change must pass through the network\'s governance process — proposed, voted on, and executed on-chain.'),
    accordion('Can ZRA\'s ACE status be revoked?', 'No. ZRA is permanently ACE-enabled. Its role as the governance coin, fee token, and staking anchor is built into the protocol itself.'),
  ]),
};
