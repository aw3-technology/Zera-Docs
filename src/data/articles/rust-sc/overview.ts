import { bn, h2, h3, p, bullet, callout, codeBlock, divider } from '../../blocks';

export const rustScOverviewArticle = {
  id: 'rust-sc-overview',
  title: 'Rust SC SDK Overview',
  slug: 'rust-sc-overview',
  excerpt: 'Install and configure zera-sc — the official Rust SDK for writing ZERA smart contracts that compile to WebAssembly.',
  category_id: 'rust-sc',
  is_published: true,
  display_order: 1,
  sidebar_title: 'Overview' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    callout('info', 'Source on GitHub: https://github.com/zera-os/zera-sc-rust'),

    p('zera-sc is the official Rust SDK for writing ZERA smart contracts. Contracts compile to wasm32-unknown-unknown and run on the network\'s WASM smart-contract engine. The crate exposes idiomatic Rust wrappers around every host function the engine provides — token transfers, persistent state, cross-contract calls, queries, raw transactions, derived wallets, execution context, and crypto.'),

    h3('Crate facts'),
    bullet('Crate version: 0.1.0'),
    bullet('MSRV: Rust 1.70'),
    bullet('Build target: wasm32-unknown-unknown (host functions panic on other targets)'),
    bullet('Macro re-export: zera_sc::wasmedge_bindgen for entry points'),

    divider(),

    h2('Project Setup'),

    h3('Cargo.toml'),
    codeBlock(`[dependencies]
zera-sc = "0.1"

[lib]
crate-type = ["cdylib"]

[profile.release]
opt-level = "z"
lto = true
codegen-units = 1
strip = true`, 'toml'),

    h3('Build the WASM artifact'),
    codeBlock(`rustup target add wasm32-unknown-unknown
cargo build --target wasm32-unknown-unknown --release`, 'bash'),

    p('The .wasm artifact in target/wasm32-unknown-unknown/release/ is what you upload to the ZERA Network.'),

    callout('warning', 'On any target other than wasm32, every host function is a panicking stub. cargo check and rust-analyzer work on a desktop, but contract logic that touches the host will not run there. Always test on a Zera validator (or testnet).'),

    divider(),

    h2('Module map'),
    bullet('Crate root — emit, emit_block, encode, decode, and re-exported types'),
    bullet('transfer — token movement (send, send_multi, send_all, deposit, burn, mint)'),
    bullet('state — persistent typed/raw key-value store, optionally cross-contract'),
    bullet('query — read-only lookups against on-chain state'),
    bullet('call — invoke other contracts via execute or delegatecall'),
    bullet('txn — submit raw network transactions (contract create/update, coin, mint)'),
    bullet('wallet — derive deterministic wallets owned by a smart contract'),
    bullet('context — read information about the current execution frame'),
    bullet('crypto — sha256, sha512, blake3, shake, signature verification'),

    divider(),

    h2('Minimal contract'),
    codeBlock(`use zera_sc::{emit, wasmedge_bindgen};

#[wasmedge_bindgen]
pub fn init() {
    emit("ready");
}

#[wasmedge_bindgen]
pub fn greet(name: String) -> String {
    format!("hello, {}", name)
}`, 'rust'),
  ]),
};
