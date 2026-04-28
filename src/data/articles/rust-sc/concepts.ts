import { bn, h2, h3, p, bullet, callout, codeBlock, divider } from '../../blocks';

export const rustScConceptsArticle = {
  id: 'rust-sc-concepts',
  title: 'U256 & Cross-Cutting Concepts',
  slug: 'rust-sc-concepts',
  excerpt: 'Safe 256-bit math for token amounts, address/amount conventions, smart-contract auth identifiers, and the delegatecall identity model.',
  category_id: 'rust-sc',
  is_published: true,
  display_order: 8,
  sidebar_title: 'Concepts & U256' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('U256 helpers'),
    p('256-bit unsigned integer plus some safe-math utilities, useful for token-amount arithmetic without overflow.'),

    codeBlock(`pub struct U256(/* 4 x u64 limbs */);

impl U256 {
    pub fn sqrt(self) -> U256;
    pub fn mul_div(self, b: U256, denominator: U256) -> U256;  // 512-bit intermediate
    pub fn safe_div(self, b: U256) -> U256;                    // 0 if b == 0
    pub fn min(self, other: U256) -> U256;
    pub fn max(self, other: U256) -> U256;
    pub fn percent(self, numerator: u64, base: u64) -> U256;   // self * num / base
}

pub fn string_to_u256(input: String) -> U256;                  // 0 on parse error
pub fn u256_to_string(value: U256) -> String;
pub fn is_valid_u256(input: String) -> bool;`, 'rust'),

    p('The underlying U256 is from the uint crate, so you also get the standard arithmetic operators, from_dec_str, to_string, comparison, etc.'),

    divider(),

    h2('Address & amount conventions'),
    bullet('Token contract ids are strings like "$ZRA+0000" or "$MINE+0001".'),
    bullet('Wallet addresses are base58 strings; the burn address is the literal string ":fire:".'),
    bullet('Amounts are decimal strings in the token\'s smallest base unit (multiplied by coin_denomination.amount). All arithmetic should go through U256 to avoid overflow.'),

    divider(),

    h2('Smart-contract auth identifiers'),
    p('A smart contract is identified to the network as a RestrictedKey holder with the string "sc_<contract_name>_<instance>". Three ways to produce it:'),
    codeBlock(`PublicKey::sc("my_logic", Some("1"));        // shorthand: full PublicKey
wallet::sc_auth("my_logic", Some("1"));      // just the string
format!("sc_{}_{}", "my_logic", "1");        // manual`, 'rust'),

    divider(),

    h2('Delegatecall identity model'),
    p('Inside a delegatecall\'d contract B, called from contract A:'),
    bullet('Sender::Sc — A (originally-called)'),
    bullet('Sender::Caller — the outer transaction signer'),
    bullet('Sender::Current — B (currently-executing)'),
    bullet('Target::This (for state) — A\'s state'),
    bullet('context::contract_wallet() — A'),
    bullet('context::current_wallet() — B'),
    bullet('context::caller_wallet() — A'),

    p('Outside of a delegatecall, Sc and Current (and contract_wallet / current_wallet) refer to the same contract.'),

    divider(),

    h2('Error handling'),
    p('Most host-call wrappers return bool (success) or empty / Result / Option on failure; they do not panic on bad inputs from the network. Functions that expect host-returned UTF-8 will panic if the host hands back invalid bytes — that is a host bug, not a recoverable error.'),

    divider(),

    h2('Non-WASM builds'),
    callout('warning', 'On any target other than wasm32, every host function is a panicking stub. This lets cargo check and rust-analyzer work on a desktop, but contract logic that touches the host will not run there. Always test on a Zera validator (or testnet).'),
  ]),
};
