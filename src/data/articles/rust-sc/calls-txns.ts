import { bn, h2, h3, p, bullet, callout, codeBlock, divider } from '../../blocks';

export const rustScCallsTxnsArticle = {
  id: 'rust-sc-calls-txns',
  title: 'Calls & Raw Transactions',
  slug: 'rust-sc-calls-txns',
  excerpt: 'Invoke other contracts with call::execute and call::delegate, and submit raw network transactions through the txn module.',
  category_id: 'rust-sc',
  is_published: true,
  display_order: 5,
  sidebar_title: 'Calls & Txns' as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    h2('call module'),
    p('Invoke functions on other smart contracts. Both functions return a Vec<String> containing one entry per emit made by the callee, in order.'),

    h3('call::execute'),
    codeBlock(`pub fn execute(
    contract: &str,
    instance: &str,
    function: &str,
    params: &[String],
) -> Vec<String>`, 'rust'),
    p('Standard cross-contract call. The callee runs in its own execution context: Sender::Sc / Sender::Current and the state target both refer to the callee.'),

    h3('call::delegate'),
    codeBlock(`pub fn delegate(
    contract: &str,
    instance: &str,
    function: &str,
    params: &[String],
) -> Vec<String>`, 'rust'),
    p('delegatecall. The callee\'s code runs but the caller\'s identity, state, and wallet are used. Inside the callee:'),
    bullet('Sender::Sc / Sender::Caller refer to the outer caller.'),
    bullet('Sender::Current refers to the callee\'s own wallet.'),
    bullet('Target::This refers to the caller\'s state.'),
    p('This is the building block for upgradeable proxy patterns.'),

    h3('Parameter framing'),
    p('Both functions internally join params with "##" and split the result back to a Vec<String> on the receiving side using "[res]" / "[end]" delimiters. Avoid using these literal substrings inside parameter values.'),

    divider(),

    h2('txn module'),
    p('Submit raw network transactions. Each function returns true if the network accepted the transaction. The sender argument is a TxnSender that controls which identity signs.'),

    h3('TxnSender enum'),
    codeBlock(`pub enum TxnSender {
    Delegate { sc_name: String, sc_instance: String },
    Current,
    ContractBefore,
    OriginalContract,
    User,
}`, 'rust'),
    bullet('User — the outer transaction signer.'),
    bullet('OriginalContract — the contract that was originally called.'),
    bullet('ContractBefore — the contract that called this contract.'),
    bullet('Current — the currently-executing contract (in a delegatecall chain).'),
    bullet('Delegate { sc_name, sc_instance } — an explicit other contract.'),

    divider(),

    h3('txn::contract'),
    codeBlock(`pub fn contract(txn: &InstrumentContractTXN, sender: TxnSender) -> bool`, 'rust'),
    p('Create a new token / NFT / SBT contract. See InstrumentContractTXN in the Types Reference.'),

    h3('txn::contract_update'),
    codeBlock(`pub fn contract_update(txn: &ContractUpdateTXN, sender: TxnSender) -> bool`, 'rust'),
    p('Update an existing contract\'s mutable fields. See ContractUpdateTXN in the Types Reference.'),

    h3('txn::coin'),
    codeBlock(`pub fn coin(txn: &CoinTXN, sender: TxnSender) -> bool`, 'rust'),
    p('Submit a full coin-transfer transaction. For "send X of Y to one recipient", prefer transfer::send; use this when you need multi-input transfers, explicit fee routing, or memos.'),

    h3('txn::mint'),
    codeBlock(`pub fn mint(txn: &MintTXN, sender: TxnSender) -> bool`, 'rust'),
    p('Submit a full mint transaction. For "mint X to Y", prefer transfer::mint; use this when you need to override defaults or operate against a contract whose wallet differs from Sender::Sc.'),

    callout('info', 'TransactionType is technically public but is populated for you by the txn helpers — you should never need to construct one yourself.'),
  ]),
};
