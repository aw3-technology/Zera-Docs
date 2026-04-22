import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const treasuryOverviewArticle = {
  id: 'treasury-overview',
  title: 'Treasury Overview',
  slug: 'treasury-overview',
  excerpt: 'The ZERA Treasury is a public vault — transparent, and fully governed by users. No entity takes a cut. No insiders hold keys.',
  category_id: 'treasury',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('A Treasury Controlled by No One — and by Everyone'),
    p('The ZERA Treasury is protocol-native, on-chain, and continuously funded by network activity and supply mechanics. It is not a budget held by developers, a foundation, or any privileged group. It is a public vault — transparent, verifiable, and fully governed by users.'),

    callout('info', 'No entity takes a cut. No insiders hold keys. The Treasury belongs to the network.'),

    h2('How It Works'),
    p('The Treasury operates through a set of governance-owned smart contracts. There are no custodians, no signers, and no discretionary spending. Every allocation executes automatically when a proposal passes community vote.'),

    bullet('Protocol-native — built into the chain itself, not bolted on as an afterthought'),
    bullet('On-chain — every inflow, outflow, and balance is publicly verifiable'),
    bullet('Continuously funded — network activity and supply mechanics feed the Treasury around the clock'),
    bullet('Governance-controlled — allocations execute only when proposals pass community vote'),

    divider(),

    h2('What Makes This Different'),
    p('Most blockchain treasuries are controlled by a foundation, a multisig, or a small group of insiders. ZERA takes a fundamentally different approach.'),

    tabs([
      {
        label: 'Traditional Treasuries',
        body: 'Controlled by foundations or core teams. Spending decisions made behind closed doors. Community has little visibility or input. Funds can be redirected without consent.',
      },
      {
        label: 'ZERA Treasury',
        body: 'Controlled by governance contracts with no privileged keys. Every decision made by community vote. Every transaction visible on-chain. Allocations execute automatically — no middlemen, no discretion.',
      },
    ]),

    quote('Decisions are made by community vote, not behind closed doors. The Treasury is not a war chest for insiders — it is infrastructure for the network.'),

    divider(),

    h2('The Treasury Flywheel'),
    p('The ZERA Treasury creates a self-reinforcing cycle that compounds value over time. As the network grows, so does the Treasury — and as the Treasury grows, it can fund more initiatives that drive further growth.'),

    numbered('More Network Activity — users transact, build, and interact with the protocol'),
    numbered('More Fees — every transaction contributes to the fee pool'),
    numbered('Bigger Treasury — a portion of every fee flows directly into the Treasury'),
    numbered('More Funding — a larger Treasury means more resources for proposals'),
    numbered('Better Network — funded proposals improve infrastructure, tooling, and ecosystem'),
    numbered('More Projects — a better network attracts more builders and applications'),
    numbered('More Network Activity — and the cycle begins again'),

    callout('success', 'The flywheel is not theoretical. It is built into the protocol mechanics. Every transaction strengthens the Treasury, and every funded proposal strengthens the network.'),

    divider(),

    h2('Core Principles'),
    cardGroup(3, [
      {
        icon: 'hugeicons:shield-01',
        title: 'No Custodians',
        body: 'No individual or entity holds keys to the Treasury. Governance contracts enforce every rule.',
      },
      {
        icon: 'hugeicons:eye',
        title: 'Full Transparency',
        body: 'Every inflow, outflow, and balance is visible on-chain. Anyone can audit the Treasury at any time.',
      },
      {
        icon: 'hugeicons:user-group',
        title: 'Community Governed',
        body: 'Only proposals that pass community vote can trigger Treasury allocations. No exceptions.',
      },
    ]),

    accordion('Who controls the Treasury?', 'No single entity. The Treasury is governed by on-chain governance contracts. Proposals must pass a community vote before any funds are allocated. There are no admin keys, no multisig signers, and no override mechanisms.'),
    accordion('Can the Treasury rules be changed?', 'Yes — but only through governance. Any change to Treasury parameters, fee splits, or allocation logic must go through the same proposal and voting process as any other governance action.'),
    accordion('How is the Treasury funded?', 'Through fee splits on every network transaction and through supply management mechanics. The Treasury is continuously funded by normal network activity — no special fundraising or token sales required.'),
  ]),
};
