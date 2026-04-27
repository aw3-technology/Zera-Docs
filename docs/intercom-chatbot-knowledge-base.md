# Zera Customer Support Chatbot Knowledge Base

> **Purpose:** This document is the single source of truth for the AI chatbot on the Zera documentation site. It covers everything about ZERA: product information, governance, tokenomics, developer tooling, treasury, technology, regulatory positioning, troubleshooting, and escalation paths.

---

## 1. What Is ZERA?

ZERA is a **governance-first blockchain network** where community votes execute automatically on-chain. There are no foundations, no core teams, and no central points of failure. When the community votes on something, it happens — autonomously, through protocol-level enforcement.

ZERA eliminates the gap between decision and action. Traditional blockchains treat governance as an afterthought — proposals pass but nothing happens without manual intervention by a foundation or multisig. ZERA flips this model entirely. Governance is the operating system of the protocol.

**Key facts:**

- Built from scratch in C++ (not a fork of any existing chain)
- ~2,000+ transactions per second on Layer 1 (some benchmarks show 3,000+ TPS)
- 5-second block time with near-instant finality
- ~$0.004 average transaction fee
- SolidProof security audit completed
- Smart contracts powered by WebAssembly (WASM) — write in Rust, Go, C, or AssemblyScript
- Fully decentralized: no admin keys, no foundation control, no emergency backdoors
- 800+ active wallets
- Live Solana bridge for cross-chain asset transfers
- Network explorer at zerascan.io

### What the Community Controls

- Protocol upgrades and network parameters
- Treasury spending and fund allocation
- Marketing initiatives and community outreach
- Research and development priorities
- Token fees and staking rewards
- Bridge deployments and cross-chain integrations
- Supply management mechanics
- Every other aspect of the ZERA ecosystem

### How ZERA Is Different

Off-chain governance (like Snapshot) produces advisory signals that require a trusted team to implement. ZERA governance produces **binding on-chain transactions** that execute autonomously. There is no human step between "vote passes" and "action happens." Centralization is structurally impossible, not just unlikely — there are no admin keys, no foundation overrides, and no emergency vetoes (though governance could implement one if desired).

---

## 2. Governance System

### Overview

Governance is the operating system of ZERA — universal, configurable, and autonomous. It spans protocol upgrades (ZIP), treasury allocation, tokenomics parameters, contract logic, and more. Every proposal ends in on-chain transactions that execute without human handoffs.

ZRA is the final arbiter for network-level decisions. Projects deployed on ZERA can adopt their own governance models using their own tokens. Governance is configurable at the contract level — a single ZERA deployment can host dozens of independent governance systems. Any smart contract on ZERA can integrate governance: DAOs, treasuries, NFT projects, DeFi protocols.

### Proposal Types

| Proposal Type | Purpose |
|---|---|
| **ZIP** (ZERA Improvement Proposal) | Protocol-level upgrades and technical changes. ZIPs specify a target protocol version and bundled changes. Validators signal readiness by running compatible software. Once governance approves, the network transitions automatically. Can modify any protocol-level parameter: block size, fee schedules, reward curves. |
| **Treasury Proposal** | Fund allocation from the protocol treasury for ecosystem development, partnerships, and operations |
| **IIT** (Innovation & Incubation Treasury) | Funding for innovation projects. 20–30M+ ZRA dedicated pool. Two-stage monthly governance cycle: Stage 1 (7 days, proposals voted), Stage 2 (remainder of month, successful proposals voted again and executed). Used for open-source tools, research, experimental development. |
| **ZMT** (ZERA Marketing Treasury) | Community-driven marketing, events, education, awareness campaigns, hackathons, brand recognition. Entirely governed by the same proposal and voting process. |
| **ACE Proposal** | Token utility decisions — grant or revoke ACE (Authorized Currency Equivalent) status for tokens |

### Governance Lifecycle Models

ZERA supports multiple governance lifecycle models, configurable per contract or governance context:

- **Staggered**: Each proposal gets its own fixed voting window (e.g., 7 days). Proposals run independently in parallel. Best for open, permissionless governance.
- **Cycle**: All proposals batched into synchronized rounds. Optional caps to reduce voter fatigue. Best for DAOs and treasuries wanting structured cadences.
- **Multi-Staged**: Multiple rounds narrowing to finalists. Best for competitive grants, elections, or budget allocation.
- **Adaptive**: Voting windows and thresholds adjust dynamically based on participation, urgency, or on-chain signals. Best for permissioned or time-sensitive environments.

Lifecycle models can be changed through governance proposals. Multiple models can operate simultaneously within the same network.

### Governance Safeguards

- 75% supermajority requirement for critical changes
- Configurable thresholds per governance contract
- No human intervention in the execution phase
- ZRA must maintain >= 50% of total network stake
- Proposals enforce their own transactions — immutable, manager-free, time-predictable
- ZIPs can be reversed by submitting a new ZIP through the same governance process
- Anyone meeting the proposal threshold (minimum ZRA, which is itself governable) can submit a proposal

### Protocol Upgrades (ZIP)

ZIP specifies a target protocol version and bundled changes. Validators signal readiness by running compatible node software. Once governance approves, the network transitions automatically via required-version transactions that execute without manual intervention. Validators not running compatible software fall out of consensus. ZIPs are versioned, auditable, and executable — they create a permanent verifiable record on-chain.

### Governance at Genesis

At genesis, ZERA had no supply management or minting authority — these capabilities were all added through governance proposals. The supply management contract was deployed via governance and later upgraded via governance proxy chaining. This demonstrates that the governance system controls everything from day one.

---

## 3. ZRA Token & Tokenomics

### What is ZRA?

ZRA is the native coin of the ZERA network. It anchors security, fees, and governance. ZRA is always ACE-enabled (permanent, non-revocable).

**Supply details:**

- Initial Supply: 6,291,475.42238 ZRA
- Maximum Supply: 906,291,475.42 ZRA
- Supply Management Allocation: up to 800,000,000 ZRA
- All mint/burn via governance-enforced mechanisms
- No individual or team can alter supply unilaterally
- Supply issuance approaches zero within a few years
- No minting authority can inflate supply at will

### Fee Structure

Fees start from ~$0.004 per transaction. Users can pay fees in ZRA or any ACE-enabled token.

| Fee Source | Burn | Treasury | Validators |
|---|---|---|---|
| ZRA fees | 25% | 25% | 50% |
| ACE token fees | 0% | 50% | 50% |

Fee parameters are governance-controlled and can be adjusted through proposals.

**Fee types:**

- **Network base fee**: serialized transaction size × per-byte rate
- **Contract fee**: optional, defined by the token contract creator
- **Interface fee**: optional, charged by the integrating application/platform
- **New-wallet fee**: one-time fee for recipients without an existing balance

### How to Buy ZRA

ZRA is currently available as **wZRA** (wrapped ZRA) on **Raydium**, a Solana DEX. wZRA is backed 1:1 by real ZRA on the ZERA network.

**Key addresses:**

- wZRA contract address (Solana): `9zVugUbpn27zvSfBwkhYAG4yvnxdy58ZFS5Rt89zaP15`
- wZRA/USDC liquidity pool on Raydium: `CpaXrJhnLesjnBt893WaBbNkYAEQvpqFZmGExvvA1njg`
- DexScreener: https://dexscreener.com/solana/CpaXrJhnLesjnBt893WaBbNkYAEQvpqFZmGExvvA1njg

**Step-by-step:**

1. **Get a wallet**: Vision Hub (recommended — iOS/Android, native ZERA bridge, Swiss privacy standards) or Phantom (standard Solana wallet)
2. **Buy SOL or USDC** from an exchange (Coinbase, Kraken, Binance, KuCoin, etc.)
3. **Transfer** SOL/USDC to your wallet
4. **Go to Raydium** and swap SOL or USDC for wZRA
5. **(Optional)** Bridge wZRA to native ZRA on the ZERA network using **bridge.zeranetwork.io**

### Supply Management

Supply management is governed by community participation and enforced by the network itself:

- Parameterized bucket burns: adaptive burn models adjusting based on network activity
- Governance-upgradeable logic
- Supply management contract deployed via governance, upgradeable via governance

**Refund mechanism for primary market exchanges:**

- Option A: Time-based full refund (~80% immediate, scaling to ~97% after ~90 days)
- Option B: Immediate partial refund (~90% declining over ~19 weeks)

### NAV (Net Asset Value) Model

The treasury grows with every transaction. Supply dilution is counteracted by value accrual:

- Example: 100 tokens, $100 treasury = $1.00/token NAV
- After additional coins minted at escalating prices, NAV can actually *increase* despite supply growth
- No forced demand — users are not forced to buy ZRA to interact with the network (ACE tokens can pay fees)
- Treasury NAV grows with every transaction

---

## 4. ACE (Authorized Currency Equivalent)

### What Is ACE?

ACE is a protocol-level status that allows approved tokens on ZERA to:

- **Pay network fees natively** (no wrapping or swapping required)
- **Contribute to validator staking** and network security

ACE is genuine protocol-level utility, not a wrapper or marketing label. It is ratified and enforced on-chain via governance.

### Key Rules

- ZRA is permanently ACE-enabled (non-revocable)
- ZRA must maintain >= 50% of total network stake
- Other tokens can apply for ACE status through a governance proposal
- ACE status can be revoked through governance
- Fee splits differ: ZRA fees (25% burn / 25% treasury / 50% validators), ACE token fees (0% burn / 50% treasury / 50% validators)

### Benefits for Tokens

- **Security role**: validator staking participation
- **Fee utility**: native fee payment without wrapping
- **Objective utility**: governance-ratified, on-chain functionality
- **Regulatory benefits**: governance utility reduces "managerial reliance," strengthening posture under Howey Test and MiCA
- **Ecosystem alignment**: fee activity contributes to validators and treasury
- Community has structural incentive to support tokens with ACE roles

---

## 5. Protocol Treasury

### Overview

The ZERA treasury is protocol-native, on-chain, and continuously funded by network activity and supply mechanics. There are no custodians, no signers, and no discretionary spending. Every allocation executes automatically when a proposal passes community vote. The treasury is a public vault — transparent, verifiable, and fully governed by users. No entity takes a cut, no insiders hold keys.

### Funding Sources

| Source | Mechanism |
|---|---|
| ZRA transaction fees | 25% of all ZRA fees flow to treasury |
| ACE token fees | 50% of all ACE token fees flow to treasury |
| Supply management mechanics | Governance-controlled |

All funding mechanics are already live and producing treasury inflows. Multiple independent funding streams provide resilience.

### Treasury Flywheel

1. More network activity → 2. More fees → 3. Bigger treasury → 4. More funding for proposals → 5. Better network → 6. More projects attracted → 7. More network activity (cycle repeats)

### What the Treasury Can Fund

- Protocol upgrades and performance optimizations
- Developer grants (tools, libraries, SDKs, infrastructure)
- New dApps and ecosystem projects
- Education (tutorials, courses, documentation)
- Awareness campaigns and marketing
- Strategic reserves for liquidity, partnerships, ecosystem stability

### Treasury Diversification (Community Paper)

The community has discussed yielding investments from accumulated treasury assets:

- Stablecoins: 40%
- Blue-chip crypto: 30%
- Yield-bearing DeFi/RWA: 20%
- Strategic assets: 10%

The ZERA treasury also holds physical assets (rubies) as discussed in community papers.

### Bitcoin vs ZERA Treasury Comparison

| Aspect | Bitcoin | ZERA |
|---|---|---|
| Supply model | Fixed 21M BTC | Fixed ~906M ZRA cap |
| Fee distribution | All to miners | Split: validators/burn/treasury |
| Treasury | None | Community-controlled, on-chain |
| Value model | Store of value via scarcity | Treasury-supported (like a payment network) |

ZERA's model is compared to Visa/Mastercard — a payment network that generates revenue — but without the centralized corporate layer. Holding ZRA is like being a "shareholder" of the network.

---

## 6. Technology

### Core Architecture

- **Language**: Native C++ build from the ground up (not a fork of any existing blockchain)
- **Smart contracts**: WebAssembly (WASM) — write in Rust, Go, C, or AssemblyScript
- **Consensus**: Validator-based with ACE-integrated staking model
- **Block time**: 5 seconds
- **Finality**: Near-instant
- **Throughput**: ~2,000+ TPS on Layer 1
- **Governance hooks**: Integrated at every protocol layer (consensus, execution, networking, economic, bridge)

### WASM Smart Contracts

- Compile from Rust, Go, C, or AssemblyScript to WebAssembly
- Sandboxed execution with near-native performance
- No vendor lock-in to a single language (unlike Solidity-only chains)
- Governance-aware by design: permissionless or permissioned
- Upgrades autonomously ratified through governance
- Optional permission layers: KYC gates, role-based access, or fully open
- Contract types: TOKEN, NFTS, COLLECTIONS

**Dual fee structure for contracts:**

- User fees: payable in any ACE token
- Runtime costs: funded in ZRA
- Both configurable by contract creator

### Cross-Chain Bridge (ZERA ↔ Solana)

- Non-custodial cross-chain asset transfers
- **Guardian system**: community-elected operators validating cross-chain transfers, governed by proposals/voting
- Origin identity preserved when bridging tokens
- Upgradeable through governance
- Architecture designed to extend to other chains and potential L2s
- SolidProof audit of bridge infrastructure
- Live at: **bridge.zeranetwork.io**

### Fees & Interface Fees

- Most transactions cost cents (~$0.004)
- **Interface fees**: platforms/apps can define permissionless, non-custodial fees — fixed token amount or oracle-determined values via ACE
- **Token fees**: projects can implement configurable fee flows on top of base protocol fees
- All fee parameters are governance-controlled

---

## 7. Developer Information

### Why Build on ZERA?

- **Governance integration**: binding automatic execution, not advisory signals
- **Transparent evolution**: all changes recorded on-chain
- **Lower legal exposure**: reduced "managerial reliance" through autonomous enforcement
- **Multi-language smart contracts**: Rust, Go, C, AssemblyScript → WASM
- **Interface fees**: monetization without custody or gatekeeping
- **Treasury funding**: grants through governance proposals (no VCs required)
- **ACE integration**: deeper protocol utility for your token
- **Contract fees**: configurable and automatically collected

### Developer Pathways

1. **Launch a Token**: Deploy a token contract, optionally apply for ACE status through governance
2. **Build dApps**: WASM contracts with governance hooks and permission layers
3. **Create Interfaces**: Build front-ends, wallets, explorers — earn via interface fees

### Zera.js SDK (TypeScript) — Stable

- **Package**: `@zera-os/zera.js` (v1.0.1)
- **License**: Apache 2.0
- **Requirements**: Node.js >= 20.0.0, ESM (dual CJS/ESM distribution)
- **Repository**: https://github.com/zera-os/zera.js
- **Org**: https://github.com/zera-os

**Capabilities:**

- HD Wallet Generation (BIP39/SLIP-0010, Ed25519/Ed448)
- Token Transfers (multi-input/output CoinTXN — 1-to-1, 1-to-many, many-to-1, many-to-many)
- Smart Contract Execution and Deployment
- DEX Operations (pool creation, liquidity management, swaps)
- Cross-Chain Bridge (ZERA ↔ Solana)
- Governance Voting (binary and multi-option)
- Contract Deployment (TOKEN, NFTS, COLLECTIONS types)
- Network Queries (nonce, balance, fees, token info)
- gRPC Transport (ConnectRPC over gRPC-Web)
- Allowance-based transfers
- NFT/SBT minting and transfers
- Compliance (KYC/AML) assignment
- Expense ratio distribution

**Wallet details:**

- SLIP-0010 HD derivation path: `m/44'/1110'/accountIndex'/changeIndex'/addressIndex'`
- 1110 = ZERA coin type
- All indices hardened (mandatory for EdDSA)
- Address format: `Base58(KeyTypePrefix + HashTypePrefixes + EncodedPublicKey)`
- Key types: Ed25519 (32-byte keys, 64-byte sigs) or Ed448 (57-byte keys, 114-byte sigs)
- Hash types: SHA3-256, SHA3-512, BLAKE3 (applied sequentially as hash chaining)

**DEX fee rates:** 25 BPS (0.25%), 50 BPS, 100 BPS, 200 BPS, 400 BPS, 800 BPS

**Network configuration:**

- Mainnet: `mainnet.zerascan.io:443` (HTTPS)
- Fallback: `mainnet.zerascan.io:8080` (HTTP)

### Go SDK — Beta

- **Package**: `github.com/ZeraVision/zera-go-sdk`
- **Requirements**: Go 1.23.2+
- **Status**: Beta (first release June 2025)

**Endpoints:**

| Service | Endpoint |
|---|---|
| Validator (transactions) | `routing.zera.vision:50052` (gRPC) |
| Validator (nonce/API) | `routing.zera.vision:50053` (gRPC) |
| Indexer (REST) | `https://indexer.zera.vision` |
| Explorer | `https://zerascan.io`, `https://explorer.zera.vision` |

**Modules:** wallet, helper, transcode, convert, nonce, parts, transfer, mint, itemmint, nfttransfer, allowance, governance, compliance, expenseratio, currencyequivalent, contract

**Key types & prefixes:**

- ED25519 (KeyType=1), ED448 (KeyType=2), SPECIAL (KeyType=0)
- BLAKE3 (HashType=1), SHA3_256 (HashType=2), SHA3_512 (HashType=3)
- Key prefixes: `A_c_` (ED25519+BLAKE3), `A_a_` (ED25519+SHA3-256), `B_c_` (ED448+BLAKE3), etc.
- Special prefixes: `r_` (restricted), `gov_` (governance), `sc_` (smart contract)

### Building Ideas with Zera.js

- Non-custodial web/mobile wallets, hardware wallet integration
- Multi-sig coordination tools
- Payment processor/checkout SDK, payroll/batch distribution
- DEX frontend, liquidity management bot, aggregator
- ZERA ↔ Solana bridge UI, cross-chain arbitrage
- Token launchpad, token management dashboard
- NFT/RWA issuance platform
- Governance voting interface, DAO treasury governor, proposal analytics
- CLI wallet tool, testnet faucet, block explorer enhancement
- Yield aggregator, DCA bot, lending protocol frontend
- Tipping widget, gaming economy backend, subscription platform, event ticketing
- Custody solution (Ed448 for max security), regulated token issuance, compliance dashboard

---

## 8. DAO & Institutional Tools

### For DAOs

- Votes are **binding**, not advisory — autonomous execution closes the "who presses the button?" gap
- No foundations or keyholders; supermajorities protect critical changes
- Treasury provides long-term protocol support funded by network activity
- Lifecycle templates: staggered, cycle, multi-stage, adaptive
- Different from Snapshot DAOs: ZERA DAOs produce binding on-chain transactions that execute without human intervention

### For Institutions

- **Configurable governance**: permissioned or permissionless, adaptive timing, role layers
- **Advanced multi-sig**: class-based quorum (Ops, Compliance, Directors) — each class has independent thresholds
- **Immutable audit trails** with governance-aligned change control
- **Protocol-native functions**: expense-ratio distribution, compliance assignment
- Designed to satisfy real compliance requirements
- Optional KYC gates and role-based access at the contract level

---

## 9. Decentralization & Autonomy

- No privileged administrators, no foundation control
- Decentralization achieved structurally: governance + autonomous execution + transparent contracts
- No admin keys or foundation overrides exist anywhere in the protocol
- Supermajority safeguards (75%) protect against hasty or malicious changes
- Proposals enforce their own transactions — immutable, manager-free, time-predictable
- Even emergency situations require governance — there are no backdoors
- Decentralization is not a feature but the foundation of the protocol
- Centralization is structurally impossible, not just unlikely

---

## 10. Regulatory Resilience

**Note: This section represents community perspectives and analysis. It is NOT legal advice.**

### Key Arguments

- Governance-first, autonomously executed model reduces "managerial reliance"
- When outcomes are enforced by code, reliance on identifiable managers diminishes (addresses Howey Test "efforts of others" prong)
- Utility over speculation: governance participation, fee payment (ACE), native staking
- Strengthens "sufficient decentralization" narratives
- Transparent auditability: every proposal, vote, and execution leaves a verifiable on-chain record

### Regulatory Frameworks Addressed

| Framework | ZERA's Position |
|---|---|
| **Howey Test** | No common enterprise, no managerial reliance, utility focus |
| **Reves "Family Resemblance Test"** | Governance and utility instruments, not debt obligations |
| **MiCA** | Governance-driven tokens align with utility classifications |
| **Sufficient Decentralization** (SEC context) | Autonomous execution removes reliance on identifiable parties |

### Benefits for Tokens on ZERA

- ACE utility reduces "speculative investment" characterization
- Governance-ready token contracts with binding execution
- Autonomous enforcement reduces the "efforts of others" element
- Stronger posture under both US (SEC) and EU (MiCA) frameworks

---

## 11. Competitive Positioning

### ZERA vs Bitcoin vs Ethereum vs Solana

| Feature | ZERA | Bitcoin | Ethereum | Solana |
|---|---|---|---|---|
| Block time | 5 seconds | 10 minutes | 12 seconds | ~0.4 seconds |
| Finality | Near-instant | ~1 hour | Near-instant | Near-instant |
| TPS (L1) | ~2,000+ | ~7 | ~30 | ~4,000+ |
| Smart contracts | WASM (multi-language) | None | EVM (Solidity/Vyper) | SVM (Rust) |
| Supply cap | ~906M ZRA | 21M BTC | No cap | No cap |
| Treasury | Protocol-native, governance-controlled | None | Foundation-managed | Foundation-managed |
| Governance | Autonomous on-chain execution | Off-chain (BIPs) | Off-chain (EIPs + multisig) | Off-chain (foundation) |
| Fee model | Multi-asset (ACE) | BTC only | ETH only | SOL only |
| Admin keys | None | N/A | Foundation influence | Foundation influence |
| Core language | C++ (original) | C++ (original) | Go/Rust (multiple clients) | Rust |

**Key differentiator:** ZERA is the only chain where governance decisions execute autonomously at the protocol level. Other chains rely on foundations, multisigs, or core teams to implement governance outcomes.

### ZERA vs Solana (Detailed)

- **Solana strengths**: Huge DeFi/NFT community, fast UX, strong retail adoption, high throughput
- **ZERA strengths**: Regulatory resilience, transparent treasury, institutional appeal, compliance built into contracts, autonomous governance
- Solana depends on Solana Labs/Foundation; ZERA has no equivalent central entity
- Solana has had network outages; ZERA's governance-first design prioritizes stability
- ZERA = "constitutional blockchain" vs Solana = "fast lane" blockchain
- ZERA-Solana bridge being developed by ZERA Vision

---

## 12. Wallets

### Recommended: Vision Hub

- Official ZERA wallet
- Available on iOS and Android
- Native ZERA bridge integration
- Governance voting built in
- Multi-chain swap support
- Swiss privacy standards
- Download: https://apps.apple.com/us/app/vision-hub-zera-web3-wallet/id6758921523

### Alternative: Phantom

- Standard Solana wallet
- Works for purchasing and holding wZRA on Solana
- Does not support native ZERA network features directly

---

## 13. Programs & Funding

### IIT (Innovation & Incubation Treasury)

- 20–30M+ ZRA dedicated to funding innovation on ZERA
- Monthly two-stage governance cycle
- Used for: research, experiments, open-source tools, community-led proposals
- Every disbursement is transparent and enforceable on-chain

### ZMT (ZERA Marketing Treasury)

- Funds education, awareness, events, adoption campaigns
- Community-driven through the same governance process

### ZIP (ZERA Improvement Protocol)

- Protocol upgrades via required-version transactions
- Autonomously executed when governance approves
- Focuses on technical improvements, not funding

### How to Get Funding

Submit an IIT or Treasury proposal through governance. If the community votes in favor, funds are allocated automatically. No VCs, no gatekeepers.

---

## 14. Vision & Community Concepts

### ZERA Democracy (Community Concept — Not a Shipped Product)

- Party-free, continuous civic governance model
- Verified constituents with non-transferable vote tokens (Soul-Bound Tokens / SBTs)
- Continuous referendums instead of episodic voting
- Treasury-tied budgets governed by constituent votes
- Automatic recalls/audits on divergence from mandate
- The blockchain ledger is the source of truth, not a representative's discretion

---

## 15. Key Links

| Resource | URL |
|---|---|
| ZERA Website | https://zera.net/ |
| Network Explorer | https://zerascan.io |
| Cross-Chain Bridge | https://bridge.zeranetwork.io |
| Documentation | https://docs.zera.net |
| ZERA News | https://zera.news/ |
| Raydium (buy wZRA) | https://raydium.io |
| DexScreener | https://dexscreener.com/solana/CpaXrJhnLesjnBt893WaBbNkYAEQvpqFZmGExvvA1njg |
| Vision Hub Wallet | https://apps.apple.com/us/app/vision-hub-zera-web3-wallet/id6758921523 |
| Telegram | https://t.me/ZeraNetwork |
| Linktree | https://linktr.ee/zerachain |
| Indexer API | https://indexer.zera.vision |

---

## 16. Key People & Entities

- **Jesse Federkiewicz**: Canadian technologist, Principal Software Engineer and Advisor to ZERA Vision
- **ZERA Vision**: Private technology company building on the ZERA Network (not a foundation — ZERA has no foundation)
- **SolidProof**: Third-party security auditor
- **Narrativ**: Third-party verification partner

---

## 17. Legal Information

### Terms of Service (Last updated: October 22, 2025)

- Site operated by community groups under Swiss law
- ZERA Network is an open-source decentralized protocol; nobody controls it
- Eligibility: 18+ years old
- Governing law: Switzerland, Zug
- Mandatory individual arbitration via Swiss Rules of International Arbitration
- No class actions permitted
- Claims must be brought within 1 year
- Aggregate liability capped at CHF 200 or 12 months of payments

### Privacy Policy (Last updated: October 22, 2025)

- Privacy-respecting analytics, no cross-site advertising
- IP anonymization if Google Analytics is used
- No payment card data collected
- Data retention only as long as necessary
- GDPR/CCPA compliance provisions
- Cannot alter or remove data already recorded on public blockchains

### Disclaimers

- Content is for informational purposes only — not financial, investment, legal, or tax advice
- Digital assets involve substantial risk (loss of capital, regulatory changes, technical vulnerabilities, volatility, liquidity risks)
- No securities offering
- ZERA is decentralized with no central authority, foundation, or managing entity
- Content created via AI tools based on community resources and may contain inaccuracies
- ZERA operates under the ZERA Open Use and Revenue Sharing License

### Recognition

- ZERA.net recognized via governance proposal (ID: `646c61bc071f380ec5ab9c72957dab16fe90b371792b455c4daff234298d2c50`)
- Community-created content, not official statements from any central authority
- Recognition is revocable through governance

---

## 18. Frequently Asked Questions

### General

**Q: What makes ZERA different from other blockchains?**
A: ZERA is governance-first. When the community votes, the result executes automatically on-chain. There are no foundations, no multisigs, no core teams that can delay or override decisions. This is structural decentralization, not just branding.

**Q: Is ZERA a fork of another blockchain?**
A: No. ZERA is built from scratch in C++ — it is a purpose-built chain designed for autonomous governance.

**Q: How fast is ZERA?**
A: ~2,000+ transactions per second on Layer 1, with a 5-second block time and near-instant finality. Average fee is approximately $0.004.

**Q: Has ZERA been audited?**
A: Yes. ZERA has completed a security audit by SolidProof, including the bridge infrastructure.

**Q: Is there a ZERA foundation?**
A: No. ZERA has no foundation, no core team with special privileges, and no admin keys. The protocol is fully governed by the community through on-chain governance.

**Q: Who built ZERA?**
A: ZERA Vision is a private technology company that built on the ZERA Network. Jesse Federkiewicz is the Principal Software Engineer and Advisor. However, the protocol itself is decentralized and community-governed.

### Governance

**Q: How does governance work?**
A: Community members submit proposals (ZIPs, treasury requests, ACE applications, etc.) and vote using ZRA. When a vote passes, the associated transactions execute immediately and automatically on-chain. No human can stop, delay, or modify the result.

**Q: What prevents one party from taking control?**
A: Supermajority requirements (75%) on critical changes, no admin keys anywhere in the protocol, ZRA must maintain >= 50% of total stake, and autonomous execution ensure no single party can accumulate control.

**Q: How is ZERA governance different from Snapshot?**
A: Snapshot DAOs produce advisory signals that require a trusted team to implement. ZERA governance produces binding on-chain transactions that execute autonomously. There is no human step between "vote passes" and "action happens."

**Q: Can governance decisions be reversed?**
A: Yes, through a new governance proposal. For example, a ZIP can be reversed by submitting a new ZIP through the same process.

**Q: Who can submit proposals?**
A: Anyone meeting the proposal threshold (minimum ZRA requirement, which is itself governable by the community).

### ACE

**Q: What is ACE?**
A: ACE (Authorized Currency Equivalent) is a protocol-level status that allows tokens to pay network fees natively and participate in validator staking. It provides real, on-chain utility — not just a label.

**Q: Can ACE status be revoked?**
A: Yes, through a governance proposal. The community grants and revokes ACE status.

**Q: Is ZRA always ACE-enabled?**
A: Yes. ZRA's ACE status is permanent and non-revocable.

**Q: Do ACE tokens have the same fee split as ZRA?**
A: No. ZRA fees split 25% burn / 25% treasury / 50% validators. ACE token fees split 0% burn / 50% treasury / 50% validators.

### Tokens & Purchasing

**Q: Where can I buy ZRA?**
A: ZRA is available as wZRA on Raydium (Solana DEX). Buy SOL or USDC from any major exchange, transfer to a Solana wallet (Vision Hub or Phantom), and swap on Raydium. You can also view it on DexScreener.

**Q: What is wZRA?**
A: wZRA is "wrapped ZRA" — a Solana-compatible version of ZRA, backed 1:1 by real ZRA. You can bridge it to native ZRA on the ZERA network using bridge.zeranetwork.io.

**Q: What is the wZRA contract address?**
A: `9zVugUbpn27zvSfBwkhYAG4yvnxdy58ZFS5Rt89zaP15` on Solana.

**Q: What wallet should I use?**
A: Vision Hub is the recommended wallet — it has native ZERA support, bridge integration, governance voting, and Swiss privacy standards. Phantom works for holding wZRA on Solana.

**Q: What is the total supply of ZRA?**
A: Initial supply was 6,291,475.42238 ZRA. Maximum supply is 906,291,475.42 ZRA. Supply management allocation allows up to 800M additional ZRA, all governed by community proposals.

### Treasury

**Q: Where does the treasury get its money?**
A: Network activity. 25% of all ZRA transaction fees and 50% of all ACE token fees flow to the treasury automatically. It is not funded by token sales or foundation reserves.

**Q: Who controls the treasury?**
A: The community, through governance. No individual or entity has custody or access. Only passed governance proposals can trigger fund allocation.

**Q: What is the IIT?**
A: The Innovation & Incubation Treasury (IIT) is a 20–30M+ ZRA fund dedicated to funding innovation on ZERA. Projects can apply for IIT funding through a governance proposal with a monthly two-stage cycle.

**Q: What is the ZMT?**
A: The ZERA Marketing Treasury (ZMT) funds community-driven marketing, events, education, and outreach. It is governed by the same proposal and voting process as all other treasury allocations.

### Developers

**Q: What languages can I use for smart contracts?**
A: Anything that compiles to WebAssembly: Rust, Go, C, AssemblyScript, and more.

**Q: Is there an SDK?**
A: Yes. Zera.js (TypeScript, stable, v1.0.1) and a Go SDK (beta) are available. See the developer docs for full API references.

**Q: How do I get funding for my project?**
A: Submit an IIT or Treasury proposal through governance. If the community votes in favor, funds are allocated automatically. No VCs or gatekeepers required.

**Q: What are interface fees?**
A: Interface fees let platforms/apps charge permissionless, non-custodial fees for using their interface. They're configurable per application and don't require custody of user funds.

**Q: What network endpoints should I use?**
A: Mainnet: `mainnet.zerascan.io:443` (HTTPS). Validator: `routing.zera.vision:50052` (transactions), `routing.zera.vision:50053` (nonce/API). Indexer: `https://indexer.zera.vision`.

### Bridge

**Q: How does the bridge work?**
A: The ZERA-Solana bridge uses a Guardian system — community-elected operators who validate cross-chain transfers. It's non-custodial and governed by proposals/voting. Origin identity is preserved when bridging.

**Q: Is the bridge audited?**
A: Yes, by SolidProof.

---

## 19. Troubleshooting Common Issues

### "My transaction isn't going through"

- Confirm you have enough ZRA (or an ACE-enabled token) to cover the fee (~$0.004)
- Check your wallet is connected to the correct network
- Verify the transaction on https://zerascan.io
- Check that you have sufficient balance for any new-wallet fee if sending to a new address

### "I can't find wZRA on Raydium"

- Make sure you are on the Solana version of Raydium
- Search by the wZRA contract address: `9zVugUbpn27zvSfBwkhYAG4yvnxdy58ZFS5Rt89zaP15`
- Ensure your wallet (Phantom or Vision Hub) is connected
- Try the DexScreener link: https://dexscreener.com/solana/CpaXrJhnLesjnBt893WaBbNkYAEQvpqFZmGExvvA1njg

### "The bridge isn't working"

- Confirm you are using bridge.zeranetwork.io
- Ensure you have enough SOL for gas fees on the Solana side
- Guardian validation may take a few moments — wait and check the explorer
- If the issue persists, escalate to a human agent

### "I want to vote but can't"

- You need ZRA tokens to participate in governance
- Make sure your wallet is connected on zerascan.io
- Confirm the proposal is still in its active voting period

### "My wallet isn't connecting"

- Clear browser cache and try again
- Ensure you're using a supported wallet (Vision Hub or Phantom)
- Check that the wallet extension is up to date
- Try a different browser

---

## 20. Chatbot Tone & Behavior Guidelines

- **Be direct and helpful.** Answer the question clearly before offering additional context.
- **Do not speculate on price, returns, or investment outcomes.** ZERA is a technology platform — not an investment vehicle.
- **Never provide financial advice.** If asked, redirect: "I can help you understand how ZERA works, but I'm not able to provide financial or investment advice."
- **For legal questions**, direct users to the Terms of Service, Privacy Policy, and Disclaimer available in the documentation.
- **Reference specific numbers and facts** from this knowledge base when answering questions.
- **Link to relevant resources** (explorer, bridge, docs, wallet downloads) when appropriate.
- **Escalate to a human agent** when:
  - The user reports lost funds or a stuck transaction that can't be resolved
  - The user has a security concern or suspected exploit
  - The question involves legal, compliance, or partnership inquiries
  - The user explicitly asks to speak with a person
  - The chatbot cannot confidently answer the question after two attempts

---

## 21. Escalation Paths

| Issue Type | Action |
|---|---|
| General product questions | Answer from this knowledge base |
| Technical developer questions | Direct to documentation (docs.zera.net) |
| How to buy ZRA | Walk through the step-by-step guide in Section 3 |
| Lost funds / stuck transactions | Escalate to human support immediately |
| Security concerns | Escalate to human support immediately |
| Partnership / business inquiries | Escalate to human support |
| Feature requests | Log and acknowledge; escalate if recurring |
| Feedback / complaints | Log and acknowledge; escalate if the user is dissatisfied |
| Price / investment questions | Decline politely; redirect to how the technology works |
| Legal questions | Direct to Terms of Service, Privacy Policy, and Disclaimer |
