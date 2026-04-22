import { bn, h2, p, bullet, callout, cardGroup, divider, accordion } from '../../blocks';

export const smartContractsOverviewArticle = {
  id: 'smart-contracts-overview',
  title: 'Smart Contracts',
  slug: 'smart-contracts-overview',
  excerpt: 'WASM with governance inside the loop — multi-language, sandboxed, and optionally upgradeable.',
  category_id: 'technology',
  is_published: true,
  display_order: 2,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('Multi-language (Rust, Go, C, AssemblyScript, etc), sandboxed execution, near-native performance — optionally upgradeable through governance.'),

    h2('Why WASM'),
    p('WebAssembly (WASM) enables developers to write smart contracts in their preferred language while achieving near-native performance. The sandboxed execution environment provides security guarantees, and the language-agnostic approach lowers the barrier to entry.'),
    bullet('Language choice — Rust, Go, C, AssemblyScript, and more.'),
    bullet('Near-native performance through optimized WASM execution.'),
    bullet('Sandboxed environment isolates contract execution for security.'),
    bullet('Mature tooling ecosystem across multiple languages.'),

    divider(),

    h2('Fee Model'),
    p('Users can pay execution fees in ACE tokens; runtime fees are typically anchored in ZRA. This dual model provides flexibility for end-users while maintaining ZRA\'s anchor role in the network.'),

    h2('Governance Integration'),
    p('Contracts can be permissioned or permissionless. Upgrades can be ratified and executed via governance, enabling transparent evolution without centralized control.'),
    bullet('Permissioned contracts can restrict who deploys or interacts.'),
    bullet('Permissionless contracts are open to all.'),
    bullet('Contract upgrades flow through governance when desired.'),

    divider(),

    h2('Strategic Outcomes'),
    cardGroup(2, [
      { icon: 'hugeicons:shield-01', title: 'Stability', body: 'Governance-controlled upgrades prevent unilateral changes.' },
      { icon: 'hugeicons:refresh', title: 'Adaptability', body: 'Contracts can evolve through community consensus.' },
      { icon: 'hugeicons:view', title: 'Transparent Evolution', body: 'All changes are visible and auditable on-chain.' },
      { icon: 'hugeicons:blockchain-06', title: 'Trust Minimization', body: 'No single party controls contract behavior.' },
    ]),

    accordion('Can I use any programming language?', 'Any language that compiles to WASM can be used. Rust, Go, C, and AssemblyScript are the most commonly supported, with mature toolchains and documentation.'),
  ]),
};
