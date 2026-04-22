import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const fundingSourcesArticle = {
  id: 'funding-sources',
  title: 'Funding Sources',
  slug: 'funding-sources',
  excerpt: 'How the ZERA Treasury is funded through fee splits and network activity.',
  category_id: 'treasury',
  is_published: true,
  display_order: 2,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('Where Treasury Funds Come From'),
    p('The ZERA Treasury is funded continuously through protocol-level fee splits. Every transaction on the network contributes to the Treasury — no special fundraising events, no token sales, no external dependencies. The network pays for its own future.'),

    callout('info', 'No begging for funding. Treasury resources are added with every network transaction — automatically and permanently.'),

    divider(),

    h2('Fee Split Structure'),
    p('When users pay transaction fees on the ZERA network, those fees are split according to which token is used for payment. The split ratios are governance-controlled and can be updated through the standard proposal process.'),

    tabs([
      {
        label: 'ZRA Fee Splits',
        body: 'When ZRA is used to pay transaction fees, the split is: 25% Burn (permanently removed from supply) • 25% Treasury (funds community initiatives) • 50% Validators (rewards network operators). The burn component creates deflationary pressure while the Treasury and validator splits ensure the network is both funded and secured.',
      },
      {
        label: 'ACE Token Fee Splits',
        body: 'When an ACE token is used to pay transaction fees, the split is: 0% Burn (no supply reduction) • 50% Treasury (larger Treasury allocation) • 50% Validators (rewards network operators). ACE token fees direct a larger share to the Treasury since there is no burn component, maximizing the funding available for community proposals.',
      },
    ]),

    h3('ZRA Fee Breakdown'),
    cardGroup(3, [
      {
        icon: 'hugeicons:fire',
        title: '25% Burn',
        body: 'Permanently removed from circulating supply. Creates deflationary pressure and increases scarcity over time.',
      },
      {
        icon: 'hugeicons:safe',
        title: '25% Treasury',
        body: 'Flows directly into the governance-controlled Treasury to fund community-approved proposals and initiatives.',
      },
      {
        icon: 'hugeicons:computer',
        title: '50% Validators',
        body: 'Distributed to network validators as rewards for securing the chain and processing transactions.',
      },
    ]),

    h3('ACE Token Fee Breakdown'),
    cardGroup(3, [
      {
        icon: 'hugeicons:cancel-circle',
        title: '0% Burn',
        body: 'No tokens are burned when ACE tokens pay fees. The full fee amount is split between Treasury and validators.',
      },
      {
        icon: 'hugeicons:safe',
        title: '50% Treasury',
        body: 'Half of every ACE token fee goes directly to the Treasury — double the rate compared to ZRA fee payments.',
      },
      {
        icon: 'hugeicons:computer',
        title: '50% Validators',
        body: 'The remaining half rewards validators for their role in securing and operating the network.',
      },
    ]),

    divider(),

    h2('Supply Management Flows'),
    p('Beyond transaction fees, the Treasury also receives funds through supply management mechanics. These flows are governance-controlled, updatable through proposals, and already implemented in the protocol.'),

    bullet('Supply management parameters are set and adjusted through governance votes'),
    bullet('All supply flows are on-chain and verifiable — no off-chain discretion'),
    bullet('The mechanics are already live and producing Treasury inflows'),

    callout('tips', 'The combination of fee splits and supply management creates multiple independent funding streams. Even if transaction volume fluctuates, the Treasury continues to accumulate resources.'),

    divider(),

    h2('Self-Sustaining by Design'),
    p('The ZERA Treasury model is designed to be permanently self-sustaining. There is no reliance on external fundraising, venture capital, or foundation reserves. The network funds itself through its own activity.'),

    quote('The network pays for its own future. Every transaction, every fee, every block — all contribute to a Treasury that funds the ecosystem without asking anyone for permission.'),

    accordion('Can the fee split ratios be changed?', 'Yes. The fee split percentages are governance-controlled parameters. Any change must go through a formal proposal and community vote. This ensures the community always has the final say on how fees are distributed.'),
    accordion('What happens if network activity drops?', 'The Treasury is designed to accumulate over time. During periods of lower activity, inflows slow but the existing Treasury balance remains available for funding proposals. The multiple funding streams — fees plus supply management — provide resilience against any single source declining.'),
    accordion('Are these mechanics already live?', 'Yes. The fee split and supply management flows are implemented and active in the protocol. They are not roadmap items — they are working infrastructure generating Treasury inflows today.'),
  ]),
};
