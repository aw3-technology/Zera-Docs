import { useState, useEffect, useCallback } from 'react';

const SESSION_KEY = 'ai-chat-open';

/**
 * Manages AI chat open/close state, persisted in sessionStorage
 * so the panel survives Astro view-transition navigations.
 */
export function useAiChat() {
  const [aiChatOpen, setAiChatOpen] = useState(() => {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    }
    return false;
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, aiChatOpen ? '1' : '0');
  }, [aiChatOpen]);

  const openAiChat = useCallback(() => setAiChatOpen(true), []);
  const closeAiChat = useCallback(() => setAiChatOpen(false), []);
  const toggleAiChat = useCallback(() => setAiChatOpen(prev => !prev), []);

  return { aiChatOpen, openAiChat, closeAiChat, toggleAiChat };
}
