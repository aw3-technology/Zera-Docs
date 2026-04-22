import { bn, h2, h3, p, bullet, callout, divider } from '../../blocks';

export const techStackOverviewArticle = {
  id: 'tech-stack-overview',
  title: 'Tech Stack',
  slug: 'tech-stack-overview',
  excerpt: 'Built from the ground up to serve ZERA\'s purpose — upgrades via ZIP, staking via ACE, and binding outcomes.',
  category_id: 'technology',
  is_published: true,
  display_order: 3,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('Upgrades via ZIP, staking via ACE, and binding outcomes at the protocol level. ZERA\'s tech stack is purpose-built, not forked.'),

    h2('Native Language'),
    p('The ZERA Network was built in C++ without reliance on forks of other networks, allowing ZERA to be purpose-built. This ground-up approach means every architectural decision serves ZERA\'s governance-first design philosophy.'),

    divider(),

    h2('Smart Contracts (WASM)'),
    p('WASM allows developers to create in a variety of languages while being deeply integrated in ZERA\'s broader systems. Smart contracts are first-class citizens of the governance architecture.'),

    h2('Programmability Hooks'),
    p('Governance-aware logic is built into the protocol. Options for permissioned layers where needed. All enforcement is transparent and on-chain.'),
    bullet('Governance-aware contract logic at the protocol level.'),
    bullet('Option for permissioned layers where needed.'),
    bullet('Transparent, on-chain enforcement of all rules.'),

    callout('info', 'Because ZERA was built from scratch, there are no inherited limitations from other chains — every protocol feature is designed to support autonomous governance execution.'),
  ]),
};
