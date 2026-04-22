import { useState, useEffect } from 'react';
import { FolderNavigation } from './FolderNavigation';
import { SESSION_KEYS } from '@/lib/storageKeys';
import type { Article, Category, Folder } from '@/lib/api';

interface FolderNavigationWrapperProps {
  folders: Folder[];
  config: any;
  articles?: Article[];
  categories?: Category[];
}

export default function FolderNavigationWrapper({
  folders,
  config,
  articles = [],
  categories = [],
}: FolderNavigationWrapperProps) {
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Sync with theme changes
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Persist folder selection to URL/sessionStorage
  useEffect(() => {
    const handleFolderChange = (folderId: string | null) => {
      setActiveFolderId(folderId);
      // Store in sessionStorage for persistence across page navigations
      if (folderId) {
        sessionStorage.setItem(SESSION_KEYS.ACTIVE_FOLDER_ID, folderId);
      } else {
        sessionStorage.removeItem(SESSION_KEYS.ACTIVE_FOLDER_ID);
      }
    };

    // Restore from sessionStorage on mount
    const savedFolderId = sessionStorage.getItem(SESSION_KEYS.ACTIVE_FOLDER_ID);
    if (savedFolderId) {
      setActiveFolderId(savedFolderId);
    }
  }, []);

  if (!folders || folders.length === 0) {
    return null;
  }

  return (
    <FolderNavigation
      folders={folders}
      activeFolderId={activeFolderId}
      isDark={isDark}
      primaryColor={config.primary_color || '#D97706'}
      articles={articles}
      categories={categories}
      onFolderSelect={(folderId) => {
        setActiveFolderId(folderId);
        if (folderId) {
          sessionStorage.setItem(SESSION_KEYS.ACTIVE_FOLDER_ID, folderId);
        } else {
          sessionStorage.removeItem(SESSION_KEYS.ACTIVE_FOLDER_ID);
        }
      }}
    />
  );
}
