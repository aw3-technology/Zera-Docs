import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS, SESSION_KEYS } from '@/lib/storageKeys';

/**
 * Centralized theme hook. Reads from localStorage > sessionStorage > default (dark).
 * Toggles the `.dark` class on <html> so Tailwind `dark:` utilities work.
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const applyTheme = (dark: boolean) => {
      setIsDark(dark);
      document.documentElement.classList.toggle('dark', dark);
      document.body.classList.toggle('dark', dark);
      document.documentElement.style.removeProperty('background-color');
      sessionStorage.setItem(SESSION_KEYS.THEME_IS_DARK, dark ? '1' : '0');
    };

    // localStorage = explicit user choice (highest priority)
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) { applyTheme(savedTheme === 'dark'); return; }

    // sessionStorage = navigation persistence (second priority)
    const sessionTheme = sessionStorage.getItem(SESSION_KEYS.THEME_IS_DARK);
    if (sessionTheme !== null) { applyTheme(sessionTheme === '1'); return; }

    // No saved preference — default to dark
    applyTheme(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const newIsDark = !prev;
      document.documentElement.classList.toggle('dark', newIsDark);
      document.body.classList.toggle('dark', newIsDark);
      document.documentElement.style.removeProperty('background-color');
      localStorage.setItem(STORAGE_KEYS.THEME, newIsDark ? 'dark' : 'light');
      sessionStorage.setItem(SESSION_KEYS.THEME_IS_DARK, newIsDark ? '1' : '0');
      return newIsDark;
    });
  }, []);

  return { isDark, toggleTheme };
}
