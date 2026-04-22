import { bn, h2, p, callout, cardGroup, divider } from '../../blocks';

export const technologyOverviewArticle = {
  id: 'technology-overview',
  title: 'Technology',
  slug: 'technology-overview',
  excerpt: 'Technology that turns ideas into reality — WASM smart contracts, a governance-aware protocol, and more.',
  category_id: 'technology',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('WASM smart contracts, a governance-aware protocol, predictable fee flows, governance-aligned bridges, and more. ZERA\'s technology stack is purpose-built to serve its governance-first architecture.'),

    callout('info', 'ZERA was built from the ground up in C++ — no forks, no inherited limitations. Every layer is designed to support autonomous governance execution.'),

    divider(),

    h2('Explore Technology'),

    cardGroup(2, [
      { icon: 'hugeicons:code', title: 'Smart Contracts', body: 'Multi-language WASM contracts, sandboxed execution, optionally upgradeable through governance.', href: '/article/smart-contracts-overview' },
      { icon: 'hugeicons:wrench-01', title: 'Tech Stack', body: 'Native C++ protocol, WASM VM, governance hooks, and binding outcomes at the protocol level.', href: '/article/tech-stack-overview' },
      { icon: 'hugeicons:coins-01', title: 'Fees', body: 'User fees, validator rewards, treasury contributions, and supply impacts.', href: '/article/fees-overview' },
      { icon: 'hugeicons:link-03', title: 'Bridges', body: 'Governance-aligned interoperability with Guardian-based cross-chain validation.', href: '/article/bridges-overview' },
    ]),
  ]),
};
