export const sidebarBlockArticle = {
  id: 'sidebar-block',
  title: 'Sidebar & Navigation',
  slug: 'sidebar-block',
  excerpt: 'The collapsible sidebar that lists categories and articles for navigation.',
  category_id: 'components',
  is_published: true,
  display_order: 7,
  sidebar_title: null as string | null,
  icon: null as string | null,
  created_at: '2024-01-16T00:00:00Z',
  updated_at: '2024-01-16T00:00:00Z',
  content: `
<h2>Sidebar &amp; Navigation</h2>
<p>The sidebar is the primary navigation element. It lists all categories and their articles, highlights the active article, and collapses on mobile.</p>

<h2>Sidebar styles</h2>
<p>You can change the sidebar appearance via <code>sidebar_style</code> in <code>src/data/config.ts</code>. Available values:</p>
<ul>
  <li><code>default</code> — standard list with icons</li>
  <li><code>minimal</code> — no icons, compact spacing</li>
  <li><code>compact</code> — tighter line height</li>
  <li><code>cards</code> — each item in a card</li>
  <li><code>modern</code> — pill-shaped active state</li>
  <li><code>floating</code> — elevated card sidebar</li>
  <li><code>bordered</code> — left border accent on active item</li>
  <li><code>gradient</code> — gradient background on active item</li>
  <li><code>accordion</code> — categories collapse/expand</li>
</ul>

<h2>Component location</h2>
<p>The sidebar is implemented in <code>src/components/HelpCenterSidebar.tsx</code>. It receives <code>categories</code>, <code>articles</code>, and the active article slug as props.</p>

<h2>Mobile behaviour</h2>
<p>On small screens the sidebar is hidden and accessible via a hamburger menu button in the header. It slides in as a sheet overlay using the <code>Sheet</code> component from <code>src/components/ui/sheet.tsx</code>.</p>
  `.trim(),
};
