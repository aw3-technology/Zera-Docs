import { bn, h2, h3, p, bullet, callout, divider, quote, step } from '../../blocks';

export const iitBackgroundArticle = {
  id: 'iit-background',
  title: 'Innovative Initiatives Token (IIT)',
  slug: 'iit-background',
  excerpt: 'The IIT is a specialized governance construct within the ZERA ecosystem, seeded with over 20 million ZRA and fully controlled by community governance.',
  category_id: 'governance',
  is_published: true,
  display_order: 4,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    callout('note', 'By accessing this document, you acknowledge that you have read, understood, and agree to be bound by the Disclaimer.'),

    h2('Introduction'),
    p('The Innovative Initiatives Token (IIT) is a specialized governance construct within the ZERA ecosystem. Contrary to its name, IIT does not currently have a circulating token supply. Instead, it operates as a ZERA-enabled governance tool seeded with a grant of 20 million ZERA and fully controlled by the community through decentralized decision-making.'),
    p('Rather than being designed for transfer, speculation, or general use, IIT serves as part of a multi-faceted governance channel for directing resources toward innovation and experimentation within the ZERA ecosystem.'),

    divider(),

    h2('Purpose and Role in the Ecosystem'),
    p('The IIT exists to provide a structured, community-driven funding mechanism for initiatives that advance the protocol and its ecosystem. It is primarily used for:'),
    bullet('Allocating resources to projects or initiatives with a clear and impactful vision for the protocol'),
    bullet('Supporting open-source tools, research, and experimental development'),
    bullet('Funding community-led proposals that align with long-term sustainability'),

    callout('info', 'IIT in practice is not an actual token but a governance-enabled system to allow transparent, accountable, and focused allocation of resources.'),

    divider(),

    h2('Governance Structure'),
    p('IIT is entirely controlled by ZERA governance. All decisions relating to its usage and distribution are made by community proposals and votes, enforced by autonomous execution.'),
    p('The governance cycle is structured into monthly rounds:'),

    step(1, 'Stage One (7 days)', 'Proposals are voted on by the community.'),
    step(2, 'Stage Two (remainder of the month)', 'Successful proposals are voted upon again, and their associated transactions are executed automatically if successful.'),

    p('This two-stage cycle balances accessibility to new ideas with the need to focus on the most supported initiatives.'),

    divider(),

    h2('Funding Base'),
    p('The IIT was given a grant of over 20 million ZERA. These resources form its foundation and can only be deployed through regular governance processes.'),
    p('Because its operations are governed entirely on-chain, every disbursement and decision is transparent and enforceable without reliance on intermediaries or managerial efforts.'),

    divider(),

    h2('Strategic Implications'),
    bullet('Focused Resource Allocation: IIT allows funding proposals to be concentrated on innovation'),
    bullet('Governance in Action: It showcases ZERA\'s ability to build specialized multi-faceted governance structures that remain under full community control'),
    bullet('Decentralized Execution: Associated transactions are executed automatically, eliminating reliance on managerial efforts'),

    divider(),

    h2('Conclusion'),
    p('The Innovative Initiatives Token (IIT) demonstrates how ZERA governance can be used to create non-traditional, purpose-built instruments. IIT functions as a targeted governance mechanism that collectively manages millions of ZERA in resources in a fully decentralized manner.'),
    quote('By serving as a transparent and autonomous funding channel, IIT enables the community to collectively direct innovation, research, and development \u2014 reinforcing ZERA\'s principle that governance is not just oversight, but the engine of sustainable support.'),
  ]),
};
