import { bn, h2, h3, p, bullet, callout, divider, quote } from '../../blocks';

export const zmtBackgroundArticle = {
  id: 'zmt-background',
  title: 'ZERA Marketing Token (ZMT)',
  slug: 'zmt-background',
  excerpt: 'ZMT is a governance-enabled construct for coordinating and funding awareness, adoption, and engagement activities \u2014 fully directed by the ZERA community.',
  category_id: 'governance',
  is_published: true,
  display_order: 5,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    callout('note', 'By accessing this document, you acknowledge that you have read, understood, and agree to be bound by the Disclaimer.'),

    h2('Introduction'),
    p('The ZERA Marketing Token (ZMT) is a governance-enabled construct within the ZERA ecosystem, created to coordinate and fund activities that promote awareness, adoption, and engagement with the network. Contrary to its name, ZMT is not a circulating token in the conventional sense. It operates as a specialized governance tool, supported by the ZERA community, and entirely directed through proposals and votes.'),
    p('ZMT exists as a public awareness channel, allowing targeted resources to be allocated in a decentralized way which in turn can enhance the visibility and long-term viability of the protocol.'),

    divider(),

    h2('Purpose and Role in the Ecosystem'),
    p('ZMT plays a strategic role in expanding ZERA\'s reach by supporting initiatives that align with ecosystem adoption. It is primarily used for:'),
    bullet('Funding campaigns to increase awareness in new markets and industries'),
    bullet('Supporting educational content, tutorials, and workshops for community learning'),
    bullet('Incentivizing participation in events, hackathons, and community programs'),
    bullet('Developing brand recognition and fostering relationships that build credibility'),

    p('This targeted focus ensures that outreach efforts are not fragmented or opaque, but instead operate through a collective process that keeps decision-making in the hands of the community.'),

    divider(),

    h2('Governance Structure'),
    p('ZMT is entirely governed by ZERA\'s governance system. All resource allocations are subject to community proposals, votes, and autonomous execution. The governance cycle enables:'),
    bullet('Submission and review of proposals'),
    bullet('Voting to determine which initiatives best serve targeted priorities'),
    bullet('Automated execution of approved actions, removing reliance on centralized managers'),

    callout('info', 'Through this design, every initiative is both community-directed and transparently accountable on-chain.'),

    divider(),

    h2('Funding Base'),
    p('ZMT draws from allocations within the ZERA ecosystem and multi-faceted governance framework, which is itself governed on-chain by community consensus. This allows:'),
    bullet('Resources allocation'),
    bullet('Transparent expenditures that are permanently recorded'),
    bullet('Adaptable decisions, reflecting evolving community priorities and market conditions'),

    divider(),

    h2('Strategic Implications'),
    bullet('Dedicated Adoption Channel: Allows for focused resources targeted at outreach and awareness'),
    bullet('Transparency: All activity is publicly visible and collectively authorized'),
    bullet('Community Empowerment: Places collective decision-making for adoption strategies directly in the hands of participants'),
    bullet('Long-Term Legitimacy: Builds sustained awareness that supports ZERA\'s durability across global ecosystems'),

    divider(),

    h2('Conclusion'),
    p('The ZERA Marketing Token (ZMT) reflects the multi-faceted governance approach of the ZERA ecosystem, where specialized governance constructs are designed to focus on distinct priorities such as adoption and awareness. While ZMT does not currently circulate as a token, it functions as a community-owned governance channel for promoting awareness, education, and outreach.'),
    quote('By embedding marketing into targeted governance itself, ZMT demonstrates how ZERA ensures that not only the protocol\'s technical foundations but also its adoption and legitimacy are collectively sustained through transparent, decentralized decision-making.'),
  ]),
};
