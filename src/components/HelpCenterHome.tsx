import { useState, useEffect, useRef } from 'react';
import { cn, getBasePath, sortCategories, filterCategoriesByFolder } from '@/lib/utils';
import { DELAY_DATA_FETCH } from '@/lib/constants';
import { Icon } from './ui/icon';
import { SearchModal } from './SearchModal';
import { HelpCenterHeader } from './HelpCenterHeader';
import { HelpCenterSidebar } from './HelpCenterSidebar';
import { NavigationLoadingBar } from './NavigationLoadingBar';
import { BaseLayoutWrapper } from './BaseLayoutWrapper';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { useGoogleFonts } from '@/hooks/useGoogleFonts';
import { useFolderSync } from '@/hooks/useFolderSync';
import { useTheme } from '@/hooks/useTheme';
import { useSearchShortcut } from '@/hooks/useSearchShortcut';
import { getArticles, getCategories } from '@/lib/api';
import type { Article, Category, Folder, Faq, HelpCenterConfig } from '@/lib/api';
import { HelpCenterProvider } from '@/contexts/HelpCenterContext';

interface HelpCenterHomeProps {
  config: HelpCenterConfig;
  articles: Article[];
  categories: Category[];
  folders?: Folder[];
  faqs: Faq[];
  projectId: string;
  initialFolderId?: string;
}

export default function HelpCenterHome({
  config,
  articles,
  categories,
  folders = [],
  faqs,
  projectId,
  initialFolderId,
}: HelpCenterHomeProps) {
  const { isDark, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { activeFolderId, setFolder: setActiveFolderId } = useFolderSync(initialFolderId);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [clientCategories, setClientCategories] = useState(categories);
  const [clientArticles, setClientArticles] = useState(articles);
  const hasFetchedRef = useRef(false);
  
  // activeFolderId is managed by useFolderSync — synced via custom event across all components

  // Sort and filter categories by folder
  const sortedCategories = sortCategories(clientCategories);
  const filteredCategories = filterCategoriesByFolder(sortedCategories, activeFolderId);

  // Load Google Fonts dynamically
  useGoogleFonts(config.heading_font, config.body_font);

  useSearchShortcut(setSearchModalOpen);

  // Client-side fallback: refetch only if SSR data came back empty, and only once
  useEffect(() => {
    if (hasFetchedRef.current) return;
    if (clientCategories.length > 0 && clientArticles.length > 0) return;

    hasFetchedRef.current = true;

    const timer = setTimeout(async () => {
      try {
        const needsArticles = clientArticles.length === 0;
        const needsCategories = clientCategories.length === 0;

        const [fetchedArticles, fetchedCategories] = await Promise.all([
          needsArticles ? getArticles(projectId) : Promise.resolve([]),
          needsCategories ? getCategories(projectId) : Promise.resolve([]),
        ]);

        if (fetchedArticles.length > 0) {
          setClientArticles(fetchedArticles);
        }
        if (fetchedCategories.length > 0) {
          setClientCategories(fetchedCategories);
        }
      } catch {
        // Silent fail
      }
    }, DELAY_DATA_FETCH);

    return () => clearTimeout(timer);
  }, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleArticleClick = (article: Article) => {
    const articleCategory = clientCategories.find(c => c.id === article.category_id);
    const articleFolder = articleCategory?.folder_id 
      ? folders.find(f => f.id === articleCategory.folder_id)
      : null;
    
    // Default folder → no folder prefix in URL
    const url = (articleFolder && !articleFolder.is_default)
      ? `${getBasePath()}/${articleFolder.slug}/article/${article.slug}`
      : `${getBasePath()}/article/${article.slug}`;
    
    window.location.href = url;
  };

  const getArticlesForCategory = (categoryId: string) => {
    return clientArticles.filter(a => a.category_id === categoryId);
  };

  return (
    <HelpCenterProvider config={config} projectId={projectId} isDark={isDark} toggleTheme={toggleTheme}>
    <BaseLayoutWrapper
      config={config}
      projectId={projectId}
      aiChatOpen={aiChatOpen}
      onAiChatToggle={() => setAiChatOpen(!aiChatOpen)}
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
          onSearchOpen={() => setSearchModalOpen(true)}
          onAIOpen={() => setAiChatOpen(!aiChatOpen)}
          folders={folders}
          activeFolderId={activeFolderId}
          onFolderChange={setActiveFolderId}
          articles={clientArticles}
          categories={clientCategories}
          mobileSidebar={
            <HelpCenterSidebar
              categories={filteredCategories}
              articles={clientArticles}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              getArticleCount={(categoryId) => getArticlesForCategory(categoryId).length}
              folders={folders}
            />
          }
        />
      </div>

      {/* Main Content with Sidebar inside max-width */}
      <div className="flex-1 overflow-y-scroll custom-scrollbar-always">
        <div className="flex mx-auto gap-4 md:gap-6 lg:gap-8 pr-0 sm:pr-4 md:pr-8 max-w-[1400px]">
          {/* Sidebar - Left Column — desktop only */}
          <div data-astro-transition-persist="sidebar" className="hidden lg:block">
            <HelpCenterSidebar
              categories={filteredCategories}
              articles={clientArticles}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              getArticleCount={(categoryId) => getArticlesForCategory(categoryId).length}
              folders={folders}
            />
          </div>

          {/* Main Content - Center Column */}
          <div className="flex-1 min-w-0 pt-6 pb-12 px-4 sm:pl-4 sm:pr-0 lg:pl-0">
            <div className="flex gap-4 md:gap-6 lg:gap-8">
              {/* Center Content */}
              <div className="flex-1 max-w-3xl">
                {selectedCategory ? (
                  <CategoryView
                    category={clientCategories.find(c => c.id === selectedCategory)}
                    articles={getArticlesForCategory(selectedCategory)}
                    config={config}
                    onArticleClick={handleArticleClick}
                  />
                ) : (
                  <HomeView
                    config={config}
                    folders={folders}
                    activeFolderId={activeFolderId}
                    filteredCategories={filteredCategories}
                    faqs={faqs}
                    getArticlesForCategory={getArticlesForCategory}
                    onSearchOpen={() => setSearchModalOpen(true)}
                  />
                )}
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        articles={clientArticles}
        categories={clientCategories}
        primaryColor={config.primary_color}
        aiEnabled={config.ai_answer_enabled}
        onAskAI={(query) => {
          // Add query to URL for AI to pick up
          const url = new URL(window.location.href);
          url.searchParams.set('ai_query', query.trim());
          window.history.pushState({}, '', url.toString());
          
          setAiChatOpen(true);
        }}
      />
      </div>
    </BaseLayoutWrapper>
    </HelpCenterProvider>
  );
}

// ── Extracted sub-components ──────────────────────────────────────────────────

function CategoryView({
  category,
  articles,
  config,
  onArticleClick,
}: {
  category: Category | undefined;
  articles: Article[];
  config: HelpCenterConfig;
  onArticleClick: (article: Article) => void;
}) {
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Icon icon={category?.icon || "hugeicons:folder-01"} className="h-8 w-8" style={{ color: config.primary_color }} />
          <h1 className="text-3xl font-bold" style={{ fontFamily: config.heading_font || 'system-ui, sans-serif' }}>{category?.name}</h1>
        </div>
        {category?.description && (
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {category.description}
          </p>
        )}
      </div>

      <div className="space-y-2">
        {articles.map(article => (
          <button
            key={article.id}
            onClick={() => onArticleClick(article)}
            className="w-full flex items-center gap-4 p-4 rounded-xl border text-left group transition-all bg-transparent backdrop-blur-sm border-zinc-100 hover:border-zinc-200 hover:shadow-sm dark:border-zinc-800 dark:hover:border-zinc-700"
          >
            <Icon icon="hugeicons:file-02" className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
            <span className="flex-1 font-medium">{article.title}</span>
            <Icon icon="hugeicons:arrow-right-01" className="h-5 w-5 transition-transform group-hover:translate-x-1 text-zinc-300 dark:text-zinc-600" />
          </button>
        ))}
      </div>
    </>
  );
}

function HomeView({
  config,
  folders,
  activeFolderId,
  filteredCategories,
  faqs,
  getArticlesForCategory,
  onSearchOpen,
}: {
  config: HelpCenterConfig;
  folders: Folder[];
  activeFolderId: string | null;
  filteredCategories: Category[];
  faqs: Faq[];
  getArticlesForCategory: (id: string) => Article[];
  onSearchOpen: () => void;
}) {
  const activeFolder = activeFolderId ? folders.find(f => f.id === activeFolderId) : null;
  const isNonDefaultFolder = activeFolder && !activeFolder.is_default;

  return (
    <>
      {/* Hero Section */}
      <div className="py-8 md:py-12 opacity-0 animate-fade-up [animation-delay:0.05s]">
        <div className="max-w-2xl text-left">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-3" style={{ fontFamily: config.heading_font || 'system-ui, sans-serif' }}>
            {isNonDefaultFolder ? activeFolder.name : config.welcome_title}
          </h1>
          <p className="text-lg mb-6 text-zinc-600 dark:text-zinc-400">
            {isNonDefaultFolder && activeFolder.description ? activeFolder.description : config.welcome_subtitle}
          </p>

          <div className="relative">
            <button
              onClick={onSearchOpen}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left group transition-all bg-transparent backdrop-blur-sm border-zinc-200 hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:hover:border-zinc-700"
            >
              <Icon icon="hugeicons:magic-wand-01" className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
              <span className="flex-1 text-base text-zinc-400 dark:text-zinc-500">
                Ask, search, or explain...
              </span>
              <Icon icon="hugeicons:arrow-right-01" className="h-5 w-5 transition-transform group-hover:translate-x-1 text-zinc-400 dark:text-zinc-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      {(config.show_categories ?? true) && filteredCategories.length > 0 && (
        <div className="mb-8 opacity-0 animate-fade-up [animation-delay:0.15s]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCategories.filter(c => getArticlesForCategory(c.id).length > 0).slice(0, 6).map(category => {
              const categoryFolder = category.folder_id
                ? folders.find(f => f.id === category.folder_id)
                : null;
              const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
              const categoryUrl = (categoryFolder && !categoryFolder.is_default)
                ? `/${categoryFolder.slug}/${categorySlug}`
                : `/${categorySlug}`;
              const base = getBasePath(config);

              return (
                <a
                  key={category.id}
                  href={`${base}${categoryUrl}`}
                  className="group flex flex-col items-start gap-4 p-5 rounded-2xl border text-left min-h-[160px] transition-all bg-transparent backdrop-blur-sm border-zinc-100 hover:border-zinc-200 hover:shadow-md dark:border-zinc-800 dark:hover:border-zinc-700"
                >
                  <Icon icon={category.icon || "hugeicons:folder-01"} className="h-8 w-8" style={{ color: config.primary_color }} />
                  <div className="flex-1 w-full">
                    <h3 className="font-semibold text-base mb-1.5 text-zinc-900 dark:text-zinc-50">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm line-clamp-2 text-zinc-500 dark:text-zinc-400">
                        {category.description}
                      </p>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <div className="mb-8 opacity-0 animate-fade-up [animation-delay:0.25s]">
          <h2
            className="font-semibold mb-4 text-xl text-zinc-900 dark:text-zinc-50"
            style={{ fontFamily: config.heading_font || 'system-ui, sans-serif' }}
          >
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.slice(0, 5).map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="rounded-xl border px-4 transition-all bg-transparent backdrop-blur-sm border-zinc-100 dark:border-zinc-800"
              >
                <AccordionTrigger className="py-4 hover:no-underline text-base">
                  <span className="font-medium text-left text-zinc-900 dark:text-zinc-50">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="text-sm text-zinc-600 dark:text-zinc-300">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </>
  );
}
