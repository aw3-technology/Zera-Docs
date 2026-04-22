import { bn, h2, h3, p, bullet, callout, codeBlock, divider } from '../../blocks';

export const goSdkExamplesArticle = {
  id: 'go-sdk-examples',
  title: 'Complete Examples & Error Reference',
  slug: 'go-sdk-examples',
  excerpt: 'End-to-end code examples for coin transfers, wallet generation, and a complete error reference.',
  category_id: 'go-sdk',
  is_published: true,
  display_order: 6,
  sidebar_title: 'Examples & Errors' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('End-to-End Coin Transfer'),
    codeBlock(`package main

import (
    "fmt"
    "log"

    "github.com/ZeraVision/zera-go-sdk/helper"
    "github.com/ZeraVision/zera-go-sdk/nonce"
    "github.com/ZeraVision/zera-go-sdk/parts"
    "github.com/ZeraVision/zera-go-sdk/transfer"
    "github.com/ZeraVision/zera-go-sdk/transcode"
)

const (
    validatorAddr  = "routing.zera.vision"
    indexerURL     = "https://indexer.zera.vision"
    contractID     = "$ZRA+0000"
    feeAmountParts = "100"
)

func main() {
    senderPub  := "A_c_<your_public_key_base58>"
    senderPriv := "<your_private_key_base58>"

    // Derive address from public key
    _, _, pubKeyBytes, _ := transcode.Base58DecodePublicKey(senderPub)
    senderAddr := transcode.Base58Encode(pubKeyBytes) // simplified; use GetWalletAddress

    inputs := []transfer.Inputs{
        {
            B58Address: senderAddr,
            KeyType:    helper.ED25519,
            PublicKey:  senderPub,
            PrivateKey: senderPriv,
            Amount:     "1.0",
            FeePercent: 100,
        },
    }
    outputs := map[string]string{
        "recipientAddressB58": "1.0",
    }

    nonceReqs, err := transfer.CreateNonceRequests(inputs)
    if err != nil {
        log.Fatal(err)
    }

    nonceInfo := nonce.NonceInfo{
        UseIndexer:    false,
        NonceReqs:     nonceReqs,
        ValidatorAddr: validatorAddr,
    }
    partsInfo := parts.PartsInfo{
        Symbol:     contractID,
        UseIndexer: true,
        IndexerUrl: indexerURL,
    }

    txn, err := transfer.CreateCoinTxn(
        nonceInfo, partsInfo, inputs, outputs,
        contractID, feeAmountParts,
        nil, nil,
        10,
    )
    if err != nil {
        log.Fatal(err)
    }

    _, err = transfer.SendCoinTXN(validatorAddr, txn)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("Transaction submitted!")
    // View at: https://explorer.zera.vision/transactions/<hash>
}`, 'go'),

    divider(),

    h2('Generate a New Wallet'),
    codeBlock(`package main

import (
    "fmt"
    "log"

    "github.com/ZeraVision/zera-go-sdk/helper"
    "github.com/ZeraVision/zera-go-sdk/wallet"
)

func main() {
    // ED25519 with BLAKE3 — standard wallet
    priv, pub, addr, err := wallet.GenerateEd25519("", helper.BLAKE3, helper.ED25519)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("ED25519 Wallet")
    fmt.Println("  Address:    ", addr)
    fmt.Println("  Public Key: ", pub)
    fmt.Println("  Private Key:", priv) // Keep secret!

    // ED448 with SHA3-256 — higher security
    priv448, pub448, addr448, err := wallet.GenerateEd448("", helper.SHA3_256, helper.ED448)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("ED448 Wallet")
    fmt.Println("  Address:    ", addr448)
    fmt.Println("  Public Key: ", pub448)
    fmt.Println("  Private Key:", priv448)
}`, 'go'),

    divider(),

    h2('Error Reference'),

    h3('Common Errors'),
    bullet('could not get parts: authorization (api key or bearer token) is required — Indexer auth missing for parts package. Fix: Set Authorization field in PartsInfo.'),
    bullet('validator mode is not possible as of network version v.1.1.0 — Called parts.GetParts with UseIndexer: false. Fix: Set UseIndexer: true.'),
    bullet('total input does not equal total output — Transfer input/output amounts don\'t match. Fix: Ensure sum of all input amounts equals sum of all output amounts.'),
    bullet('not enough nonces for allowance transaction — Nonce slice shorter than inputs slice. Fix: Include nonces for both owner and each allowance address.'),
    bullet('unknown key type for public key — Empty or malformed public key string. Fix: Check env vars / key generation.'),
    bullet('public key is not a restricted key (r_) — Minting/compliance/ACE with a non-restricted key. Fix: Use a key with r_ prefix.'),

    h3('Network Errors'),
    bullet('rpc error: code = ResourceExhausted — Server-side rate limit. Fix: Wait and retry; reduce request frequency.'),
    bullet('rpc error: code = Unimplemented — gRPC method not deployed on server. Fix: Feature not yet available on network.'),

    h3('Validation Errors'),
    bullet('invalid amount format — Empty string or multiple decimal points in amount. Fix: Validate amount strings before calling.'),
    bullet('negative amount not allowed — Negative amount string. Fix: Amounts must be positive.'),

    divider(),

    h2('Live Endpoint Status'),
    p('Tested against live network as of the SDK audit:'),

    h3('Fully Live'),
    bullet('Coin transfer (ED25519, 1-to-1)'),
    bullet('Coin transfer (ED25519, 1-to-many)'),
    bullet('Coin transfer (ED448, 1-to-1)'),
    bullet('Coin transfer (ED448, 1-to-many)'),
    bullet('Coin transfer (many-to-1)'),
    bullet('Coin transfer (many-to-many)'),
    bullet('Allowance-based transfer — Requires pre-approved allowance'),
    bullet('Token mint — Requires restricted key'),
    bullet('NFT transfer'),
    bullet('Item mint (NFT/SBT) — Requires restricted key'),
    bullet('Compliance assignment — Requires restricted key'),
    bullet('Governance proposal'),
    bullet('Token contract creation'),
    bullet('Contract update — ContractVersion must increment'),

    h3('Rate Limited'),
    bullet('Governance vote — Server enforces cooldown between votes'),
    bullet('Expense ratio — Server enforces cooldown'),

    h3('Requires Configuration'),
    bullet('Allowance approve/revoke — Requires env vars: TEST_ADDR, TEST_PUBLIC, TEST_PRIVATE'),
    bullet('ACE (Authorized Currency Equiv) — Requires env vars: ACE_ADDR, ACE_PRIVATE_KEY, ACE_PUBLIC_KEY'),
    bullet('Parts via indexer — API key or Bearer token required'),

    h3('Not Available'),
    bullet('Self Currency Equivalent — SelfCurrencyEquiv RPC not deployed on server'),
    bullet('Parts via validator — Not implemented as of v1.1.0'),

    callout('info', 'Indexer: https://indexer.zera.vision — Live, TLS valid, public read endpoints accessible. Validator gRPC: routing.zera.vision:50052/50053 — Live, plaintext gRPC, TCP verified open. Use routing.zera.vision for all gRPC connections (the previously hardcoded test address 125.253.87.133 is unreachable).'),
  ]),
};
