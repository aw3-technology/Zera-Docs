import { bn, h2, p, callout, divider, tabs } from '../../blocks';

export const compareOverviewArticle = {
  id: 'compare-overview',
  title: 'Compare',
  slug: 'compare-overview',
  excerpt: 'ZERA vs Ethereum, Solana, Bitcoin — strengths and comparisons of each network.',
  category_id: 'compare',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('How ZERA compares to other major networks across governance, execution, fees, and decentralization.'),

    callout('info', 'These comparisons reflect community perspectives and publicly available information. Each network has unique strengths.'),

    divider(),

    tabs([
      {
        label: 'vs Bitcoin',
        body: 'Bitcoin: Store of value, proof-of-work, no smart contracts, limited governance (BIPs). ZERA: Governance-first, WASM smart contracts, autonomous execution, ACE token utility, treasury funded by network activity.',
      },
      {
        label: 'vs Ethereum',
        body: 'Ethereum: Smart contracts (EVM/Solidity), off-chain governance (EIPs + multisig), token utility is DeFi-centric. ZERA: WASM contracts (multi-language), on-chain autonomous governance, native fee payment via ACE, governance-controlled treasury.',
      },
      {
        label: 'vs Solana',
        body: 'Solana: High throughput, proof-of-history, validator-centric governance. ZERA: Governance-first with autonomous execution, ACE for multi-token fee payment, community-controlled treasury and upgrades via ZIP.',
      },
    ]),

    divider(),

    h2('What Makes ZERA Different'),
    p('The core differentiator is autonomous governance execution. On most networks, governance produces signals that require trusted parties to implement. On ZERA, governance outcomes execute directly as on-chain transactions — no multisigs, no core teams, no manual steps.'),

    p('Combined with ACE (multi-token fee payment and staking), a governance-funded treasury, and WASM smart contracts, ZERA offers a uniquely integrated architecture where governance isn\'t an add-on — it\'s the operating system.'),
  ]),
};
