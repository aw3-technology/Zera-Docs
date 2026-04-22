import { cn, getBasePath } from '@/lib/utils';
import { Icon } from '../ui/icon';

interface Category {
  id: string;
  name: string;
  folder_id?: string | null;
}

interface Folder {
  id: string;
  name: string;
  slug: string;
  is_default: boolean;
}

interface ArticleBreadcrumbProps {
  articleTitle: string;
  categoryId: string | null;
  categories: Category[];
  folders: Folder[];
  isDark: boolean;
}

export function ArticleBreadcrumb({ articleTitle, categoryId, categories, folders, isDark }: ArticleBreadcrumbProps) {
  const cat = categories.find(c => c.id === categoryId);
  const articleFolder = cat?.folder_id ? folders.find(f => f.id === cat.folder_id) : null;
  const categorySlug = cat?.name?.toLowerCase().replace(/\s+/g, '-') || '';
  const categoryUrl = (articleFolder && !articleFolder.is_default)
    ? `${getBasePath()}/${articleFolder.slug}/${categorySlug}`
    : `${getBasePath()}/${categorySlug}`;

  return (
    <nav
      className={cn(
        "flex items-center gap-2 text-sm mb-6 opacity-0 animate-fade-in",
        isDark ? "text-zinc-400" : "text-zinc-500"
      )}
      style={{ animationDelay: '0.05s' }}
    >
      <a href={getBasePath() || '/'} className="hover:underline">Home</a>

      {articleFolder && !articleFolder.is_default && (
        <>
          <Icon icon="hugeicons:arrow-right-01" className="h-3 w-3" />
          <a href={`${getBasePath()}/${articleFolder.slug}`} className="hover:underline">
            {articleFolder.name}
          </a>
        </>
      )}

      {cat && (
        <>
          <Icon icon="hugeicons:arrow-right-01" className="h-3 w-3" />
          <a href={categoryUrl} className="hover:underline">{cat.name}</a>
        </>
      )}

      <Icon icon="hugeicons:arrow-right-01" className="h-3 w-3" />
      <span className={cn("truncate", isDark ? "text-zinc-200" : "text-zinc-900")}>
        {articleTitle}
      </span>
    </nav>
  );
}
