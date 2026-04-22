import { bn, h2, p, bullet, callout, divider } from '../../blocks';

export const disclaimerArticle = {
  id: 'disclaimer',
  title: 'Disclaimer',
  slug: 'disclaimer',
  excerpt: 'Important notices regarding content, risk disclosure, and regulatory compliance.',
  category_id: 'legal',
  is_published: true,
  display_order: 3,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2025-10-22T00:00:00Z',
  updated_at: '2025-10-22T00:00:00Z',
  content: bn([
    callout('warning', 'IMPORTANT NOTICE: PLEASE READ CAREFULLY'),

    p('Materials (the "Content") are provided for solely informational purposes only and does not constitute financial, investment, legal, or tax advice. The information contained herein is subject to change without notice and may not be complete or accurate.'),

    divider(),

    h2('No Investment Advice'),
    p('Content does not constitute investment advice or a recommendation to buy, sell, or hold any tokens, cryptocurrencies, or other digital assets. Any decisions made based on Content are made at your own risk.'),

    h2('No Warranties'),
    p('Content is provided "as is" without any representations or warranties, express or implied. The ZERA community makes no representations or warranties in relation to the Content or the information and materials provided herein.'),

    h2('Regulatory Compliance'),
    p('Digital assets and blockchain technologies are subject to evolving regulatory frameworks across different jurisdictions. It is your responsibility to ensure compliance with all applicable laws and regulations in your jurisdiction.'),

    h2('Risk Disclosure'),
    p('Participation in blockchain ecosystems and digital asset markets involves substantial risk, including but not limited to:'),
    bullet('Complete loss of capital'),
    bullet('Regulatory changes that may affect utility or value'),
    bullet('Technical vulnerabilities or failures'),
    bullet('Market volatility'),
    bullet('Liquidity risks'),

    h2('Forward-Looking Statements'),
    p('Content may contain forward-looking statements that involve risks and uncertainties. Actual results may differ materially.'),

    h2('No Securities Offering'),
    p('Nothing in the Content should be construed as an offer to sell or solicitation of an offer to buy securities in any jurisdiction where such offer or sale would be unlawful.'),

    h2('Decentralized Nature'),
    p('ZERA is a decentralized network with no official truth, central authority, foundation, or managing entity. All decisions are made through community governance.'),

    h2('Artificial Intelligence (AI)'),
    callout('info', 'Although Content is peer-reviewed, it was created via AI tools based off various community created resources and discussion. It is important to consider that this Content may contain inaccuracies and that AI can make mistakes. Check important information and DYOR!'),

    h2('Community Background'),
    p('Content is from decentralized community contributors within the decentralized ZERA Network which has no official website. Community resources like zera.net present evolving viewpoints and are community-run, not official. No Content should be considered official.'),

    h2('Governing Framework'),
    p('By accessing the Content, you acknowledge and agree that your reliance on the Content is subject to the terms of the ZERA Open Use and Revenue Sharing License, all supplemental documents including but not limited to the "Rules of Engagement", and any other binding governance documents adopted by the ZERA community. These documents, as amended through ZERA governance processes, are incorporated by reference and form an integral part of this disclaimer. Compliance with the ZERA License and supplemental governance outcomes is mandatory at all times. If you are having trouble finding the latest version of this documentation, please do not access the content.'),

    h2('Subject to Change'),
    p('The Content, as well as the terms, rules, and governance documents of the ZERA Network, are subject to change, update, or replacement at any time. No guarantee is made that the information presented is or will remain accurate, current, or applicable in the future.'),

    divider(),

    p('By accessing this Content, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.'),
  ]),
};
