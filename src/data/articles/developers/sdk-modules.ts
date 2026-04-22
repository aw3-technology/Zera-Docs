import { bn, h2, h3, p, bullet, callout, codeBlock, cardGroup, accordion, divider, tabs } from '../../blocks';

export const sdkModulesArticle = {
  id: 'sdk-modules',
  title: 'Zera.js SDK — Module Reference',
  slug: 'sdk-modules',
  excerpt: 'Detailed reference for every Zera.js module: wallets, transactions, smart contracts, DEX, bridge, governance, contract deployment, transport, and API services.',
  category_id: 'developers',
  is_published: true,
  display_order: 6,
  sidebar_title: 'SDK Modules' as string | null,
  icon: null as string | null,
  created_at: '2026-04-22T00:00:00Z',
  updated_at: '2026-04-22T00:00:00Z',
  content: bn([
    p('This reference covers every module in the Zera.js SDK, including key classes, public APIs, interfaces, and data flows.'),

    // ── Wallet Creation ─────────────────────────────────────────────────────
    h2('Wallet Creation'),
    p('Directory: src/wallet-creation/'),
    p('The wallet creation module generates fully compliant HD wallets for the ZERA Network. It handles the complete lifecycle from mnemonic to signed address.'),

    h3('Key Classes'),
    bullet('WalletFactory — Top-level factory; orchestrates all wallet creation'),
    bullet('SLIP0010HDWallet — SLIP-0010 HD node: HMAC-SHA512 key derivation, extended keys'),
    bullet('Ed25519KeyPair — Ed25519 key pair; wraps @noble/curves/ed25519'),
    bullet('Ed448KeyPair — Ed448 key pair; wraps @noble/curves/ed448'),
    bullet('CryptoUtils — Secure memory clearing, random byte generation'),

    h3('Wallet Creation Flow'),
    codeBlock(
`User provides: mnemonic + keyType + hashTypes + hdOptions
    |
    v
generateSeed(mnemonic, passphrase)
  └── bip39.mnemonicToSeedSync (PBKDF2, 2048 iterations, 64 bytes)
    |
    v
buildDerivationPath(hdOptions)
  └── "m/44'/1110'/0'/0'/0'"  (all segments HARDENED — SLIP-0010 requirement)
    |
    v
createHDWallet(seed, path, keyType)
  └── SLIP0010HDWallet: chain HMAC-SHA512 down each path level
    |
    v
Ed25519KeyPair.fromHDNode(hdNode)  ——or——  Ed448KeyPair.fromHDNode(hdNode)
  └── raw 32-byte private key → public key via @noble
    |
    v
generateZeraAddress(publicKey, keyType, hashTypes)
  └── optional sequential hash chaining: SHA3-256 → SHA3-512 → BLAKE3
  └── prefix: "01" (Ed25519) or "02" (Ed448) + hash type prefix(es)
  └── Base58Check encode → ZERA address
    |
    v
Wallet { address, publicKey, privateKey, extendedKeys, secureClear() }`, 'text'),

    callout('tips', 'deriveMultipleWallets() avoids repeating expensive PBKDF2 and the first two HD levels. Master node is cached at m/44\'/1110\' — each additional account only needs 3 HMAC ops. Result: ~34s → <1s for 20 wallets.'),

    h3('Address Format'),
    codeBlock(
`ZERA Address = Base58( KeyTypePrefix + HashTypePrefixes + EncodedPublicKey )

Ed25519, no hash:         "01" + raw_pubkey_bytes
Ed25519, SHA3-256:        "01" + "01" + sha3_256(raw_pubkey_bytes)
Ed25519, SHA3+BLAKE3:     "01" + "01" + "03" + blake3(sha3_256(raw_pubkey_bytes))
Ed448, no hash:           "02" + raw_pubkey_bytes`, 'text'),

    h3('Supported Configurations'),
    codeBlock(
`KEY_TYPE     = 'ed25519' | 'ed448'
HASH_TYPE    = 'sha3_256' | 'sha3_512' | 'blake3'
// hashTypes is an ordered array — applied sequentially (hash chaining)

SLIP-0010 derivation path: m/44'/1110'/accountIndex'/changeIndex'/addressIndex'
// 1110 = ZERA coin type (ZERA_TYPE)
// All indices are HARDENED (bit 31 set) — mandatory for EdDSA curves`, 'typescript'),

    divider(),

    // ── Coin Transactions ────────────────────────────────────────────────────
    h2('Coin Transactions (CoinTXN)'),
    p('Directory: src/coin-txn/'),
    p('CoinTXN is the primary token transfer mechanism. It supports multi-input / multi-output transfers with automatic fee calculation.'),

    h3('Public API'),
    codeBlock(
`// Build a signed transaction (not submitted)
createCoinTXN(options: CoinTXNOptions): Promise<{ txn: CoinTXN; hash: string }>

// Build + submit to network
sendCoinTXN(options: CoinTXNOptions): Promise<SubmitResponse>

interface CoinTXNInput {
  walletAddress: string    // sender address
  privateKey: string       // base58-encoded private key
  publicKey: string        // public key identifier
}

interface CoinTXNOutput {
  walletAddress: string    // recipient address
  amount: AmountInput      // human-readable amount (e.g., "1.5")
}`, 'typescript'),

    h3('Transaction Build Flow'),
    codeBlock(
`1. Validate inputs/outputs
2. getAddressAndNonce(publicKeyId) → fetch nonce from network
3. Build CoinTXN protobuf:
   - inputTransfers[]   (senders with public key + nonce)
   - outputTransfers[]  (recipients with amount in smallest units)
   - contractId         (token being transferred)
   - timestamp
4. UniversalFeeCalculator.calculateFee(protoObject, feeConfig)
   ├── Contract fee (if token has a fee schedule)
   ├── Interface fee (if integrator specifies one)
   ├── Network base fee (auto-calculated from tx size + BaseFee API)
   └── New-wallet fee (for recipients without existing token balance)
5. Sign transaction (Ed25519/Ed448 signature over serialized proto)
6. Attach SHA3 hash
7. (if sendCoinTXN) Submit via TransactionClient → TXNService/Coin`, 'text'),

    divider(),

    // ── Smart Contract Execute ───────────────────────────────────────────────
    h2('Smart Contract Execute'),
    p('Directory: src/smart-contracts/execute/'),
    p('Executes an arbitrary function on a deployed ZERA smart contract.'),

    codeBlock(
`createSmartContractExecuteTXN(options): Promise<{ txn; hash }>
sendSmartContractExecuteTXN(options): Promise<SubmitResponse>

interface ExecuteParameter {
  type: ParameterType       // 'bytes' | 'uint32' | 'uint64' | 'string'
  value: string | number | Uint8Array
}

enum ParamType { BYTES, UINT32, UINT64, STRING }`, 'typescript'),

    p('The contract address, function name, and parameters are embedded in the SmartContractExecuteTXN protobuf. Gas fees are provided via feeConfig.gasFeeInUsd and calculated in the fee engine.'),

    divider(),

    // ── DEX Operations ───────────────────────────────────────────────────────
    h2('DEX Operations'),
    p('Directory: src/smart-contracts/use-cases/dex/'),
    p('All DEX operations route through the zera_dex_proxy system contract via SmartContractExecuteTXN.'),

    h3('Supported Operations'),
    bullet('createLiquidityPool — Create a new AMM trading pair'),
    bullet('addLiquidity — Deposit token pair, receive LP tokens'),
    bullet('removeLiquidity — Burn LP tokens, withdraw token pair'),
    bullet('unlockLiquidity — Claim LP tokens after lock period expires'),
    bullet('swap — Execute a token swap with slippage tolerance'),

    h3('Key Types'),
    codeBlock(
`interface CreateLiquidityPoolOptions {
  tokenA: string            // contract ID of token A
  tokenB: string            // contract ID of token B
  initialRatio?: number     // initial price ratio
  lockDuration?: number     // lock period in seconds
}

interface SwapOptions {
  fromToken: string
  toToken: string
  amount: AmountInput
  slippageTolerance: number // e.g., 0.005 for 0.5%
  minAmountOut?: AmountInput
}`, 'typescript'),

    h3('Utilities'),
    bullet('computeLockTimestamp(duration) — converts duration to Unix timestamp'),
    bullet('resolveAmount(amount, contractId) — resolves amount with denomination'),
    bullet('DEFAULT_LOCK_DURATION — default lock period constant'),

    divider(),

    // ── Bridge ───────────────────────────────────────────────────────────────
    h2('Bridge (ZERA <-> Solana)'),
    p('Directory: src/smart-contracts/use-cases/bridge/'),
    p('The bridge enables trustless asset transfer between the ZERA and Solana networks. It operates through the bridge_proxy system contract on ZERA.'),

    h3('ZERA-Side Operations'),
    p('Located in src/smart-contracts/use-cases/bridge/zera/:'),
    bullet('bridgeZeraToSol / …AndSend — Lock ZERA → receive wrapped ZERA on Solana'),
    bullet('burnSol / …AndSend — Burn wrapped SOL on ZERA → release SOL on Solana'),
    bullet('releaseZera / …AndSend — Unlock ZERA after bridge completes'),
    bullet('mintSol / …AndSend — Mint wrapped SOL on ZERA'),
    bullet('createSol / …AndSend — Initialize wrapped SOL token (one-time setup)'),

    h3('Solana-Side Operations'),
    p('Located in src/smart-contracts/use-cases/bridge/solana/. Instruction builders compatible with @solana/web3.js for:'),
    bullet('Lock/release transactions'),
    bullet('Mint/burn operations'),
    bullet('Account registration'),

    h3('Guardian Operations'),
    p('Located in src/smart-contracts/use-cases/bridge/guardian/. Admin-level operations requiring guardian signatures:'),
    bullet('VAA (Verified Action Approval) creation and management'),
    bullet('Multi-guardian signature aggregation'),
    bullet('Bridge administration functions'),

    divider(),

    // ── Vote ─────────────────────────────────────────────────────────────────
    h2('Vote (Governance)'),
    p('Directory: src/vote/'),
    p('Submits governance votes against active ZERA proposals.'),

    codeBlock(
`createVoteTXN(options: CreateVoteTXNOptions): Promise<{ txn; hash }>
sendVoteTXN(options: CreateVoteTXNOptions): Promise<SubmitResponse>

interface CreateVoteTXNOptions {
  publicKey: string
  privateKey: string
  proposalId: string
  vote: boolean | number     // binary yes/no or multi-option index
  memo?: string
  feeConfig?: FeeConfig
  grpcConfig?: GRPCConfig
}`, 'typescript'),

    p('Vote transactions use only the base network fee (no contract fee) and go through the GovernanceVote protobuf type.'),

    divider(),

    // ── Contract ─────────────────────────────────────────────────────────────
    h2('Contract (Create & Update)'),
    p('Directory: src/contract/'),
    p('Deploys new smart contracts or updates existing ones on the ZERA Network.'),

    h3('Supported Contract Types'),
    bullet('TOKEN (0) — Fungible token contract'),
    bullet('NFTS (1) — Non-fungible token contract'),
    bullet('COLLECTIONS (2) — NFT collection contract'),

    h3('Public API'),
    codeBlock(
`// Deploy a new contract
createContract(options: CreateContractOptions): Promise<{ txn; hash }>
sendCreateContract(options: CreateContractOptions): Promise<SubmitResponse>

// Update an existing contract
updateContract(options: UpdateContractOptions): Promise<{ txn; hash }>
sendUpdateContract(options: UpdateContractOptions): Promise<SubmitResponse>

interface CreateContractOptions {
  publicKey: string
  privateKey: string
  name: string
  symbol: string
  version: string
  contractType: 0 | 1 | 2
  premintWallets?: { address: string; amount: AmountInput }[]
  feeConfig?: FeeConfig
  grpcConfig?: GRPCConfig
}`, 'typescript'),

    divider(),

    // ── gRPC Transport ───────────────────────────────────────────────────────
    h2('gRPC Transport Layer'),
    p('Directory: src/grpc/'),
    p('All network communication uses ConnectRPC over gRPC-Web (binary format). The transport layer abstracts connection management, service routing, and environment-specific fetch implementations.'),

    h3('Client Factory'),
    codeBlock(
`createClient<T extends ServiceType>(service: T, config?: GRPCConfig):
  PromiseClient<T>`, 'typescript'),

    p('The factory applies service name mapping — Envoy-style URL rewriting that maps protobuf package names to short prefixes:'),
    codeBlock(
`zera_api.APIService          → /api
zera_txn.TXNService          → /txn
zera_validator.ValidatorService → /validator
zera_guardian.GuardianService   → /guardian`, 'text'),

    h3('Default Configuration'),
    codeBlock(
`Host:     mainnet.zerascan.io
Port:     443
Protocol: HTTPS
Fallback: HTTP on port 8080 (if HTTPS fails)
Format:   Binary protobuf (gRPC-Web)`, 'text'),

    h3('Environment Detection'),
    p('The factory detects the runtime environment and selects the appropriate fetch implementation:'),
    bullet('Node.js → retryingFetch (with HTTPS→HTTP fallback)'),
    bullet('Browser → createGrpcWebFetch() (handles binary ArrayBuffer responses)'),
    bullet('React Native → createGrpcWebFetch() (same binary wrapper)'),

    h3('GRPCConfig Interface'),
    codeBlock(
`interface GRPCConfig {
  host?: string
  port?: number
  protocol?: 'http' | 'https'
  endpoint?: string           // Full URL override
  transport?: Transport       // Inject custom ConnectRPC transport
  fetch?: typeof fetch        // Inject custom fetch (e.g., for testing)
  fallbackToHttp?: boolean    // Default: true
  fallbackPort?: number       // Default: 8080
}`, 'typescript'),

    p('All transaction and API functions accept an optional grpcConfig parameter for per-call network configuration.'),

    divider(),

    // ── API Services ─────────────────────────────────────────────────────────
    h2('API Services'),
    p('Directory: src/api/'),
    p('The API layer wraps gRPC service calls with typed responses. It is split between handler (indexer/API node queries) and validator (consensus node queries).'),

    h3('Handler Services'),
    bullet('Nonce — getNonce(address), getNonces(addresses[])'),
    bullet('Fee Info — getExchangeRate()'),
    bullet('Token Info — getTokenFeeInfo(), getTokenInfoMap(), isTokenSupported(), getTokenDenomination(), getTokenRate()'),

    h3('Validator Services'),
    bullet('Balance — getBalance(address, contractId), getBalances()'),
    bullet('Base Fee — getBaseFee(txnType, publicKey?)'),
    bullet('Nonce — Validator-direct nonce queries'),
    bullet('Fee Info — Fee information from validator'),

    h3('EnhancedBalanceResponse'),
    codeBlock(
`interface EnhancedBalanceResponse {
  balance: string              // token balance in smallest units
  address: string              // queried address
  contractId: string           // queried contract
  isValidWallet: boolean       // whether the wallet exists on-chain
  // raw balance fields from protobuf…
}`, 'typescript'),

    callout('info', 'Invalid wallet addresses (e.g., unregistered on-chain) return a zero balance rather than throwing.'),

    divider(),

    // ── Shared Utilities ─────────────────────────────────────────────────────
    h2('Shared Utilities'),
    p('Directory: src/shared/'),
    p('Cross-cutting concerns used by all modules.'),

    h3('Crypto Utilities (shared/crypto/)'),
    bullet('generateZeraAddress(publicKey, keyType, hashTypes) — canonical address generation'),
    bullet('generateAddressFromPublicKey(publicKeyId) — auto-detect format from identifier'),
    bullet('sanitizeAndDecodeAddress(address) — Base58-decode + validate address bytes'),
    bullet('getKeyTypeFromPublicKey(publicKeyId) — extract key type from identifier prefix'),
    bullet('getPublicKeyBytes(publicKeyId) — extract raw key bytes from identifier'),
    bullet('getPublicKeyIdentifierFromBytes(bytes) — reverse: bytes → string identifier'),

    h3('Signature Utilities (shared/crypto/)'),
    bullet('Transaction signing: signs the serialized proto with the wallet\'s private key'),
    bullet('Hash generation: SHA3 digest of the signed transaction bytes'),
    bullet('Supports Ed25519 (64-byte sig) and Ed448 (114-byte sig)'),

    h3('Transaction Base (shared/tx/)'),
    codeBlock(
`// Build the BaseTXN protobuf common to all non-CoinTXN transactions
buildStandardBaseTXN({ publicKeyId, feeId, feeAmount, nonce, memo }): BaseTXN

// Derive on-chain address and fetch current nonce in one call
getAddressAndNonce(publicKeyId, grpcConfig): Promise<{ address, nonce }>`, 'typescript'),

    h3('Amount Conversion (shared/utils/)'),
    codeBlock(
`toSmallestUnits(amount: AmountInput, contractId: string, options?): string
// "1.5" + 9 decimals → "1500000000"

fromSmallestUnits(amount: string, contractId: string, options?): string
// "1500000000" + 9 decimals → "1.5"`, 'typescript'),

    p('Uses decimal.js for arbitrary-precision arithmetic to avoid floating-point errors.'),

    h3('Validation (shared/utils/)'),
    bullet('isValidAddress(address) — Base58 format + prefix validation'),
    bullet('isValidContractId(contractId) — contract ID format check'),
    bullet('validateAmount(amount, decimals) — amount range and precision validation'),
    bullet('validateBase58Address(address) — strict Base58Check validation'),

    h3('Type System & Errors'),
    p('File: src/types/index.ts'),
    codeBlock(
`// Core SDK types
GRPCConfig      // Network connection configuration
AmountInput     // string | number — human-readable amounts
Result<T, E>    // Discriminated union for typed error handling
FeeConfig       // Fee override and gas configuration
SubmitResponse  // Transaction submission result`, 'typescript'),
  ]),
};
