import { bn, h2, h3, p, bullet, callout, tabs, divider, quote, cardGroup, accordion } from '../../blocks';

export const bitcoinVsZeraArticle = {
  id: 'bitcoin-vs-zera',
  title: 'Treasury-Supported vs. Non-Treasury-Supported Blockchains',
  slug: 'bitcoin-vs-zera',
  excerpt: 'How ZERA\'s treasury-supported model compares to Bitcoin\'s minimalist approach — and why it matters for long-term sustainability.',
  category_id: 'treasury',
  is_published: true,
  display_order: 4,
  sidebar_title: 'Bitcoin vs. ZERA' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('Shared Foundation: Fixed Supply'),
    p('Both Bitcoin and ZERA are built on the principle of a maximum supply, which is the cornerstone of their ethos.'),

    bullet('Bitcoin: Hard cap of 21 million BTC. Its absolute scarcity underpins its role as a store of value.'),
    bullet('ZERA: Hard cap of ~906 million ZRA, with supply controlled transparently by on-chain governance. Nobody can inflate it.'),

    p('This shared attribute places them both in the category of supply and demand, similar to how gold has historically been valued.'),

    divider(),

    h2('Bitcoin — Non-Treasury-Supported'),
    p('Bitcoin pioneered digital scarcity but follows a minimalist model:'),

    bullet('All Rewards to Miners — New Bitcoin issuance and transaction fees go entirely to miners.'),
    bullet('No Protocol Treasury — The protocol itself does not accumulate fees. Development is privately supported by outside organizations, grants, or donations without assistance or incentive from the network itself.'),
    bullet('Store of Value Narrative — Bitcoin\'s reputation as "digital gold" comes from its scarcity, decentralization, and security — not from innovation of the protocol itself.'),

    divider(),

    h2('ZERA — Treasury-Supported'),
    p('ZERA extends its model by embedding a protocol-native treasury that is contributed to automatically with every unit of network activity:'),

    bullet('Transaction Fees — Transaction fees are generally split between validators, a burn mechanism, and the treasury.'),
    bullet('New Issuance — The ZERA community has implemented a supply management protocol whereas when new supply is created, exchanged instruments flow into the supporting treasury, not to miners or validators.'),
    bullet('Community-Owned — The treasury is controlled on-chain by governance. All allocations are transparent, proposal-driven, and executed with transactions associated with the proposal autonomously.'),

    callout('success', 'Activity doesn\'t just reward participants — it supports the protocol itself, enabling sustainability over the long term.'),

    divider(),

    h2('The Business Analogy: Visa/Mastercard vs. ZERA'),
    p('The best real-world comparison is with traditional payment networks:'),

    tabs([
      {
        label: 'Visa/Mastercard',
        body: 'Every transaction carries a fee, which is collected as profit and distributed to corporate shareholders. Value flows to a centralized entity.',
      },
      {
        label: 'ZERA',
        body: 'Every transaction also carries a fee, but instead of enriching a private corporation, a significant portion flows into the community-controlled treasury to support the protocol.',
      },
    ]),

    p('In some ways, owning ZERA tokens is like being a shareholder of the network itself:'),

    bullet('Every transaction supports the treasury.'),
    bullet('The treasury can support upgrades, ecosystem development, and more.'),
    bullet('Token holders can benefit from the additional utility created from the treasury\'s support.'),

    callout('info', 'ZERA resembles Visa or Mastercard\'s transaction-driven business model — but without the centralized corporate layer. The "shareholders" are the token holders, and the revenues are put back into the ecosystem itself.'),

    divider(),

    h2('Why This Enhances Store of Value'),

    cardGroup(2, [
      {
        icon: 'hugeicons:bitcoin',
        title: 'Bitcoin',
        body: 'Scarcity and decentralization make it digital gold. But there is no treasury — value flows only to miners.',
      },
      {
        icon: 'hugeicons:coins-01',
        title: 'ZERA',
        body: 'Scarcity and decentralization are enhanced by a treasury — every transaction supports a mechanism that can help the protocol innovate.',
      },
    ]),

    p('ZERA doesn\'t just rely on scarcity. It institutionalizes sustainability by automatically supporting the protocol as it gains additional utility and adoption.'),

    divider(),

    h2('Conclusion'),

    bullet('Bitcoin: Scarce, decentralized, miner-reward only. Store of value rests purely on scarcity and perception.'),
    bullet('Visa/Mastercard: Transaction-based businesses where fees enrich corporate shareholders.'),
    bullet('ZERA: Combines both ideas — fixed supply like Bitcoin, but also treasury-supported like a payment network, where fees strengthen a community-controlled treasury.'),

    quote('Holding ZERA is like owning a piece of the protocol itself, where every transaction drives the treasury which can support long-term sustainability and innovation.'),

    accordion('How is ZERA different from Bitcoin?', 'While both share a fixed supply model, ZERA adds a protocol-native treasury funded automatically by network activity. Bitcoin directs all rewards to miners with no protocol-level treasury, while ZERA splits fees between validators, a burn mechanism, and a community-governed treasury.'),
    accordion('Is ZERA trying to replace Bitcoin?', 'No. Bitcoin and ZERA serve different roles. Bitcoin is digital gold — a store of value driven by scarcity. ZERA combines scarcity with a treasury-supported model that funds protocol development, ecosystem growth, and long-term sustainability through governance.'),
    accordion('What makes the Visa/Mastercard analogy relevant?', 'Like traditional payment networks, ZERA collects a fee on every transaction. But instead of enriching a centralized corporation, those fees flow into a community-controlled treasury — making token holders the equivalent of shareholders in a decentralized payment network.'),
  ]),
};
