import { cn } from '@/lib/utils';
import { Icon } from '../ui/icon';
import { motion } from 'framer-motion';
import { SidebarMethodBadge, parseApiTitle } from './ApiMethodBadge';
import type { Article } from '@/lib/api';

interface SidebarArticleListProps {
  articles: Article[];
  selectedArticle?: Article | null;
  primaryColor: string;
  getArticleUrl: (article: Article) => string;
  onArticleSelect?: (article: Article) => void;
}

export function SidebarArticleList({
  articles,
  selectedArticle,
  primaryColor,
  getArticleUrl,
  onArticleSelect,
}: SidebarArticleListProps) {
  return (
    <>
      {articles.map((article, i) => {
        const isActive = selectedArticle?.id === article.id;
        const url = getArticleUrl(article);
        const { method, displayTitle } = parseApiTitle(article);
        return (
          <motion.a
            key={article.id}
            href={url}
            initial={{ x: -6, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.03, duration: 0.15, ease: 'easeOut' }}
            onClick={(e) => {
              if (onArticleSelect) {
                e.preventDefault();
                onArticleSelect(article);
              }
            }}
            className={cn(
              'flex items-center gap-1.5 py-1.5 pr-1 text-sm transition-colors min-w-0',
              isActive
                ? 'font-medium'
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
            )}
            style={isActive ? { color: primaryColor } : {}}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            {method ? (
              <SidebarMethodBadge method={method} />
            ) : article.icon ? (
              <Icon icon={article.icon} className="h-4 w-4 flex-shrink-0 opacity-70" />
            ) : null}
            <span className="truncate">{displayTitle}</span>
          </motion.a>
        );
      })}
    </>
  );
}
