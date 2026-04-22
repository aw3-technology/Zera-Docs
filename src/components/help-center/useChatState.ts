import { useState, useEffect, useRef } from 'react';
import { getBasePath } from '@/lib/utils';
import { DELAY_AI_LOADING, DELAY_COPY_FEEDBACK } from '@/lib/constants';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  links?: { title: string; url: string; slug: string }[];
}

const API_BASE_URL = '/api/chat';

export function useChatState(projectId: string, subdomainUrl: string | null | undefined) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<'thinking' | 'searching' | 'found'>('thinking');
  const [shouldShowSteps, setShouldShowSteps] = useState(false);
  const [foundArticles, setFoundArticles] = useState<{ title: string; url: string; slug: string }[]>([]);
  const [searchProcessVisible, setSearchProcessVisible] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'like' | 'dislike'>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const CACHE_KEY_MESSAGES = `ai-chat-messages-${projectId}`;
  const CACHE_KEY_SEARCH = `ai-chat-search-${projectId}`;
  const CACHE_KEY_FEEDBACK = `ai-chat-feedback-${projectId}`;

  // Load cached data on mount
  useEffect(() => {
    try {
      const cachedMessages = localStorage.getItem(CACHE_KEY_MESSAGES);
      if (cachedMessages) {
        const parsedMessages = JSON.parse(cachedMessages);
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      }

      const cachedSearch = localStorage.getItem(CACHE_KEY_SEARCH);
      if (cachedSearch) {
        const searchData = JSON.parse(cachedSearch);
        setFoundArticles(searchData.foundArticles || []);
        setSearchProcessVisible(searchData.searchProcessVisible || false);
      }

      const cachedFeedback = localStorage.getItem(CACHE_KEY_FEEDBACK);
      if (cachedFeedback) {
        setFeedbackGiven(JSON.parse(cachedFeedback));
      }
    } catch (error) {
      console.warn('Failed to load cached chat data:', error);
    }
  }, [projectId]);

  // Save messages to cache
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(CACHE_KEY_MESSAGES, JSON.stringify(messages));
      } catch (error) {
        console.warn('Failed to cache messages:', error);
      }
    }
  }, [messages, CACHE_KEY_MESSAGES]);

  // Save search data to cache
  useEffect(() => {
    try {
      localStorage.setItem(CACHE_KEY_SEARCH, JSON.stringify({ foundArticles, searchProcessVisible }));
    } catch (error) {
      console.warn('Failed to cache search data:', error);
    }
  }, [foundArticles, searchProcessVisible, CACHE_KEY_SEARCH]);

  // Save feedback to cache
  useEffect(() => {
    try {
      localStorage.setItem(CACHE_KEY_FEEDBACK, JSON.stringify(feedbackGiven));
    } catch (error) {
      console.warn('Failed to cache feedback:', error);
    }
  }, [feedbackGiven, CACHE_KEY_FEEDBACK]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getArticleUrl = (slug: string) => {
    const subPath = (window as any).__projectContext?.subPath;
    if (subPath) {
      return `${window.location.origin}${subPath}/article/${slug}`;
    }
    if (subdomainUrl) {
      return `${subdomainUrl.replace(/\/$/, '')}/article/${slug}`;
    }
    return `${getBasePath()}/article/${slug}`;
  };

  const shouldShowLoadingSteps = (text: string): boolean => {
    const trimmedText = text.trim().toLowerCase();

    const shortResponses = [
      'thanks', 'thank you', 'ty', 'thx',
      'nice', 'good', 'great', 'awesome', 'cool',
      'ok', 'okay', 'yes', 'no', 'yep', 'nope',
      'hi', 'hello', 'hey', 'bye', 'goodbye',
      'lol', 'haha', 'wow', 'oh', 'ah',
      'sure', 'fine', 'alright', 'got it',
      '👍', '👌', '😊', '😄', '🙂', '😀'
    ];

    if (shortResponses.some(response => trimmedText === response)) return false;

    const wordCount = trimmedText.split(/\s+/).length;
    if (wordCount <= 2 && trimmedText.length < 15) return false;

    if (/^[^\w\s]*$/.test(trimmedText) || /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\s]*$/u.test(trimmedText)) {
      return false;
    }

    return true;
  };

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const showSteps = shouldShowLoadingSteps(text);
    setShouldShowSteps(showSteps);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setLoadingStage('thinking');
    setFoundArticles([]);

    let searchingTimeout: NodeJS.Timeout | undefined;

    if (showSteps) {
      searchingTimeout = setTimeout(() => {
        setLoadingStage('searching');
      }, DELAY_AI_LOADING);
    }

    try {
      const allMessages = [...messages, userMessage];
      const apiMessages = allMessages.map(m => ({ role: m.role, content: m.content }));

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const assistantId = `assistant-${Date.now()}`;
      setMessages(prev => [...prev, {
        id: assistantId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      }]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      let buffer = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const event = JSON.parse(data);
              if (event.type === 'content_block_delta' && event.delta?.text) {
                fullContent += event.delta.text;
                setMessages(prev =>
                  prev.map(m => m.id === assistantId ? { ...m, content: fullContent } : m)
                );
              }
            } catch {
              // skip unparseable SSE chunks
            }
          }
        }
      }

      const linkRegex = /\[([^\]]+)\]\(\/article\/([^)]+)\)/g;
      const links: { title: string; url: string; slug: string }[] = [];
      let match;
      while ((match = linkRegex.exec(fullContent)) !== null) {
        links.push({ title: match[1], url: getArticleUrl(match[2]), slug: match[2] });
      }

      if (links.length > 0) {
        setSearchProcessVisible(true);
        setFoundArticles(links.map(l => ({ title: l.title, slug: l.slug, url: l.url })));
        setMessages(prev =>
          prev.map(m => m.id === assistantId ? { ...m, links } : m)
        );
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'I\'m sorry, I encountered an error. Please try again later.',
        timestamp: new Date(),
      }]);
    } finally {
      if (searchingTimeout) clearTimeout(searchingTimeout);
      setIsLoading(false);
      setLoadingStage('thinking');
      if (!showSteps) {
        setFoundArticles([]);
        setSearchProcessVisible(false);
      }
      setShouldShowSteps(false);
    }
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), DELAY_COPY_FEEDBACK);
  };

  const handleFeedback = (messageId: string, type: 'like' | 'dislike') => {
    setFeedbackGiven(prev => ({ ...prev, [messageId]: type }));
  };

  const handleRetry = (messageContent: string) => {
    handleSend(messageContent);
  };

  const clearChat = () => {
    setMessages([]);
    setSearchProcessVisible(false);
    setFoundArticles([]);
    setFeedbackGiven({});

    try {
      localStorage.removeItem(CACHE_KEY_MESSAGES);
      localStorage.removeItem(CACHE_KEY_SEARCH);
      localStorage.removeItem(CACHE_KEY_FEEDBACK);
    } catch (error) {
      console.warn('Failed to clear cached data:', error);
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    loadingStage,
    shouldShowSteps,
    foundArticles,
    searchProcessVisible,
    copiedId,
    feedbackGiven,
    messagesEndRef,
    handleSend,
    handleCopy,
    handleFeedback,
    handleRetry,
    clearChat,
    getArticleUrl,
    CACHE_KEY_MESSAGES,
  };
}
