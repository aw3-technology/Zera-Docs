import { bn, h2, h3, p, bullet, callout, codeBlock, divider, numbered } from '../../blocks';

export const goSdkCoreConceptsArticle = {
  id: 'go-sdk-core-concepts',
  title: 'Core Concepts',
  slug: 'go-sdk-core-concepts',
  excerpt: 'Key types, hash types, amount handling, nonces, and transaction flow in the ZERA Go SDK.',
  category_id: 'go-sdk',
  is_published: true,
  display_order: 2,
  sidebar_title: 'Core Concepts' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('Key Types'),
    p('ZERA supports two cryptographic curve types:'),
    codeBlock(`import "github.com/ZeraVision/zera-go-sdk/helper"

helper.ED25519  // KeyType = 1 — Standard ED25519
helper.ED448    // KeyType = 2 — Higher-security ED448
helper.SPECIAL  // KeyType = 0 — Special/governance keys`, 'go'),

    p('Public keys are Base58-encoded with a two-character prefix that encodes both the curve and hash algorithm:'),

    h3('Key Prefixes'),
    bullet('A_c_ — ED25519 + BLAKE3'),
    bullet('A_a_ — ED25519 + SHA3-256'),
    bullet('A_b_ — ED25519 + SHA3-512'),
    bullet('B_c_ — ED448 + BLAKE3'),
    bullet('B_a_ — ED448 + SHA3-256'),
    bullet('B_b_ — ED448 + SHA3-512'),

    h3('Special Key Prefixes'),
    p('These are prepended before the curve prefix:'),
    bullet('r_ — Restricted key — required for minting, compliance, expense ratio'),
    bullet('gov_ — Governance key — used for proposals/votes'),
    bullet('sc_ — Smart contract key'),

    p('Example: r_A_c_<base58> = restricted ED25519 BLAKE3 key.'),

    divider(),

    h2('Hash Types'),
    codeBlock(`helper.BLAKE3      // HashType = 1 — Fastest, recommended default
helper.SHA3_256    // HashType = 2
helper.SHA3_512    // HashType = 3
helper.RESTRICTED  // HashType = 0 — Used with restricted (r_) keys`, 'go'),

    divider(),

    h2('Amount Handling'),
    p('The SDK uses a two-layer denomination system:'),
    bullet('Coins — Human-readable units (e.g., "1.5" ZRA)'),
    bullet('Parts — Network units; one coin = N parts (N defined per contract)'),

    p('For $ZRA+0000, 1 coin = 1,000,000,000 parts.'),

    callout('info', 'Most transaction functions accept amounts as decimal strings (e.g., "1.5", "100") and internally convert to parts. Fee amounts passed directly (e.g., feeAmountParts) are already in parts format as strings.'),

    divider(),

    h2('Nonces'),
    p('Every transaction requires a nonce — a monotonically increasing counter per address that prevents replay attacks. The nonce starts at 1 for new addresses.'),
    p('Nonces are retrieved via the nonce package either from the indexer (HTTP) or directly from a validator (gRPC).'),

    divider(),

    h2('Transaction Flow'),
    p('Every transaction follows this pattern:'),
    codeBlock(`1. Retrieve nonce(s)           -> nonce.GetNonce()
2. Build transaction struct    -> Create*Txn()
3. Sign and hash               -> (automatic inside Create*Txn)
4. Submit via gRPC             -> Send*TXN()
5. Inspect result              -> https://explorer.zera.vision/transactions/<hash>`, 'text'),
  ]),
};
