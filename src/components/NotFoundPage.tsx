import { useState, useEffect } from 'react';
import { cn, getBasePath } from '@/lib/utils';
import { Icon } from './ui/icon';
import { HelpCenterProvider } from '@/contexts/HelpCenterContext';
import { HelpCenterHeader } from './HelpCenterHeader';
import { HelpCenterSidebar } from './HelpCenterSidebar';
import { SearchModal } from './SearchModal';
import { NavigationLoadingBar } from './NavigationLoadingBar';
import { BaseLayoutWrapper } from './BaseLayoutWrapper';
import { useGoogleFonts } from '@/hooks/useGoogleFonts';
import { useTheme } from '@/hooks/useTheme';
import { useAiChat } from '@/hooks/useAiChat';
import { useSearchShortcut } from '@/hooks/useSearchShortcut';
import { SESSION_KEYS } from '@/lib/storageKeys';

interface NotFoundPageProps {
  config: any;
  articles?: any[];
  categories?: any[];
  folders?: any[];
  projectId: string;
}

export default function NotFoundPage({
  config,
  articles = [],
  categories = [],
  folders = [],
  projectId,
}: NotFoundPageProps) {
  const { isDark, toggleTheme } = useTheme();
  const { aiChatOpen, openAiChat, closeAiChat, toggleAiChat } = useAiChat();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  useGoogleFonts(config.heading_font, config.body_font);
  useSearchShortcut(setSearchModalOpen);

  useEffect(() => {
    const savedFolderId = sessionStorage.getItem(SESSION_KEYS.ACTIVE_FOLDER_ID);
    if (savedFolderId) setActiveFolderId(savedFolderId);
  }, []);

  const sortedCategories = [...categories].sort((a, b) => {
    const orderA = a.display_order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.display_order ?? Number.MAX_SAFE_INTEGER;
    return orderA !== orderB ? orderA - orderB : a.name.localeCompare(b.name);
  });

  const filteredCategories = activeFolderId
    ? sortedCategories.filter(c => c.folder_id === activeFolderId)
    : sortedCategories.filter(c => !c.folder_id);

  return (
    <HelpCenterProvider config={config} projectId={projectId} isDark={isDark} toggleTheme={toggleTheme}>
    <BaseLayoutWrapper
      config={config}
      projectId={projectId}
      aiChatOpen={aiChatOpen}
      onAiChatToggle={closeAiChat}
    >
      <div
        className={cn('flex flex-col h-screen overflow-hidden bg-background text-foreground')}
        style={{ fontFamily: config.body_font || 'system-ui, sans-serif' }}
      >
        <NavigationLoadingBar primaryColor={config.primary_color} />

        <div data-astro-transition-persist="header">
          <HelpCenterHeader
            onSearchOpen={() => setSearchModalOpen(true)}
            onAIOpen={openAiChat}
            folders={folders}
            activeFolderId={activeFolderId}
            onFolderChange={setActiveFolderId}
            articles={articles}
            categories={categories}
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex mx-auto gap-8 h-full" style={{ maxWidth: '1400px' }}>
            {/* Sidebar */}
            <div data-astro-transition-persist="sidebar" className="hidden lg:block">
              <HelpCenterSidebar
                categories={filteredCategories}
                articles={articles}
                selectedCategory={null}
                getArticleCount={(id) => articles.filter(a => a.category_id === id).length}
                folders={folders}
              />
            </div>

            {/* 404 Content */}
            <div className="flex-1 min-w-0 flex items-center justify-center pt-8 pb-12">
              <div className="text-center max-w-md">
                <div className="mb-6">
                  <Icon
                    icon="hugeicons:sad-dizzy"
                    className="h-20 w-20 mx-auto text-muted-foreground/30"
                  />
                </div>
                <h1
                  className="text-4xl font-bold mb-3"
                  style={{ fontFamily: config.heading_font || 'system-ui, sans-serif' }}
                >
                  Page Not Found
                </h1>
                <p className="text-muted-foreground mb-8">
                  Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
                </p>
                <a
                  href={getBasePath()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:bg-accent text-sm font-medium transition-colors"
                >
                  <Icon icon="hugeicons:arrow-left-01" className="h-4 w-4" />
                  Go back home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        articles={articles}
        categories={categories}
        primaryColor={config.primary_color}
        aiEnabled={config.ai_answer_enabled}
        onAskAI={(query) => {
          const url = new URL(window.location.href);
          url.searchParams.set('ai_query', query.trim());
          window.history.pushState({}, '', url.toString());
          openAiChat();
        }}
      />
    </BaseLayoutWrapper>
    </HelpCenterProvider>
  );
}
