import { bn, h2, h3, p, bullet, numbered, callout, tabs, accordion, cardGroup, divider, quote, card, expandable, step } from '../../blocks';

export const smartContractsArticle = {
  id: 'smart-contracts',
  title: 'Smart Contracts',
  slug: 'smart-contracts',
  excerpt: 'WASM-powered smart contracts — write in Rust, Go, C, AssemblyScript with near-native execution.',
  category_id: 'developers',
  is_published: true,
  display_order: 2,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('ZERA smart contracts compile to WebAssembly (WASM), giving developers the freedom to write in the language they prefer while achieving near-native execution speed inside a sandboxed runtime.'),

    h2('WASM-Powered Contracts'),
    bullet('Write in Rust, Go, C, AssemblyScript, or any language that compiles to WASM'),
    bullet('Sandboxed and performant — near-native execution with safety guarantees'),
    bullet('No vendor lock-in to a single smart contract language'),

    h2('Governance-Aware Contracts'),
    p('Unlike traditional smart contracts that operate in isolation, ZERA contracts are governance-aware by design.'),
    bullet('Contracts can be permissionless or permissioned, depending on the use case'),
    bullet('Upgrades can be autonomously ratified through on-chain governance proposals'),
    bullet('Contract parameters can be modified by governance votes without manual intervention'),

    h2('Core Tech Stack'),
    bullet('Native build in C++ from the ground up — not forked from another chain. ZERA\'s core is original, purpose-built software.'),
    bullet('Governance hooks — Contracts integrate directly into governance flows. A contract can require a vote before executing sensitive operations, or trigger a proposal automatically.'),
    bullet('Programmability layers — Optional permission layers for institutional or community needs. You can enforce KYC gates, role-based access, or leave your contract fully open.'),

    callout('info', 'ZERA is built on the principle that governance and execution should not exist in isolation — they operate as a unified system. Every contract deployment, upgrade, and parameter change can be governed by the community that uses it.'),

    h2('Contract Lifecycle'),
    step(1, 'Write', 'Author your contract in Rust, Go, C, AssemblyScript, or another WASM-compatible language.'),
    step(2, 'Compile', 'Compile to WASM bytecode using standard toolchains for your language.'),
    step(3, 'Deploy', 'Deploy to the ZERA network. Choose permissionless or permissioned mode.'),
    step(4, 'Govern', 'Optionally connect your contract to governance hooks for community-controlled upgrades and parameter changes.'),
  ]),
};
