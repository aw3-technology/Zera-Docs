import { cn, getBasePath } from '@/lib/utils';
import { Icon } from '../ui/icon';

interface Article {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
}

interface Category {
  id: string;
  folder_id?: string | null;
}

interface Folder {
  id: string;
  slug: string;
}

interface ArticlePaginationProps {
  previousArticle: Article | null;
  nextArticle: Article | null;
  categories: Category[];
  folders: Folder[];
}

function buildArticleUrl(article: Article, categories: Category[], folders: Folder[]) {
  const cat = categories.find(c => c.id === article.category_id);
  const folder = cat?.folder_id ? folders.find(f => f.id === cat.folder_id) : null;
  return folder
    ? `${getBasePath()}/${folder.slug}/article/${article.slug}`
    : `${getBasePath()}/article/${article.slug}`;
}

export function ArticlePagination({ previousArticle, nextArticle, categories, folders }: ArticlePaginationProps) {
  if (!previousArticle && !nextArticle) return null;

  return (
    <div className="mt-6 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {previousArticle ? (
          <a
            href={buildArticleUrl(previousArticle, categories, folders)}
            className={cn(
              "flex flex-col gap-2 p-4 rounded-xl border group transition-colors bg-card border-border/50"
            )}
          >
            <div className="flex items-center gap-2">
              <Icon icon="hugeicons:arrow-left-01" className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Previous</span>
            </div>
            <span className="text-sm font-medium line-clamp-2 group-hover:underline text-foreground">
              {previousArticle.title}
            </span>
          </a>
        ) : (
          <div></div>
        )}

        {nextArticle && (
          <a
            href={buildArticleUrl(nextArticle, categories, folders)}
            className={cn(
              "flex flex-col gap-2 p-4 rounded-xl border group transition-colors text-right bg-card border-border/50"
            )}
          >
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs font-medium text-muted-foreground">Next</span>
              <Icon icon="hugeicons:arrow-right-01" className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium line-clamp-2 group-hover:underline text-foreground">
              {nextArticle.title}
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
