import { bn, h2, h3, p, bullet, numbered, callout, codeBlock, divider } from '../../blocks';

export const goSdkTransactionsArticle = {
  id: 'go-sdk-transactions',
  title: 'Transaction Packages',
  slug: 'go-sdk-transactions',
  excerpt: 'Nonces, parts, transfers, minting, NFTs, allowances, governance, compliance, expense ratios, exchange rates, and contract management.',
  category_id: 'go-sdk',
  is_published: true,
  display_order: 4,
  sidebar_title: 'Transactions' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('nonce Package'),
    p('Retrieves the next valid nonce for one or more addresses, either from the indexer (HTTP) or a validator (gRPC).'),

    h3('Types'),
    codeBlock(`type NonceInfo struct {
    UseIndexer    bool                // true = HTTP indexer, false = gRPC validator
    NonceReqs     []*pb.NonceRequest  // Validator mode: pre-built nonce requests
    ValidatorAddr string              // Validator gRPC address (e.g., "routing.zera.vision")
    Addresses     []string            // Indexer mode: list of Base58 addresses
    IndexerURL    string              // e.g., "https://indexer.zera.vision"
    Authorization string              // "Bearer <token>" or API key string
    Override      []uint64            // Optional: skip network call, use these nonces directly
}`, 'go'),

    h3('Functions'),
    codeBlock(`func GetNonce(info NonceInfo, maxRps int) ([]uint64, error)
// maxRps must be > 1
// Returns nonces in the same order as Addresses (indexer) or NonceReqs (validator)
// Governance keys (gov_ prefix) always return nonce 0

func MakeNonceRequest(address string) (*pb.NonceRequest, error)
// Creates a pb.NonceRequest from a Base58 address
// Handles gov_ prefix addresses specially`, 'go'),

    h3('Validator Mode (gRPC)'),
    codeBlock(`nonceReqs, _ := transfer.CreateNonceRequests(inputs) // or build manually
info := nonce.NonceInfo{
    UseIndexer:    false,
    NonceReqs:     nonceReqs,
    ValidatorAddr: "routing.zera.vision", // defaults to port 50053
}
nonces, err := nonce.GetNonce(info, 10)`, 'go'),

    h3('Indexer Mode (HTTP)'),
    codeBlock(`info := nonce.NonceInfo{
    UseIndexer:    true,
    Addresses:     []string{"<base58_address>"},
    IndexerURL:    "https://indexer.zera.vision",
    Authorization: "Bearer mytoken",
}
nonces, err := nonce.GetNonce(info, 10)`, 'go'),

    divider(),

    h2('parts Package'),
    p('Retrieves the denomination (parts per coin) for a token contract.'),
    callout('warning', 'The validator mode for parts is not implemented as of network version v1.1.0. Use UseIndexer: true.'),

    h3('Types'),
    codeBlock(`type PartsInfo struct {
    Symbol         string    // Contract ID, e.g., "$ZRA+0000"
    UseIndexer     bool      // Must be true (validator mode unsupported)
    IndexerUrl     string
    ValidatorAddr  string
    Authorization  string
    Override       *big.Int  // Skip network call, use this value directly
}`, 'go'),

    h3('Functions'),
    codeBlock(`func GetParts(partsInfo PartsInfo) (*big.Int, error)
// Returns the parts-per-coin denomination for the contract
// Returns an error for NFT/SBT contracts (they have no denomination)`, 'go'),

    h3('Example'),
    codeBlock(`partsInfo := parts.PartsInfo{
    Symbol:        "$ZRA+0000",
    UseIndexer:    true,
    IndexerUrl:    "https://indexer.zera.vision",
    Authorization: "Bearer mytoken",
}
p, err := parts.GetParts(partsInfo)
// p = big.Int representing parts per coin (e.g., 1000000000 for $ZRA)`, 'go'),

    divider(),

    h2('transfer Package'),
    p('Creates and submits coin transfer transactions (CoinTXN).'),

    h3('Types'),
    codeBlock(`type Inputs struct {
    AllowanceAddr      *string   // Non-nil for allowance transactions
    B58Address         string    // Sender's Base58 address
    KeyType            helper.KeyType
    PublicKey          string    // Base58 encoded public key
    PrivateKey         string    // Base58 encoded private key
    Amount             string    // Coin amount as decimal string (e.g., "1.5")
    FeePercent         float32   // Sender's share of the base fee (0-100, up to 6 decimal places)
    ContractFeePercent *float32  // Optional: sender's share of contract fee
}`, 'go'),

    h3('Functions'),
    codeBlock(`func CreateCoinTxn(
    nonceInfo nonce.NonceInfo,
    partsInfo parts.PartsInfo,
    inputs []Inputs,
    outputs map[string]string,     // map[recipientB58Address]coinAmountString
    baseFeeID string,              // Contract ID of fee token (e.g., "$ZRA+0000")
    baseFeeAmountParts string,     // Fee amount in parts
    contractFeeID *string,         // Optional contract fee token
    contractFeeAmountParts *string, // Optional contract fee amount
    maxRps int,                    // Max nonce requests per second (must be > 1)
) (*pb.CoinTXN, error)

func SendCoinTXN(grpcAddr string, txn *pb.CoinTXN) (*emptypb.Empty, error)
// grpcAddr: e.g., "routing.zera.vision" (defaults to port 50052)

func CreateNonceRequests(inputs []Inputs) ([]*pb.NonceRequest, error)
// Helper to build nonce requests from an inputs slice (for validator mode)`, 'go'),

    h3('Allowance Transactions'),
    p('For allowance-based transfers, the inputs slice is structured as follows:'),
    bullet('inputs[0] — Your own wallet (the one spending the allowance). Set Amount to "".'),
    bullet('inputs[1] — The allowance grantor\'s wallet. Set AllowanceAddr to the grantor\'s address and Amount to the transfer amount.'),
    bullet('Additional allowance inputs follow at inputs[2], inputs[3], etc.'),
    callout('info', 'The NonceInfo must include nonces for both your wallet and each allowance wallet, in the same order.'),

    h3('Simple 1-to-1 Transfer'),
    codeBlock(`inputs := []transfer.Inputs{
    {
        B58Address:  "yourAddress",
        KeyType:     helper.ED25519,
        PublicKey:   "yourPublicKeyB58",
        PrivateKey:  "yourPrivateKeyB58",
        Amount:      "10.5",
        FeePercent:  100,
    },
}
outputs := map[string]string{
    "recipientAddress": "10.5",
}

nonceReqs, _ := transfer.CreateNonceRequests(inputs)
nonceInfo := nonce.NonceInfo{
    UseIndexer: false,
    NonceReqs:  nonceReqs,
    ValidatorAddr: "routing.zera.vision",
}
partsInfo := parts.PartsInfo{
    Symbol:     "$ZRA+0000",
    UseIndexer: true,
    IndexerUrl: "https://indexer.zera.vision",
}

txn, err := transfer.CreateCoinTxn(nonceInfo, partsInfo, inputs, outputs,
    "$ZRA+0000", "100", nil, nil, 10)
if err != nil {
    log.Fatal(err)
}
_, err = transfer.SendCoinTXN("routing.zera.vision", txn)`, 'go'),

    h3('Many-to-Many Transfer'),
    codeBlock(`inputs := []transfer.Inputs{
    {B58Address: "addr1", KeyType: helper.ED25519, PublicKey: "pub1", PrivateKey: "priv1",
     Amount: "5", FeePercent: 50},
    {B58Address: "addr2", KeyType: helper.ED448, PublicKey: "pub2", PrivateKey: "priv2",
     Amount: "5", FeePercent: 50},
}
outputs := map[string]string{
    "recipient1": "7",
    "recipient2": "3",
}`, 'go'),

    divider(),

    h2('mint Package'),
    p('Creates and submits token mint transactions (MintTXN). Requires a restricted key (r_ prefix).'),

    h3('Functions'),
    codeBlock(`func CreateMintTxn(
    nonceInfo nonce.NonceInfo,
    symbol string,             // Contract ID to mint (e.g., "$ZRA+0000")
    amount string,             // Coin amount as decimal string
    recipient string,          // Recipient's Base58 address
    publicKeyBase58 string,    // Must start with "r_", "gov_", or "sc_"
    privateKeyBase58 string,
    feeID string,
    feeAmountParts string,
) (*pb.MintTXN, error)

func SendMintTXN(grpcAddr string, txn *pb.MintTXN) (*emptypb.Empty, error)`, 'go'),

    h3('Example'),
    codeBlock(`nonceInfo := nonce.NonceInfo{
    UseIndexer: false,
    NonceReqs:  nonceReqs,  // built from the restricted key's address
    ValidatorAddr: "routing.zera.vision",
}

txn, err := mint.CreateMintTxn(
    nonceInfo,
    "$ZRA+0000",
    "1000",             // Mint 1000 coins
    "recipientB58",
    "r_A_c_<pubkey>",
    "<privkey>",
    "$ZRA+0000",
    "100",              // Fee in parts
)
_, err = mint.SendMintTXN("routing.zera.vision", txn)`, 'go'),

    divider(),

    h2('itemmint Package'),
    p('Creates and submits NFT/SBT (itemized) mint transactions (ItemizedMintTXN).'),

    h3('Functions'),
    codeBlock(`func CreateItemMintTxn(
    nonceInfo nonce.NonceInfo,
    contractId string,              // NFT contract ID
    itemId *big.Int,                // Unique item ID within the contract
    recipient string,               // Recipient's Base58 address
    publicKeyBase58 string,         // Restricted key (r_ prefix)
    privateKeyBase58 string,
    feeID string,
    feeAmountParts string,
    parameters []*pb.KeyValuePair,  // NFT metadata key-value pairs (can be nil)
    expiry *uint64,                 // Optional Unix timestamp expiry
    validFrom *uint64,              // Optional Unix timestamp valid-from
    votingWeight *big.Int,          // Optional voting weight for SBTs
    contractFees *pb.ItemContractFees, // Optional contract fee config
) (*pb.ItemizedMintTXN, error)

func SendItemMintTXN(grpcAddr string, txn *pb.ItemizedMintTXN) (*emptypb.Empty, error)

// Helper to build ItemContractFees
func BuildItemContractFees(
    fee float64,
    feeAddressB58 string,
    burnPercent float64,
    validatorPercent float64,
    allowedFeeInstruments []string,
) (*pb.ItemContractFees, error)`, 'go'),

    h3('Example'),
    codeBlock(`itemID := big.NewInt(1)
params := []*pb.KeyValuePair{
    {Key: "name", Value: "My NFT #1"},
    {Key: "description", Value: "First minted item"},
}

txn, err := itemmint.CreateItemMintTxn(
    nonceInfo,
    "$MYNFT+0000",
    itemID,
    "recipientB58",
    "r_A_c_<pubkey>",
    "<privkey>",
    "$ZRA+0000", "100",
    params,
    nil, nil, nil, nil, // no expiry, validFrom, votingWeight, contractFees
)
_, err = itemmint.SendItemMintTXN("routing.zera.vision", txn)`, 'go'),

    divider(),

    h2('nfttransfer Package'),
    p('Creates and submits NFT item transfer transactions (NFTTXN).'),
    codeBlock(`func CreateNftTransfer(
    nonceInfo nonce.NonceInfo,
    symbol string,              // NFT contract ID
    itemID *big.Int,            // Item ID to transfer
    recipientBase58 string,
    publicKeyBase58 string,     // Current owner's key
    privateKeyBase58 string,
    feeID string,
    feeAmountParts string,
    contractFeeID *string,      // Optional
    contractFeeAmountParts *big.Int, // Optional
) (*pb.NFTTXN, error)

func SendNftTransferTxn(grpcAddr string, txn *pb.NFTTXN) (*emptypb.Empty, error)`, 'go'),

    h3('Example'),
    codeBlock(`itemID := big.NewInt(42)

txn, err := nfttransfer.CreateNftTransfer(
    nonceInfo,
    "$MYNFT+0000",
    itemID,
    "newOwnerB58",
    "ownerPubKeyB58",
    "ownerPrivKeyB58",
    "$ZRA+0000", "100",
    nil, nil,
)
_, err = nfttransfer.SendNftTransferTxn("routing.zera.vision", txn)`, 'go'),

    divider(),

    h2('allowance Package'),
    p('Creates and submits spending allowance approve/revoke transactions (AllowanceTXN).'),

    h3('Types'),
    codeBlock(`type AllowanceDetails struct {
    Authorize          bool      // true = approve, false = revoke
    WalletAddr         string    // Address being granted/revoked the allowance
    CurrencyEquivalent *float64  // Allowance value in currency (scaled to 1e18 internally)
    Amount             *big.Int  // Allowance in parts (alternative to CurrencyEquivalent)
    PeriodMonths       *uint32   // Allowance period in months (alternative to PeriodSeconds)
    PeriodSeconds      *uint32   // Allowance period in seconds
    StartTime          int64     // Unix timestamp for when the allowance starts
}`, 'go'),
    callout('info', 'Use either CurrencyEquivalent or Amount (not both). Use either PeriodMonths or PeriodSeconds (not both).'),

    h3('Functions'),
    codeBlock(`func CreateAllowanceTxn(
    nonceInfo nonce.NonceInfo,
    symbol string,
    details AllowanceDetails,
    publicKeyBase58 string,
    privateKeyBase58 string,
    feeID string,
    feeAmountParts string,
) (*pb.AllowanceTXN, error)

func SendAllowanceTxn(grpcAddr string, txn *pb.AllowanceTXN) (*emptypb.Empty, error)`, 'go'),

    h3('Example'),
    codeBlock(`monthPeriod := uint32(1)
amount := big.NewInt(1000000000) // 1 coin in parts

details := allowance.AllowanceDetails{
    Authorize:    true,
    WalletAddr:   "spenderB58",
    Amount:       amount,
    PeriodMonths: &monthPeriod,
    StartTime:    time.Now().Unix(),
}

txn, err := allowance.CreateAllowanceTxn(
    nonceInfo,
    "$ZRA+0000",
    details,
    "ownerPubKeyB58",
    "ownerPrivKeyB58",
    "$ZRA+0000", "100",
)
_, err = allowance.SendAllowanceTxn("routing.zera.vision", txn)`, 'go'),

    divider(),

    h2('governance Package'),
    p('Creates and submits governance proposals and votes.'),

    h3('Proposal Functions'),
    codeBlock(`func CreateProposalTxn(
    nonceInfo nonce.NonceInfo,
    symbol string,                    // Token contract ID
    publicKeyBase58 string,
    privateKeyBase58 string,
    feeID string,
    feeAmountParts string,
    title string,
    synopsis string,
    body string,                      // Supports Markdown
    options []string,                 // For multi-choice votes; nil for binary yes/no
    startTimestamp *timestamppb.Timestamp,
    endTimestamp *timestamppb.Timestamp,
    txns []*pb.GovernanceTXN,         // Optional: on-chain actions if proposal passes
) (*pb.GovernanceProposal, error)

func SendProposal(grpcAddr string, txn *pb.GovernanceProposal) (*emptypb.Empty, error)`, 'go'),

    h3('Vote Functions'),
    codeBlock(`func CreateVoteTxn(
    nonceInfo nonce.NonceInfo,
    symbol string,
    proposalID string,          // Hex-encoded proposal transaction hash
    publicKeyBase58 string,
    privateKeyBase58 string,
    feeID string,
    feeAmountParts string,
    support *bool,              // For binary votes: true=support, false=against; nil for multi-choice
    voteOption *uint32,         // For multi-choice votes: option index; nil for binary
) (*pb.GovernanceVote, error)

func SendVoteTxn(grpcAddr string, txn *pb.GovernanceVote) (*emptypb.Empty, error)`, 'go'),

    h3('Example'),
    codeBlock(`start := timestamppb.New(time.Now())
end := timestamppb.New(time.Now().Add(7 * 24 * time.Hour))

proposal, err := governance.CreateProposalTxn(
    nonceInfo,
    "$ZRA+0000",
    "govPubKeyB58", "govPrivKeyB58",
    "$ZRA+0000", "100",
    "Increase validator rewards",
    "A proposal to increase block rewards by 5%",
    "## Background\\n\\nThis proposal...",
    nil,    // binary vote
    start, end,
    nil,    // no automatic on-chain actions
)
_, err = governance.SendProposal("routing.zera.vision", proposal)

// Vote: support = true
support := true
vote, err := governance.CreateVoteTxn(
    nonceInfo,
    "$ZRA+0000",
    "abcdef01234...", // hex proposal ID
    "voterPubKeyB58", "voterPrivKeyB58",
    "$ZRA+0000", "100",
    &support, nil,
)
_, err = governance.SendVoteTxn("routing.zera.vision", vote)`, 'go'),

    divider(),

    h2('compliance Package'),
    p('Creates and submits KYC/AML compliance level assignment/revocation transactions (ComplianceTXN). Requires a restricted key.'),

    h3('Types'),
    codeBlock(`type ComplianceDetails struct {
    WalletAddr string
    Level      uint32                 // Compliance level to assign
    Assign     bool                   // true = assign, false = revoke
    Expiry     *timestamp.Timestamp   // Optional; defaults to ~114 years if nil
}`, 'go'),

    h3('Functions'),
    codeBlock(`func CreateComplianceTxn(
    nonceInfo nonce.NonceInfo,
    symbol string,
    details []ComplianceDetails,   // Batch: multiple wallets in one transaction
    publicKeyBase58 string,        // Must be a restricted key (r_ prefix)
    privateKeyBase58 string,
    feeID string,
    feeAmountParts string,
) (*pb.ComplianceTXN, error)

func SendComplianceTxn(grpcAddr string, txn *pb.ComplianceTXN) (*emptypb.Empty, error)`, 'go'),

    h3('Example'),
    codeBlock(`details := []compliance.ComplianceDetails{
    {WalletAddr: "wallet1B58", Level: 1, Assign: true},
    {WalletAddr: "wallet2B58", Level: 2, Assign: true},
}

txn, err := compliance.CreateComplianceTxn(
    nonceInfo,
    "$ZRA+0000",
    details,
    "r_A_c_<pubkey>",
    "<privkey>",
    "$ZRA+0000", "100",
)
_, err = compliance.SendComplianceTxn("routing.zera.vision", txn)`, 'go'),

    divider(),

    h2('expenseratio Package'),
    p('Creates and submits expense ratio distribution transactions (ExpenseRatioTXN). Requires a restricted key.'),
    p('Expense ratios distribute a portion of transaction fees to specified recipients on an ongoing basis.'),

    codeBlock(`func ExpenseRatioTxn(
    nonceInfo nonce.NonceInfo,
    symbol string,
    calledAddrs []string,      // Addresses contributing to the expense ratio (Base58)
    recipient string,          // Expense ratio recipient (Base58)
    publicKeyBase58 string,    // Restricted key (r_ prefix)
    privateKeyBase58 string,
    feeID string,
    feeAmountParts string,
) (*pb.ExpenseRatioTXN, error)

func SendExpenseRatioTXN(grpcAddr string, txn *pb.ExpenseRatioTXN) (*emptypb.Empty, error)`, 'go'),
    callout('info', 'Key type is auto-detected from the public key prefix (A_ = ED25519, B_ = ED448).'),

    divider(),

    h2('currencyequivalent Package'),
    p('Two sub-systems for managing exchange rates:'),
    numbered('ACE (Authorized Currency Equivalent) — Set by authorized restricted keys; includes staking and authorization controls.'),
    numbered('Self Currency Equivalent — Set by token owners for their own contract.'),
    callout('warning', 'The SelfCurrencyEquiv gRPC method is currently unimplemented on routing.zera.vision:50052. SendSelfCurrencyEquivalentTXN will return Unimplemented error.'),

    h3('ACE Types and Functions'),
    codeBlock(`type AceData struct {
    Symbol     string
    Rate       string  // Exchange rate, scaled to 1e18 (e.g., "208000000000000000" for $0.208)
    Authorized *bool   // Optional: enable/disable authorization
    MaxStake   *string // Optional: max stake amount in parts
}

func CreateAceTxn(
    nonceInfo nonce.NonceInfo,
    data []AceData,            // Batch: multiple symbols in one transaction
    publicKeyBase58 string,
    privateKeyBase58 string,
    feeID string,
    feeAmountParts string,
) (*pb.AuthorizedCurrencyEquiv, error)

func SendAceTXN(grpcAddr string, txn *pb.AuthorizedCurrencyEquiv) (*emptypb.Empty, error)`, 'go'),

    h3('Self Currency Equivalent'),
    codeBlock(`type SelfData struct {
    Symbol string
    Rate   string // Scaled to 1e18
}

func CreateSelfCurrencyEquivalentTxn(
    nonceInfo nonce.NonceInfo,
    data []SelfData,
    publicKeyBase58 string,
    privateKeyBase58 string,
    feeID string,
    feeAmountParts string,
) (*pb.SelfCurrencyEquiv, error)

func SendSelfCurrencyEquivalentTXN(grpcAddr string, txn *pb.SelfCurrencyEquiv) (*emptypb.Empty, error)
// Currently returns: rpc error: code = Unimplemented`, 'go'),
  ]),
};
