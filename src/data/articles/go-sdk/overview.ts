import { bn, h2, h3, p, bullet, callout, codeBlock, divider, accordion } from '../../blocks';

export const goSdkOverviewArticle = {
  id: 'go-sdk-overview',
  title: 'Go SDK Overview',
  slug: 'go-sdk-overview',
  excerpt: 'Install and configure the ZERA Go SDK — the official library for wallet management, transaction construction, signing, and submission.',
  category_id: 'go-sdk',
  is_published: true,
  display_order: 1,
  sidebar_title: 'Overview' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    callout('warning', 'Status: BETA — First release June 2025. All functions may not work as expected.'),

    p('The ZERA Network Go SDK (github.com/ZeraVision/zera-go-sdk) is the official Go library for building on the ZERA blockchain. It provides idiomatic Go interfaces for wallet management, transaction construction, signing, and submission across all ZERA transaction types.'),

    p('The SDK communicates with two backend systems:'),
    bullet('Validators — gRPC endpoints that accept and process transactions'),
    bullet('Indexer — HTTP REST API for querying chain state (nonces, balances, contract info)'),

    divider(),

    h2('Installation'),
    codeBlock('go get github.com/ZeraVision/zera-go-sdk', 'bash'),
    p('Module: github.com/ZeraVision/zera-go-sdk'),
    p('Go version requirement: 1.23.2+'),

    h3('Key Dependencies'),
    bullet('github.com/ZeraVision/go-zera-network — ZERA protobuf definitions'),
    bullet('github.com/cloudflare/circl — ED448 cryptography'),
    bullet('github.com/teserakt-io/golang-ed25519 — ED25519 signing'),
    bullet('github.com/tyler-smith/go-bip39 — BIP39 mnemonic generation'),
    bullet('github.com/zeebo/blake3 — BLAKE3 hashing'),
    bullet('golang.org/x/crypto — SHA3 hashing'),
    bullet('google.golang.org/grpc — gRPC client'),
    bullet('gopkg.in/inf.v0 — Arbitrary-precision decimals'),

    divider(),

    h2('Architecture'),
    codeBlock(`zera-go-sdk/
├── wallet/          # Key generation (ED25519, ED448), BIP39 mnemonics, addresses
├── helper/          # gRPC clients, signing, verification, key type definitions
├── transcode/       # Base58/64/Hex encoding, BLAKE3/SHA3 hashing
├── convert/         # big.Int / big.Float / inf.Dec / pgtype.Numeric conversions
├── nonce/           # Nonce retrieval (indexer HTTP or validator gRPC)
├── parts/           # Token denomination lookup
├── transfer/        # Coin transfers (CoinTXN)
├── mint/            # Token minting (MintTXN)
├── itemmint/        # NFT/SBT minting (ItemizedMintTXN)
├── nfttransfer/     # NFT item transfers (NFTTXN)
├── allowance/       # Spending allowance approve/revoke (AllowanceTXN)
├── governance/      # Proposals and voting (GovernanceProposal/GovernanceVote)
├── compliance/      # KYC/AML level management (ComplianceTXN)
├── expenseratio/    # Expense ratio distribution (ExpenseRatioTXN)
├── currencyequivalent/ # ACE and self-set exchange rates
└── contract/        # Token/NFT/SBT contract creation and updates`, 'text'),

    divider(),

    h2('Network Endpoints'),

    h3('Core Services'),
    bullet('Validator (transactions) — routing.zera.vision:50052 — gRPC (plaintext) — Submit all transaction types'),
    bullet('Validator (nonce/API) — routing.zera.vision:50053 — gRPC (plaintext) — Nonce queries, API queries'),
    bullet('Indexer — https://indexer.zera.vision — HTTPS/REST — Nonces, balances, contract info'),

    h3('Explorers'),
    bullet('Explorer — https://explorer.zera.vision — Transaction viewer'),
    bullet('ZeraScan — https://zerascan.io — Block explorer'),

    callout('info', 'If no port is specified in a gRPC address, the SDK defaults to :50052 for transaction submission and :50053 for nonce queries.'),

    h3('Indexer API'),
    p('The indexer exposes a single store endpoint:'),
    codeBlock(`POST https://indexer.zera.vision/store?requestType=<type>&<params>
Headers:
  Target: indexer
  Authorization: Bearer <token>   (or Api-Key: <key>)`, 'text'),

    p('Supported requestType values:'),
    bullet('getNextNonce — Required params: address — Returns: Integer nonce'),
    bullet('getContractGlance — Required params: symbol — Returns: Price, supply, holders, market cap'),
    bullet('getContractInfo — Required params: symbol — Returns: Raw protobuf contract data'),
    bullet('getWalletBalance — Required params: address — Returns: Token balances + USD value'),
  ]),
};
