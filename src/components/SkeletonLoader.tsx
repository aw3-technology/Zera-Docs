import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  isDark?: boolean;
}

export function SkeletonLoader({ isDark = false }: SkeletonLoaderProps) {
  const shimmer = isDark
    ? "bg-zinc-800 relative overflow-hidden before:absolute before:inset-0 before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-zinc-700/30 before:to-transparent before:bg-[length:200%_100%]"
    : "bg-zinc-200 relative overflow-hidden before:absolute before:inset-0 before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:bg-[length:200%_100%]";

  return (
    <div className={cn(
      "flex h-screen overflow-hidden",
      isDark ? "bg-[#121212] text-white" : "bg-white text-zinc-900"
    )}>
      {/* Sidebar Skeleton */}
      <aside className={cn(
        "flex-shrink-0 flex flex-col border-r w-72",
        isDark ? "bg-transparent border-zinc-800" : "bg-zinc-50/50 border-zinc-100"
      )}>
        {/* Header */}
        <div className={cn(
          "h-14 border-b flex items-center px-4",
          isDark ? "border-zinc-800" : "border-zinc-100"
        )}>
          <div className={cn("h-7 w-32 rounded", shimmer)} />
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-auto p-3 space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={cn("h-10 rounded-xl", shimmer)} />
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={cn(
          "border-t p-3",
          isDark ? "border-zinc-800" : "border-zinc-100"
        )}>
          <div className={cn("h-6 w-32 mx-auto rounded", shimmer)} />
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={cn(
          "h-14 border-b flex items-center justify-between px-8",
          isDark ? "border-zinc-800 bg-[#121212]" : "border-zinc-100 bg-white"
        )}>
          <div className={cn("h-8 w-64 rounded-xl", shimmer)} />
          <div className="flex items-center gap-2">
            <div className={cn("h-8 w-20 rounded-xl", shimmer)} />
            <div className={cn("h-8 w-8 rounded-xl", shimmer)} />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto px-8 py-8 space-y-6">
            {/* Hero skeleton */}
            <div className="space-y-3 opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className={cn("h-10 w-3/4 rounded", shimmer)} />
              <div className={cn("h-6 w-1/2 rounded", shimmer)} />
            </div>

            {/* Cards skeleton */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-24 rounded-xl border opacity-0 animate-fade-up",
                    isDark ? "bg-zinc-800/30 border-zinc-800" : "bg-white border-zinc-100"
                  )}
                  style={{ animationDelay: `${0.15 + i * 0.05}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
