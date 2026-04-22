import { useState, useEffect } from 'react';
import { BaseLayoutWrapper } from './BaseLayoutWrapper';
import { HelpCenterProvider } from '@/contexts/HelpCenterContext';
import { HelpCenterHeader } from './HelpCenterHeader';
import { HelpCenterSidebar } from './HelpCenterSidebar';
import { NavigationLoadingBar } from './NavigationLoadingBar';
import { SearchModal } from './SearchModal';
import { CustomApiReference } from './help-center/CustomApiReference';
import { cn, sortCategories, filterCategoriesByFolder } from '@/lib/utils';
import { useGoogleFonts } from '@/hooks/useGoogleFonts';
import { useTheme } from '@/hooks/useTheme';
import { useAiChat } from '@/hooks/useAiChat';
import { useSearchShortcut } from '@/hooks/useSearchShortcut';
import { SESSION_KEYS } from '@/lib/storageKeys';

interface ApiReferencePageWrapperProps {
  config: any;
  specUrl: string;
  primaryColor: string;
  headingFont?: string | null;
  bodyFont?: string | null;
  baseUrl: string;
  projectId: string;
  categories: any[];
  allArticles: any[];
  folders: any[];
}

export function ApiReferencePageWrapper({
  config,
  specUrl,
  primaryColor,
  headingFont,
  bodyFont,
  baseUrl,
  projectId,
  categories,
  allArticles,
  folders = [],
}: ApiReferencePageWrapperProps) {
  const { isDark, toggleTheme } = useTheme();
  const { aiChatOpen, openAiChat, closeAiChat, toggleAiChat } = useAiChat();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  // Get active folder from sessionStorage on mount
  useEffect(() => {
    const savedFolderId = sessionStorage.getItem(SESSION_KEYS.ACTIVE_FOLDER_ID);
    if (savedFolderId) {
      setActiveFolderId(savedFolderId);
    }
  }, []);

  useSearchShortcut(setSearchModalOpen);

  // Sort and filter categories by folder
  const sortedCategories = sortCategories(categories);
  const filteredCategories = filterCategoriesByFolder(sortedCategories, activeFolderId);

  // Load Google Fonts dynamically
  useGoogleFonts(config.heading_font, config.body_font);

  const getArticleCountForCategory = (categoryId: string) => {
    return allArticles.filter(a => a.category_id === categoryId).length;
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
          "flex flex-col h-screen overflow-hidden bg-background text-foreground"
        )}
        style={{ fontFamily: config.body_font || 'system-ui, sans-serif' }}
      >
        {/* Navigation Loading Bar */}
        <NavigationLoadingBar primaryColor={config.primary_color} />

        {/* Header */}
        <div data-astro-transition-persist="header" className="bg-transparent">
          <HelpCenterHeader
            onSearchOpen={() => setSearchModalOpen(true)}
            onAIOpen={openAiChat}
            showBackButton={false}
            folders={folders}
            articles={allArticles}
            categories={categories}
          />
        </div>

        {/* Main content area with sidebar */}
        <div className="flex-1 overflow-hidden">
          <div className="flex mx-auto gap-8 h-full max-w-[1400px]">
            {/* Sidebar - Left Column */}
            <div data-astro-transition-persist="sidebar" className="hidden lg:block">
              <HelpCenterSidebar
                categories={filteredCategories}
                articles={allArticles}
                selectedCategory={null}
                selectedArticle={null}
                getArticleCount={getArticleCountForCategory}
                folders={folders}
              />
            </div>

            {/* Main content - Center Column - Scrollable */}
            <main 
              className="flex-1 min-w-0 pt-8 pb-12 overflow-y-auto scrollbar-hide"
              id="article-scroll-container"
            >
              <CustomApiReference
                specUrl={specUrl}
                primaryColor={primaryColor}
                isDark={isDark}
                headingFont={headingFont}
                bodyFont={bodyFont}
                baseUrl={baseUrl}
              />
            </main>
          </div>
        </div>

        {/* Search Modal */}
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          articles={allArticles}
          categories={categories}
          primaryColor={config.primary_color}
        />
      </div>
    </BaseLayoutWrapper>
    </HelpCenterProvider>
  );
}
