import { bn, h2, h3, p, bullet, callout, codeBlock, divider, cardGroup, accordion, tabs } from '../../blocks';

export const buildingWithZerajsArticle = {
  id: 'building-with-zerajs',
  title: 'Building with Zera.js — Project Ideas & Use Cases',
  slug: 'building-with-zerajs',
  excerpt: 'A comprehensive guide to projects you can build using the @zera-os/zera.js SDK, mapping concrete project ideas to SDK capabilities.',
  category_id: 'developers',
  is_published: true,
  display_order: 5,
  sidebar_title: 'Project Ideas (Zera.js)' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('A comprehensive guide to projects you can build using the @zera-os/zera.js SDK. Each section maps concrete project ideas to the SDK capabilities that power them.'),

    h2('SDK Capabilities at a Glance'),

    cardGroup(3, [
      { title: 'wallet-creation', body: 'HD wallets, key derivation, address generation' },
      { title: 'coin-txn', body: 'Token transfers, multi-sender/receiver payments' },
      { title: 'contract', body: 'Create & update on-chain token contracts' },
      { title: 'smart-contracts/execute', body: 'Call arbitrary smart contract functions' },
      { title: 'smart-contracts/dex', body: 'Liquidity pools, swaps, LP management' },
      { title: 'smart-contracts/bridge', body: 'Cross-chain ZERA ↔ Solana transfers' },
      { title: 'vote', body: 'On-chain governance voting' },
      { title: 'api', body: 'Balances, nonces, token info, exchange rates' },
      { title: 'grpc', body: 'Low-level network transport' },
      { title: 'shared', body: 'Validation, amount conversion, crypto utilities' },
    ]),

    divider(),

    // ─── 1. Wallets & Key Management ────────────────────────────────────────────

    h2('1. Wallets & Key Management'),

    h3('Non-Custodial Web Wallet'),
    p('A browser-based wallet where users own their keys. Import or generate a BIP39 mnemonic, derive multiple accounts from a single seed, view balances, and send transactions — all without a server holding private keys.'),
    p('SDK touchpoints:'),
    bullet('generateMnemonicPhrase() — create a fresh seed phrase'),
    bullet('WalletFactory.createWallet() — derive accounts with Ed25519 or Ed448'),
    bullet('deriveMultipleWallets() — generate an account list from one seed'),
    bullet('getBalance() — display token balances'),
    bullet('createCoinTXN() / sendCoinTXN() — sign and submit transfers'),
    bullet('wallet.secureClear() — wipe sensitive data from memory when done'),
    callout('tips', 'SLIP-0010 compliant HD derivation means one seed phrase controls unlimited addresses. Ed448 support gives you a high-security mode for power users.'),

    divider(),

    h3('Hardware Wallet Integration Layer'),
    p('A library that prepares unsigned transactions so a hardware device can sign them offline. The SDK builds and serializes the transaction; the hardware wallet provides the signature; you broadcast the result.'),
    p('SDK touchpoints:'),
    bullet('createCoinTXN() — build the transaction (no signing step)'),
    bullet('getNonce() — fetch nonce for offline construction'),
    bullet('getTokenFeeInfo() — compute fees ahead of time'),
    bullet('sendCoinTXN() — broadcast after external signing'),

    divider(),

    h3('Mobile Wallet (React Native)'),
    p('The SDK explicitly targets React Native ("react-native": "dist/index.cjs" in package.json). Build a full-featured mobile wallet app with biometric unlock, QR code scanning, and push notifications for incoming transfers.'),
    p('SDK touchpoints: Same as the web wallet — the same API surface works natively on iOS and Android.'),

    divider(),

    h3('Multi-Sig Coordination Tool'),
    p('A UI where multiple parties construct a transaction together. Each participant contributes an input with their own privateKey, publicKey, and feePercent. The tool assembles the final CoinTXN only when all parties have signed.'),
    p('SDK touchpoints:'),
    bullet('Multi-input createCoinTXN() — each input is an independent signer'),
    bullet('feePercent on each input — distribute gas costs across participants'),

    divider(),

    // ─── 2. Payments & Financial Infrastructure ─────────────────────────────────

    h2('2. Payments & Financial Infrastructure'),

    h3('Payment Processor / Checkout SDK'),
    p('A drop-in payment widget for e-commerce. Merchants specify a receiving address and amount; the SDK generates a payment request; users pay directly from their wallet; the merchant backend confirms via balance or transaction polling.'),
    p('SDK touchpoints:'),
    bullet('createCoinTXN() with a single output — straightforward payment'),
    bullet('getBalance() — poll for settlement confirmation'),
    bullet('getExchangeRate() — display prices in fiat equivalents'),
    bullet('isValidAddress() / isValidContractId() — validate merchant configuration'),

    divider(),

    h3('Payroll & Batch Distribution System'),
    p('Distribute salaries, rewards, or airdrop tokens to hundreds of addresses in a single transaction using multi-output support. One sender, many recipients, one fee.'),
    p('SDK touchpoints:'),
    bullet('Multi-output createCoinTXN() — one CoinTXNInput[], many CoinTXNOutput[]'),
    bullet('getTokenDenomination() — convert human amounts to on-chain units correctly'),
    bullet('getNonces() — prefetch nonces for multiple accounts in parallel'),

    divider(),

    h3('Allowance / Delegated Spending System'),
    p('Build an "approved spending" flow — a user pre-authorizes a contract or delegate address to move funds on their behalf. Useful for recurring subscriptions, spending limits, or escrow.'),
    p('SDK touchpoints:'),
    bullet('Allowance-mode createCoinTXN() — allowanceAddress on an input'),
    bullet('The signing key and the spending address are separate parties'),

    divider(),

    h3('Stablecoin Treasury Dashboard'),
    p('Internal tooling for a team managing a multi-token treasury. Track balances across multiple addresses, schedule transfers, and audit transaction history.'),
    p('SDK touchpoints:'),
    bullet('getBalances() — batch-fetch balances for all treasury addresses'),
    bullet('getTokenInfoMap() — resolve denomination and metadata for each token'),
    bullet('createCoinTXN() — execute transfers programmatically'),
    bullet('getExchangeRate() — value the portfolio in USD terms'),

    divider(),

    // ─── 3. DEX Applications ────────────────────────────────────────────────────

    h2('3. Decentralized Exchange (DEX) Applications'),

    h3('DEX Frontend'),
    p('A full trading interface for the ZERA DEX. Users connect wallets, browse pools, provide liquidity, and execute swaps — all in a web app.'),
    p('SDK touchpoints:'),
    bullet('dex.createLiquidityPool() — launch new trading pairs'),
    bullet('dex.addLiquidity() / dex.removeLiquidity() — LP position management'),
    bullet('dex.swap() — execute trades with slippage tolerance'),
    bullet('dex.unlockLiquidity() — release LP tokens after lock expires'),
    bullet('getBalance() — show token balances before and after trades'),
    bullet('resolveAmount() — auto-convert user-entered amounts to on-chain units'),
    callout('info', 'Fee rate reference built into the SDK: 25 BPS (0.25%), 50 BPS, 100 BPS, 200 BPS, 400 BPS, 800 BPS.'),

    divider(),

    h3('Liquidity Management Bot'),
    p('Automated liquidity rebalancing. Monitor pool ratios, add or remove liquidity based on price thresholds, and compound LP rewards.'),
    p('SDK touchpoints:'),
    bullet('dex.addLiquidityAndSend() / dex.removeLiquidityAndSend() — programmatic LP management'),
    bullet('getBalance() — monitor token holdings'),
    bullet('getExchangeRate() — price-based decision logic'),

    divider(),

    h3('Aggregator / Best-Route Finder'),
    p('Query multiple DEX pools, compare effective rates including fees, and route the user\'s trade through the best path. Display the expected output before the user confirms.'),
    p('SDK touchpoints:'),
    bullet('getTokenInfoForSingle() — fetch denomination for amount math'),
    bullet('dex.resolveAmount() — normalize amounts across pools'),
    bullet('dex.swapAndSend() — execute the winning route'),

    divider(),

    h3('Platform Fee Integration (DEX Revenue Model)'),
    p('The swap API has a first-class platformFeeBps and platformFeeAddress parameter. Any app routing trades through the DEX can charge a fee and collect it automatically on-chain.'),
    p('SDK touchpoints:'),
    codeBlock('dex.swap({ platformFeeBps: 100, platformFeeAddress: \'your-address\', ... })\n// tack on 1% to every swap routed through your app', 'typescript'),

    divider(),

    // ─── 4. Cross-Chain Bridge ───────────────────────────────────────────────────

    h2('4. Cross-Chain Bridge Applications'),

    h3('ZERA ↔ Solana Bridge UI'),
    p('A user interface for moving tokens between ZERA and Solana. Walk the user through locking tokens on one chain, waiting for Guardian attestation, and releasing on the other chain.'),
    p('SDK touchpoints:'),
    bullet('solanaBridge.buildLockSplTransaction() — lock SPL tokens on Solana'),
    bullet('solanaBridge.buildLockSolTransaction() — lock native SOL'),
    bullet('bridgeZeraToSolAndSend() — initiate transfer from ZERA side'),
    bullet('guardianBridge.createGuardianClient().getPayload() — poll for VAA attestation'),
    bullet('solanaBridge.buildReleaseSplTransaction() — complete release on Solana'),

    divider(),

    h3('Cross-Chain Arbitrage Bot'),
    p('Monitor price discrepancies between ZERA DEX and Solana DEXes (Raydium, Orca). When a profitable gap exists, bridge assets and trade to capture the spread.'),
    p('SDK touchpoints:'),
    bullet('bridgeZeraToSolAndSend() — move ZERA-side assets to Solana'),
    bullet('solanaBridge.buildLockSplTransaction() — move Solana-side assets to ZERA'),
    bullet('dex.swapAndSend() — trade on ZERA side'),
    bullet('guardianBridge — monitor bridge status'),

    divider(),

    h3('Token Registration Service'),
    p('The bridge requires tokens to be registered before they can be transferred. Build tooling to handle registerToken transactions on Solana, creating the on-chain metadata needed for a new bridgeable asset.'),
    p('SDK touchpoints:'),
    bullet('solanaBridge.buildRegisterTokenTransaction() — on-chain token registration'),
    bullet('solanaBridge.deriveTokenRegistrationPDA() — compute the program-derived address'),
    bullet('solanaBridge.deriveWrappedMintPDA() — derive wrapped mint address'),

    divider(),

    // ─── 5. Token & Contract Lifecycle ───────────────────────────────────────────

    h2('5. Token & Contract Lifecycle Tools'),

    h3('Token Launchpad'),
    p('A wizard-style UI where anyone can create a new token on ZERA: pick a symbol, set supply, configure governance, add premint wallets, and deploy — no raw transaction building required.'),
    p('SDK touchpoints:'),
    bullet('createContract() — deploy the InstrumentContract'),
    bullet('sendCreateContract() — submit to network'),
    bullet('createContract options: symbol, name, maxSupply, coinDenomination, governance, premintWallets, customParameters'),

    divider(),

    h3('Token Management Dashboard'),
    p('After launch, a token issuer needs to update contract parameters, adjust fees, and track the token\'s on-chain state.'),
    p('SDK touchpoints:'),
    bullet('updateContract() — update name, fees, expense ratio, compliance flags'),
    bullet('sendUpdateContract() — submit the update'),
    bullet('getTokenFeeInfo() — inspect current fee configuration'),
    bullet('isTokenSupported() — verify the token is live on the network'),

    divider(),

    h3('NFT / RWA Issuance Platform'),
    p('ZERA contracts support customParameters, tokenCompliance, and kycStatus. These are the building blocks for compliant token issuance — real-world asset (RWA) tokens or restricted securities that require KYC.'),
    p('SDK touchpoints:'),
    codeBlock('createContract({ kycStatus: true, tokenCompliance: [...], customParameters: [...] })\n// deploy a compliant token\n\nupdateContract({ immutableKycStatus: true })\n// lock compliance settings permanently', 'typescript'),

    divider(),

    h3('Smart Contract Interaction SDK Wrapper'),
    p('Wrap createSmartContractExecuteTXN in domain-specific helpers for any existing ZERA smart contract. Define the function names and parameter types once; your library users call clean, typed methods.'),
    p('SDK touchpoints:'),
    codeBlock('createSmartContractExecuteTXN(contractName, instance,\n  functionName, parameters, ...)\n// generic execution\n\nParamType.BYTES / UINT32 / UINT64 / STRING\n// typed parameter passing', 'typescript'),

    divider(),

    // ─── 6. Governance & DAO Tools ───────────────────────────────────────────────

    h2('6. Governance & DAO Tools'),

    h3('Governance Voting Interface'),
    p('A UI where token holders can browse open proposals and cast votes. Display proposal metadata, current vote counts, and deadline — then submit the user\'s vote on-chain.'),
    p('SDK touchpoints:'),
    bullet('createVoteTXN() — build a governance vote'),
    bullet('sendVoteTXN() — submit to the network'),
    bullet('Binary votes: { support: true/false }'),
    bullet('Multi-option votes: { supportOption: 2 } — select among N choices'),

    divider(),

    h3('DAO Treasury Governor'),
    p('Automate treasury actions triggered by passed governance proposals. A bot watches for successful votes, then executes the corresponding transactions (token transfers, contract updates, liquidity adjustments).'),
    p('SDK touchpoints:'),
    bullet('createVoteTXN() — vote on proposals programmatically'),
    bullet('createCoinTXN() — execute treasury transfers on approval'),
    bullet('updateContract() — apply parameter changes that passed governance'),

    divider(),

    h3('Proposal Analytics Dashboard'),
    p('Read on-chain governance data, visualize participation rates, track voting power distribution, and identify whale wallets that consistently swing votes.'),
    p('SDK touchpoints:'),
    bullet('getBalance() — fetch token balances (voting power)'),
    bullet('getTokenInfoForSingle() — token metadata for context'),
    bullet('getNonces() — estimate account activity levels'),

    divider(),

    // ─── 7. Developer Tools & Infrastructure ─────────────────────────────────────

    h2('7. Developer Tools & Infrastructure'),

    h3('CLI Wallet Tool'),
    p('A command-line tool for developers and power users: generate wallets, check balances, send tokens, create contracts, and interact with the DEX — all from the terminal.'),
    codeBlock('zera wallet create --key-type ed25519\nzera wallet balance --address <addr>\nzera send --to <addr> --amount 100 --token \'$ZRA+0000\'\nzera dex swap --token-in \'$ZRA+0000\' --token-out \'$LEET+1337\' --amount 5', 'shell'),
    p('SDK touchpoints: Every module — the CLI is a thin shell around the full SDK.'),

    divider(),

    h3('Testnet Faucet'),
    p('A web service that drips test tokens to developer addresses. Users paste their address, solve a CAPTCHA, and receive a small balance automatically.'),
    p('SDK touchpoints:'),
    bullet('createCoinTXN() / sendCoinTXN() — dispense tokens from a faucet wallet'),
    bullet('getBalance() — enforce per-address rate limits'),
    bullet('isValidAddress() — validate the submitted address before processing'),

    divider(),

    h3('Block Explorer Enhancement Library'),
    p('Add ZERA Network awareness to your block explorer. Decode raw transactions, resolve contract IDs to human-readable names, and display token balances alongside transaction history.'),
    p('SDK touchpoints:'),
    bullet('getTokenInfoMap() — bulk-resolve token metadata'),
    bullet('getBalance() / getBalances() — fetch address balances'),
    bullet('isValidContractId() / isValidAddress() — input validation'),
    bullet('fromSmallestUnits() — convert raw amounts to human-readable display values'),

    divider(),

    h3('SDK Health Monitor'),
    p('A service that continuously pings ZERA validators, measures latency, checks fee info freshness, and alerts when the network is degraded. Useful for wallets and exchanges that need uptime guarantees.'),
    p('SDK touchpoints:'),
    bullet('getExchangeRate() — lightweight liveness check'),
    bullet('getTokenFeeInfo() — validates fee data is current'),
    bullet('createValidatorAPIClient({ host, port }) — configurable per validator'),
    bullet('GRPCConfig fallback — automatic HTTP fallback built in'),

    divider(),

    h3('Transaction Builder & Simulator'),
    p('A visual tool where developers drag-and-drop inputs and outputs to construct complex multi-party transactions, preview the fee breakdown, and test-submit to a local or testnet node.'),
    p('SDK touchpoints:'),
    bullet('createCoinTXN() — build without sending'),
    bullet('getTokenFeeInfo() — fee preview'),
    bullet('getExchangeRate() — USD-denominated fee estimates'),
    bullet('sendCoinTXN() — optional submission once satisfied'),

    divider(),

    // ─── 8. DeFi Protocols & Yield Products ──────────────────────────────────────

    h2('8. DeFi Protocols & Yield Products'),

    h3('Yield Aggregator'),
    p('Route user funds to the highest-yielding DEX pool automatically. Monitor APRs across pools, rebalance positions, and compound returns.'),
    p('SDK touchpoints:'),
    bullet('dex.addLiquidityAndSend() / dex.removeLiquidityAndSend() — move between pools'),
    bullet('dex.swapAndSend() — convert between tokens during rebalancing'),
    bullet('getBalance() — track position sizes'),

    divider(),

    h3('Dollar-Cost Averaging (DCA) Bot'),
    p('Automatically purchase a target token on a schedule (daily, weekly) by executing a swap at each interval regardless of price. Reduces timing risk for long-term holders.'),
    p('SDK touchpoints:'),
    bullet('dex.swapAndSend() — scheduled purchases'),
    bullet('getExchangeRate() — log cost basis at each purchase'),
    bullet('getBalance() — verify sufficient funds before each run'),

    divider(),

    h3('Lending Protocol Frontend'),
    p('If a lending contract exists on ZERA, build the user interface for depositing collateral, borrowing tokens, and tracking health ratios. All contract interactions go through createSmartContractExecuteTXN.'),
    p('SDK touchpoints:'),
    bullet('createSmartContractExecuteTXN() — call deposit, borrow, repay, liquidate functions'),
    bullet('getBalance() — display positions'),
    bullet('getTokenInfoForSingle() — denominate positions correctly'),

    divider(),

    h3('Liquidity Bootstrapping Pool (LBP) Tool'),
    p('A time-weighted liquidity pool for fair token launches. Set initial weights, let them shift over the sale period, collect proceeds.'),
    p('SDK touchpoints:'),
    bullet('dex.createLiquidityPool() — configure the initial pool'),
    bullet('dex.addLiquidity() / dex.removeLiquidity() — manage positions during the event'),
    bullet('createContract() — deploy the new token being launched'),

    divider(),

    // ─── 9. Consumer & Social Applications ───────────────────────────────────────

    h2('9. Consumer & Social Applications'),

    h3('Tipping / Social Payments Widget'),
    p('Embed a tip button on any website. Viewers can send micro-payments to content creators in a single click — no account registration required beyond a wallet.'),
    p('SDK touchpoints:'),
    bullet('createCoinTXN() — one-output transfers'),
    bullet('getBalance() — creator earnings dashboard'),
    bullet('isValidAddress() — validate creator addresses at setup time'),

    divider(),

    h3('Gaming Economy Backend'),
    p('Issue in-game currency as a ZERA token, let players trade items on a DEX pool, and reward top performers with token airdrops.'),
    p('SDK touchpoints:'),
    bullet('createContract() — launch the game token'),
    bullet('createCoinTXN() with multi-output — airdrop rewards to winners'),
    bullet('dex.createLiquidityPool() — create a player-to-player trading market'),
    bullet('createSmartContractExecuteTXN() — call game contract functions (mint, burn, equip)'),

    divider(),

    h3('Subscription / Membership Platform'),
    p('A creator monetization platform. Members pay a recurring fee (via allowance delegation), get access to gated content, and the platform collects a percentage.'),
    p('SDK touchpoints:'),
    bullet('Allowance-mode createCoinTXN() — delegated spending from subscriber\'s wallet'),
    bullet('createContract() — membership token'),
    bullet('getBalance() — validate active membership status'),

    divider(),

    h3('Event Ticketing System'),
    p('Issue event tickets as on-chain tokens. Buyers receive a token; at the door, the venue scans a QR code that proves ownership; tickets can be traded (or marked non-transferable via KYC compliance).'),
    p('SDK touchpoints:'),
    bullet('createContract({ kycStatus: true }) — non-transferable ticket tokens'),
    bullet('createCoinTXN() — ticket sales and peer-to-peer resales'),
    bullet('getBalance() — door entry validation'),

    divider(),

    // ─── 10. Enterprise & Institutional Use Cases ────────────────────────────────

    h2('10. Enterprise & Institutional Use Cases'),

    h3('Custody Solution'),
    p('Build an institutional-grade custody backend using the wallet creation module. HD derivation means one master key generates isolated addresses per client, per asset, per purpose — all without ever touching a database of private keys.'),
    p('SDK touchpoints:'),
    bullet('WalletFactory with Ed448 key type — maximum security curve'),
    bullet('deriveMultipleWallets() — deterministic, auditable address derivation'),
    bullet('wallet.secureClear() — memory hygiene after use'),
    bullet('Manual nonce via CoinTXNInput.nonce — offline signing workflows'),

    divider(),

    h3('Regulated Token Issuance (RWA / Securities)'),
    p('Issue tokenized real-world assets with on-chain compliance controls: KYC gating, transfer restrictions, expense ratios for fund management.'),
    p('SDK touchpoints:'),
    codeBlock('createContract({ kycStatus: true, immutableKycStatus: true,\n  tokenCompliance: [...] })\n// deploy a restricted token\n\ncreateContract({ expenseRatio: [...] })\n// model management fees\n\ncreateContract({ maxSupplyRelease: [...] })\n// controlled minting schedule', 'typescript'),

    divider(),

    h3('Multi-Chain Treasury Management'),
    p('A hedge fund or DAO manages assets on both ZERA and Solana. Rebalance across chains using the bridge, trade on both DEXes, and report a unified portfolio.'),
    p('SDK touchpoints:'),
    bullet('bridgeZeraToSolAndSend() / solanaBridge.buildLockSplTransaction() — move assets across chains'),
    bullet('dex.swapAndSend() — trade on ZERA'),
    bullet('getBalances() — portfolio snapshot'),
    bullet('getExchangeRate() — USD valuation'),

    divider(),

    h3('Compliance & Audit Dashboard'),
    p('Regulators or compliance officers need a read-only view of token flows: who holds what, when transfers occurred, and whether KYC-gated tokens moved to unauthorized addresses.'),
    p('SDK touchpoints:'),
    bullet('getBalances() — snapshot holdings across address lists'),
    bullet('getTokenInfoForSingle() — inspect compliance settings of a token'),
    bullet('isTokenSupported() — verify token registration status'),

    divider(),

    // ─── SDK Compatibility & Getting Started ─────────────────────────────────────

    h2('SDK Compatibility Quick Reference'),

    cardGroup(2, [
      { title: 'Node.js ≥ 20', body: 'Fully supported' },
      { title: 'Modern Browsers', body: 'Yes (ESM)' },
      { title: 'React Native', body: 'Yes (CJS bundle)' },
      { title: 'TypeScript', body: 'First-class (full types)' },
      { title: 'Cryptography', body: 'Ed25519 (FIPS 186-4), Ed448 (FIPS 186-5), SHA3, BLAKE3' },
      { title: 'Network', body: 'Mainnet mainnet.zerascan.io:443, configurable for testnet' },
    ]),

    divider(),

    h2('Getting Started Fast'),

    codeBlock('npm install @zera-os/zera.js', 'shell'),

    codeBlock(`import {
  generateMnemonicPhrase,
  WalletFactory,
  KEY_TYPE,
  HASH_TYPE,
  createCoinTXN,
  sendCoinTXN
} from '@zera-os/zera.js'

// 1. Generate a wallet
const mnemonic = generateMnemonicPhrase(12)
const factory = new WalletFactory()
const wallet = await factory.createWallet({
  mnemonic,
  keyType: KEY_TYPE.ED25519,
  hashTypes: [HASH_TYPE.BLAKE3]
})

// 2. Send tokens
const txn = await createCoinTXN(
  [{ privateKey: wallet.privateKey, publicKey: wallet.publicKey, amount: '10', feePercent: '100' }],
  [{ to: 'recipient-address', amount: '10' }],
  '$ZRA+0000'
)
const hash = await sendCoinTXN(txn)
console.log('Transaction hash:', hash)`, 'typescript'),

    p('All modules include runnable examples under src/*/examples/. Execute any of them directly:'),
    codeBlock('npx tsx src/wallet-creation/examples/basic-usage.ts\nnpx tsx src/smart-contracts/uses-cases/dex/examples/dex-operations.ts\nnpx tsx src/coin-txn/examples/real-world-usage.ts', 'shell'),
  ]),
};
