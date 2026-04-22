import { bn, h2, h3, p, bullet, callout, cardGroup, divider, quote, accordion, tabs } from '../../blocks';

export const tokenomicsBackgroundArticle = {
  id: 'tokenomics-background',
  title: 'ZERA (ZRA) Tokenomics: Background Paper',
  slug: 'tokenomics-background',
  excerpt: 'A comprehensive background paper on ZERA\'s tokenomics — supply, fees, ACE integration, governance, and supply management.',
  category_id: 'blog',
  is_published: true,
  display_order: 4,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('ZERA is the native coin of the ZERA Network. It is the foundation of the network\'s usage, serving as the ultimate arbiter of governance, protocol security, and fees. Unlike inflationary or centrally controlled assets, ZERA\'s tokenomics are designed around autonomous governance, network activity, structured fee flows, and a transparent supply management system.'),

    divider(),

    h2('Coin Supply'),
    p('ZERA\'s coin supply is designed for transparency, auditability, and community control.'),

    cardGroup(3, [
      { icon: 'hugeicons:coin', title: 'Initial Supply', body: '6,291,475.42238 ZERA' },
      { icon: 'hugeicons:chart-maximum', title: 'Maximum Supply', body: '906,291,475.42 ZERA' },
      { icon: 'hugeicons:shield-01', title: 'Supply Management', body: 'Minting and burning managed exclusively by on-chain governance and smart contracts.' },
    ]),

    p('From inception, ZERA had no unilateral minting function. Instead, the community proposed, voted, and implemented the supply management contract via governance and autonomous execution. That contract was later upgraded \u2014 also through governance \u2014 to refine minting logic, burning schedules, and long-term supply controls.'),

    divider(),

    h2('Fee Model'),
    p('ZERA underpins the fee system. Its design ensures validator incentives, treasury allocations, and coin life cycle.'),

    tabs([
      {
        label: 'ZRA as Fee Instrument',
        body: '25% Burned \u2014 permanently reducing circulating supply.\n25% Treasury \u2014 allocated to governance-managed treasury for grants, protocol support, and ecosystem development.\n50% Validators \u2014 distributed to validators, securing the network.',
      },
      {
        label: 'Non-ZRA (ACE) as Fee Instrument',
        body: '50% Treasury \u2014 allocated to treasury.\n50% Validators \u2014 distributed to validators, securing the network.',
      },
    ]),

    p('This dual-path fee system makes ZERA the most efficient and governance-aligned fee coin that acts as the ultimate arbitrator, while still allowing other ACE enabled coins to integrate into the network\'s native usage.'),

    divider(),

    h2('ACE Integration'),
    p('ZERA is always ACE enabled by default. This means:'),

    bullet('It is the native staking coin, embedded into validator security. ZERA must have a minimum of 50% of the total network stake.'),
    bullet('It is the universal fee coin, usable for all transactions.'),

    p('While other coins can become ACE enabled through governance implemented measures, ZERA\'s ACE status is permanent, ensuring its core role in network usage.'),

    divider(),

    h2('Governance and Treasury'),
    p('ZERA\'s tokenomics are inseparable from governance:'),

    bullet('The treasury is supported continuously by network fees.'),
    bullet('Governance decides allocations for grants, protocol upgrades, and ecosystem initiatives.'),
    bullet('Smart contracts enforce decisions autonomously, eliminating reliance on intermediaries.'),

    p('By binding treasury flows directly to governance, ZERA allows protocol development and community initiatives to be continuously funded and community driven.'),

    divider(),

    h2('Supply Management'),

    callout('note', 'The below is provided on a best effort basis and subject to change or error. Models may not be exact.'),

    h3('Supply Bucket System'),
    p('ZERA\'s supply management uses a bucket model. Supply burns are determined by implemented intervals. Together, this creates dynamic but predictable adjustments. This approach allows for predictable supply distribution while allowing flexibility for governance to adapt. The supply management system has a maximum of 800,000,000 coins allocated.'),

    h3('Burn'),
    p('The implemented supply management burns coins from all buckets over time under governance implemented parameters.'),

    h3('Refund'),
    p('The supply management protocol implements a "refund" mechanism \u2014 if the user is dissatisfied with the utility ZERA provides, they can reverse the transaction under predefined parameters. This provides those who may be new or cautious with a permissionless safety net while allowing them to explore the utility ZERA has to offer.'),

    tabs([
      {
        label: 'Option A \u2014 Full Refund',
        body: 'A full refund returned over a period of about 3 months.',
      },
      {
        label: 'Option B \u2014 Immediate Partial',
        body: 'A larger, but not full, percentage is immediately returned.',
      },
    ]),

    h3('Supply Management in Action'),
    p('ZERA\'s implementation of supply management demonstrates how governance controls its base coin:'),

    cardGroup(2, [
      { icon: 'hugeicons:document-01', title: 'Proposal', body: 'Community introduced supply management through governance.' },
      { icon: 'hugeicons:vote', title: 'Voting', body: 'Holders approved the proposal on-chain.' },
      { icon: 'hugeicons:rocket-01', title: 'Implementation', body: 'The contract was deployed with approved functionality while governance maintains total control.' },
      { icon: 'hugeicons:refresh', title: 'Upgrade', body: 'Governance can update the contract over time to fit the evolving needs of its users.' },
    ]),

    p('This cycle demonstrates ZERA\'s adaptability: supply is not static, but evolves through governance consensus.'),

    divider(),

    h2('Conclusion'),
    p('As the native coin of the ZERA Network, ZERA is more than a medium of exchange. Its tokenomics are embedded into the governance engine, allowing supply, usage, fees, and treasury functions to be transparent, decentralized, and community controlled.'),

    bullet('Capped supply.'),
    bullet('Burn mechanics tied to usage and other governance approved mechanisms.'),
    bullet('Fees that balance burns, treasury support, and validator rewards.'),
    bullet('Permanent ACE status, securing its role in fees and staking.'),
    bullet('Governance-driven supply management, where issuance and upgrades are fully community-controlled.'),

    quote('ZERA is the structural foundation of the network: a base coin designed for durability, legitimacy, and adaptability through decentralized governance.'),

    accordion('How is ZERA different from inflationary tokens?', 'ZERA has no unilateral minting function. All supply changes \u2014 minting and burning \u2014 are managed exclusively by on-chain governance and smart contracts, with a hard maximum supply cap of 906,291,475.42 ZERA.'),
    accordion('What is the refund mechanism?', 'The supply management protocol allows users to reverse transactions under predefined parameters if they are dissatisfied with ZERA\'s utility. Option A provides a full refund over ~3 months; Option B provides an immediate partial refund.'),
    accordion('Can other coins be used for fees?', 'Yes. ACE-enabled coins can be used for fees, but their fee split is 50/50 (Treasury/Validators) with no burn. ZERA\'s fee split includes a 25% burn, making it the most governance-aligned fee coin.'),
  ]),
};
