import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const governanceOverviewArticle = {
  id: 'governance-overview',
  title: 'Governance Overview',
  slug: 'governance-overview',
  excerpt: 'Governance is the operating system of ZERA — universal, configurable, and autonomous.',
  category_id: 'governance',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('Governance is the operating system of ZERA — universal, configurable, and autonomous. It spans protocol upgrades (ZIP), treasury allocation, tokenomics parameters, contract logic, and more. Every meaningful decision on the network flows through governance.'),

    callout('info', 'Proposals don\'t end in forum posts — they end in on-chain transactions that execute without human handoffs. ZERA governance closes the gap between decisions and execution.'),

    h2('What governance controls'),
    p('Governance on ZERA is not limited to a single domain. It touches every aspect of the network:'),

    cardGroup(2, [
      { icon: 'hugeicons:code', title: 'Protocol Upgrades', body: 'Submit and vote on ZERA Improvement Proposals (ZIP) that upgrade the protocol autonomously.' },
      { icon: 'hugeicons:money-bag-02', title: 'Treasury Spending', body: 'Allocate treasury funds for grants, ecosystem growth, and operational expenses.' },
      { icon: 'hugeicons:megaphone-01', title: 'Marketing & Awareness', body: 'Fund campaigns, partnerships, and community initiatives through governance proposals.' },
      { icon: 'hugeicons:laboratory', title: 'R&D Funding', body: 'Direct resources toward research, new features, and technical exploration.' },
      { icon: 'hugeicons:coins-01', title: 'Fee & Staking Tokens', body: 'Decide which tokens are accepted for transaction fees and staking rewards.' },
      { icon: 'hugeicons:link-03', title: 'Bridge Operations', body: 'Govern cross-chain bridge parameters, supported chains, and security thresholds.' },
    ]),

    divider(),

    h2('Who participates'),
    p('Participation is configurable per contract. Each governance context defines who can propose, who can vote, and which tokens count toward quorum and approval thresholds.'),

    bullet('ZERA protocol governance uses ZRA as the final arbiter — holders of ZRA vote on network-level decisions.'),
    bullet('Projects deployed on ZERA can adopt their own governance models using their own tokens.'),
    bullet('Proposal and voting eligibility are fully configurable per smart contract or governance context.'),

    callout('tips', 'Because governance is configurable at the contract level, a single ZERA deployment can host dozens of independent governance systems — each with its own rules, tokens, and participants.'),

    h2('Why code-execution matters'),
    p('ZERA governance produces binding, executable outcomes — not advisory signals. When a proposal passes, the resulting transaction is executed on-chain without requiring a multisig, core team approval, or any manual intervention.'),

    cardGroup(2, [
      { icon: 'hugeicons:shield-01', title: 'Reduced Managerial Reliance', body: 'No core team or foundation needs to "implement" a passed vote — it happens automatically.' },
      { icon: 'hugeicons:distributed', title: 'Enhanced Decentralization', body: 'Execution is trustless. The outcome is determined by the protocol, not by individuals.' },
      { icon: 'hugeicons:balance', title: 'Improved Legal Posture', body: 'Binding on-chain execution strengthens the case that the network operates autonomously.' },
      { icon: 'hugeicons:rocket-01', title: 'Faster Iteration', body: 'Proposals move from vote to execution without delays caused by manual handoffs or approvals.' },
    ]),

    divider(),

    h2('From decision to execution'),
    p('Traditional governance flows often stall between "the vote passed" and "someone implemented it." ZERA eliminates that gap entirely.'),

    quote('In ZERA, governance is not a suggestion box — it is the control plane of the network.'),

    accordion('How does this differ from off-chain governance?', 'Off-chain governance (e.g., Snapshot votes, forum polls) produces signals that require a trusted party to act on the result. ZERA governance produces on-chain transactions that execute autonomously, removing the need for trusted intermediaries.'),
    accordion('Can governance be used for non-protocol decisions?', 'Yes. Any smart contract on ZERA can integrate governance. DAOs, treasuries, NFT projects, and DeFi protocols can all leverage the same governance primitives for their own decision-making.'),
  ]),
};
