import { cn } from '@/lib/utils';
import { Icon } from '../ui/icon';

interface ChatLoadingIndicatorProps {
  shouldShowSteps: boolean;
  loadingStage: 'thinking' | 'searching' | 'found';
  primaryColor: string;
}

export function ChatLoadingIndicator({ shouldShowSteps, loadingStage, primaryColor }: ChatLoadingIndicatorProps) {
  return (
    <div className="flex w-full">
      <div className="rounded-xl px-3 py-1.5 bg-card border border-border/50 w-full">
        <div className="flex items-center gap-2">
          <Icon
            icon={
              !shouldShowSteps ? "hugeicons:loading-03" :
              loadingStage === 'thinking' ? "hugeicons:loading-03" :
              "hugeicons:search-01"
            }
            className={cn(
              "h-3.5 w-3.5",
              (!shouldShowSteps || loadingStage === 'thinking') ? "animate-spin" : "animate-pulse"
            )}
            style={{ color: primaryColor }}
          />
          <span className="text-xs text-muted-foreground">
            {!shouldShowSteps ? 'Responding...' :
             loadingStage === 'thinking' ? 'Thinking...' :
             'Searching relevant articles...'}
          </span>
        </div>
      </div>
    </div>
  );
}
