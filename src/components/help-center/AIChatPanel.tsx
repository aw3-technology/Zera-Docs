import { useEffect } from 'react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { DELAY_DOM_PATCH } from '@/lib/constants';
import { Icon } from '../ui/icon';
import { AiTextArea } from './AiTextArea';
import { useChatState } from './useChatState';
import { ChatMessage } from './ChatMessage';
import { ChatEmptyState } from './ChatEmptyState';
import { ChatLoadingIndicator } from './ChatLoadingIndicator';

interface AIChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  primaryColor: string;
  isDark: boolean;
  portalName?: string;
  subdomainUrl?: string | null;
  initialQuery?: string;
}

export function AIChatPanel({
  isOpen,
  onClose,
  projectId,
  primaryColor,
  isDark,
  portalName = 'Help Center',
  subdomainUrl,
  initialQuery,
}: AIChatPanelProps) {
  const chat = useChatState(projectId, subdomainUrl);

  // Auto-send initial query if no cached messages
  useEffect(() => {
    if (isOpen && initialQuery && chat.messages.length === 0) {
      const cachedMessages = localStorage.getItem(chat.CACHE_KEY_MESSAGES);
      if (!cachedMessages) {
        chat.setInput(initialQuery);
        setTimeout(() => chat.handleSend(initialQuery), DELAY_DOM_PATCH);
      }
    }
  }, [isOpen, initialQuery, chat.messages.length]);

  // Check for AI query in URL parameters
  useEffect(() => {
    if (isOpen) {
      const url = new URL(window.location.href);
      const aiQuery = url.searchParams.get('ai_query');

      if (aiQuery && aiQuery.trim()) {
        url.searchParams.delete('ai_query');
        window.history.replaceState({}, '', url.toString());
        setTimeout(() => chat.handleSend(aiQuery), DELAY_DOM_PATCH);
      }
    }
  }, [isOpen]);

  // Clear URL parameter when chat is closed
  useEffect(() => {
    if (!isOpen) {
      const url = new URL(window.location.href);
      if (url.searchParams.has('ai_query')) {
        url.searchParams.delete('ai_query');
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const lastAssistantId = chat.messages.filter(m => m.role === 'assistant').slice(-1)[0]?.id;

  return (
    <div
      className={cn(
        "w-96 flex-shrink-0 flex flex-col h-screen border-l",
        "border-border/30"
      )}
      style={{
        background: `linear-gradient(135deg, ${primaryColor}08 0%, transparent 50%, ${primaryColor}05 100%)`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between px-4 border-b flex-shrink-0 border-border/50"
        )}
        style={{
          height: '62px',
          background: `linear-gradient(90deg, ${primaryColor}12 0%, ${primaryColor}08 100%)`
        }}
      >
        <div className="flex items-center gap-2.5">
          <h3 className="font-semibold text-sm text-foreground">
            AI Assistant
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-accent"
            onClick={chat.clearChat}
            title="Clear chat"
          >
            <Icon icon="hugeicons:delete-02" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-accent"
            onClick={onClose}
          >
            <Icon icon="hugeicons:cancel-01" className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4 pb-0 space-y-4 w-full">
          {chat.messages.length === 0 ? (
            <ChatEmptyState primaryColor={primaryColor} portalName={portalName} />
          ) : (
            <>
              {chat.messages.map((message, index) => {
                const previousUserContent = message.role === 'assistant'
                  ? chat.messages[index - 1]?.content
                  : undefined;

                return (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    primaryColor={primaryColor}
                    copiedId={chat.copiedId}
                    feedbackGiven={chat.feedbackGiven}
                    searchProcessVisible={chat.searchProcessVisible}
                    isLastAssistant={message.id === lastAssistantId}
                    foundArticles={chat.foundArticles}
                    getArticleUrl={chat.getArticleUrl}
                    onCopy={chat.handleCopy}
                    onFeedback={chat.handleFeedback}
                    onRetry={chat.handleRetry}
                    previousUserContent={previousUserContent}
                  />
                );
              })}
            </>
          )}

          {chat.isLoading && (
            <ChatLoadingIndicator
              shouldShowSteps={chat.shouldShowSteps}
              loadingStage={chat.loadingStage}
              primaryColor={primaryColor}
            />
          )}

          <div ref={chat.messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div
        className="p-4 pt-0 flex-shrink-0 relative"
        style={{
          background: `linear-gradient(to top, ${primaryColor}08 0%, transparent 100%)`
        }}
      >
        <AiTextArea
          value={chat.input}
          onChange={chat.setInput}
          onSubmit={() => chat.handleSend()}
          placeholder="Ask, search, explain..."
          title="Ask Ai"
          primaryColor={primaryColor}
          disabled={chat.isLoading}
          minRows={1}
          maxRows={3}
          variant="auto"
          isDark={isDark}
        />
      </div>
    </div>
  );
}
