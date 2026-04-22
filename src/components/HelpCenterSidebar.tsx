import { cn, getBasePath } from '@/lib/utils';
import { Icon } from './ui/icon';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHelpCenter } from '@/contexts/HelpCenterContext';
import { SidebarArticleList } from './sidebar/SidebarArticleList';
import type { Article, Category, Folder } from '@/lib/api';

interface HelpCenterSidebarProps {
  categories: Category[];
  articles: Article[];
  selectedCategory: string | null;
  selectedArticle?: Article | null;
  onCategorySelect?: (categoryId: string | null) => void;
  onArticleSelect?: (article: Article) => void;
  getArticleCount: (categoryId: string) => number;
  folders?: Folder[];
}

function sortByOrder<T extends { display_order?: number | null; name?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const orderA = a.display_order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.display_order ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return (a.name ?? '').localeCompare(b.name ?? '');
  });
}

export function HelpCenterSidebar({
  categories,
  articles,
  selectedCategory,
  selectedArticle,
  onCategorySelect,
  onArticleSelect,
  getArticleCount,
  folders = [],
}: HelpCenterSidebarProps) {
  const { config, isDark } = useHelpCenter();
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  const sidebarStyle = config?.sidebar_style || 'default';
  const headerLinks = config?.header_links?.slice(0, 3) || [];

  const toggleCollapse = (categoryId: string) => {
    setCollapsedCategories(prev => {
      const next = new Set(prev);
      next.has(categoryId) ? next.delete(categoryId) : next.add(categoryId);
      return next;
    });
  };

  const getArticlesForCategory = (categoryId: string): Article[] => {
    const raw = articles.filter(a => a.category_id === categoryId);
    return sortByOrder(raw);
  };

  const getSubCategories = (parentId: string): Category[] => {
    const subs = categories.filter(c => c.parent_category_id === parentId && c.parent_category_id !== '');
    return sortByOrder(subs);
  };

  // Top-level categories: no parent (null, undefined, or empty string), sorted
  const topLevelCategories = sortByOrder(
    categories.filter(c => !c.parent_category_id || c.parent_category_id === '')
  );

  const renderCategoryIcon = (iconName?: string | null, size: 'sm' | 'md' = 'md') => (
    <Icon icon={iconName || 'hugeicons:folder-01'} className={cn('flex-shrink-0', size === 'md' ? 'h-5 w-5' : 'h-4 w-4')} />
  );

  const getArticleUrl = (article: Article): string => {
    const cat = categories.find(c => c.id === article.category_id);
    const folder = cat?.folder_id ? folders.find(f => f.id === cat.folder_id) : null;
    const base = getBasePath(config);
    return folder && !folder.is_default
      ? `${base}/${folder.slug}/article/${article.slug}`
      : `${base}/article/${article.slug}`;
  };

  // ── Render a subcategory nested inside a parent's guide-line block ───────
  // Subcategories share the parent's vertical guide line; they get their own
  // collapsible block with a secondary guide line for their own articles.
  const renderSubCategory = (category: Category) => {
    const isSelected = selectedCategory === category.id;
    const isCollapsed = collapsedCategories.has(category.id);
    const categoryArticles = getArticlesForCategory(category.id);
    const hasContent = categoryArticles.length > 0;

    if (!hasContent) return null;

    return (
      <div key={category.id}>
        {/* Sub-category header */}
        <div className="flex items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              onCategorySelect?.(category.id);
            }}
            className={cn(
              'flex-1 flex items-center gap-2 py-1.5 text-sm font-medium text-left min-w-0',
              isSelected && !selectedArticle
                ? ''
                : 'text-zinc-800 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100'
            )}
            style={isSelected && !selectedArticle ? { color: config.primary_color } : {}}
          >
            {renderCategoryIcon(category.icon, 'sm')}
            <span className="truncate">{category.name}</span>
          </button>
          <motion.button
            onClick={(e) => { e.preventDefault(); toggleCollapse(category.id); }}
            className={cn(
              'ml-1 p-1 rounded-md w-5 h-5 flex items-center justify-center flex-shrink-0',
              'hover:bg-zinc-100 text-zinc-500 dark:hover:bg-zinc-800 dark:text-zinc-400'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 0 : 90 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <Icon icon="hugeicons:arrow-right-01" className="h-3 w-3" />
            </motion.div>
          </motion.button>
        </div>

        {/* Sub-category articles */}
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="relative pl-[18px]">
                <div className="absolute left-[9px] top-0 bottom-0 w-px bg-zinc-200/80 dark:bg-zinc-700/60" />
                <SidebarArticleList
                  articles={categoryArticles}
                  selectedArticle={selectedArticle}
                  primaryColor={config.primary_color}
                  getArticleUrl={getArticleUrl}
                  onArticleSelect={onArticleSelect}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // ── Render a category row + its collapsible children ─────────────────────
  // Each category is self-contained; subcategories are rendered inside the
  // parent's collapsible block with a left indent so they visually nest.
  const renderCategory = (category: Category, depth = 0) => {
    const isSelected = selectedCategory === category.id;
    const isCollapsed = collapsedCategories.has(category.id);
    const categoryArticles = getArticlesForCategory(category.id);
    const subCategories = getSubCategories(category.id);
    const hasContent = categoryArticles.length > 0 || subCategories.length > 0;

    if (!hasContent) return null;

    if (sidebarStyle === 'default') {
      return (
        <div key={category.id}>
          {/* Category header row — sticky as user scrolls */}
          <div
            className={cn(
              'flex items-center sticky top-0 z-30 -mx-1 px-1 pb-1.5',
            )}
            style={{
              background: 'linear-gradient(to bottom, hsl(var(--background)) 70%, transparent 100%)',
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                onCategorySelect?.(category.id);
              }}
              className="flex-1 flex items-center gap-2 py-1.5 text-sm font-medium text-left min-w-0 uppercase"
              style={{ color: config.primary_color }}
            >
              {renderCategoryIcon(category.icon, 'md')}
              <span className="truncate">{category.name}</span>
            </button>
          </div>

          {/* Children — always visible */}
          <div>
            <SidebarArticleList
              articles={categoryArticles}
              selectedArticle={selectedArticle}
              primaryColor={config.primary_color}
              getArticleUrl={getArticleUrl}
              onArticleSelect={onArticleSelect}
            />

            {/* Sub-categories */}
            {subCategories.length > 0 && (
              <div className="mt-0.5 space-y-0.5">
                {subCategories.map(sub => renderSubCategory(sub))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Non-default styles — flat category button
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onCategorySelect?.(category.id);
    };

    return (
      <a
        key={category.id}
        href="/"
        onClick={handleClick}
        className={cn(
          'flex items-center gap-2 text-sm font-medium',
          depth > 0 && 'ml-3',
          sidebarStyle === 'compact' ? 'px-2 py-1.5 rounded-lg' : 'px-3 py-2 rounded-xl',
          sidebarStyle === 'modern' && 'rounded-full',
          sidebarStyle === 'cards' && 'rounded-xl shadow-sm border border-border/50',
          sidebarStyle === 'floating' && 'rounded-xl shadow-md border border-border/50 bg-card',
          sidebarStyle === 'bordered' && 'rounded-none border-l-2 border-transparent',
          sidebarStyle === 'underline' && 'rounded-none border-b-2 border-transparent pb-3',
          isSelected
            ? sidebarStyle === 'bordered'
              ? 'border-l-zinc-400 text-zinc-900 dark:border-l-zinc-500 dark:text-zinc-200'
              : sidebarStyle === 'underline'
              ? 'border-b-zinc-400 text-zinc-900 dark:border-b-zinc-500 dark:text-zinc-200'
              : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
            : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200'
        )}
      >
        {renderCategoryIcon(category.icon)}
        <span className={cn('flex-1 text-left truncate', sidebarStyle === 'compact' && 'text-xs')}>
          {category.name}
        </span>
      </a>
    );
  };

  return (
    <aside className={cn(
      'w-full lg:w-64 flex-shrink-0 flex flex-col lg:border-r overflow-hidden sticky top-0 h-screen',
      'border-border/50 bg-transparent'
    )}
    >
      {/* Top fade overlay */}
      <div
        className="absolute left-0 right-0 top-0 h-12 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--background)) 40%, transparent 100%)',
        }}
      />
      <div
        className="flex-1 overflow-y-auto pt-2 pb-24 pl-3 pr-3 h-full custom-scrollbar"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--scrollbar-thumb) transparent',
        }}
      >
        {/* Top navigation links */}
        {headerLinks.length > 0 && (
          <div className="border-b py-4 mb-4 border-border/50">
            <div className="space-y-1">
              {headerLinks.map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'flex items-center gap-3 py-2.5 text-sm font-medium transition-colors',
                    'text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100'
                  )}
                >
                  <Icon icon={link.icon || 'hugeicons:link-01'} className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 truncate">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className={cn(sidebarStyle === 'compact' ? 'pr-1' : 'pr-2')}>
          {/* Home link (non-default styles) */}
          {sidebarStyle !== 'default' && (
            <a
              href="/"
              className={cn(
                'flex items-center gap-3 text-sm font-medium mb-4',
                sidebarStyle === 'compact' ? 'px-2 py-1.5 rounded-lg' : 'px-3 py-2 rounded-xl',
                sidebarStyle === 'modern' && 'rounded-full',
                sidebarStyle === 'cards' && 'rounded-xl shadow-sm border border-border/50',
                sidebarStyle === 'floating' && 'rounded-xl shadow-md border border-border/50 bg-card',
                sidebarStyle === 'bordered' && 'rounded-none border-l-2 border-transparent',
                sidebarStyle === 'underline' && 'rounded-none border-b-2 border-transparent pb-3',
                !selectedCategory
                  ? sidebarStyle === 'bordered'
                    ? 'border-l-zinc-400 text-zinc-900 dark:border-l-zinc-500 dark:text-zinc-200'
                    : sidebarStyle === 'underline'
                    ? 'border-b-zinc-400 text-zinc-900 dark:border-b-zinc-500 dark:text-zinc-200'
                    : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-200'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/30 dark:hover:text-zinc-200'
              )}
            >
              <Icon icon="hugeicons:home-01" className={sidebarStyle === 'compact' ? 'h-4 w-4' : 'h-5 w-5'} />
              <span className={sidebarStyle === 'compact' ? 'text-xs' : ''}>Home</span>
            </a>
          )}

          {/* Categories */}
          {(config.show_categories ?? true) && topLevelCategories.length > 0 && (
            <div className={cn(sidebarStyle === 'compact' ? 'mt-3' : '')}>
              {sidebarStyle !== 'minimal' &&
                sidebarStyle !== 'icon-only' &&
                sidebarStyle !== 'underline' &&
                sidebarStyle !== 'default' && (
                  <p className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Categories
                  </p>
                )}
              {/* Outer relative wrapper */}
              <div className={cn(
                sidebarStyle === 'cards' || sidebarStyle === 'floating' ? 'space-y-2' : 'space-y-4',
              )}>
                {topLevelCategories.map(category => renderCategory(category, 0))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
