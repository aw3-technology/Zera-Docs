import { bn, h2, h3, p, bullet, callout, codeBlock, divider } from '../../blocks';

export const goSdkContractsArticle = {
  id: 'go-sdk-contracts',
  title: 'Contract Management',
  slug: 'go-sdk-contracts',
  excerpt: 'Create and update token, NFT, and SBT contracts with the contract package — governance, fees, denominations, and premints.',
  category_id: 'go-sdk',
  is_published: true,
  display_order: 5,
  sidebar_title: 'Contracts' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('contract Package'),
    p('Creates and submits token/NFT/SBT contract creation (InstrumentContract) and update (ContractUpdateTXN) transactions.'),

    h3('Contract Creation'),
    p('The TokenData struct defines all fields for a new contract:'),
    codeBlock(`type TokenData struct {
    Type               pb.CONTRACT_TYPE
    ContractVersion    uint64
    ContractId         string             // Unique identifier, e.g., "$ZRA+0000"
    Symbol             string             // Short symbol, e.g., "ZRA"
    Name               string
    Memo               *string
    Governance         *pb.Governance
    RestrictedKeys     []*pb.RestrictedKey
    Denomination       *pb.CoinDenomination // Parts per coin; nil for NFT/SBT
    MaxSupply          string              // Maximum supply in coin units
    MaxSupplyRelease   []*pb.MaxSupplyRelease
    Premint            []*pb.PreMintWallet
    CustomParameters   []*pb.KeyValuePair
    ExpenseRatio       []*pb.ExpenseRatio
    UpdateExpenseRatio bool
    ContractFees       *pb.ContractFees
    UpdateContractFees bool
    QuashThreshold     *uint32
    TokenCompliance    []*pb.TokenCompliance
    KycStatus          bool
    ImmutableKycStatus bool
    CurEquivStart      *float64           // Starting exchange rate
}`, 'go'),

    codeBlock(`func CreateContractTXN(
    nonceInfo nonce.NonceInfo,
    data *TokenData,
    publicKeyBase58 string,
    privateKeyBase58 string,
    feeID string,
    feeAmountParts string,
) (*pb.InstrumentContract, error)

func SendInstrumentContract(grpcAddr string, txn *pb.InstrumentContract) (*emptypb.Empty, error)`, 'go'),

    divider(),

    h3('Contract Update'),
    codeBlock(`type UpdateData struct {
    ContractId        string
    ContractVersion   uint64             // Must be greater than the current on-chain version
    Name              *string
    Memo              *string
    Governance        *pb.Governance
    RestrictedKeys    []*pb.RestrictedKey
    ContractFees      *pb.ContractFees
    CustomParameters  []*pb.KeyValuePair
    ExpenseRatio      []*pb.ExpenseRatio
    TokenCompliance   []*pb.TokenCompliance
    KycStatus         *bool
    ImmutableKycStatus *bool
    QuashThreshold    *uint32
}

func UpdateContractTXN(
    nonceInfo nonce.NonceInfo,
    data *UpdateData,
    publicKeyBase58 string,
    privateKeyBase58 string,
    feeID string,
    feeAmountParts string,
) (*pb.ContractUpdateTXN, error)

func SendUpdate(grpcAddr string, txn *pb.ContractUpdateTXN) (*emptypb.Empty, error)`, 'go'),

    divider(),

    h2('Helper Functions'),

    h3('Governance'),
    codeBlock(`type GovernanceType int16
const (
    Staged    GovernanceType = 0
    Cycle     GovernanceType = 1
    Staggared GovernanceType = 2 // Note: typo preserved from source
    Adaptive  GovernanceType = 3
    None      GovernanceType = 32767
)

func CreateGovernance(
    govType GovernanceTypeHelper,
    regularQuorum float64,
    fastQuorum *float64,
    allowedProposalContracts []string,
    allowedVotingContracts []string,
    votingThreshold float64,
    alwaysWinner *bool,
    allowMultiChoice bool,
) (*pb.Governance, error)`, 'go'),

    h3('Contract Fees'),
    codeBlock(`type FeeType int16
const (
    FeeFixed              FeeType = 0
    FeeCurrencyEquivalent FeeType = 1
    FeePercentage         FeeType = 2
)

type ContractFeeConfig struct {
    Type               FeeType
    Address            string    // Fee recipient Base58 address
    Fee                float64
    Burn               float64   // Percentage burned (0-100)
    Validator          float64   // Percentage to validators (0-100)
    AllowedFeeInstrument []string
}

func CreateContractFee(config ContractFeeConfig, parts *big.Int) (*pb.ContractFees, error)`, 'go'),

    h3('Denomination'),
    codeBlock(`func CreateDenomination(parts *big.Int, partName string) (*pb.CoinDenomination, error)
// parts: number of parts per coin (e.g., big.NewInt(1_000_000_000))
// partName: display name for the smallest unit`, 'go'),

    h3('Premint'),
    codeBlock(`type PremintConfig struct {
    Address string  // Base58 wallet address
    Amount  float64 // Whole coin amount
}

func CreatePremint(premints []PremintConfig, parts *big.Int) ([]*pb.PreMintWallet, error)`, 'go'),

    divider(),

    h2('Example: Create a Token Contract'),
    codeBlock(`parts := big.NewInt(1_000_000_000)
denom, _ := contract.CreateDenomination(parts, "microzra")

premints, _ := contract.CreatePremint([]contract.PremintConfig{
    {Address: "founderAddressB58", Amount: 1_000_000},
}, parts)

data := &contract.TokenData{
    Type:            pb.CONTRACT_TYPE_TOKEN,
    ContractVersion: 1,
    ContractId:      "$MYTOKEN+0000",
    Symbol:          "MYTOKEN",
    Name:            "My Token",
    MaxSupply:       "1000000000",
    Denomination:    denom,
    Premint:         premints,
}

txn, err := contract.CreateContractTXN(nonceInfo, data,
    "pubKeyB58", "privKeyB58", "$ZRA+0000", "100")
_, err = contract.SendInstrumentContract("routing.zera.vision", txn)`, 'go'),
  ]),
};
