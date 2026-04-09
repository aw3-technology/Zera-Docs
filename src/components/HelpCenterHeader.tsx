import { useState, useEffect } from 'react';
import { cn, getBasePath } from '@/lib/utils';
import { Icon } from './ui/icon';

interface Folder {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
  description?: string | null;
  is_default: boolean;
  display_order?: number;
}

interface HelpCenterHeaderProps {
  config: any;
  isDark: boolean;
  onThemeToggle: () => void;
  onSearchOpen?: () => void;
  onAIOpen?: () => void;
  showBackButton?: boolean;
  folders?: Folder[];
  activeFolderId?: string | null;
  onFolderChange?: (folderId: string | null) => void;
  articles?: any[];
  categories?: any[];
}

export function HelpCenterHeader({
  config,
  isDark,
  onThemeToggle,
  onSearchOpen,
  onAIOpen,
  showBackButton = false,
  folders = [],
  activeFolderId = null,
  onFolderChange,
  articles = [],
  categories = [],
}: HelpCenterHeaderProps) {
  const [localActiveFolderId, setLocalActiveFolderId] = useState<string | null>(activeFolderId);

  // Sync with prop changes
  useEffect(() => {
    setLocalActiveFolderId(activeFolderId);
  }, [activeFolderId]);

  // Restore folder selection from sessionStorage on mount if not provided
  useEffect(() => {
    if (!activeFolderId) {
      const savedFolderId = sessionStorage.getItem('active-folder-id');
      if (savedFolderId) {
        setLocalActiveFolderId(savedFolderId);
      }
    }
  }, [activeFolderId]);

  // Get first article in a folder
  const getFirstArticleInFolder = (folderId: string, isDefault: boolean) => {
    // Default folder should go to root, not first article
    if (isDefault) {
      return null;
    }
    
    // Get categories in this folder
    const folderCategories = categories.filter((cat: any) => cat.folder_id === folderId);
    const folderCategoryIds = new Set(folderCategories.map((c: any) => c.id));
    
    // Get articles in these categories, sorted by display_order
    const folderArticles = articles
      .filter((article: any) => article.category_id && folderCategoryIds.has(article.category_id))
      .sort((a: any, b: any) => {
        const orderA = a.display_order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.display_order ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
      });
    
    return folderArticles[0] || null;
  };

  const handleFolderSelect = (folderId: string | null) => {
    setLocalActiveFolderId(folderId);
    if (onFolderChange) {
      onFolderChange(folderId);
    }
    if (folderId) {
      sessionStorage.setItem('active-folder-id', folderId);
    } else {
      sessionStorage.removeItem('active-folder-id');
    }
  };
  
  return (
    <>
      {/* Main Header */}
      <header className={cn(
        "h-[62px] border-b flex items-center justify-between px-8 flex-shrink-0 backdrop-blur-lg sticky top-0 z-20",
        isDark ? "border-zinc-800/50" : "border-zinc-100/50"
      )}
      style={{ backgroundColor: 'transparent !important' }}
      >
        <div className="flex items-center justify-between w-full" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Left - Logo */}
          <div className="flex items-center gap-4">
            <a
              href={typeof window !== 'undefined' ? window.location.origin : '/'}
              className="flex items-center gap-2.5 hover:opacity-80 flex-shrink-0"
            >
              {config.logo_url ? (
                <img src={config.logo_url} alt="Logo" className="h-7 w-7 object-contain" />
              ) : (
                <div
                  className="h-7 w-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${config.primary_color}15` }}
                >
                  <Icon icon="hugeicons:book-open-01" className="h-4 w-4" style={{ color: config.primary_color }} />
                </div>
              )}
              <span className="font-semibold text-sm" style={{ fontFamily: config.heading_font || 'system-ui, sans-serif' }}>{config.portal_name}</span>
            </a>
          </div>

          {/* Center - Search Bar or Back Button */}
          <div className="flex items-center justify-center flex-1 gap-2 pl-32">
            {showBackButton ? (
              <a
                href={getBasePath(config)}
                className={cn(
                  "flex items-center gap-2 text-sm",
                  isDark ? "text-zinc-400 hover:text-zinc-200" : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                <Icon icon="hugeicons:arrow-left-01" className="h-4 w-4" />
                Back
              </a>
            ) : config.show_search && onSearchOpen ? (
              <>
                <button
                  onClick={onSearchOpen}
                  className={cn(
                    "flex items-center gap-2 px-2 rounded-xl text-sm w-full max-w-md border h-[38px] bg-transparent",
                    isDark
                      ? "border-zinc-800/50 text-zinc-400 hover:border-zinc-700/50"
                      : "border-zinc-200 text-zinc-400 hover:border-zinc-300"
                  )}
                >
                  <Icon icon="hugeicons:search-01" className="h-4 w-4" />
                  <span className="flex-1 text-left">Search...</span>
                  <div className="flex items-center gap-1">
                    <kbd className={cn(
                      "h-6 w-6 rounded-lg flex items-center justify-center border bg-transparent",
                      isDark ? "border-zinc-700 text-zinc-500" : "border-zinc-300 text-zinc-400"
                    )}>
                      <Icon icon="hugeicons:command" className="h-3.5 w-3.5" />
                    </kbd>
                    <kbd className={cn(
                      "h-6 w-6 rounded-lg flex items-center justify-center text-xs font-semibold border bg-transparent",
                      isDark ? "border-zinc-700 text-zinc-500" : "border-zinc-300 text-zinc-400"
                    )}>
                      K
                    </kbd>
                  </div>
                </button>
                
                {/* AI Assistant Button - Next to Search */}
                {config.ai_answer_enabled && onAIOpen && (
                  <button
                    onClick={onAIOpen}
                    className={cn(
                      "flex items-center gap-1.5 px-4 rounded-xl text-sm font-medium border flex-shrink-0 h-[38px] bg-transparent",
                      isDark 
                        ? "border-zinc-800/50 text-zinc-300 hover:border-zinc-700/50" 
                        : "border-zinc-200 text-zinc-700 hover:border-zinc-300"
                    )}
                  >
                    <Icon icon="hugeicons:magic-wand-01" className="h-4 w-4" />
                    Ask AI
                  </button>
                )}
              </>
            ) : null}
          </div>

          {/* Right - Nav Links (max 2), Primary Button, Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Header Links (max 2) */}
            {config.header_links && config.header_links.length > 0 && (
              <nav className="flex items-center gap-1">
                {config.header_links.slice(0, 2).filter((link: any) => link.label && link.url).map((link: any, index: number) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-sm",
                      isDark ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}

            {/* Primary Button */}
            {config.show_primary_button && config.primary_button_label && (
              <a
                href={config.primary_button_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium text-white"
                style={{ backgroundColor: config.primary_color }}
              >
                {config.primary_button_label}
              </a>
            )}

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className={cn(
                "p-2 rounded-full h-[30px] w-[30px] flex items-center justify-center",
                isDark ? "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800" : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100"
              )}
            >
              {isDark ? <Icon icon="hugeicons:sun-03" className="h-4 w-4" /> : <Icon icon="hugeicons:moon-02" className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Folder Navigation - Secondary nav bar under header */}
      {folders && folders.length > 0 && (
        <div
          className={cn(
            "flex items-center px-8 gap-4 overflow-x-auto sticky top-[62px] z-10 border-b folder-nav-scrollbar",
            "bg-background border-border/30"
          )}
          style={{ 
            borderBottomWidth: '1px',
            height: '60px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="flex items-center gap-4 w-full h-full" style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {folders.map((folder) => {
              // Get first article in folder (null for default folder)
              const firstArticle = getFirstArticleInFolder(folder.id, folder.is_default);
              
              // Get base path for proper URL construction
              const basePath = getBasePath(config);
              
              // Default folder goes to root, other folders with articles go to first article
              const folderHref = folder.is_default
                ? (basePath || '/')
                : firstArticle 
                  ? `${basePath}/article/${firstArticle.slug}`
                  : `${basePath}/${folder.slug}`;
              
              return (
                <a
                  key={folder.id}
                  href={folderHref}
                  data-astro-prefetch="load"
                  onClick={() => handleFolderSelect(folder.id)}
                  className={cn(
                    "flex items-center gap-2 px-0 text-sm font-medium whitespace-nowrap flex-shrink-0 cursor-pointer relative",
                    localActiveFolderId === folder.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    borderBottom: localActiveFolderId === folder.id ? `1px solid ${config.primary_color}` : 'none'
                  }}

                >
                  <Icon icon={folder.icon || "hugeicons:folder-library"} className="h-4 w-4" />
                  {folder.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
      <style>{`
        .folder-nav-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
