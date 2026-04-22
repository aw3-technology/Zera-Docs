import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const zeraForDummiesArticle = {
  id: 'zera-for-dummies',
  title: 'ZERA for Dummies: A Simple Guide',
  slug: 'zera-for-dummies',
  excerpt: 'ZERA is a blockchain network (like Bitcoin or Ethereum) with one revolutionary difference.',
  category_id: 'blog',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('You have probably heard of Bitcoin, Ethereum, and maybe a dozen other blockchain networks. They all promise decentralization, community ownership, and a better financial system. ZERA promises the same things — but with one revolutionary difference that changes everything.'),

    h2('What is ZERA?'),
    p('ZERA is a blockchain network — like Bitcoin or Ethereum — where people can send tokens, run smart contracts, and build applications. But ZERA has one feature that no other blockchain has truly achieved:'),
    callout('info', 'When the ZERA community votes on something, it happens automatically. No waiting. No broken promises. No central authority deciding whether to follow through.'),
    p('Think of it this way: ZERA is the first blockchain with true democracy. Your vote doesn\'t just express an opinion — it directly controls a community treasure chest and automatically changes how the network operates.'),

    h2('The Big Problem ZERA Solves'),
    p('Every blockchain talks about "community governance." But here is what governance actually looks like on every other blockchain:'),

    tabs([
      {
        label: 'Every Other Blockchain',
        body: 'Community votes on a proposal. A foundation or core team says "we\'ll implement it." Maybe they do, maybe they don\'t. Maybe they do it differently than what was voted on. The community has no real power — they can only suggest. The foundation holds the keys.',
      },
      {
        label: 'ZERA',
        body: 'Community votes on a proposal. The vote passes. The changes happen automatically, on-chain, immediately. No human can stop, delay, or modify the outcome. The blockchain itself implements the community\'s decisions. The community has total control.',
      },
    ]),

    p('This is not a small difference. It is the difference between a suggestion box and actual power.'),

    divider(),

    h2('How Governance Actually Works'),
    p('When a governance vote passes on ZERA, the resulting transactions execute immediately on-chain. There is no intermediary, no multisig wallet controlled by insiders, no "governance committee" that interprets the results. The blockchain itself enforces the outcome.'),

    h3('What the community controls'),
    p('This is the part that surprises people. The ZERA community doesn\'t just vote on one or two things. They control everything:'),
    bullet('Protocol upgrades — changing how the blockchain itself works'),
    bullet('Treasury spending — where community funds go'),
    bullet('Marketing — funding campaigns, partnerships, and outreach'),
    bullet('Research and development — funding new features and tools'),
    bullet('Which tokens can be used for fees and staking'),
    bullet('Bridge operations — how ZERA connects to other blockchains'),
    bullet('Every single aspect of the network\'s operation'),

    h3('Types of Governance'),
    p('ZERA has several governance mechanisms, each designed for different types of decisions:'),
    cardGroup(3, [
      { icon: 'hugeicons:file-02', title: 'ZIP', body: 'ZERA Improvement Proposals — for protocol-level changes and upgrades to the network itself.' },
      { icon: 'hugeicons:money-bag', title: 'Treasury', body: 'Proposals to allocate community funds for development, marketing, grants, and ecosystem growth.' },
      { icon: 'hugeicons:shield-01', title: 'IIT (30M+ ZRA)', body: 'Initial Issuance Token governance — high-stakes decisions requiring a significant stake to propose.' },
    ]),
    cardGroup(2, [
      { icon: 'hugeicons:coins-01', title: 'ZMT', body: 'ZERA Managed Token governance — decisions about tokens managed within the ZERA ecosystem.' },
      { icon: 'hugeicons:star', title: 'ACE', body: 'Approved Community Exchange tokens — governance for the ACE token system and qualifying criteria.' },
    ]),

    divider(),

    h2('The Treasury: Where Real Power Lives'),
    p('Most blockchains have a treasury, but it is controlled by a foundation or a small group of insiders. ZERA\'s treasury is different. It is controlled entirely by governance — which means it is controlled entirely by you.'),

    h3('How the Treasury is Funded'),
    p('The Treasury fills itself automatically through protocol fees:'),
    bullet('25% of all ZRA transaction fees flow directly to the Treasury'),
    bullet('50% of all non-ZRA token fees flow directly to the Treasury'),
    bullet('Additional funding through other governance mechanisms'),
    callout('success', 'The Treasury is self-sustaining. It does not rely on donations, VC funding, or a foundation\'s budget. As the network grows, the Treasury grows automatically.'),

    h3('Why This Changes Everything'),
    p('Traditional blockchain projects have to beg for funding. Developers submit grant proposals to foundations. Marketing teams have to convince insiders to allocate budget. On ZERA, none of that exists. The community controls every dollar. The funding is transparent. The system sustains itself.'),

    h3('The Treasury Flywheel'),
    p('This is where it gets exciting. The Treasury creates a self-reinforcing cycle:'),
    step(1, 'More Activity', 'As more people use ZERA, more transactions happen on the network.'),
    step(2, 'More Fees', 'More transactions generate more protocol fees.'),
    step(3, 'Bigger Treasury', 'More fees flow into the community-controlled Treasury.'),
    step(4, 'More Funding', 'A bigger Treasury means the community can fund more projects, developers, and initiatives.'),
    step(5, 'Better Network', 'More funding leads to better tools, more features, and a stronger ecosystem.'),
    step(6, 'More Projects', 'A better network attracts more projects and builders.'),
    step(7, 'More Activity', 'More projects bring more users, which means more activity — and the cycle repeats.'),

    callout('tips', 'The flywheel effect means ZERA gets stronger over time. Every transaction makes the community wealthier and more capable of funding growth.'),

    divider(),

    h2('Real Examples'),
    p('Here is what governance looks like in practice on ZERA:'),

    accordion('Development Funding', 'A developer wants to build a new DEX on ZERA. They submit a Treasury proposal outlining the project, timeline, and budget. The community votes. If it passes, the funds are released automatically from the Treasury to the developer\'s address. No foundation approval needed. No waiting for a committee. The community decided, and the blockchain executed.'),
    accordion('Marketing Initiatives', 'The community wants to fund a marketing campaign for an upcoming conference. A member submits a Treasury proposal with a budget breakdown: sponsorship fees, booth costs, promotional materials. The community votes. If it passes, the funds are allocated on-chain. The community can verify every dollar was spent as proposed.'),
    accordion('Protocol Upgrades', 'A ZIP proposal suggests changing the fee structure to attract more builders. The technical specification is reviewed by the community. The vote passes. The protocol parameters update automatically. No hard fork. No foundation deciding the timeline. The change takes effect as the governance rules dictate.'),

    divider(),

    h2('Why Projects Should Build on ZERA'),
    p('If you are a developer or project founder, ZERA offers advantages you won\'t find anywhere else:'),

    h3('Technical Advantages'),
    bullet('WASM-powered smart contract engine for high-performance contracts'),
    bullet('Built from scratch in C++ — not a fork of another chain'),
    bullet('Governance hooks built directly into the protocol layer'),
    bullet('Native bridge infrastructure for cross-chain interoperability'),

    h3('Financial Benefits'),
    bullet('Apply for Treasury funding directly from the community'),
    bullet('Interface fees let you monetize your applications'),
    bullet('ACE token system provides additional utility for your project\'s token'),
    bullet('No rent-seeking foundation taking a cut of your success'),

    h3('Legal Protection'),
    bullet('True decentralization reduces regulatory risk'),
    bullet('No foundation or core team creates a "managerial reliance" argument'),
    bullet('Community governance provides genuine decentralization — not just marketing'),

    divider(),

    h2('The ZERA Difference'),
    p('Let\'s make the contrast as clear as possible:'),

    tabs([
      {
        label: 'Traditional Blockchain',
        body: 'Community votes on a proposal. Foundation says "we\'ll consider it." Maybe it happens. Maybe it doesn\'t. The community feels powerless. Token holders are passive investors hoping the foundation makes good decisions.',
      },
      {
        label: 'ZERA',
        body: 'Community votes on a proposal. The vote passes. Execution happens automatically on-chain. The result becomes reality. The community is empowered. Token holders are active participants who directly control the network\'s future.',
      },
    ]),

    divider(),

    h2('Why This Matters'),

    h3('For Token Holders'),
    p('Your ZRA tokens are not just a speculative asset. They are a governance tool that gives you direct control over a growing treasury and the network\'s direction. When you vote, things actually happen.'),

    h3('For Developers'),
    p('You can build on a network where funding comes from the community, not a foundation with its own agenda. You can apply for grants through transparent governance. You can integrate governance into your own applications.'),

    h3('For the Blockchain Space'),
    p('ZERA proves that real decentralization is possible. Not "decentralization theater" where a foundation controls everything while claiming to be community-driven. Actual, enforceable, on-chain community control.'),

    divider(),

    h2('Getting Started'),

    h3('To Participate in Governance'),
    numbered('Get ZRA tokens — you need them to vote and submit proposals'),
    numbered('Participate in governance discussions and review active proposals'),
    numbered('Vote on proposals that matter to you'),
    numbered('Submit your own ideas when you see an opportunity to improve the network'),

    h3('To Build on ZERA'),
    numbered('Create tokens or deploy smart contracts on the ZERA network'),
    numbered('Apply for Treasury funding through a governance proposal'),
    numbered('Integrate the ACE system to give your token additional utility'),
    numbered('Monetize your applications with interface fees'),

    divider(),

    h2('The Bottom Line'),
    quote('ZERA is the first blockchain where community governance actually controls both the technology AND the money. When you vote, it happens. When the Treasury grows, you decide where it goes. That is not a roadmap promise — it is how the protocol works today.'),
    p('No other blockchain can say that. And that is what makes ZERA revolutionary.'),
  ]),
};
