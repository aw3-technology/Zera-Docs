import { bn, h2, h3, p, bullet, callout, codeBlock, divider } from '../../blocks';

export const rustScStateQueryArticle = {
  id: 'rust-sc-state-query',
  title: 'State & Query',
  slug: 'rust-sc-state-query',
  excerpt: 'Persistent typed/raw key-value state, optionally cross-contract, plus read-only on-chain lookups via the query module.',
  category_id: 'rust-sc',
  is_published: true,
  display_order: 4,
  sidebar_title: 'State & Query' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('state module'),
    p('Persistent key/value store. Keys are &str. Values are either typed (save/load, postcard+base64) or raw strings (save_string/load_string).'),

    h3('Target enum'),
    codeBlock(`pub enum Target {
    This,
    Delegate { contract: String, instance: Option<String> },
}`, 'rust'),
    bullet('This — this contract\'s own state.'),
    bullet('Delegate { contract, instance } — read/write another contract\'s state. instance defaults to "1". Requires the host to permit cross-contract state access.'),

    h3('state::save'),
    codeBlock(`pub fn save<T: Serialize>(key: &str, value: &T, target: &Target) -> bool`, 'rust'),
    p('Serialize value with postcard, base64-encode it, and store under key. Returns true on success.'),

    h3('state::load'),
    codeBlock(`pub fn load<T: DeserializeOwned>(key: &str, target: &Target) -> Result<T, ()>`, 'rust'),
    p('Retrieve and decode the value at key. Returns Err(()) if the key is missing, the data is corrupted, or the schema doesn\'t match T.'),

    h3('state::save_string'),
    codeBlock(`pub fn save_string(key: &str, value: &str, target: &Target) -> bool`, 'rust'),
    p('Store a raw string. Use this when you don\'t want postcard framing.'),

    h3('state::load_string'),
    codeBlock(`pub fn load_string(key: &str, target: &Target) -> Option<String>`, 'rust'),
    p('Returns None if the key is unset (host returns empty string).'),

    h3('state::exists'),
    codeBlock(`pub fn exists(key: &str, target: &Target) -> bool`, 'rust'),

    h3('state::clear'),
    codeBlock(`pub fn clear(key: &str, target: &Target)`, 'rust'),
    p('Remove the value at key. No-op if it doesn\'t exist.'),

    h3('state::list'),
    codeBlock(`pub fn list(target: &Target) -> Vec<(String, String)>`, 'rust'),
    p('Enumerate every (key, raw_value) pair in the target contract\'s state. Values are returned as the raw stored strings — for typed values you\'ll need to base64-decode and run through postcard yourself.'),

    h3('state::list_prefix'),
    codeBlock(`pub fn list_prefix(prefix: &str, target: &Target) -> Vec<(String, String)>`, 'rust'),
    p('Same as list but only keys starting with prefix.'),

    divider(),

    h2('query module'),
    p('Read-only lookups against on-chain state. Every value comes back from the host as a string; helpers parse where appropriate.'),

    h3('query::wallet_balance'),
    codeBlock(`pub fn wallet_balance(token: &str, wallet: &str) -> String`, 'rust'),
    p('Balance (decimal string in base units) of wallet for token contract token.'),

    h3('query::wallet_tokens'),
    codeBlock(`pub fn wallet_tokens(wallet: &str) -> Vec<String>`, 'rust'),
    p('All token contract ids the wallet currently holds.'),

    h3('query::contract_exists'),
    codeBlock(`pub fn contract_exists(contract_id: &str) -> bool`, 'rust'),
    p('Token / NFT / SBT contract id (e.g. "$ZRA+0000").'),

    h3('query::smart_contract_exists'),
    codeBlock(`pub fn smart_contract_exists(contract: &str, instance: Option<&str>) -> bool`, 'rust'),
    p('instance defaults to "1".'),

    h3('query::wallet_exists'),
    codeBlock(`pub fn wallet_exists(wallet: &str) -> bool`, 'rust'),

    h3('query::contract_denomination'),
    codeBlock(`pub fn contract_denomination(contract_id: &str) -> String`, 'rust'),
    p('The denomination factor (e.g. "1000000000000").'),

    h3('query::token_name'),
    codeBlock(`pub fn token_name(contract_id: &str) -> String`, 'rust'),

    h3('query::token_symbol'),
    codeBlock(`pub fn token_symbol(contract_id: &str) -> String`, 'rust'),

    h3('query::contract_wallet'),
    codeBlock(`pub fn contract_wallet(contract: &str, instance: Option<&str>) -> String`, 'rust'),
    p('Resolve a smart contract\'s wallet address. instance defaults to "1". Returns an empty string if the contract doesn\'t exist.'),

    h3('query::circulating_supply'),
    codeBlock(`pub fn circulating_supply(contract_id: &str) -> String`, 'rust'),

    h3('query::sc_balance'),
    codeBlock(`pub fn sc_balance(token: &str) -> String`, 'rust'),
    p('This contract\'s (the originally-called contract\'s) balance of token.'),

    h3('query::current_sc_balance'),
    codeBlock(`pub fn current_sc_balance(token: &str) -> String`, 'rust'),
    p('The currently-executing contract\'s (in a delegatecall chain) balance of token.'),

    h3('query::compliance'),
    codeBlock(`pub fn compliance(contract_id: &str, wallet: &str) -> bool`, 'rust'),
    p('Whether wallet satisfies the compliance rules of contract_id.'),

    h3('query::compliance_levels'),
    codeBlock(`pub fn compliance_levels(contract_id: &str, wallet: &str) -> Vec<u32>`, 'rust'),
    p('The compliance levels granted to wallet for that token. Returns an empty vec if none.'),

    h3('query::ace_data'),
    codeBlock(`pub fn ace_data(contract_id: &str) -> (bool, String)`, 'rust'),
    p('Authorized Currency Equivalent data: (authorized, amount).'),

    callout('info', 'For typed values stored via state::save, use state::load with the same T to round-trip. The list / list_prefix helpers always return raw strings — decode them yourself if you stored postcard-framed values.'),
  ]),
};
