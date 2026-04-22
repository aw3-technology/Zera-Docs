import { useState, useRef } from 'react';
import { cn, getBasePath, sortCategories, filterCategoriesByFolder } from '@/lib/utils';
import { HelpCenterSidebar } from './HelpCenterSidebar';
import { HelpCenterProvider } from '@/contexts/HelpCenterContext';
import { HelpCenterHeader } from './HelpCenterHeader';
import { Icon } from './ui/icon';
import { useGoogleFonts } from '@/hooks/useGoogleFonts';
import { useTheme } from '@/hooks/useTheme';
import { useAiChat } from '@/hooks/useAiChat';
import { useFolderSync } from '@/hooks/useFolderSync';
import { NavigationLoadingBar } from './NavigationLoadingBar';
import { BaseLayoutWrapper } from './BaseLayoutWrapper';
import type { Article, Category, Folder } from '@/lib/api';

interface CategoryPageWrapperProps {
  config: any;
  category: Category;
  articles: Article[];
  allCategories: Category[];
  allArticles: Article[];
  projectId: string;
  folders?: Folder[];
}

export default function CategoryPageWrapper({
  config,
  category,
  articles,
  allCategories,
  allArticles,
  projectId,
  folders = [],
}: CategoryPageWrapperProps) {
  const { isDark, toggleTheme } = useTheme();
  const { aiChatOpen, openAiChat, closeAiChat, toggleAiChat } = useAiChat();
  const { activeFolderId, setFolder: setActiveFolderId } = useFolderSync();

  // Sort and filter categories by folder (no subcategory inclusion on category page)
  const sortedCategories = sortCategories(allCategories);
  const filteredCategories = filterCategoriesByFolder(sortedCategories, activeFolderId, { includeSubcategories: false });

  // Load Google Fonts dynamically
  useGoogleFonts(config.heading_font, config.body_font);

  const renderCategoryIcon = (iconName?: string | null) => {
    const icon = iconName || "hugeicons:folder-01";
    return <Icon icon={icon} className="h-6 w-6" style={{ color: config.primary_color }} />;
  };

  return (
    <HelpCenterProvider config={config} projectId={projectId} isDark={isDark} toggleTheme={toggleTheme}>
    <BaseLayoutWrapper
      config={config}
      projectId={projectId}
      aiChatOpen={aiChatOpen}
      onAiChatToggle={closeAiChat}
    >
      <div 
        className={cn(
          "flex flex-col h-screen overflow-hidden",
          "bg-background text-foreground"
        )}
        style={{ fontFamily: config.body_font || 'system-ui, sans-serif' }}
      >
      {/* Navigation Loading Bar */}
      <NavigationLoadingBar primaryColor={config.primary_color} />

      {/* Header - persists across navigation */}
      <div data-astro-transition-persist="header">
        <HelpCenterHeader
          onSearchOpen={() => {}}
          onAIOpen={openAiChat}
          showBackButton={false}
          folders={folders}
          articles={allArticles}
          categories={allCategories}
          mobileSidebar={
            <HelpCenterSidebar
              categories={filteredCategories}
              articles={allArticles}
              selectedCategory={category.id}
              getArticleCount={(categoryId) => allArticles.filter(a => a.category_id === categoryId).length}
              folders={folders}
            />
          }
        />
      </div>

      {/* Main Content with Sidebar inside max-width */}
      <div className="flex-1 overflow-hidden">
        <div className="flex mx-auto gap-4 md:gap-6 lg:gap-8 h-full pr-0 sm:pr-4 md:pr-8 max-w-[1400px]">
          {/* Sidebar - Left Column — desktop only */}
          <div data-astro-transition-persist="sidebar" className="hidden lg:block">
            <HelpCenterSidebar
              categories={filteredCategories}
              articles={allArticles}
              selectedCategory={category.id}
              getArticleCount={(categoryId) => allArticles.filter(a => a.category_id === categoryId).length}
              folders={folders}
            />
          </div>

          {/* Main Content - Center Column - Scrollable */}
          <div className="flex-1 min-w-0 pt-6 md:pt-8 pb-12 max-w-3xl overflow-y-auto scrollbar-hide px-4 sm:pl-4 sm:pr-4 lg:pl-0 lg:pr-0">
            {/* Breadcrumb */}
            <nav className={cn("flex items-center gap-2 text-sm mb-6 opacity-0 animate-fade-in [animation-delay:0.05s]", "text-zinc-500 dark:text-zinc-400")}>
              <a href={getBasePath() || '/'} className="hover:underline">Home</a>
              {(() => {
                const categoryFolder = category.folder_id
                  ? folders.find(f => f.id === category.folder_id)
                  : null;
                if (categoryFolder && !categoryFolder.is_default) {
                  return (
                    <>
                      <Icon icon="hugeicons:arrow-right-01" className="h-3 w-3" />
                      <a href={`${getBasePath()}/${categoryFolder.slug}`} className="hover:underline">{categoryFolder.name}</a>
                    </>
                  );
                }
                return null;
              })()}
              <Icon icon="hugeicons:arrow-right-01" className="h-3 w-3" />
              <span className={"text-zinc-900 dark:text-zinc-200"}>{category.name}</span>
            </nav>

            {/* Category Header */}
            <div className="mb-8 opacity-0 animate-fade-up [animation-delay:0.1s]">
              <div className="flex items-center gap-3 mb-3">
                {renderCategoryIcon(category.icon)}
                <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: config.heading_font || 'system-ui, sans-serif' }}>
                  {category.name}
                </h1>
              </div>
              {category.description && (
                <p className={"text-base md:text-lg text-zinc-600 dark:text-zinc-400"}>
                  {category.description}
                </p>
              )}
            </div>

            {/* Articles List */}
            <div className="space-y-2 opacity-0 animate-fade-up [animation-delay:0.15s]">
              {articles.length === 0 ? (
                <p className={"text-center py-12 text-zinc-400 dark:text-zinc-500"}>
                  No articles found in this category.
                </p>
              ) : (
                articles.map(article => {
                  const articleFolder = category.folder_id 
                    ? folders.find(f => f.id === category.folder_id)
                    : null;
                  const articleUrl = articleFolder 
                    ? `${getBasePath()}/${articleFolder.slug}/article/${article.slug}`
                    : `${getBasePath()}/article/${article.slug}`;
                  
                  return (
                    <a
                      key={article.id}
                      href={articleUrl}
                    className={"flex items-center gap-3 px-4 py-3 rounded-xl border text-left group bg-card border-zinc-100 hover:border-zinc-200 hover:shadow-sm dark:border-zinc-800 dark:hover:border-zinc-700"}
                  >
                    <Icon icon="hugeicons:file-02" className={"h-4 w-4 flex-shrink-0 text-zinc-400 dark:text-zinc-500"} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{article.title}</h3>
                      {article.excerpt && (
                        <p className={"text-xs line-clamp-1 mt-0.5 text-zinc-400 dark:text-zinc-500"}>
                          {article.excerpt}
                        </p>
                      )}
                    </div>
                    <Icon icon="hugeicons:arrow-right-01" className={"h-4 w-4 flex-shrink-0 text-zinc-300 dark:text-zinc-600"} />
                  </a>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      </div>
    </BaseLayoutWrapper>
    </HelpCenterProvider>
  );
}
