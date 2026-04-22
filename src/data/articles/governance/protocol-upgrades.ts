import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const protocolUpgradesArticle = {
  id: 'protocol-upgrades',
  title: 'Protocol Upgrades (ZIP)',
  slug: 'protocol-upgrades',
  excerpt: 'ZERA Improvement Protocol (ZIP) handles protocol-level upgrades via required-version transactions — autonomously executed when passed.',
  category_id: 'governance',
  is_published: true,
  display_order: 3,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('The ZERA Improvement Protocol (ZIP) is the mechanism for protocol-level upgrades. ZIPs are submitted as governance proposals containing required-version transactions. When a ZIP passes, the network updates autonomously — no core team gatekeeping required.'),

    callout('info', 'ZIP proposals produce executable transactions, not advisory signals. A passed ZIP upgrades the protocol without any manual intervention.'),

    h2('How ZIP works'),
    p('A ZIP proposal specifies a target protocol version and the changes bundled in that version. Validators and nodes that support the new version signal readiness. Once governance approves the ZIP, the network transitions to the new version.'),

    step(1, 'Technical improvement proposed', 'A developer or community member submits a ZIP describing the upgrade, its rationale, and the required protocol version.'),
    step(2, 'Community reviews and votes', 'ZRA holders review the proposal and cast their votes during the governance window. Discussion happens on-chain and in community forums.'),
    step(3, 'Network updates automatically', 'If the vote passes and quorum is met, the network transitions to the new protocol version. Validators running compatible software begin enforcing the new rules.'),
    step(4, 'No gatekeeping required', 'No foundation, multisig, or core team needs to approve or execute the upgrade. The governance outcome is the final word.'),

    divider(),

    h2('Why code-execution matters'),
    p('The difference between advisory governance and executable governance is the difference between a suggestion and a command. ZERA governance produces commands.'),

    cardGroup(2, [
      { icon: 'hugeicons:shield-01', title: 'Reduced Managerial Reliance', body: 'Passed proposals execute automatically. No trusted party stands between the vote and the outcome.' },
      { icon: 'hugeicons:distributed', title: 'Enhanced Decentralization', body: 'Execution is enforced by the protocol, not by individuals. This removes single points of failure and trust assumptions.' },
      { icon: 'hugeicons:balance', title: 'Improved Legal Posture', body: 'Autonomous execution strengthens the argument that the network is genuinely decentralized — not controlled by a small group.' },
      { icon: 'hugeicons:lightning-01', title: 'No Execution Delays', body: 'The upgrade takes effect as soon as the governance window closes and the vote passes. No waiting for a team to "ship it."' },
    ]),

    h2('Example: a protocol upgrade in practice'),
    quote('A validator discovers that a new signature aggregation algorithm could reduce block verification time by 40%. Here is how it moves from idea to execution.'),

    tabs([
      {
        label: 'Proposal',
        body: 'The validator submits a ZIP describing the new signature aggregation algorithm, benchmarks showing the 40% improvement, and the required protocol version (e.g., v2.4.0).',
      },
      {
        label: 'Vote',
        body: 'ZRA holders review the proposal. Validators signal readiness by running compatible node software. The community votes during the governance window.',
      },
      {
        label: 'Execution',
        body: 'The vote passes with quorum. The network automatically transitions to v2.4.0. All validators enforcing the old rules upgrade or fall out of consensus.',
      },
      {
        label: 'Result',
        body: 'Block verification time drops by 40%. No core team had to approve the change, deploy code, or coordinate a hard fork. Governance handled it end to end.',
      },
    ]),

    divider(),

    h2('ZIP vs. traditional upgrade paths'),
    p('Most blockchain networks rely on one of two approaches for protocol upgrades: hard forks coordinated by a core team, or off-chain votes that a foundation implements manually. ZIP replaces both with a single, trustless mechanism.'),

    bullet('Hard forks require social coordination and trust that the core team will implement the community\'s wishes. ZIP removes the core team from the critical path.'),
    bullet('Off-chain votes (e.g., Snapshot) produce signals, not transactions. The gap between "vote passed" and "change shipped" can be weeks or months. ZIP closes that gap to zero.'),
    bullet('ZIP proposals are versioned, auditable, and executable — every upgrade is a permanent, verifiable record on-chain.'),

    callout('tips', 'ZIP is not limited to consensus changes. Any protocol-level parameter — block size, fee schedules, reward curves — can be modified through a ZIP proposal.'),

    accordion('What happens if validators don\'t upgrade their software?', 'Validators that do not run software compatible with the new protocol version will fall out of consensus after the ZIP takes effect. This creates a strong incentive to stay current.'),
    accordion('Can a ZIP be reversed?', 'Yes — by submitting a new ZIP that reverts the change. The reversal follows the same governance process: proposal, vote, and autonomous execution.'),
    accordion('Who can submit a ZIP?', 'Anyone who meets the proposal threshold defined in the governance configuration. By default, this requires holding a minimum amount of ZRA, but the threshold is itself a governable parameter.'),
  ]),
};
