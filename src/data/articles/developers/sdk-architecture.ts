import { bn, h1, h2, h3, p, bullet, callout, codeBlock, cardGroup, accordion, divider, tabs } from '../../blocks';

export const sdkArchitectureArticle = {
  id: 'sdk-architecture',
  title: 'Zera.js SDK — Architecture Overview',
  slug: 'sdk-architecture',
  excerpt: 'High-level architecture, repository layout, and core capabilities of the @zera-os/zera.js TypeScript SDK.',
  category_id: 'developers',
  is_published: true,
  display_order: 5,
  sidebar_title: 'SDK Architecture' as string | null,
  icon: null as string | null,
  created_at: '2026-04-22T00:00:00Z',
  updated_at: '2026-04-22T00:00:00Z',
  content: bn([
    p('Zera.js is a TypeScript SDK for the ZERA Network — a Layer-1 blockchain with native support for tokens, smart contracts, governance, and cross-chain bridging to Solana. The SDK abstracts away low-level concerns (protobuf serialization, gRPC transport, fee calculation, cryptographic signing) and exposes a clean, typed API surface.'),

    callout('info', 'Package: @zera-os/zera.js · Version: 1.0.1 · License: MIT · Node.js: >=20.0.0 · Module system: ESM (dual CJS/ESM distribution)'),

    h2('Core Capabilities'),
    cardGroup(3, [
      { icon: 'hugeicons:wallet-01', title: 'HD Wallet Generation', body: 'BIP39/SLIP-0010, Ed25519/Ed448, hash-chaining via the wallet-creation module.' },
      { icon: 'hugeicons:coins-01', title: 'Token Transfers', body: 'Multi-input/output CoinTXN with automatic fee calculation via the coin-txn module.' },
      { icon: 'hugeicons:code', title: 'Smart Contract Calls', body: 'Arbitrary contract function execution via smart-contracts/execute.' },
      { icon: 'hugeicons:exchange-01', title: 'DEX Operations', body: 'Pool creation, liquidity, and swaps via smart-contracts/use-cases/dex.' },
      { icon: 'hugeicons:link-01', title: 'Cross-Chain Bridge', body: 'ZERA <-> Solana lock/mint/burn/release via smart-contracts/use-cases/bridge.' },
      { icon: 'hugeicons:checkmark-badge-01', title: 'Governance Voting', body: 'Binary and multi-option governance votes via the vote module.' },
    ]),

    cardGroup(3, [
      { icon: 'hugeicons:file-add', title: 'Contract Deployment', body: 'Create/update InstrumentContracts via the contract module.' },
      { icon: 'hugeicons:search-01', title: 'Network Queries', body: 'Nonce, balance, fees, token info via the api module.' },
      { icon: 'hugeicons:wireless', title: 'Transport', body: 'ConnectRPC over gRPC-Web, with HTTPS/HTTP fallback via the grpc module.' },
    ]),

    divider(),

    h2('Architecture Diagram'),
    p('The SDK is structured in layers. Your application interacts with the public API barrel (index.ts), which re-exports all modules. Each module depends on shared utilities and proto-generated types, which communicate with the ZERA Network node via ConnectRPC/gRPC.'),

    codeBlock(
`Developer / Application
        |
        |  @zera-os/zera.js
        v
┌─────────────────────────────────────────────┐
│              index.ts (public API)           │
│  Wallets · CoinTXN · SmartContracts · Bridge │
│  Vote · Contract · API · Validation · Errors │
└──────┬──────┬──────┬──────┬──────┬──────────┘
       |      |      |      |      |
   Wallet  Transactions  API  Shared  gRPC
  Creation  (all types) Layer  Utils  Transport
       |      |      |      |      |
       └──────┴──────┴──────┴──────┘
                     |
          Proto-generated Types
            (txn_pb, api_pb, …)
                     |
           ZERA Network Node
           (ConnectRPC / gRPC)`, 'text'),

    divider(),

    h2('Repository Layout'),
    p('The SDK follows a modular directory structure. Each domain concern lives in its own directory under src/.'),

    h3('Root Files'),
    codeBlock(
`zera.js/
├── index.ts               # Public SDK surface (re-exports only)
├── package.json           # Dependencies, scripts, exports map
├── tsconfig.json          # Base TypeScript config
├── tsconfig.esm.json      # ESM-specific overrides
├── tsconfig.test.json     # Test config
├── vitest.config.ts       # Test runner configuration
├── vitest.setup.ts        # Global test setup
└── eslint.config.js       # Linting rules`, 'text'),

    h3('Source Modules'),
    codeBlock(
`src/
├── wallet-creation/       # HD wallet & key management
│   ├── wallet-factory.ts  #   WalletFactory class
│   ├── crypto-core.ts     #   SLIP0010HDWallet, Ed25519/Ed448 key pairs
│   ├── hd-utils.ts        #   Seed gen, path building, HD derivation
│   ├── hash-utils.ts      #   Hash chain logic (SHA3/BLAKE3)
│   ├── shared.ts          #   Public key identifier generation
│   └── constants.ts       #   KEY_TYPE, HASH_TYPE, coin type constants
│
├── coin-txn/              # Token transfer transactions
│   └── transaction.ts     #   createCoinTXN / sendCoinTXN
│
├── smart-contracts/
│   ├── execute/           # Generic smart contract execution
│   │   └── transaction.ts #   createSmartContractExecuteTXN / send…
│   └── use-cases/
│       ├── dex/           # Decentralized exchange
│       │   └── transactions/ # pool, liquidity, swap, unlock builders
│       └── bridge/        # Cross-chain bridge
│           ├── zera/      #   ZERA-side operations (lock/release/mint/burn)
│           ├── solana/    #   Solana instruction builders
│           └── guardian/  #   Admin VAA operations
│
├── vote/                  # Governance voting
│   └── transaction.ts     #   createVoteTXN / sendVoteTXN
│
├── contract/              # Contract deployment & updates
│   ├── create/            #   createContract / sendCreateContract
│   └── update/            #   updateContract / sendUpdateContract
│
├── grpc/                  # Network transport
│   ├── client-factory.ts  #   createClient<T> factory
│   ├── transaction-client.ts  # Submit signed transactions
│   └── validator-api-client.ts # Query validator state
│
├── api/                   # Validator & handler service layer
│   ├── handler/           #   Indexer/API node queries
│   └── validator/         #   Consensus node queries
│
├── shared/                # Cross-cutting utilities
│   ├── crypto/            #   Address generation & signing
│   ├── fee-calculators/   #   Universal fee engine
│   ├── monitoring/        #   Logger, metrics, health checks
│   ├── tx/                #   Base transaction builder
│   └── utils/             #   Validation, amounts, protobuf helpers
│
└── types/                 # GRPCConfig, AmountInput, Result<T,E>, …`, 'text'),

    h3('Build & Publishing'),
    codeBlock(
`proto/                     # Protocol Buffer definitions & build
│   ├── build.ts           #   Proto generation script
│   └── generated/         #   Auto-generated TypeScript (never edit)
│       ├── txn_pb.ts      #     All transaction message types
│       ├── api_pb.ts      #     API request/response types
│       └── validator_pb.ts #    Validator service types
│
scripts/
│   ├── build.ts           # Full build pipeline
│   └── validate-bundles.ts # Post-build bundle validation
│
publishing/
│   ├── deploy.ts          # Versioned NPM release script
│   ├── unpublish.ts       # Interactive unpublish
│   └── deprecate.ts       # Version deprecation
│
dist/                      # Build output (git-ignored)
├── index.cjs              #   CommonJS bundle
├── index.mjs              #   ESM bundle
├── index.d.ts             #   TypeScript declarations
└── *.map                  #   Source maps`, 'text'),

    divider(),

    h2('Entry Point'),
    p('The entry point (index.ts) is a pure re-export barrel — it contains no logic. Every public symbol exported by the SDK is explicitly named here, making it the canonical surface for tree-shaking and API stability.'),

    codeBlock(
`// index.ts re-export map
Wallet creation          → src/wallet-creation/index.ts
CoinTXN                  → src/coin-txn/index.ts
SmartContractExecuteTXN  → src/smart-contracts/execute/index.ts
Bridge (ZERA-side)       → src/smart-contracts/use-cases/bridge/zera/index.ts
solanaBridge (namespace)  → src/smart-contracts/use-cases/bridge/solana/index.ts
guardianBridge (ns)       → src/smart-contracts/use-cases/bridge/guardian/index.ts
Vote                     → src/vote/index.ts
Contract                 → src/contract/index.ts
API: getNonce/getNonces  → src/api/handler/nonce/service.ts
API: getBalance          → src/api/validator/balance/service.ts
API: getExchangeRate     → src/api/handler/fee-info/service.ts
API: getTokenFeeInfo     → src/api/handler/token-info/service.ts
toSmallestUnits/from…    → src/shared/utils/unified-amount-conversion.ts
Validation utils         → src/shared/utils/validation.ts
Error classes            → src/wallet-creation/errors.ts
VERSION, DESCRIPTION     constants`, 'text'),
  ]),
};
