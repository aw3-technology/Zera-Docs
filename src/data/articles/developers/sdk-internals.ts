import { bn, h2, h3, p, bullet, callout, codeBlock, cardGroup, accordion, divider, tabs, step } from '../../blocks';

export const sdkInternalsArticle = {
  id: 'sdk-internals',
  title: 'Zera.js SDK — Internals & Infrastructure',
  slug: 'sdk-internals',
  excerpt: 'Deep dive into Zera.js internals: protocol buffers, fee calculation, transaction lifecycle, cryptography, build system, testing, security, and design patterns.',
  category_id: 'developers',
  is_published: true,
  display_order: 7,
  sidebar_title: 'SDK Internals' as string | null,
  icon: null as string | null,
  created_at: '2026-04-22T00:00:00Z',
  updated_at: '2026-04-22T00:00:00Z',
  content: bn([
    p('This article covers the internal infrastructure of the Zera.js SDK — the systems that power transaction processing, fee calculation, cryptographic operations, and the build/test/publish pipeline.'),

    // ── Protocol Buffers ─────────────────────────────────────────────────────
    h2('Protocol Buffers'),
    p('All on-chain data structures are defined in .proto files and compiled to TypeScript using buf + protoc-gen-es.'),

    h3('Generated Files'),
    bullet('txn_pb.ts — All transaction message types (CoinTXN, SmartContractExecuteTXN, GovernanceVote, etc.)'),
    bullet('api_pb.ts — API request/response types for handler services'),
    bullet('validator_pb.ts — Validator service types for consensus queries'),
    bullet('google/protobuf/ — Well-known types (Timestamp, Any, etc.)'),

    h3('Build Process'),
    codeBlock(
`# Generate TypeScript from .proto definitions
cd proto && npx buf generate

# Output: proto/generated/*.ts
# These files are checked in — never edit manually`, 'bash'),

    callout('warning', 'Generated protobuf files are committed to the repository. Never edit them directly — always modify the .proto source and regenerate.'),

    divider(),

    // ── Fee Calculation Engine ───────────────────────────────────────────────
    h2('Fee Calculation Engine'),
    p('Directory: src/shared/fee-calculators/'),
    p('The UniversalFeeCalculator computes the total fee for any transaction type. Fees are denominated in the token being transacted (not a separate gas token).'),

    h3('Fee Components'),
    bullet('Network base fee — Calculated from serialized transaction size × per-byte rate from BaseFee API'),
    bullet('Contract fee — Optional fee schedule defined by the token contract creator'),
    bullet('Interface fee — Optional fee charged by the integrating application'),
    bullet('New-wallet fee — One-time fee for recipients that don\'t yet have a balance for the token'),

    h3('Key Files'),
    bullet('universal-fee-calculator.ts — Main fee engine orchestrator'),
    bullet('base-fee-constants.ts — Protobuf size overhead constants'),
    bullet('contract-fee-constants.ts — Contract-specific fee logic'),
    bullet('exchange-rate-service.ts — Rate caching layer for cross-denomination fees'),
    bullet('denomination-fallback.ts — Denomination defaults when API is unavailable'),

    h3('Calculation Flow'),
    codeBlock(
`UniversalFeeCalculator.calculateFee(protoObject, feeConfig)
  |
  ├── 1. Serialize transaction to protobuf bytes
  ├── 2. Calculate byte-size-based network fee via BaseFee API
  ├── 3. Look up contract fee schedule (if any)
  ├── 4. Apply interface fee (if feeConfig specifies one)
  ├── 5. Check each output recipient for new-wallet status
  ├── 6. Sum all fee components
  └── 7. Return total fee in token's smallest units`, 'text'),

    divider(),

    // ── Transaction Lifecycle ────────────────────────────────────────────────
    h2('Transaction Lifecycle'),
    p('Every transaction in the SDK follows the same lifecycle, regardless of type:'),

    step(1, 'Validate', 'Validate all inputs (addresses, amounts, contract IDs) using shared/utils/validation.ts.'),
    step(2, 'Resolve Nonce', 'Fetch the current nonce for the sender\'s public key via getAddressAndNonce(). The nonce prevents replay attacks.'),
    step(3, 'Build Protobuf', 'Construct the appropriate protobuf message (CoinTXN, SmartContractExecuteTXN, GovernanceVote, etc.) with all required fields.'),
    step(4, 'Calculate Fees', 'Run UniversalFeeCalculator.calculateFee() to determine the total fee. This may involve multiple API calls (BaseFee, token info, exchange rates).'),
    step(5, 'Sign', 'Serialize the protobuf to bytes, then sign with the sender\'s private key (Ed25519 or Ed448). Attach the signature and compute the SHA3 hash.'),
    step(6, 'Submit (optional)', 'If using a send* function, submit the signed transaction via TransactionClient to the appropriate gRPC service endpoint.'),

    divider(),

    // ── Cryptographic Architecture ───────────────────────────────────────────
    h2('Cryptographic Architecture'),

    h3('Key Algorithms'),
    cardGroup(2, [
      { icon: 'hugeicons:key-01', title: 'Ed25519', body: '32-byte keys, 64-byte signatures. Used for standard wallets. Implemented via @noble/curves/ed25519.' },
      { icon: 'hugeicons:key-01', title: 'Ed448', body: '57-byte keys, 114-byte signatures. Used for high-security wallets. Implemented via @noble/curves/ed448.' },
    ]),

    h3('Hash Functions'),
    bullet('SHA3-256 — Address hash chaining, general-purpose hashing'),
    bullet('SHA3-512 — Extended hash chaining for additional security'),
    bullet('BLAKE3 — Final hash in chain for maximum performance'),
    bullet('SHA3 (Keccak) — Transaction hash computation'),
    bullet('HMAC-SHA512 — HD key derivation (SLIP-0010)'),

    h3('Key Derivation'),
    codeBlock(
`PBKDF2 (2048 iterations)
  └── BIP39 mnemonic → 64-byte seed
        └── SLIP-0010 HD derivation (HMAC-SHA512 chain)
              └── m/44'/1110'/account'/change'/address'
                    └── Raw private key → EdDSA key pair`, 'text'),

    h3('Security Properties'),
    bullet('All HD path segments are hardened (bit 31 set) — prevents public key derivation attacks'),
    bullet('Private keys are never logged or serialized beyond Base58 encoding'),
    bullet('secureClear() method on Wallet objects zeros out key material from memory'),
    bullet('Deterministic signatures — same input always produces the same signature'),

    divider(),

    // ── Build System ─────────────────────────────────────────────────────────
    h2('Build System'),
    p('The SDK produces dual CJS/ESM bundles with full TypeScript declarations.'),

    h3('Build Pipeline'),
    codeBlock(
`scripts/build.ts:
  1. Clean dist/ directory
  2. Compile TypeScript (tsc) for CJS output
  3. Compile TypeScript (tsc -p tsconfig.esm.json) for ESM output
  4. Generate .d.ts declaration files
  5. Copy source maps
  6. Run validate-bundles.ts to verify output

Output:
  dist/index.cjs    — CommonJS bundle
  dist/index.mjs    — ESM bundle
  dist/index.d.ts   — TypeScript declarations
  dist/*.map        — Source maps`, 'text'),

    h3('Package Exports'),
    codeBlock(
`// package.json exports map
{
  ".": {
    "import": "./dist/index.mjs",
    "require": "./dist/index.cjs",
    "types": "./dist/index.d.ts"
  }
}`, 'json'),

    divider(),

    // ── Testing Strategy ─────────────────────────────────────────────────────
    h2('Testing Strategy'),
    p('The SDK uses Vitest as its test runner with comprehensive coverage across all modules.'),

    h3('Test Structure'),
    bullet('Each module has its own tests/ directory with co-located test files'),
    bullet('Each module has an examples/ directory with runnable usage examples'),
    bullet('Shared test fixtures live in src/shared/utils/testing-defaults/'),
    bullet('Global test setup in vitest.setup.ts'),

    h3('Test Categories'),
    bullet('Unit tests — Individual function behavior (hash generation, address formatting, fee math)'),
    bullet('Integration tests — Multi-module flows (wallet → transaction → signing)'),
    bullet('Example tests — Runnable examples that double as integration smoke tests'),

    codeBlock(
`# Run all tests
npx vitest

# Run tests for a specific module
npx vitest src/wallet-creation

# Run with coverage
npx vitest --coverage`, 'bash'),

    divider(),

    // ── Publishing Pipeline ──────────────────────────────────────────────────
    h2('Publishing Pipeline'),
    p('Directory: publishing/'),

    bullet('deploy.ts — Versioned NPM release script. Bumps version, builds, publishes to NPM registry.'),
    bullet('unpublish.ts — Interactive unpublish for removing broken versions.'),
    bullet('deprecate.ts — Version deprecation for marking old versions as deprecated.'),

    divider(),

    // ── Design Patterns ──────────────────────────────────────────────────────
    h2('Design Patterns'),

    h3('create* / send* Duality'),
    p('Every transaction module exposes two functions: create*TXN (build and sign, return the protobuf + hash) and send*TXN (build, sign, and submit to the network). This lets developers inspect or store transactions before submitting.'),

    h3('Barrel Re-exports'),
    p('Each module has an index.ts that selectively re-exports its public API. The root index.ts re-exports from all module barrels, creating a single flat import surface.'),

    h3('Result Type'),
    p('API calls return Result<T, E> discriminated unions instead of throwing. This makes error handling explicit and type-safe at the call site.'),

    h3('Service Name Mapping'),
    p('The gRPC client factory maps protobuf service names to short URL prefixes (e.g., zera_txn.TXNService → /txn), enabling clean routing through Envoy-style proxies.'),

    h3('Environment-Adaptive Transport'),
    p('The transport layer auto-detects Node.js, browser, and React Native environments, selecting the appropriate fetch implementation for each. This makes the SDK truly universal.'),

    divider(),

    // ── Network Configuration ────────────────────────────────────────────────
    h2('Network Configuration'),

    h3('Default Endpoints'),
    codeBlock(
`Mainnet:  mainnet.zerascan.io:443 (HTTPS)
Fallback: mainnet.zerascan.io:8080 (HTTP)`, 'text'),

    h3('Custom Configuration'),
    p('Every function accepts an optional grpcConfig parameter to override the default network settings. This enables connecting to testnets, local nodes, or custom infrastructure.'),

    codeBlock(
`import { sendCoinTXN } from '@zera-os/zera.js';

await sendCoinTXN({
  // ... transaction options
  grpcConfig: {
    host: 'testnet.zerascan.io',
    port: 443,
    protocol: 'https',
    fallbackToHttp: true,
  },
});`, 'typescript'),

    divider(),

    // ── Security Model ───────────────────────────────────────────────────────
    h2('Security Model'),

    h3('Key Management'),
    bullet('Private keys exist only in memory during transaction signing'),
    bullet('secureClear() zeros key buffers after use'),
    bullet('No key persistence — the SDK never writes keys to disk or logs'),

    h3('Transaction Security'),
    bullet('Every transaction includes a nonce (replay attack prevention)'),
    bullet('Transactions are signed over the full serialized protobuf (no malleability)'),
    bullet('SHA3 hash provides a unique transaction identifier for tracking'),

    h3('Network Security'),
    bullet('HTTPS by default with automatic HTTP fallback'),
    bullet('Binary protobuf format (not JSON) reduces attack surface'),
    bullet('ConnectRPC provides built-in request/response validation'),

    callout('warning', 'The SDK is designed for client-side use. Never expose private keys in server logs, error reports, or analytics. Always call secureClear() on wallet objects when done.'),
  ]),
};
