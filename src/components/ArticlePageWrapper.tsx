import { useState } from 'react';
import { cn, getBasePath, sortCategories, filterCategoriesByFolder } from '@/lib/utils';
import { API_BASE_URL } from '@/lib/constants';
import { HelpCenterSidebar } from './HelpCenterSidebar';
import { HelpCenterHeader } from './HelpCenterHeader';
import { ArticleContentViewer, MethodBadge } from './help-center/ArticleContentViewer';
import { TryItModal } from './help-center/TryItModal';
import { CodeExamplesPanel } from './help-center/CodeExamplesPanel';
import { ArticleFeedback } from './help-center/ArticleFeedback';
import { CopyDropdown } from './help-center/CopyDropdown';
import { ArticleBreadcrumb } from './help-center/ArticleBreadcrumb';
import { ArticlePagination } from './help-center/ArticlePagination';
import { NavigationLoadingBar } from './NavigationLoadingBar';
import { BaseLayoutWrapper } from './BaseLayoutWrapper';
import { SearchModal } from './SearchModal';
import { ErrorBoundary } from './ErrorBoundary';
import { useTheme } from '@/hooks/useTheme';
import { useGoogleFonts } from '@/hooks/useGoogleFonts';
import { useFolderSync } from '@/hooks/useFolderSync';
import { useSearchShortcut } from '@/hooks/useSearchShortcut';
import { useTableOfContents } from '@/hooks/useTableOfContents';
import { useApiEndpoint } from '@/hooks/useApiEndpoint';
import { HelpCenterProvider } from '@/contexts/HelpCenterContext';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category_id: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  display_order?: number | null;
  folder_id?: string | null;
  parent_category_id?: string | null;
}

interface Folder {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  description?: string | null;
  is_default: boolean;
  display_order?: number;
}

interface ArticlePageWrapperProps {
  config: any;
  article: Article;
  articleBlocks?: any[] | null;
  categories: Category[];
  allArticles: Article[];
  categoryName: string;
  articleUrl: string;
  formattedDate: string;
  projectId: string;
  folders?: Folder[];
  /** URL to the project's OpenAPI spec — reserved for future use */
  apiSpecUrl?: string | null;
}

export default function ArticlePageWrapper({
  config,
  article,
  articleBlocks,
  categories,
  allArticles,
  categoryName,
  articleUrl,
  formattedDate,
  projectId,
  folders = [],
  apiSpecUrl,
}: ArticlePageWrapperProps) {
  const { isDark, toggleTheme } = useTheme();
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { activeFolderId } = useFolderSync();
  const [tryItModalOpen, setTryItModalOpen] = useState(false);

  useSearchShortcut(setSearchModalOpen);
  useGoogleFonts(config.heading_font, config.body_font);
  useTableOfContents(isDark, config.primary_color);

  const sortedCategories = sortCategories(categories);
  const filteredCategories = filterCategoriesByFolder(sortedCategories, activeFolderId);

  const apiBaseUrl = config.api_base_url || API_BASE_URL;
  const { isApiRefArticle, method, path, hasEndpoint } = useApiEndpoint(article, categories, folders, apiBaseUrl);

  // Previous / next articles in the same category
  const categoryArticles = allArticles
    .filter(a => a.category_id === article.category_id && a.is_published)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  const currentIndex = categoryArticles.findIndex(a => a.id === article.id);
  const previousArticle = currentIndex > 0 ? categoryArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < categoryArticles.length - 1 ? categoryArticles[currentIndex + 1] : null;

  const chatgptLink = config.chatgpt_link || 'https://chatgpt.com';
  const claudeLink = config.claude_link || 'https://claude.ai';

  return (
    <HelpCenterProvider config={config} projectId={projectId} isDark={isDark} toggleTheme={toggleTheme}>
      <BaseLayoutWrapper
      config={config}
      projectId={projectId}
      aiChatOpen={aiChatOpen}
      onAiChatToggle={() => setAiChatOpen(!aiChatOpen)}
    >
      <div
        className={cn("flex flex-col h-screen overflow-hidden bg-background text-foreground")}
        style={{ fontFamily: config.body_font || 'system-ui, sans-serif' }}
      >
      {/* Navigation Loading Bar */}
      <NavigationLoadingBar primaryColor={config.primary_color} />

      {/* Header - persists across navigation */}
      <div data-astro-transition-persist="header" className="bg-transparent">
        <HelpCenterHeader
          onSearchOpen={() => setSearchModalOpen(true)}
          onAIOpen={() => setAiChatOpen(!aiChatOpen)}
          showBackButton={false}
          folders={folders}
          articles={allArticles}
          categories={categories}
          mobileSidebar={
            <HelpCenterSidebar
              categories={filteredCategories}
              articles={allArticles}
              selectedCategory={article.category_id}
              selectedArticle={article}
              getArticleCount={(categoryId) => allArticles.filter(a => a.category_id === categoryId).length}
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
              selectedCategory={article.category_id}
              selectedArticle={article}
              getArticleCount={(categoryId) => allArticles.filter(a => a.category_id === categoryId).length}
            />
          </div>

          {/* Article Content - Center Column - Scrollable */}
          <div className={cn(
            "flex-1 min-w-0 pt-6 md:pt-8 pb-12 overflow-y-auto scrollbar-hide px-4 sm:pl-4 sm:pr-4 lg:pl-0 lg:pr-0",
            !isApiRefArticle && "max-w-[720px]"
          )} id="article-scroll-container">
            <ArticleBreadcrumb
              articleTitle={article.title}
              categoryId={article.category_id}
              categories={categories}
              folders={folders}
              isDark={isDark}
            />

            {/* Article Header with Copy Options */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6 opacity-0 animate-fade-up [animation-delay:0.1s]">
              {/* Category Badge and Title */}
              <div className="flex-1 min-w-0">
                <span
                  className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3"
                  style={{ backgroundColor: `${config.primary_color}15`, color: config.primary_color }}
                >
                  {categoryName}
                </span>
                <h1
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ fontFamily: config.heading_font || 'system-ui, sans-serif' }}
                >
                  {article.title}
                </h1>
                {article.excerpt && !isApiRefArticle && (
                  <p className="text-base mt-2 text-zinc-600 dark:text-zinc-400">
                    {article.excerpt}
                  </p>
                )}
              </div>

              {/* Copy as Markdown — always visible */}
              <div className="flex-shrink-0">
                <CopyDropdown
                    article={article}
                    categoryName={categoryName}
                    articleUrl={articleUrl}
                    chatgptLink={chatgptLink}
                    claudeLink={claudeLink}
                    isDark={isDark}
                    primaryColor={config.primary_color}
                    projectId={projectId}
                    allArticles={allArticles}
                    categories={sortedCategories}
                  />
              </div>
            </div>

            {/* API Reference: Show excerpt and Try It button */}
            {isApiRefArticle && article.excerpt && (
              <div className="mb-6">
                <p className="text-base mb-4 text-zinc-600 dark:text-zinc-400">
                  {article.excerpt}
                </p>
                {hasEndpoint && (
                  <div className={cn(
                    'flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-mono text-sm',
                    'bg-zinc-100 border border-zinc-200 dark:bg-zinc-800/60 dark:border-zinc-700'
                  )}>
                    <div className="flex items-center gap-2.5">
                      <MethodBadge method={method} />
                      <span className="text-zinc-700 dark:text-zinc-300">
                        {(() => {
                          try {
                            const baseUrlObj = new URL(apiBaseUrl);
                            const basePath = baseUrlObj.pathname.replace(/\/$/, '');
                            return basePath + path;
                          } catch {
                            return path;
                          }
                        })()}
                      </span>
                    </div>
                    <button
                      onClick={() => setTryItModalOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90 active:scale-95"
                      style={{ backgroundColor: config.primary_color }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M1 1l10 5-10 5V1z"/>
                      </svg>
                      Try It
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Article Content */}
            <div className="min-h-[400px] opacity-0 animate-fade-up [animation-delay:0.15s]">
              <ErrorBoundary>
                <ArticleContentViewer
                  key={article.id}
                  content={article.content}
                  initialBlocks={articleBlocks}
                  isDark={isDark}
                  primaryColor={config.primary_color}
                  showToc={!isApiRefArticle}
                  articleId={article.id}
                  projectId={projectId}
                  updatedAt={article.updated_at}
                  showFeedback={false}
                  headingFont={config.heading_font}
                  bodyFont={config.body_font}
                  isApiReference={isApiRefArticle}
                  apiBaseUrl={apiBaseUrl}
                  article={article}
                />
              </ErrorBoundary>
            </div>

            {/* Feedback Section */}
            <div className="mt-8 pt-6 pb-8 border-b border-border/50">
              <ArticleFeedback
                articleId={article.id}
                projectId={projectId}
                isDark={isDark}
                compact={true}
                horizontal={true}
              />
            </div>

            <ArticlePagination
              previousArticle={previousArticle}
              nextArticle={nextArticle}
              categories={categories}
              folders={folders}
            />
          </div>

          {/* Right Sidebar - TOC for regular articles, Code Examples for API reference */}
          {!isApiRefArticle ? (
            <aside
              className={cn(
                "hidden lg:block w-64 min-w-64 max-w-64 flex-shrink-0 sticky top-0 h-screen max-h-screen overflow-auto pt-8",
                "text-zinc-500 dark:text-zinc-400",
                "[&::-webkit-scrollbar]:w-1.5",
                "[&::-webkit-scrollbar-track]:bg-transparent",
                "[&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:hover:bg-zinc-400 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-800 dark:[&::-webkit-scrollbar-thumb]:hover:bg-zinc-700",
                "[&::-webkit-scrollbar-thumb]:rounded-full"
              )}
            >
              <div id="toc-container"></div>
            </aside>
          ) : (
            <aside
              className={cn(
                "hidden lg:block w-[360px] min-w-[360px] max-w-[360px] flex-shrink-0 sticky top-0 h-screen max-h-screen overflow-auto pt-8 pl-6 border-l",
                "border-zinc-200 dark:border-zinc-800",
                "[&::-webkit-scrollbar]:w-1.5",
                "[&::-webkit-scrollbar-track]:bg-transparent",
                "[&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:hover:bg-zinc-400 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-800 dark:[&::-webkit-scrollbar-thumb]:hover:bg-zinc-700",
                "[&::-webkit-scrollbar-thumb]:rounded-full"
              )}
            >
              <CodeExamplesPanel
                key={article.id}
                content={article.content}
                isDark={isDark}
                primaryColor={config.primary_color}
              />
            </aside>
          )}
        </div>
      </div>

      </div>
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        articles={allArticles}
        categories={categories}
        primaryColor={config.primary_color}
        aiEnabled={config.ai_answer_enabled}
      />

      {/* Try It Modal for API reference articles */}
      {isApiRefArticle && hasEndpoint && (
        <TryItModal
          isOpen={tryItModalOpen}
          onClose={() => setTryItModalOpen(false)}
          method={method}
          path={path}
          baseUrl={apiBaseUrl}
          primaryColor={config.primary_color}
          isDark={isDark}
          description={article.excerpt}
          headingFont={config.heading_font}
          bodyFont={config.body_font}
          parameters={[]}
        />
      )}

      {/* API Playground — reserved for future use */}
      {/* {apiSpecUrl && <ApiPlayground />} */}
      </BaseLayoutWrapper>
    </HelpCenterProvider>
  );
}
