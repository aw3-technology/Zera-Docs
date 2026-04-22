import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const zeraExplainedArticle = {
  id: 'zera-explained',
  title: 'ZERA Explained: A Deeper Dive',
  slug: 'zera-explained',
  excerpt: 'See how ZERA reimagines blockchain from the ground up: Governance, Treasury, and Beyond.',
  category_id: 'blog',
  is_published: true,
  display_order: 2,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('ZERA is not an incremental improvement on existing blockchains. It is a ground-up reimagining of what a blockchain network should be — one where governance, treasury, and protocol logic are fused into a single self-enforcing system. This article takes a deeper technical look at how ZERA achieves that.'),

    h2('The Governance Engine'),
    p('At the core of ZERA is a governance engine unlike anything else in the blockchain space. It is not a sidecar DAO bolted onto an existing chain. Governance is embedded directly into the protocol layer, making it self-enforcing and autonomous.'),

    h3('Self-Enforcing Execution'),
    p('When a governance proposal passes, the resulting state transitions execute on-chain without any human intervention. There is no multisig, no foundation wallet, no admin key. The protocol reads the vote result and applies the changes as deterministic transactions within the same consensus process.'),
    callout('info', 'Every governance operation — from proposal submission to vote tallying to execution — is transparent, on-chain, and verifiable by any node in the network.'),

    h3('Governance Scope'),
    p('ZERA governance is not limited to a narrow set of parameters. It spans every configurable aspect of the network:'),
    bullet('ZIP (ZERA Improvement Proposals) — protocol-level upgrades including consensus rules, fee structures, and new features'),
    bullet('Treasury proposals — allocation of community funds for development, marketing, grants, and ecosystem initiatives'),
    bullet('IIT governance (requires 30M+ ZRA) — high-stakes decisions like initial token issuance parameters'),
    bullet('ZMT governance — management of ZERA-managed tokens and their configurations'),
    bullet('ACE governance — rules for the Approved Community Exchange token system'),

    p('This means the community does not just "advise" on the network\'s direction. The community IS the network\'s direction. Every parameter, every spending decision, every protocol change flows through governance.'),

    divider(),

    h2('WASM-Powered Smart Contract Engine'),
    p('ZERA uses a WebAssembly (WASM) virtual machine for smart contract execution. This is a deliberate architectural choice with significant implications.'),

    h3('Why WASM'),
    bullet('Language flexibility — developers can write contracts in Rust, C, C++, or any language that compiles to WASM'),
    bullet('Near-native performance — WASM executes at speeds far closer to bare metal than interpreted VMs like the EVM'),
    bullet('Mature tooling — WASM is backed by a massive ecosystem of compilers, debuggers, and profilers from the broader software industry'),
    bullet('Deterministic execution — WASM\'s sandboxed execution model guarantees identical results across all nodes'),
    bullet('Upgradeable contract logic — governance can modify contract execution parameters without breaking the VM'),

    callout('tips', 'Because ZERA uses WASM rather than a custom VM, developers can leverage existing tools and libraries from the broader WebAssembly ecosystem. The learning curve is significantly lower than chain-specific virtual machines.'),

    divider(),

    h2('The Treasury System'),
    p('ZERA\'s treasury is not an afterthought or a multisig wallet managed by a foundation. It is a protocol-native, on-chain system that is continuously funded by network activity and entirely controlled by governance.'),

    h3('Continuous Funding Mechanics'),
    p('The Treasury receives funding from two primary fee paths:'),

    tabs([
      {
        label: 'ZRA Fee Path',
        body: 'When transactions pay fees in ZRA (the native token): 25% of the fee flows directly to the Treasury. The remaining 75% is distributed to validators, burned, or allocated according to the current governance-configured fee split.',
      },
      {
        label: 'Non-ZRA Fee Path',
        body: 'When transactions pay fees in other tokens (enabled through the ACE system): 50% of the fee flows directly to the Treasury. This higher rate reflects the additional utility the network provides by accepting non-native tokens for fees.',
      },
    ]),

    p('This dual-path funding model means the Treasury grows proportionally with network usage. More activity equals more funding, regardless of which token users choose to pay fees with.'),

    h3('On-Chain Transparency'),
    p('Every Treasury inflow and outflow is a standard on-chain transaction. Anyone can audit the Treasury balance, trace the source of every deposit, and verify that every withdrawal corresponds to a passed governance proposal. There are no off-chain accounts, no foundation bank accounts, and no discretionary spending.'),

    divider(),

    h2('Fee Mechanics in Detail'),
    p('ZERA\'s fee system is more sophisticated than a simple "pay gas in the native token" model. It supports dual fee paths with exact, governance-configurable splits.'),

    h3('ZRA Fee Split'),
    p('When a transaction is paid for in ZRA:'),
    numbered('A portion goes to the Treasury (currently 25%)'),
    numbered('A portion goes to validators as block rewards'),
    numbered('A portion is burned, reducing total ZRA supply'),
    numbered('The exact percentages are governance-configurable parameters'),

    h3('ACE Token Fee Split'),
    p('When a transaction is paid for in an ACE-qualified token:'),
    numbered('50% goes to the Treasury'),
    numbered('The remaining 50% is distributed according to governance rules'),
    numbered('Interface fees may apply, providing revenue to application developers'),

    callout('note', 'The ability to pay fees in tokens other than ZRA is a significant UX improvement. Users do not need to hold ZRA just to interact with a ZERA-based application — they can pay in any ACE-qualified token.'),

    divider(),

    h2('Supply Management'),
    p('ZERA implements a parameterized burn system that makes supply management transparent and governance-upgradeable.'),

    h3('Bucket Burns'),
    p('Rather than a single flat burn rate, ZERA uses parameterized buckets that allow different burn rates for different transaction types and fee sources. This gives governance fine-grained control over monetary policy:'),
    bullet('Transaction fee burns — a percentage of every fee is permanently removed from circulation'),
    bullet('Governance-configurable rates — the community can increase or decrease burn rates through proposals'),
    bullet('Upgradeable logic — the burn mechanism itself can be modified through governance, allowing the community to adapt monetary policy as the network matures'),

    p('This means ZERA\'s tokenomics are not set in stone by a founding team. They evolve as the community sees fit, enforced by the same governance engine that controls everything else.'),

    divider(),

    h2('The ACE System'),
    p('ACE (Approved Community Exchange) is one of ZERA\'s most distinctive features. It creates a protocol-level framework for integrating third-party tokens into the core network experience.'),

    h3('What ACE Enables'),
    bullet('Fee payment in non-ZRA tokens — users can pay transaction fees in any ACE-qualified token'),
    bullet('Staking with alternative tokens — ACE tokens can participate in staking mechanisms'),
    bullet('Governance participation — ACE token holders may participate in specific governance decisions'),
    bullet('Bridge integration — ACE tokens benefit from ZERA\'s native bridge infrastructure'),

    h3('How Tokens Qualify'),
    p('A token becomes ACE-qualified through governance. The community evaluates tokens based on criteria including liquidity, project legitimacy, technical compatibility, and ecosystem value. This is not a permissionless listing — it is a curated system governed by the community to maintain quality and security.'),

    accordion('Why not make ACE permissionless?', 'A permissionless system would allow low-quality or malicious tokens to be used for fee payment, potentially creating attack vectors. Governance curation ensures that only tokens meeting community standards can access ACE privileges. This is a deliberate tradeoff between openness and security.'),

    divider(),

    h2('Interoperability and Bridges'),
    p('ZERA is designed to interoperate with other blockchain networks through a native bridge system built directly into the protocol.'),

    h3('Bridge Architecture'),
    p('ZERA\'s bridge is not a third-party wrapper or a simple lock-and-mint scheme. It is a protocol-level system with several key properties:'),
    bullet('Guardian system — a decentralized set of guardians validates cross-chain messages, preventing single points of failure'),
    bullet('Governance-controlled — bridge parameters, supported chains, and guardian sets are all managed through governance'),
    bullet('On-chain verification — bridge transactions are verified by the ZERA consensus mechanism, not by an external oracle'),

    h3('Solana Bridge'),
    p('The first external bridge connects ZERA to Solana, enabling token transfers between the two networks. The Solana bridge uses ZERA\'s guardian system to validate cross-chain messages and leverages Solana\'s speed for fast confirmation times on the destination side.'),

    expandable('Bridge security model', 'The guardian system requires a threshold of guardians to sign off on each cross-chain message. Guardians are selected through governance and can be rotated or replaced by community vote. The threshold and guardian set size are governance-configurable parameters, allowing the community to balance security against liveness as the network grows.'),

    divider(),

    h2('Core Technology'),
    p('ZERA\'s technical foundation reflects its commitment to performance, sovereignty, and governance-first design.'),

    h3('Native C++ Build'),
    p('ZERA is written from scratch in C++. It is not a fork of Ethereum, Cosmos, Substrate, or any other blockchain framework. This decision has significant implications:'),
    bullet('No inherited technical debt from upstream projects'),
    bullet('Governance hooks are built into the protocol from day one — not retrofitted'),
    bullet('Performance optimizations tailored specifically to ZERA\'s governance-heavy workload'),
    bullet('Complete control over the codebase with no dependency on external framework maintainers'),

    h3('Governance Hooks at Every Layer'),
    p('Because ZERA was built from scratch with governance as the primary design constraint, governance hooks exist at every layer of the stack:'),
    bullet('Consensus layer — governance can modify consensus parameters'),
    bullet('Execution layer — governance can upgrade the WASM VM configuration'),
    bullet('Networking layer — governance can adjust peer-to-peer protocol parameters'),
    bullet('Economic layer — governance controls fee splits, burn rates, and treasury allocations'),
    bullet('Bridge layer — governance manages cross-chain configurations and guardian sets'),

    callout('success', 'This is what "governance-first" means in practice. It is not a smart contract deployed on top of a chain that was designed for something else. The chain itself was designed around governance from the first line of code.'),

    divider(),

    h2('Putting It All Together'),
    p('ZERA\'s architecture is best understood as a set of interlocking systems, each reinforcing the others:'),

    cardGroup(2, [
      { icon: 'hugeicons:government', title: 'Governance Engine', body: 'Self-enforcing, autonomous decision-making that controls every aspect of the network without human intermediaries.' },
      { icon: 'hugeicons:money-bag', title: 'Treasury System', body: 'Protocol-native, continuously funded, fully transparent, and entirely governed by the community.' },
      { icon: 'hugeicons:cpu', title: 'WASM Smart Contracts', body: 'High-performance, language-flexible smart contract execution with governance-upgradeable parameters.' },
      { icon: 'hugeicons:link-01', title: 'Bridge Infrastructure', body: 'Native cross-chain interoperability with decentralized guardians and governance-controlled configurations.' },
    ]),

    p('None of these systems exist in isolation. The governance engine controls the treasury. The treasury funds development. Development improves the protocol. The protocol generates fees. The fees fund the treasury. And the community controls all of it through governance.'),

    quote('ZERA is not a blockchain with governance added on top. It is a governance system with a blockchain built around it.'),
  ]),
};
