import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const aceIntegrationArticle = {
  id: 'ace-integration',
  title: 'ACE Integration',
  slug: 'ace-integration',
  excerpt: 'ACE utility enables native fee payment and validator staking for approved tokens on the ZERA Network.',
  category_id: 'tokenomics',
  is_published: true,
  display_order: 2,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('ACE (Approved Coin for the Ecosystem) is the mechanism that enables tokens on the ZERA Network to gain native utility — fee payment, validator staking, and governance capabilities.'),

    callout('info', 'ZRA is always ACE-enabled. Other tokens can become ACE-enabled through governance approval, unlocking the same core utility.'),

    h2('ACE Fee Distribution'),
    p('When an ACE-enabled token (other than ZRA) is used for network fees, the distribution differs from ZRA fees — there is no burn.'),

    cardGroup(2, [
      { icon: 'hugeicons:money-bag-02', title: '50% To Treasury', body: 'Half of every ACE token fee flows to the network treasury.' },
      { icon: 'hugeicons:blockchain-06', title: '50% To Validators', body: 'Half rewards the validators securing the network.' },
    ]),

    divider(),

    h2('What ACE Unlocks'),
    p('Any token that becomes ACE-enabled gains access to the same core protocol capabilities as ZRA. This means ACE-enabled tokens can:'),

    bullet('Pay network fees natively — no wrapping, swapping, or bridging required.'),
    bullet('Contribute to validator staking and network security.'),

    h2('ACE Utility — Core Benefit'),
    p('ACE transforms tokens from passive assets into active participants in the network.'),

    cardGroup(2, [
      { icon: 'hugeicons:coins-01', title: 'Native Fee Payment', body: 'Users pay fees in the token they already hold — lowering friction and improving UX.' },
      { icon: 'hugeicons:shield-01', title: 'Validator Staking', body: 'Staking with ACE tokens strengthens security and aligns validator incentives with the broader ecosystem.' },
    ]),

    divider(),

    h2('Governance-Ready by Design'),
    p('ACE-enabled tokens can deploy their own governance frameworks on ZERA. This includes supply rules, upgrade modules, and ecosystem-specific pools — every rule transparent and autonomously enforced by the network.'),

    h2('Regulatory Strength'),
    p('ACE utility provides concrete, non-speculative use cases for tokens on ZERA. Outcomes are enforced by code, reducing "managerial reliance." Tokens that demonstrate real utility — fees, staking, governance — improve their legal posture and regulatory standing.'),

    divider(),

    h2('Why Tokens Come to ZERA'),

    cardGroup(2, [
      { icon: 'hugeicons:rocket-01', title: 'ACE Utility', body: 'Native fee payment and validator staking from day one.' },
      { icon: 'hugeicons:code', title: 'Governance-Ready', body: 'Deploy configurable, autonomous governance without building from scratch.' },
      { icon: 'hugeicons:justice-scale-01', title: 'Regulatory Strength', body: 'Demonstrate non-speculative utility with code-enforced outcomes.' },
      { icon: 'hugeicons:link-03', title: 'Interoperability', body: 'Seamless integration with the ZERA ecosystem and cross-chain bridges.' },
    ]),

    h2('Ecosystem Alignment'),
    p('Fee activity from ACE-enabled tokens funds validators and the treasury. Governance and community incentives directly support ACE-enabled tokens — creating a flywheel where network usage strengthens the ecosystem for every participant.'),

    accordion('Can any token become ACE-enabled?', 'Tokens must be approved through governance to gain ACE status. The community votes on which tokens meet the criteria for inclusion.'),
    accordion('Does ACE status change the token itself?', 'No. ACE is a protocol-level designation. The token\'s smart contract and supply remain unchanged — ACE simply unlocks native fee payment and staking capabilities on ZERA.'),
  ]),
};
