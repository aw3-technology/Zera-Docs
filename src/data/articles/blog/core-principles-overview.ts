import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote } from '../../blocks';

export const corePrinciplesOverviewArticle = {
  id: 'core-principles-overview',
  title: 'ZERA – A Concise Overview of Core Principles',
  slug: 'core-principles-overview',
  excerpt: 'A concise overview of ZERA\'s core principles — economic philosophy, treasury mechanics, supply design, fee model, governance, and technical strengths.',
  category_id: 'blog',
  is_published: true,
  display_order: 7,
  sidebar_title: 'Core Principles' as string | null,
  icon: null as string | null,
  created_at: '2025-05-04T00:00:00Z',
  updated_at: '2025-05-04T00:00:00Z',
  content: bn([
    callout('note', 'This document reflects the personal opinions of its author and is provided strictly for informational and educational purposes. It is not legal, financial, or investment advice. All content is presented "as-is" and subject to change. Please do your own research.'),

    p('ZERA is not just a blockchain or token project. It is a fundamentally different approach to decentralized economic systems. Created without a foundation, company, or central enterprise, ZERA operates as a permissionless, community-governed protocol that seeks to address the core failures of both traditional finance and legacy blockchain systems.'),

    p('While Bitcoin introduced a capped digital currency and Ethereum brought programmable logic, ZERA advances the field by introducing an on-chain treasury, advanced technology, a fee model aligned with builders, and true decentralization in governance and economics. The result is an infrastructure layer that attracts developers, empowers users, and aligns economic rewards with real utility.'),

    divider(),

    h2('1. Economic Philosophy: Value Through Use, Not Speculation'),
    p('ZERA challenges the speculative, forced-demand mechanics that plague most cryptocurrencies. Traditional systems rely on users buying the main token to interact with a platform. ZERA inverts this by removing such coercive barriers. Fees are low, consistent, and payable in multiple assets through the Authorized Currency Equivalent (ACE) model.'),

    p('As a result, value flows into the protocol naturally as users and developers build atop it, without needing synthetic hype or artificial scarcity. This shift transforms ZERA into an economic system where usage, not marketing, drives growth. ZERA provides an actual economic incentive model: the more the network is used, the stronger it becomes.'),

    cardGroup(2, [
      { icon: 'hugeicons:coins-01', title: 'No Forced Demand', body: 'Users are not forced to buy ZRA to interact with the network. Any ACE-enabled token can pay fees.' },
      { icon: 'hugeicons:chart-increase', title: 'Usage-Driven Growth', body: 'Value accrues naturally through network activity, not through marketing or artificial scarcity.' },
    ]),

    divider(),

    h2('2. A Decentralized, Growing Treasury'),
    p('One of ZERA\'s most distinctive features is its decentralized treasury. Governed by smart contracts and the community, this treasury receives a portion of every transaction on the network. Unlike Ethereum or Bitcoin, which have no native, protocol-level treasuries, ZERA\'s treasury acts like a growing asset base supporting the network itself.'),

    p('Every use of the ZERA Network platform increases the treasury Net Asset Value (NAV), offering rare support based on protocol activity.'),

    h3('NAV Example'),
    p('If ZERA had a circulating supply of 100 tokens and an initial treasury value of $100, the NAV would be $1.00 per token. If 100 transactions occurred on the network and each contributed $0.035 to the treasury, an additional $3.50 would be added, raising the treasury to $103.50. The new NAV would now be $1.035 per token — a real, measurable increase directly tied to protocol usage.'),

    callout('info', 'ZERA achieves something unique: asset-backed digital currency, where each transaction adds to the backing pool instead of extracting from it.'),

    p('Treasury allocations are fully transparent and executed through on-chain governance. There is no administrative key, no manual control.'),

    divider(),

    h2('3. Supply Mechanics: Predictable, Deflationary, and Community-Governed'),
    p('ZERA employs a supply model inspired by Bitcoin\'s halving but implemented with more flexibility and governance integration. Under current policy, new supply issuance will approach zero within a few years. There is no minting authority, and no entity can inflate supply at will.'),

    bullet('No issuance beyond governance-defined allowance (i.e., exchanging an asset for ZERA under mathematical principles)'),
    bullet('Token burns and treasury contributions built into fee logic'),
    bullet('Transparent and enforceable through code'),

    p('To create new ZERA, it must happen through a governance-implemented mechanism. Currently, supply management dictates that new coins can be created in exchange for governance-approved assets under pre-defined mathematical parameters.'),

    h3('How Supply Growth Reinforces Value'),
    p('Supply management is designed not only to limit issuance but to actively contribute to the treasury and reinforce ZERA\'s value through economically sound and transparent mechanisms.'),

    p('For example, imagine ZERA begins with a circulating supply of 100 tokens backed by a $100 treasury, giving it a Net Asset Value (NAV) of $1.00 per token. Over time, if 100 additional ZERA are issued through governance-approved asset exchanges (i.e., 25 at $1.25, 25 at $1.50, 25 at $1.75, and 25 at $2.00) the total circulating supply would rise to 200 tokens, and the treasury would hold $262.50. This would raise the NAV to $1.3125 per token.'),

    callout('success', 'This mechanism is designed so that any increase in supply is offset by greater value in the treasury, enforcing a model where dilution is counteracted by value accrual.'),

    divider(),

    h2('4. Fee Model: Inclusive, Non-Extractive, Value-Returning'),
    p('ZERA eliminates the traditional gas fee gatekeeping. Through its ACE system, other tokens on the platform can pay transaction fees without being forced to convert to ZERA. This removes artificial barriers that other ecosystems impose to prop up token demand.'),

    tabs([
      {
        label: 'ZRA Fee Split',
        body: '50% to validators — securing the network.\n25% burned — reducing circulating supply.\n25% to treasury — increasing treasury assets.',
      },
      {
        label: 'ACE Token Fee Split',
        body: '50% to validators — securing the network.\n50% to treasury — growing the protocol\'s asset base.',
      },
    ]),

    p('This model simultaneously supports validators, deflates ZERA supply over time, and grows the protocol\'s asset base. In effect, with each usage of the protocol and its technology, ZERA users capture value. ZERA becomes a protocol where usage generates compounding and decentralized benefit for all users.'),

    divider(),

    h2('5. Governance: No Foundation, No Common Enterprise'),
    p('ZERA is governed without a foundation or corporate structure. All decisions, from supply changes to treasury allocations, are made by the community via fully on-chain proposal and voting systems.'),

    cardGroup(3, [
      { icon: 'hugeicons:cancel-circle', title: 'No Central Authority', body: 'No individual or team controls the protocol.' },
      { icon: 'hugeicons:user-multiple', title: 'No Privileged Insiders', body: 'No team members or insider control over decisions.' },
      { icon: 'hugeicons:code', title: 'Code Is Law', body: 'All logic is exclusively governed and enforced by code.' },
    ]),

    p('No common enterprise means there is no legal foundation, no discretionary treasury controller, and no backdoor influence. ZERA governance is pure decentralization: rules without rulers.'),

    divider(),

    h2('6. Technical Strength: High Performance and Flexibility'),
    p('ZERA blends simplicity and power:'),

    bullet('WASM-based smart contract layer (versatile multi-language support)'),
    bullet('5-second block time with near-instant finality'),
    bullet('~2,000+ TPS on Layer 1'),
    bullet('Modular design for integrations'),

    p('Tokens can deploy without requiring complex smart contracts. Developers who need more complexity can use WASM contracts with expansive flexibility across multiple programming languages.'),

    divider(),

    h2('7. Built-In Alignment: Treasury Contributions from Ecosystem Growth'),
    p('ZERA flips the incentives. Other chains force users to buy native tokens to interact. ZERA welcomes other projects and protocols by:'),

    bullet('Accepting multiple tokens for fees via ACE'),
    bullet('Automatically allocating value from those fees into the ZERA treasury'),

    p('This means lower costs for other builders, no fee-gouging or token coercion, and every project and interaction benefits the network by using it.'),

    p('ZERA is rare in that it invites growth instead of imposing extractive models that prioritize immediate and selfish interests. Instead, ZERA strives to foster and empower other systems, as ultimately, those very tokens are held by the treasury itself, and the ZERA users have a vested interest in their success.'),

    callout('info', 'The Treasury is subject to the contents within it as prescribed and controlled by governance. This means the treasury can gain and reduce in value based on the contents within it at the time. This is why it is critical that the community maintain the treasury to maintain various asset classes of which it is comfortable with; from stable reserves to highly speculative assets.'),

    divider(),

    h2('8. Comparison Snapshot'),

    tabs([
      {
        label: 'ZERA',
        body: 'Block Time: 5 sec\nFinality: Near Instant\nTPS (Layer 1): ~2,000+\nSmart Contracts: WASM (multi-language)\nSupply Cap: ~906M\nNative Treasury: Yes\nGovernance: On-Chain, Decentralized\nFee Flexibility: Multi-asset (ACE)\nForced Demand: No',
      },
      {
        label: 'Bitcoin',
        body: 'Block Time: 10 min\nFinality: ~1 hr\nTPS (Layer 1): ~7\nSmart Contracts: No\nSupply Cap: 21M\nNative Treasury: No\nGovernance: Off-chain\nFee Flexibility: BTC only\nForced Demand: Yes',
      },
      {
        label: 'Ethereum 2.0',
        body: 'Block Time: 12 sec\nFinality: Near Instant\nTPS (Layer 1): ~30\nSmart Contracts: EVM (Solidity)\nSupply Cap: No Cap\nNative Treasury: No\nGovernance: Core dev/social\nFee Flexibility: ETH only\nForced Demand: Yes',
      },
    ]),

    divider(),

    h2('9. Why ZERA Matters'),
    p('ZERA brings together the strongest ideas from past systems and adds essential elements they lack:'),

    bullet('An asset-backed treasury tied to usage and governance-approved asset exchange'),
    bullet('A real and enforced system relating to supply issuance'),
    bullet('Inclusive model for other projects'),
    bullet('A decentralized structure with no foundation or common enterprise'),
    bullet('Value-driven design with no forced demand'),
    bullet('Fast, high-throughput (non-sharded) native layer'),
    bullet('Flexible smart contract infrastructure'),
    bullet('Transparency at every level: code, governance, economics'),

    p('In doing so, ZERA offers a credible, permissionless financial layer for both new ecosystems and existing projects that seek fairness, resilience, and long-term alignment.'),

    quote('ZERA is not a product to sell. It is a protocol to build on, where value is earned, not extracted, and where the rules belong to everyone.'),

    accordion('Who wrote this document?', 'This document was authored by Jesse Federkiewicz, a Canadian technologist and Principal Software Engineer and Advisor to ZERA Vision, a private technology company building on the ZERA Network.'),
    accordion('Is this financial or legal advice?', 'No. This document is provided strictly for informational and educational purposes. It reflects the personal opinions of the author. Always do your own research.'),
  ]),
};
