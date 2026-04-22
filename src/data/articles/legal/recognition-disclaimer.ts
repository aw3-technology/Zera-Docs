import { bn, h2, p, callout, divider } from '../../blocks';

export const recognitionDisclaimerArticle = {
  id: 'recognition-disclaimer',
  title: 'Recognition Disclaimer',
  slug: 'recognition-disclaimer',
  excerpt: 'Governance recognition status, community-created content disclaimer, and decentralization statement.',
  category_id: 'legal',
  is_published: true,
  display_order: 4,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2025-10-22T00:00:00Z',
  updated_at: '2025-10-22T00:00:00Z',
  content: bn([
    callout('info', 'Reference Proposal ID: 646c61bc071f380ec5ab9c72957dab16fe90b371792b455c4daff234298d2c50'),
    p('Status: ZERA.net is a recognized community resource via the referenced governance proposal.'),

    divider(),

    h2('1. Community-Created Content'),
    p('ZERA.net is an independently maintained community platform developed collaboratively by contributors across the decentralized ZERA ecosystem. The content provided herein represents community-produced materials, perspectives, and educational resources. It does not constitute official statements or positions of the ZERA Network, its governance participants, or any affiliated developers.'),

    h2('2. No Central Authority or Official Status'),
    p('Recognition of ZERA.net by community governance does not imply endorsement, partnership, or reliance by any ZERA governance construct, token holder group, or other entities within the network. The ZERA Network has no foundation, managing entity, or central authority — all governance decisions occur on-chain, transparently and autonomously through community participation.'),

    h2('3. Accuracy and Reliability'),
    p('While contributors aim for accuracy, information on this site may include errors, omissions, or community opinions that do not reflect broader consensus. Nothing on this site should be interpreted as definitive or authoritative regarding the ZERA protocol or ecosystem operations. Visitors should independently verify all information before acting upon it.'),

    h2('4. Governance Revocability'),
    p('The recognition of ZERA.net as a community domain is a matter of decentralized governance consensus and may be revoked or amended at any time through on-chain governance action. The proposal granting recognition is publicly accessible and permanently recorded on-chain for transparency.'),

    h2('5. No Financial, Legal, or Investment Advice'),
    p('Content hosted or linked on ZERA.net is for informational and educational purposes only. It does not constitute financial, investment, legal, or tax advice. Participation in blockchain systems, including the ZERA Network, carries inherent risks. Always conduct your own research ("DYOR") and comply with applicable laws in your jurisdiction.'),

    h2('6. Decentralization Statement'),
    p('ZERA.net is one of several community-built resources serving as informational and educational hubs for those interested in the ZERA Network. It operates autonomously, without oversight or control by any governing body, in alignment with the decentralized principles of ZERA.'),
  ]),
};
