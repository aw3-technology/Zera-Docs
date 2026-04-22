import { bn, h2, p, callout, cardGroup, divider } from '../../blocks';

export const visionOverviewArticle = {
  id: 'vision-overview',
  title: 'Vision',
  slug: 'vision-overview',
  excerpt: 'Concepts the community is exploring — civic, institutional, and grassroots models that challenge real-world problems.',
  category_id: 'vision',
  is_published: true,
  display_order: 1,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  content: bn([
    p('ZERA\'s architecture invites civic, institutional, and grassroots models that challenge real-world problems. These are concepts the community is actively exploring.'),

    callout('tips', 'The ideas in this section are community concepts — explorations of what ZERA\'s governance architecture could make possible, not finished products.'),

    divider(),

    h2('Featured Concept: ZERA Democracy'),

    cardGroup(2, [
      { icon: 'hugeicons:court-house', title: 'ZERA Democracy', body: 'A community concept for party-free, continuous civic governance: verified constituents direct each representative vote with an immutable public record.', href: '/article/vision-democracy' },
    ]),
  ]),
};
