import { bn, h2, h3, p, bullet, callout, codeBlock, divider } from '../../blocks';

export const goSdkWalletAndHelpersArticle = {
  id: 'go-sdk-wallet-and-helpers',
  title: 'Wallet & Helper Packages',
  slug: 'go-sdk-wallet-and-helpers',
  excerpt: 'Key generation, signing, verification, encoding, decoding, and type conversion utilities.',
  category_id: 'go-sdk',
  is_published: true,
  display_order: 3,
  sidebar_title: 'Wallet & Helpers' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('wallet Package'),
    p('Generates ED25519 and ED448 key pairs, BIP39 mnemonics, and wallet addresses.'),

    h3('Types'),
    codeBlock(`// From helper package — used by wallet functions
type KeyType int16  // ED25519 = 1, ED448 = 2
type HashType int16 // BLAKE3 = 1, SHA3_256 = 2, SHA3_512 = 3`, 'go'),

    h3('GenerateEd25519'),
    codeBlock(`func GenerateEd25519(
    mnemonic string,            // BIP39 mnemonic; pass "" to auto-generate
    hashAlg helper.HashType,
    keyType helper.KeyType,
) (privateKeyB58, publicKeyB58, addressB58 string, err error)`, 'go'),
    p('Generates an ED25519 key pair and wallet address. If mnemonic is empty, a random 256-bit mnemonic is generated.'),

    h3('GenerateEd448'),
    codeBlock(`func GenerateEd448(
    mnemonic string,
    hashAlg helper.HashType,
    keyType helper.KeyType,
) (privateKeyB58, publicKeyB58, addressB58 string, err error)`, 'go'),
    p('Same as GenerateEd25519 but uses ED448.'),

    h3('Low-Level Key Generation'),
    codeBlock(`// ED25519 from raw seed (exactly 32 bytes)
func GenerateKeyPairLibsodium(seed []byte) (privateKey, publicKey []byte, err error)

// ED448 from raw seed
func GenerateKeyPairEd448(seed []byte) (privateKey, publicKey []byte, err error)`, 'go'),

    h3('GetWalletAddress'),
    codeBlock(`func GetWalletAddress(
    publicKey []byte,
    hashAlg helper.HashType,
    keyType helper.KeyType,
) (formattedPubKey []byte, addressB58 string, err error)`, 'go'),
    p('Derives the ZERA wallet address from a raw public key.'),

    h3('Other Wallet Functions'),
    codeBlock(`// Generate a BIP39 mnemonic phrase
// strength: 128, 160, 192, 224, or 256 bits
func GenerateMnemonic(strength int) (mnemonic string, err error)

// Generate a cryptographically random string
func GenerateRandomString(length int) (string, error)

// Detect key type from Base58 public key prefix (A_ vs B_)
func DetermineKeyType(publicKeyBase58 string) (helper.KeyType, error)`, 'go'),

    h3('Wallet Example'),
    codeBlock(`import (
    "github.com/ZeraVision/zera-go-sdk/wallet"
    "github.com/ZeraVision/zera-go-sdk/helper"
)

// Generate a new ED25519 wallet with BLAKE3 hashing
privKey, pubKey, address, err := wallet.GenerateEd25519("", helper.BLAKE3, helper.ED25519)
if err != nil {
    log.Fatal(err)
}
fmt.Println("Address:", address)
fmt.Println("Public Key:", pubKey)
// Store privKey securely — never share it`, 'go'),

    divider(),

    h2('helper Package'),
    p('Provides gRPC client constructors, signing/verification utilities, and public key protobuf builders.'),

    h3('Types'),
    codeBlock(`type KeyType int16
const (
    SPECIAL KeyType = 0
    ED25519 KeyType = 1
    ED448   KeyType = 2
    Unknown KeyType = 32767
)

type HashType int16
const (
    RESTRICTED HashType = 0
    BLAKE3     HashType = 1
    SHA3_256   HashType = 2
    SHA3_512   HashType = 3
)

func (h HashType) String() string
// Returns: RESTRICTED="r", BLAKE3="c", SHA3_256="a", SHA3_512="b"`, 'go'),

    h3('Signing Functions'),
    codeBlock(`func Sign(privateKeyBase58 string, payload []byte, keyType KeyType) ([]byte, error)

func Verify(publicKeyBase58 string, payload []byte, signature []byte) (bool, error)`, 'go'),

    h3('gRPC Client Factories'),
    codeBlock(`func NewNetworkClient(conn *grpc.ClientConn) pb.TXNServiceClient
// Used for submitting transactions (port 50052)

func NewValidatorNetworkClient(conn *grpc.ClientConn) pb.ValidatorServiceClient
// Used for validator-specific operations

func NewValidatorNetworkApiClient(conn *grpc.ClientConn) pb.APIServiceClient
// Used for API queries (port 50053)`, 'go'),

    h3('Public Key Builder'),
    p('The PublicKey helper struct maps to the protobuf pb.PublicKey type:'),
    codeBlock(`type PublicKey struct {
    Single       *string  // Standard single-owner key (Base58)
    Inheritence  *string  // Contract ID that owns this address (e.g., "$ZRA+0000")
    Multi        *MultiKeyHelper
    SmartContract *SmartContractHelper
    Governance   *string  // Governance key string
}

type MultiKeyHelper struct {
    MultiKey   []MultiKey
    Pattern    [][]MultiPatterns
    HashTokens []HashType
}

type SmartContractHelper struct {
    Name     string
    Instance uint32
}

func GeneratePublicKey(publicKey PublicKey) (*pb.PublicKey, error)`, 'go'),

    divider(),

    h2('transcode Package'),
    p('Encoding, decoding, and hashing utilities.'),

    h3('Encoding'),
    codeBlock(`func Base58Encode(input interface{}) string
func Base58EncodePublicKey(publicKey []byte) string
func HexEncode(input []byte) string
func HexEncodeHash(input []byte, status zera_protobuf.TXN_STATUS) string
func Base64Encode(input []byte) string
func Base64Decode(input string) (string, error)`, 'go'),

    h3('Decoding'),
    codeBlock(`func Base58Decode(encoded string) ([]byte, error)
func HexDecode(encoded string) ([]byte, error)

// Decodes a prefixed public key, separating prefix bytes from raw key bytes
func Base58DecodePublicKey(publicKey string) (prefix []byte, public []byte,
combined []byte, err error)

func HashToHexByte(stringHash string) ([]byte, error)`, 'go'),

    h3('Hashing'),
    codeBlock(`func Blake3(input []byte) []byte
func SHA256(input []byte) []byte
func SHA512(input []byte) []byte
func Blake3Variable(input []byte, outputBitLength int) []byte
func ShakeVariable(input []byte, outputBitLength int) []byte`, 'go'),

    divider(),

    h2('convert Package'),
    p('Type conversion utilities for working with large numeric types across the stack.'),
    codeBlock(`// Converts to *big.Float from: *inf.Dec, *big.Int, int/uint variants, float64, string
func ToBigFloat(val interface{}) *big.Float

// Converts to *big.Int from: *big.Float, int/uint variants, string, pgtype.Numeric, json.Number
func ToBigInt(val interface{}) *big.Int

// Converts to *inf.Dec from: string, *big.Int, *inf.Dec, *pgtype.Numeric, pgtype.Numeric
func ToInfDecimal(val interface{}) *inf.Dec

func InfDecToFloat64(d *inf.Dec) float64`, 'go'),
  ]),
};
