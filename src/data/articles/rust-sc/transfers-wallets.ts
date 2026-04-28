import { bn, h2, h3, p, bullet, callout, codeBlock, divider } from '../../blocks';

export const rustScTransfersWalletsArticle = {
  id: 'rust-sc-transfers-wallets',
  title: 'Transfers & Wallets',
  slug: 'rust-sc-transfers-wallets',
  excerpt: 'Move tokens with the transfer module and derive deterministic contract-owned wallets with the wallet module.',
  category_id: 'rust-sc',
  is_published: true,
  display_order: 3,
  sidebar_title: 'Transfers & Wallets' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('transfer module'),
    p('Move tokens. Every function takes a Sender describing which wallet the operation acts through.'),

    h3('Sender enum'),
    codeBlock(`pub enum Sender {
    Caller,
    Sc,
    Current,
    Delegate { contract: String, instance: Option<String> },
    Derived { seed: String },
    DerivedCurrent { seed: String },
    DerivedDelegate { seed: String, contract: String, instance: Option<String> },
}`, 'rust'),

    bullet('Caller — The user who signed the outer transaction. Requires their authorization.'),
    bullet('Sc — The originally-called contract\'s wallet.'),
    bullet('Current — The currently-executing contract in a delegatecall chain.'),
    bullet('Delegate { contract, instance } — A different contract\'s wallet. instance defaults to "1".'),
    bullet('Derived { seed } — A wallet derived from this contract via wallet::derive.'),
    bullet('DerivedCurrent { seed } — A wallet derived from the currently-executing contract via wallet::derive_current.'),
    bullet('DerivedDelegate { seed, contract, instance } — A wallet derived from another contract via wallet::derive_delegate.'),

    divider(),

    h3('transfer::send'),
    codeBlock(`pub fn send(token: &str, amount: &str, to: &str, sender: &Sender) -> bool`, 'rust'),
    p('Send amount of token (token contract id, e.g. "$ZRA+0000") to recipient wallet to. amount is a decimal string — use base units of the token\'s smallest denomination. Returns true if the host reported OK.'),

    h3('transfer::send_multi'),
    codeBlock(`pub fn send_multi(
    token: &str,
    input_amount: &str,
    amounts: &[String],
    to: &[String],
    sender: &Sender,
) -> bool`, 'rust'),
    p('Multi-recipient send. amounts.len() must equal to.len(). input_amount is the total debited from the sender (must equal sum(amounts) + fees).'),

    h3('transfer::send_all'),
    codeBlock(`pub fn send_all(to: &str, sender: &Sender) -> String`, 'rust'),
    p('Sweep every token held by sender to to. Returns the host\'s raw response string (typically "OK").'),

    h3('transfer::deposit'),
    codeBlock(`pub fn deposit(token: &str, amount: &str, into: &Sender) -> bool`, 'rust'),
    p('Move amount of token from the transaction caller (the signer) into the wallet identified by into. Sender::Caller is invalid here and returns false.'),

    h3('transfer::burn'),
    codeBlock(`pub fn burn(token: &str, amount: &str, sender: &Sender) -> bool`, 'rust'),
    p('Convenience wrapper for send(token, amount, ":fire:", sender). The string ":fire:" is the network\'s burn address.'),

    h3('transfer::mint'),
    codeBlock(`pub fn mint(token: &str, amount: &str, to: &str, sender: &Sender) -> bool`, 'rust'),
    p('Mint amount of token to recipient to. Only Sender::Sc, Current, and Delegate are supported; all other variants return false. The minting contract must be registered as a RestrictedKey with mint: true on the token contract.'),

    divider(),

    h2('wallet module'),
    p('Derive deterministic wallets owned by a smart contract. A "derived wallet" is keyed by a string seed. The same (contract, seed) pair always resolves to the same address. The first time it\'s used, the host creates the wallet on demand.'),

    h3('wallet::derive'),
    codeBlock(`pub fn derive(seed: &str) -> String`, 'rust'),
    p('Derived wallet owned by this contract.'),

    h3('wallet::derive_current'),
    codeBlock(`pub fn derive_current(seed: &str) -> String`, 'rust'),
    p('Derived wallet owned by the currently-executing contract in a delegatecall chain.'),

    h3('wallet::derive_delegate'),
    codeBlock(`pub fn derive_delegate(seed: &str, contract: &str, instance: Option<&str>) -> String`, 'rust'),
    p('Derived wallet owned by another contract. instance defaults to "1".'),

    h3('wallet::sc_auth'),
    codeBlock(`pub fn sc_auth(contract: &str, instance: Option<&str>) -> String`, 'rust'),
    p('Pure string formatter — no host call. Returns "sc_<contract>_<instance>", the format the network uses for smart-contract auth keys. Use it (or the shorthand PublicKey::sc) when populating smart_contract_auth on a RestrictedKey.'),

    callout('info', 'Token contract ids are strings like "$ZRA+0000" or "$MINE+0001". Wallet addresses are base58 strings. The burn address is the literal string ":fire:". Amounts are decimal strings in the token\'s smallest base unit (multiplied by coin_denomination.amount). All arithmetic should go through U256 to avoid overflow.'),
  ]),
};
