import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const feeStructureArticle = {
  id: 'fee-structure',
  title: 'Fee Structure',
  slug: 'fee-structure',
  excerpt: 'Flexible and predictable fees — pay transaction fees using any approved coin, starting from $0.004.',
  category_id: 'tokenomics',
  is_published: true,
  display_order: 4,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('ZERA offers flexible and predictable fees. Pay transaction fees using any approved coin — not just ZRA — with network fees starting from $0.004.'),

    callout('info', 'ZERA supports multi-asset fee payments. Users can pay fees in ZRA or any ACE-enabled token, making the network accessible to a wider range of participants.'),

    h2('Fee Distribution Models'),
    p('How fees are distributed depends on which coin is used for payment. ZRA fees include a burn component; ACE token fees do not.'),

    tabs([
      {
        label: 'ZRA Fees',
        body: '25% Burned — permanently removed from circulation.\n25% Treasury — funds ecosystem growth and development.\n50% Validators — rewards the nodes securing the network.',
      },
      {
        label: 'ACE Token Fees',
        body: '0% Burned — no burn component for ACE tokens.\n50% Treasury — half flows to the network treasury.\n50% Validators — half rewards validators securing the network.',
      },
    ]),

    divider(),

    h2('ZRA Fee Distribution'),
    p('When ZRA is used for fees, a portion is permanently burned — reducing circulating supply over time.'),

    cardGroup(3, [
      { icon: 'hugeicons:fire', title: '25% Burned', body: 'A quarter of every ZRA fee is permanently removed from circulation.' },
      { icon: 'hugeicons:money-bag-02', title: '25% Treasury', body: 'A quarter flows to the network treasury for ecosystem funding.' },
      { icon: 'hugeicons:distributed', title: '50% Validators', body: 'Half of every fee rewards the validators securing the network.' },
    ]),

    h2('ACE Token Fee Distribution'),
    p('When an ACE-enabled token is used for fees, there is no burn. The full fee is split between the treasury and validators.'),

    cardGroup(2, [
      { icon: 'hugeicons:money-bag-02', title: '50% Treasury', body: 'Half of every ACE token fee flows to the network treasury.' },
      { icon: 'hugeicons:distributed', title: '50% Validators', body: 'Half rewards the validators securing the network.' },
    ]),

    divider(),

    h2('Multi-Asset Fee Payments'),
    p('Users can pay fees using any approved currency on the ZERA Network. This removes the requirement to hold a specific token just to transact — boosting accessibility and reducing friction for new users and projects alike.'),

    bullet('No forced token swaps — pay in the coin you already hold.'),
    bullet('ACE-enabled tokens are accepted natively for fee payment.'),
    bullet('Network fees start from $0.004 — predictable and affordable.'),

    callout('tips', 'Multi-asset fees mean projects building on ZERA can offer their users a seamless experience — no need to acquire ZRA just to interact with the network.'),

    accordion('What is the minimum network fee?', 'Network fees start from $0.004, making ZERA one of the most affordable networks for transactions.'),
    accordion('Do all tokens pay the same fee rate?', 'Fee rates are consistent across the network. The difference is in distribution: ZRA fees include a 25% burn, while ACE token fees distribute the full amount to the treasury and validators.'),
    accordion('Can fee parameters change?', 'Yes. Fee distribution ratios and minimum fee amounts are governance-controlled parameters that can be updated through community proposals and votes.'),
  ]),
};
