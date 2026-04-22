// Centralized storage key constants
// localStorage keys
export const STORAGE_KEYS = {
  THEME: 'help-center-theme',
  ARTICLE_FEEDBACK: (articleId: string) => `article_feedback_${articleId}`,
  AI_CHAT_MESSAGES: (projectId: string) => `ai-chat-messages-${projectId}`,
  AI_CHAT_SEARCH: (projectId: string) => `ai-chat-search-${projectId}`,
  AI_CHAT_FEEDBACK: (projectId: string) => `ai-chat-feedback-${projectId}`,
} as const;

// sessionStorage keys
export const SESSION_KEYS = {
  THEME_IS_DARK: 'theme-is-dark',
  ACTIVE_FOLDER_ID: 'active-folder-id',
  ARTICLE_VIEW: (articleId: string) => `article_view_${articleId}`,
} as const;
