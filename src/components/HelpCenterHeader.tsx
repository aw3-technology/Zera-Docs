import { useEffect, useState } from 'react';
import { cn, getBasePath } from '@/lib/utils';
import { Icon } from './ui/icon';
import { useFolderSync } from '@/hooks/useFolderSync';
import { Sheet, SheetContent } from './ui/sheet';
import { useHelpCenter } from '@/contexts/HelpCenterContext';
import type { Folder } from '@/lib/api';

interface HelpCenterHeaderProps {
  onSearchOpen?: () => void;
  onAIOpen?: () => void;
  showBackButton?: boolean;
  folders?: Folder[];
  activeFolderId?: string | null;
  onFolderChange?: (folderId: string | null) => void;
  articles?: any[];
  categories?: any[];
  mobileSidebar?: React.ReactNode;
}

export function HelpCenterHeader({
  onSearchOpen,
  onAIOpen,
  showBackButton = false,
  folders = [],
  activeFolderId = null,
  onFolderChange,
  articles = [],
  categories = [],
  mobileSidebar,
}: HelpCenterHeaderProps) {
  const { config, toggleTheme: onThemeToggle } = useHelpCenter();
  const { activeFolderId: syncedFolderId, setFolder } = useFolderSync(activeFolderId);
  const localActiveFolderId = syncedFolderId;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (activeFolderId) setFolder(activeFolderId);
  }, [activeFolderId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFolderSelect = (folderId: string | null) => {
    setFolder(folderId);
    if (onFolderChange) onFolderChange(folderId);
    setMobileMenuOpen(false);
  };

  const basePath = getBasePath(config);

  return (
    <>
      {/* ── Main Header ─────────────────────────────────────────────────── */}
      <header className={cn(
        "h-[56px] md:h-[62px] border-b flex items-center flex-shrink-0 backdrop-blur-lg sticky top-0 z-20 px-4 md:px-8",
        "border-zinc-100/50 dark:border-zinc-800/50"
      )}>
        <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto">

          {/* Left — hamburger (mobile) + logo */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Hamburger — mobile only */}
            {mobileSidebar && (
              <>
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className={cn(
                    "lg:hidden p-2 rounded-lg -ml-1",
                    "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  )}
                  aria-label="Open navigation"
                >
                  <Icon icon="hugeicons:menu-01" className="h-5 w-5" />
                </button>
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetContent
                    side="left"
                    className="p-0 w-[280px] overflow-y-auto"
                  >
                    {mobileSidebar}
                  </SheetContent>
                </Sheet>
              </>
            )}

            {/* Logo — switches via CSS dark: class */}
            <a
              href={typeof window !== 'undefined' ? window.location.origin : '/'}
              className="flex items-center hover:opacity-80 flex-shrink-0"
            >
              <img
                src="/zera-logo-light.png"
                alt="Zera"
                className="h-7 w-auto object-contain block dark:hidden"
              />
              <img
                src="/zera-logo-dark.png"
                alt="Zera"
                className="h-7 w-auto object-contain hidden dark:block"
              />
            </a>
          </div>

          {/* Center — search (hidden on mobile, shown md+) */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-2 px-6">
            {showBackButton ? (
              <a href={basePath || '/'} className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                <Icon icon="hugeicons:arrow-left-01" className="h-4 w-4" />
                Back
              </a>
            ) : config.show_search && onSearchOpen ? (
              <>
                <button
                  onClick={onSearchOpen}
                  className="flex items-center gap-2 px-2 rounded-xl text-sm w-full max-w-sm border h-[38px] bg-transparent border-zinc-200 text-zinc-400 hover:border-zinc-300 dark:border-zinc-800/50 dark:hover:border-zinc-700/50"
                >
                  <Icon icon="hugeicons:search-01" className="h-4 w-4" />
                  <span className="flex-1 text-left">Search...</span>
                  <div className="flex items-center gap-1">
                    <kbd className="h-6 w-6 rounded-lg flex items-center justify-center border bg-transparent border-zinc-300 text-zinc-400 dark:border-zinc-700 dark:text-zinc-500">
                      <Icon icon="hugeicons:command" className="h-3.5 w-3.5" />
                    </kbd>
                    <kbd className="h-6 w-6 rounded-lg flex items-center justify-center text-xs font-semibold border bg-transparent border-zinc-300 text-zinc-400 dark:border-zinc-700 dark:text-zinc-500">
                      K
                    </kbd>
                  </div>
                </button>
                {onAIOpen && (
                  <button
                    onClick={onAIOpen}
                    className="hidden lg:flex items-center gap-1.5 px-3 rounded-xl text-sm font-medium border flex-shrink-0 h-[38px] transition-colors border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800/50 dark:text-zinc-300 dark:hover:border-zinc-700/50 dark:hover:bg-zinc-800/50"
                  >
                    <Icon icon="hugeicons:ai-brain-01" className="h-4 w-4" style={{ color: config.primary_color }} />
                    <span>Ask AI</span>
                  </button>
                )}
              </>
            ) : null}
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-1 md:gap-2">
            {/* Search icon — mobile only */}
            {config.show_search && onSearchOpen && (
              <button
                onClick={onSearchOpen}
                className="md:hidden p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                aria-label="Search"
              >
                <Icon icon="hugeicons:search-01" className="h-5 w-5" />
              </button>
            )}

            {/* Nav links — desktop only */}
            {config.header_links?.length > 0 && (
              <nav className="hidden md:flex items-center gap-1">
                {config.header_links.slice(0, 3).filter((l: any) => l.label && l.url).map((link: any, i: number) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}

            {/* Primary button — desktop only */}
            {config.show_primary_button && config.primary_button_label && (
              <a
                href={config.primary_button_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium text-white"
                style={{ backgroundColor: config.primary_color }}
              >
                {config.primary_button_label}
              </a>
            )}

            {/* Theme toggle — icons switch via CSS */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-full h-[36px] w-[36px] md:h-[32px] md:w-[32px] flex items-center justify-center text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <span className="block dark:hidden"><Icon icon="hugeicons:moon-02" className="h-4 w-4" /></span>
              <span className="hidden dark:block"><Icon icon="hugeicons:sun-03" className="h-4 w-4" /></span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Folder nav bar ───────────────────────────────────────────────── */}
      {folders.length > 0 && (
        <div
          className={cn("flex items-center px-4 md:px-8 overflow-x-auto sticky z-10 border-b folder-nav-scrollbar bg-background border-border/30 top-14 h-12")}
        >
          <div className="flex items-center gap-1 md:gap-4 w-full h-full max-w-[1400px] mx-auto">
            {folders.map((folder) => {
              const folderHref = folder.is_default
                ? (basePath || '/')
                : `${basePath}/${folder.slug}`;
              const isActive = localActiveFolderId === folder.id;
              return (
                <a
                  key={folder.id}
                  href={folderHref}
                  data-astro-prefetch="load"
                  onClick={() => handleFolderSelect(folder.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-2 md:px-0 text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0 h-full relative transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                  style={{ borderBottom: isActive ? `2px solid ${config.primary_color}` : '2px solid transparent' }}
                >
                  <Icon icon={folder.icon || "hugeicons:folder-library"} className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  {folder.name}
                </a>
              );
            })}
          </div>
        </div>
      )}

      <style>{`.folder-nav-scrollbar { scrollbar-width: none; -ms-overflow-style: none; } .folder-nav-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </>
  );
}
