import { bn, h2, h3, p, bullet, callout, codeBlock, divider } from '../../blocks';

export const rustScTypesReferenceArticle = {
  id: 'rust-sc-types-reference',
  title: 'Types Reference',
  slug: 'rust-sc-types-reference',
  excerpt: 'Public types used by the txn module — InstrumentContractTXN, ContractUpdateTXN, CoinTXN, MintTXN, RestrictedKey, PublicKey, Governance, fees, and small helpers.',
  category_id: 'rust-sc',
  is_published: true,
  display_order: 7,
  sidebar_title: 'Types Reference' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('All of these types are re-exported at the crate root (use zera_sc::PublicKey; works directly).'),

    divider(),

    h2('InstrumentContractTXN'),
    p('Used by txn::contract to create a new token, NFT, or SBT.'),
    codeBlock(`pub struct InstrumentContractTXN {
    pub contract_id: String,                      // e.g. "$MINE+0001"
    pub contract_version: u64,
    pub symbol: String,
    pub name: String,
    pub contract_type: ContractType,              // Token | Nft | Sbt
    pub max_supply: Option<String>,
    pub coin_denomination: Option<CoinDenomination>,
    pub premint_wallets: Vec<PreMintWallet>,
    pub max_supply_release: Vec<MaxSupplyRelease>,
    pub restricted_keys: Vec<RestrictedKey>,
    pub governance: Option<Governance>,
    pub contract_fees: Option<ContractFees>,
    pub expense_ratio: Vec<ExpenseRatio>,
    pub token_compliance: Vec<TokenCompliance>,
    pub kyc_status: bool,
    pub immutable_kyc_status: bool,
    pub quash_threshold: Option<u32>,
    pub custom_parameters: Vec<KeyValuePair>,
    pub update_contract_fees: bool,
    pub update_expense_ratio: bool,
}`, 'rust'),

    divider(),

    h2('ContractUpdateTXN'),
    p('Used by txn::contract_update. Every Option / Vec field is "leave alone if unset/empty" by network convention.'),
    codeBlock(`pub struct ContractUpdateTXN {
    pub contract_id: String,
    pub contract_version: u64,
    pub name: Option<String>,
    pub governance: Option<Governance>,
    pub restricted_keys: Vec<RestrictedKey>,
    pub contract_fees: Option<ContractFees>,
    pub custom_parameters: Vec<KeyValuePair>,
    pub expense_ratio: Vec<ExpenseRatio>,
    pub token_compliance: Vec<TokenCompliance>,
    pub kyc_status: Option<bool>,
    pub immutable_kyc_status: Option<bool>,
    pub quash_threshold: Option<u32>,
}`, 'rust'),

    divider(),

    h2('CoinTXN'),
    codeBlock(`pub struct CoinTXN {
    pub contract_id: String,
    pub auth: TransferAuthentication,             // leave Default for SC-originated
    pub input_transfers: Vec<InputTransfers>,
    pub output_transfers: Vec<OutputTransfers>,
    pub contract_fee_id: Option<String>,
    pub contract_fee_amount: Option<String>,
}

pub struct TransferAuthentication {
    pub public_key: Vec<PublicKey>,
    pub signature: Vec<Vec<u8>>,
    pub nonce: Vec<u64>,
    pub allowance_address: Vec<String>,           // base58
    pub allowance_nonce: Vec<u64>,
}

pub struct InputTransfers {
    pub index: u64,                               // index into auth.public_key
    pub amount: String,
    pub fee_percent: u32,                         // 100_000_000 = 100%
    pub contract_fee_percent: Option<u32>,
}

pub struct OutputTransfers {
    pub wallet_address: String,                   // base58
    pub amount: String,
    pub memo: Option<String>,
}`, 'rust'),

    divider(),

    h2('MintTXN'),
    codeBlock(`pub struct MintTXN {
    pub contract_id: String,
    pub amount: String,
    pub recipient_address: String,                // base58
}`, 'rust'),

    divider(),

    h2('RestrictedKey'),
    p('A capability-bearing key registered on a contract. Each boolean grants the holder permission to perform that operation against the contract.'),
    codeBlock(`pub struct RestrictedKey {
    pub public_key: PublicKey,
    pub time_delay: i64,
    pub global: bool,
    pub update_contract: bool,
    pub transfer: bool,
    pub quash: bool,
    pub mint: bool,
    pub vote: bool,
    pub propose: bool,
    pub compliance: bool,
    pub expense_ratio: bool,
    pub revoke: bool,
    pub key_weight: u32,
}`, 'rust'),

    divider(),

    h2('PublicKey'),
    codeBlock(`pub struct PublicKey {
    pub single: String,                           // base58, e.g. "A_c_7kdro2TE..."
    pub multi: Option<MultiKey>,
    pub smart_contract_auth: Option<String>,      // "sc_<contract>_<instance>"
    pub governance_auth: Option<String>,
}`, 'rust'),

    h3('PublicKey::sc'),
    codeBlock(`impl PublicKey {
    pub fn sc(contract: &str, instance: Option<&str>) -> Self
}`, 'rust'),
    p('Build a PublicKey whose smart_contract_auth is "sc_<contract>_<instance>" (instance defaults to "1"), with all other fields default. Equivalent to the common case of authorizing a smart contract as a RestrictedKey holder.'),

    divider(),

    h2('MultiKey / MultiPatterns'),
    codeBlock(`pub struct MultiKey {
    pub public_keys: Vec<String>,                 // base58, with class prefix "c1_..."
    pub signatures: Vec<Vec<u8>>,
    pub multi_patterns: Vec<MultiPatterns>,
    pub hash_tokens: Vec<String>,
}

pub struct MultiPatterns {
    pub class: Vec<u32>,
    pub required: Vec<u32>,
}`, 'rust'),

    divider(),

    h2('Governance / Stage'),
    codeBlock(`pub struct Governance {
    pub governance_type: GovernanceType,          // Adaptive|Staged|Cycle|Staggered|Remove
    pub regular_quorum: u32,
    pub fast_quorum: Option<u32>,
    pub voting_instrument: Vec<String>,
    pub threshold: u32,
    pub chicken_dinner: Option<bool>,
    pub allow_multi: bool,
    pub voting_period: Option<u32>,
    pub allowed_proposal_instrument: Vec<String>,
    pub proposal_period: Option<ProposalPeriod>,  // Days | Months
    pub stage_length: Vec<Stage>,
    pub start_timestamp: Option<ProtoTimestamp>,
    pub max_approved: Option<u32>,
}

pub struct Stage {
    pub length: u32,
    pub period: ProposalPeriod,
    pub break_stage: bool,
    pub max_approved: u32,
}`, 'rust'),

    divider(),

    h2('ContractFees'),
    codeBlock(`pub struct ContractFees {
    pub fee: String,
    pub fee_address: Option<String>,              // base58
    pub burn: String,
    pub validator: String,
    pub allowed_fee_instrument: Vec<String>,
    pub contract_fee_type: ContractFeeType,       // None|Fixed|CurEquivalent|Percentage
}`, 'rust'),

    divider(),

    h2('Misc small types'),
    codeBlock(`pub struct PreMintWallet      { pub address: String, pub amount: String }
pub struct CoinDenomination   { pub denomination_name: String, pub amount: String }
pub struct MaxSupplyRelease   { pub release_date: ProtoTimestamp, pub amount: String }
pub struct KeyValuePair       { pub key: String, pub value: String }
pub struct ExpenseRatio       { pub day: u32, pub month: u32, pub percent: u32 }
pub struct TokenCompliance    { pub compliance: Vec<Compliance> }
pub struct Compliance         { pub contract_id: String, pub compliance_level: u32 }
pub struct ProtoTimestamp     { pub seconds: i64, pub nanos: i32 }`, 'rust'),

    divider(),

    h2('Enums'),
    codeBlock(`pub enum ContractType        { Token, Nft, Sbt }
pub enum ContractFeeType     { None, Fixed, CurEquivalent, Percentage }
pub enum GovernanceType      { Adaptive, Staged, Cycle, Staggered, Remove }
pub enum ProposalPeriod      { Days, Months }
pub enum TransactionType     { /* internal — set by the SDK, not by callers */ }`, 'rust'),

    callout('info', 'TransactionType is populated for you by the txn helpers — you should never need to construct one yourself.'),
  ]),
};
