import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { cn } from '@/lib/utils';
import { Icon } from '../ui/icon';
import { motion } from 'framer-motion';
import { ChatMarkdownRenderer } from './ChatMarkdownRenderer';
import type { Message } from './useChatState';

interface ChatMessageProps {
  message: Message;
  primaryColor: string;
  copiedId: string | null;
  feedbackGiven: Record<string, 'like' | 'dislike'>;
  // Search results for the last assistant message
  searchProcessVisible: boolean;
  isLastAssistant: boolean;
  foundArticles: { title: string; url: string; slug: string }[];
  getArticleUrl: (slug: string) => string;
  onCopy: (text: string, id: string) => void;
  onFeedback: (messageId: string, type: 'like' | 'dislike') => void;
  onRetry: (messageContent: string) => void;
  previousUserContent?: string;
}

export function ChatMessage({
  message,
  primaryColor,
  copiedId,
  feedbackGiven,
  searchProcessVisible,
  isLastAssistant,
  foundArticles,
  getArticleUrl,
  onCopy,
  onFeedback,
  onRetry,
  previousUserContent,
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full max-w-full",
        message.role === 'user' ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        message.role === 'user'
          ? "max-w-[85%] rounded-xl px-3 py-2 text-white break-words"
          : "w-full max-w-full rounded-xl px-3 py-2 text-foreground overflow-hidden"
      )}
      style={message.role === 'user' ? { backgroundColor: primaryColor } : {}}
      >
        {message.role === 'assistant' ? (
          <div className="w-full">
            {/* Search Process Card */}
            {searchProcessVisible && isLastAssistant && (
              <SearchResultsAccordion
                foundArticles={foundArticles}
                getArticleUrl={getArticleUrl}
                primaryColor={primaryColor}
              />
            )}

            {/* Assistant Response */}
            <div className="prose prose-sm max-w-none dark:prose-invert text-sm prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 prose-table:table-auto prose-th:border prose-td:border prose-th:px-2 prose-th:py-1 prose-td:px-2 prose-td:py-1 w-full">
              <ChatMarkdownRenderer content={message.content} primaryColor={primaryColor} />

              {message.links && message.links.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Related articles:</p>
                  <div className="space-y-1">
                    {message.links.map((link, idx) => (
                      <div key={idx}>
                        <a
                          href={getArticleUrl(link.slug)}
                          className="text-sm hover:underline"
                          style={{ color: primaryColor }}
                        >
                          {link.title}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Actions */}
              <div className="flex items-center gap-1 mt-3 pt-2 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onCopy(message.content, message.id)}
                  title="Copy"
                >
                  {copiedId === message.id ? (
                    <Icon icon="hugeicons:checkmark-circle-01" className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Icon icon="hugeicons:copy-01" className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onFeedback(message.id, 'like')}
                  title="Like"
                >
                  <Icon
                    icon="hugeicons:thumbs-up"
                    className={cn(
                      "h-3.5 w-3.5",
                      feedbackGiven[message.id] === 'like' ? "text-green-500" : "text-muted-foreground"
                    )}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onFeedback(message.id, 'dislike')}
                  title="Dislike"
                >
                  <Icon
                    icon="hugeicons:thumbs-down"
                    className={cn(
                      "h-3.5 w-3.5",
                      feedbackGiven[message.id] === 'dislike' ? "text-red-500" : "text-muted-foreground"
                    )}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => { if (previousUserContent) onRetry(previousUserContent); }}
                  title="Retry"
                >
                  <Icon icon="hugeicons:refresh" className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm">{message.content}</p>
        )}
      </div>
    </div>
  );
}

function SearchResultsAccordion({
  foundArticles,
  getArticleUrl,
  primaryColor,
}: {
  foundArticles: { title: string; url: string; slug: string }[];
  getArticleUrl: (slug: string) => string;
  primaryColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 w-full"
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="search-results" className="border-0">
          <AccordionTrigger className="flex items-center gap-2 text-xs text-muted-foreground p-3 w-full hover:bg-muted/50 transition-colors rounded-2xl border border-border/50 bg-card hover:no-underline [&[data-state=open]>svg]:rotate-180">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Icon icon="hugeicons:search-01" className="h-4 w-4 text-green-500 flex-shrink-0" />
              <Icon icon="hugeicons:checkmark-circle-01" className="h-3 w-3 text-green-500 flex-shrink-0" />
              <span className="truncate">Found {foundArticles.length} article{foundArticles.length !== 1 ? 's' : ''}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="w-full p-3 pt-0 border-t border-border/50 mt-3">
            <div className="space-y-1 w-full">
              {foundArticles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  className="w-full"
                >
                  <a
                    href={getArticleUrl(article.slug)}
                    className="flex items-start gap-1.5 p-2 text-xs w-full min-w-0 group hover:bg-muted/30 rounded-lg transition-colors"
                    style={{ color: primaryColor }}
                  >
                    <Icon icon="hugeicons:file-02" className="h-2.5 w-2.5 flex-shrink-0 mt-0.5" />
                    <span
                      className="flex-1 min-w-0 text-left leading-relaxed group-hover:underline"
                      title={article.title}
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        wordBreak: 'break-word',
                        hyphens: 'auto'
                      }}
                    >
                      {article.title}
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}
