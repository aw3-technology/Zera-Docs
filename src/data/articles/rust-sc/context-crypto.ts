import { bn, h2, h3, p, bullet, callout, codeBlock, divider } from '../../blocks';

export const rustScContextCryptoArticle = {
  id: 'rust-sc-context-crypto',
  title: 'Context & Crypto',
  slug: 'rust-sc-context-crypto',
  excerpt: 'Read information about the current execution frame, plus hashing and signature verification helpers.',
  category_id: 'rust-sc',
  is_published: true,
  display_order: 6,
  sidebar_title: 'Context & Crypto' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('context module'),
    p('Read information about the current execution frame.'),

    h3('context::sender_address'),
    codeBlock(`pub fn sender_address() -> String`, 'rust'),
    p('Wallet of the user who signed the outer transaction.'),

    h3('context::sender_public_key'),
    codeBlock(`pub fn sender_public_key() -> String`, 'rust'),
    p('Public key of the outer transaction signer.'),

    h3('context::txn_hash'),
    codeBlock(`pub fn txn_hash() -> String`, 'rust'),
    p('Hash of the current transaction.'),

    h3('context::block_time'),
    codeBlock(`pub fn block_time() -> u64`, 'rust'),
    p('Unix-second timestamp of the latest block. Returns 0 if the host returns a malformed value.'),

    h3('context::contract_wallet'),
    codeBlock(`pub fn contract_wallet() -> String`, 'rust'),
    p('This contract\'s wallet (the originally-called contract in a delegatecall chain).'),

    h3('context::current_wallet'),
    codeBlock(`pub fn current_wallet() -> String`, 'rust'),
    p('Wallet of the currently-executing contract in a delegatecall chain.'),

    h3('context::caller_wallet'),
    codeBlock(`pub fn caller_wallet() -> String`, 'rust'),
    p('Wallet of the contract that called this contract.'),

    h3('context::current_smart_contract'),
    codeBlock(`pub fn current_smart_contract() -> (String, String)`, 'rust'),
    p('(name, instance) of the currently-executing contract.'),

    divider(),

    h2('crypto module'),

    h3('crypto::sha256'),
    codeBlock(`pub fn sha256(data: &[u8]) -> String`, 'rust'),

    h3('crypto::sha512'),
    codeBlock(`pub fn sha512(data: &[u8]) -> String`, 'rust'),

    h3('crypto::blake3'),
    codeBlock(`pub fn blake3(data: &[u8], length: Blake3Length) -> String

pub enum Blake3Length {
    Bits256,  Bits512,  Bits1024,
    Bits2048, Bits4096, Bits9001,
}`, 'rust'),

    h3('crypto::shake'),
    codeBlock(`pub fn shake(data: &[u8], length: ShakeLength) -> String

pub enum ShakeLength { Bits1024, Bits2048, Bits4096 }`, 'rust'),

    h3('crypto::verify_signature'),
    codeBlock(`pub fn verify_signature(message: &str, signature: &str, public_key: &str) -> bool`, 'rust'),
    p('Verify a signature against a message and base58 public key.'),

    callout('info', 'Hash helpers return string-encoded hashes from the host. blake3 and shake accept enum-typed output lengths so you cannot pass an unsupported size by accident.'),
  ]),
};
