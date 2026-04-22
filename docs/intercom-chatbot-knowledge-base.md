# Zera Customer Support Chatbot Knowledge Base

> **Purpose:** This document is the single source of truth for the Intercom chatbot on the Zera landing page. It covers product information, common questions, onboarding guidance, troubleshooting, and escalation paths.

---

## 1. What Is Zera?

ZERA is a **governance-first blockchain network** where community votes execute automatically on-chain. There are no foundations, no core teams, and no central points of failure. When the community votes on something, it happens — autonomously, through protocol-level enforcement.

**Key facts:**

- Built from scratch in C++ (not a fork of any existing chain)
- 3,000+ transactions per second (TPS)
- ~$0.004 average transaction fee
- SolidProof security audit completed
- Smart contracts powered by WebAssembly (WASM) — write in Rust, Go, C, or AssemblyScript
- Fully decentralized: no admin keys, no foundation control

---

## 2. Core Features

### Autonomous Governance Engine

Every governance decision executes on-chain without human intervention. When a vote passes, it happens — no multisig, no core team approval, no delay.

**Proposal types:**

| Proposal Type | Purpose |
|---|---|
| **ZIP** (ZERA Improvement Proposal) | Protocol-level upgrades and changes |
| **Treasury Proposal** | Fund allocation from the protocol treasury |
| **IIT** (Innovation & Incubation Treasury) | Funding for innovation projects (30M+ ZRA dedicated) |
| **ZMT** (ZERA Marketing Treasury) | Community-driven marketing and events |
| **ACE Proposal** | Token utility decisions (grant/revoke ACE status) |

### Protocol Treasury

- A public, on-chain vault funded continuously by network activity
- **25% of ZRA fees** and **50% of ACE token fees** flow to the treasury
- No custodians. No insiders hold keys. Fully transparent and verifiable.
- Only governance-passed proposals can trigger fund allocation

### ACE (Authorized Currency Equivalent)

ACE allows tokens on ZERA to:

- **Pay network fees natively** (not just ZRA)
- **Contribute to validator staking**

ZRA is permanently ACE-enabled. Other tokens can apply for ACE status through a governance proposal. ACE status can also be revoked by governance.

### WASM Smart Contracts

- Write contracts in **Rust, Go, C, or AssemblyScript** — not limited to Solidity
- Sandboxed execution with near-native performance
- Governance-upgradeable contracts
- Optional permission layers for institutional needs

### Cross-Chain Bridge (ZERA <> Solana)

- Non-custodial cross-chain asset transfers
- Guardian-based validation (governance-controlled)
- Live at: **bridge.zeranetwork.io**

### DAO & Institutional Tools

- Configurable governance (permissioned or permissionless)
- Class-based multi-sig (Ops, Compliance, Directors — each with independent thresholds)
- Immutable on-chain audit trails
- Expense ratio distribution for institutional use cases

---

## 3. ZRA Token

### What is ZRA?

ZRA is the native token of the ZERA network. It is used for transaction fees, governance voting, validator staking, and treasury funding.

### How to Buy ZRA

ZRA is currently available as **wZRA** (wrapped ZRA) on **Raydium**, a Solana DEX.

**Step-by-step:**

1. Create a wallet that supports Solana (e.g., **Phantom** or **Vision Hub**)
2. Purchase SOL or USDC from an exchange (Coinbase, Kraken, Binance, KuCoin, etc.)
3. Transfer SOL/USDC to your wallet
4. Go to Raydium and swap SOL or USDC for wZRA
5. (Optional) Bridge wZRA to native ZRA on the ZERA network using **bridge.zeranetwork.io**

### Fee Structure

| Fee Source | Burn | Treasury | Validators |
|---|---|---|---|
| ZRA fees | 25% | 25% | 50% |
| ACE token fees | 0% | 50% | 50% |

---

## 4. Wallets

### Recommended: Vision Hub

- Official ZERA wallet
- Native bridge integration
- Governance voting built in
- Multi-chain swap support

### Alternative: Phantom

- Standard Solana wallet
- Works for purchasing and holding wZRA on Solana
- Does not support native ZERA network features directly

---

## 5. Key Links

| Resource | URL |
|---|---|
| Network Explorer | https://zerascan.io |
| Cross-Chain Bridge | https://bridge.zeranetwork.io |
| Documentation | https://docs.zeranetwork.io |
| Raydium (buy wZRA) | https://raydium.io |

---

## 6. Developer Information

### SDKs

**Zera.js (TypeScript)** — v1.0.1, stable

- Package: `@zera-os/zera.js`
- Requires Node.js >= 20.0.0
- Features: wallet generation, token transfers, smart contracts, DEX operations, bridging, governance voting, contract deployment
- License: MIT

**Go SDK** — Beta

- Repository: `github.com/ZeraVision/zera-go-sdk`
- Requires Go 1.23.2+
- Features: wallet management, transfers, minting, NFTs, governance, compliance, ACE management

### Network Endpoints

| Service | Endpoint |
|---|---|
| Validator (transactions) | `routing.zera.vision:50052` (gRPC) |
| Validator (nonce/API) | `routing.zera.vision:50053` (gRPC) |
| Indexer (REST) | `https://indexer.zera.vision` |

### Smart Contract Languages

Rust, Go, C, AssemblyScript — anything that compiles to WebAssembly.

---

## 7. Frequently Asked Questions

### General

**Q: What makes ZERA different from other blockchains?**
A: ZERA is governance-first. When the community votes, the result executes automatically on-chain. There are no foundations, no multisigs, no core teams that can delay or override decisions. This is structural decentralization, not just branding.

**Q: Is ZERA a fork of another blockchain?**
A: No. ZERA is built from scratch in C++ — it is a purpose-built chain designed for autonomous governance.

**Q: How fast is ZERA?**
A: Over 3,000 transactions per second with an average fee of approximately $0.004.

**Q: Has ZERA been audited?**
A: Yes. ZERA has completed a security audit by SolidProof.

### Governance

**Q: How does governance work?**
A: Community members submit proposals (ZIPs, treasury requests, ACE applications, etc.) and vote using ZRA. When a vote passes, the associated transactions execute immediately and automatically on-chain. No human can stop, delay, or modify the result.

**Q: What prevents one party from taking control?**
A: Supermajority requirements on critical changes, no admin keys anywhere in the protocol, and autonomous execution ensure no single party can accumulate control.

**Q: How is ZERA governance different from Snapshot?**
A: Snapshot DAOs produce advisory signals that require a trusted team to implement. ZERA governance produces binding on-chain transactions that execute autonomously. There is no human step between "vote passes" and "action happens."

### ACE

**Q: What is ACE?**
A: ACE (Authorized Currency Equivalent) is a protocol-level status that allows tokens to pay network fees and participate in validator staking. It provides real, on-chain utility — not just a label.

**Q: Can ACE status be revoked?**
A: Yes, through a governance proposal. The community grants and revokes ACE status.

**Q: Is ZRA always ACE-enabled?**
A: Yes. ZRA's ACE status is permanent and non-revocable.

### Tokens & Purchasing

**Q: Where can I buy ZRA?**
A: ZRA is available as wZRA on Raydium (Solana DEX). Buy SOL or USDC from any major exchange, transfer to a Solana wallet (Phantom or Vision Hub), and swap on Raydium.

**Q: What is wZRA?**
A: wZRA is "wrapped ZRA" — a Solana-compatible version of ZRA. You can bridge it to native ZRA on the ZERA network using the bridge at bridge.zeranetwork.io.

**Q: What wallet should I use?**
A: Vision Hub is the recommended wallet — it has native ZERA support, bridge integration, and governance voting. Phantom works for holding wZRA on Solana.

### Treasury

**Q: Where does the treasury get its money?**
A: Network activity. 25% of all ZRA transaction fees and 50% of all ACE token fees flow to the treasury automatically. It is not funded by token sales or foundation reserves.

**Q: Who controls the treasury?**
A: The community, through governance. No individual or entity has custody or access. Only passed governance proposals can trigger fund allocation.

**Q: What is the IIT?**
A: The Innovation & Incubation Treasury (IIT) is a 30M+ ZRA fund dedicated to funding innovation on ZERA. Projects can apply for IIT funding through a governance proposal.

**Q: What is the ZMT?**
A: The ZERA Marketing Treasury (ZMT) funds community-driven marketing, events, and outreach. It is governed by the same proposal and voting process as all other treasury allocations.

### Developers

**Q: What languages can I use for smart contracts?**
A: Anything that compiles to WebAssembly: Rust, Go, C, AssemblyScript, and more.

**Q: Is there an SDK?**
A: Yes. Zera.js (TypeScript, stable) and a Go SDK (beta) are available. See the developer docs for full API references.

**Q: How do I get funding for my project?**
A: Submit an IIT or Treasury proposal through governance. If the community votes in favor, funds are allocated automatically.

---

## 8. Troubleshooting Common Issues

### "My transaction isn't going through"

- Confirm you have enough ZRA (or an ACE-enabled token) to cover the fee (~$0.004)
- Check your wallet is connected to the correct network
- Verify the transaction on https://zerascan.io

### "I can't find wZRA on Raydium"

- Make sure you are on the Solana version of Raydium
- Search by the wZRA contract address (available in the official docs or community channels)
- Ensure your wallet (Phantom or Vision Hub) is connected

### "The bridge isn't working"

- Confirm you are using bridge.zeranetwork.io
- Ensure you have enough SOL for gas fees on the Solana side
- Guardian validation may take a few moments — wait and check the explorer
- If the issue persists, escalate to a human agent

### "I want to vote but can't"

- You need ZRA tokens to participate in governance
- Make sure your wallet is connected on zerascan.io
- Confirm the proposal is still in its active voting period

---

## 9. Chatbot Tone & Behavior Guidelines

- **Be direct and helpful.** Answer the question clearly before offering additional context.
- **Do not speculate on price, returns, or investment outcomes.** ZERA is a technology platform — not an investment vehicle.
- **Never provide financial advice.** If asked, redirect: "I can help you understand how ZERA works, but I'm not able to provide financial or investment advice."
- **For legal questions**, direct users to the Terms of Service, Privacy Policy, and Disclaimer available in the documentation.
- **Escalate to a human agent** when:
  - The user reports lost funds or a stuck transaction that can't be resolved
  - The user has a security concern or suspected exploit
  - The question involves legal, compliance, or partnership inquiries
  - The user explicitly asks to speak with a person
  - The chatbot cannot confidently answer the question after two attempts

---

## 10. Competitive Positioning (For Handling Comparison Questions)

| Feature | ZERA | Bitcoin | Ethereum | Solana |
|---|---|---|---|---|
| Governance execution | Autonomous, on-chain | None | Off-chain / multisig | Off-chain / foundation |
| Smart contract languages | Rust, Go, C, AssemblyScript | None | Solidity, Vyper | Rust (SVM) |
| Treasury | Protocol-native, governance-controlled | None | Foundation-managed | Foundation-managed |
| Transaction fees | ~$0.004 | Variable, often high | Variable, often high | Low |
| Token utility (ACE) | Native fee payment + staking for any approved token | N/A | N/A | N/A |
| Admin keys / foundation control | None | N/A | Foundation influence | Foundation influence |

**Key differentiator to emphasize:** ZERA is the only chain where governance decisions execute autonomously at the protocol level. Other chains rely on foundations, multisigs, or core teams to implement governance outcomes.

---

## 11. Escalation Paths

| Issue Type | Action |
|---|---|
| General product questions | Answer from this knowledge base |
| Technical developer questions | Direct to documentation (docs.zeranetwork.io) |
| Lost funds / stuck transactions | Escalate to human support immediately |
| Security concerns | Escalate to human support immediately |
| Partnership / business inquiries | Escalate to human support |
| Feature requests | Log and acknowledge; escalate if recurring |
| Feedback / complaints | Log and acknowledge; escalate if the user is dissatisfied |
