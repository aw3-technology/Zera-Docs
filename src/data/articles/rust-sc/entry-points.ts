import { bn, h2, h3, p, bullet, callout, codeBlock, divider } from '../../blocks';

export const rustScEntryPointsArticle = {
  id: 'rust-sc-entry-points',
  title: 'Entry Points & Crate Root',
  slug: 'rust-sc-entry-points',
  excerpt: 'Define contract entry points with #[wasmedge_bindgen], emit log lines, and pack structured data with encode/decode.',
  category_id: 'rust-sc',
  is_published: true,
  display_order: 2,
  sidebar_title: 'Entry Points' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('Contract Entry Points'),
    p('A contract function is a normal Rust pub fn annotated with the #[wasmedge_bindgen] macro. The macro is re-exported at the crate root.'),

    codeBlock(`use zera_sc::wasmedge_bindgen;`, 'rust'),

    h3('Rules'),
    bullet('Parameters and return values must be types wasmedge-bindgen supports (String, Vec<u8>, integers, bool, etc.).'),
    bullet('For structured input/output, pass a single String and use encode / decode.'),
    bullet('Use init as your contract\'s setup function (called once on instantiate).'),
    bullet('Each #[wasmedge_bindgen] function is independently invokable via call::execute or call::delegate from another contract, or by submitting a SmartContractExecuteType transaction from a client.'),

    h3('Example'),
    codeBlock(`use zera_sc::{emit, wasmedge_bindgen};

#[wasmedge_bindgen]
pub fn init() {
    emit("ready");
}

#[wasmedge_bindgen]
pub fn greet(name: String) -> String {
    format!("hello, {}", name)
}`, 'rust'),

    divider(),

    h2('Crate root functions'),

    h3('emit'),
    codeBlock(`pub fn emit(message: &str)`, 'rust'),
    p('Append a log line to the current transaction\'s emit buffer. Visible in transaction results and to any caller of call::execute / call::delegate (each emit is one element of the returned Vec<String>).'),

    h3('emit_block'),
    codeBlock(`pub fn emit_block(message: &str)`, 'rust'),
    p('Append a block-level log line (visible in block-level events rather than just the transaction).'),

    h3('encode'),
    codeBlock(`pub fn encode<T: Serialize>(value: &T) -> Result<String, ()>`, 'rust'),
    p('Serialize value with postcard and base64-encode the result. Useful for packing structured data into a single string parameter or emit. Returns Err(()) if postcard serialization fails.'),

    h3('decode'),
    codeBlock(`pub fn decode<T: DeserializeOwned>(encoded: &str) -> Result<T, ()>`, 'rust'),
    p('Inverse of encode. Returns Err(()) on invalid base64 or incompatible postcard payload.'),

    divider(),

    h2('Re-exports'),
    bullet('pub use wasmedge_bindgen_macro::wasmedge_bindgen; — the entry-point macro.'),
    bullet('pub use types::*; — all public types from the types reference (so zera_sc::PublicKey, zera_sc::U256, etc., resolve at the crate root).'),

    callout('info', 'Most host-call wrappers return bool (success) or empty / Result / Option on failure; they do not panic on bad inputs from the network. Functions that expect host-returned UTF-8 will panic if the host hands back invalid bytes — that is a host bug, not a recoverable error.'),
  ]),
};
