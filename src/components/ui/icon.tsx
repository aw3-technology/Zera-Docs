import { Icon as IconifyIcon, addCollection, iconExists } from '@iconify/react';
import { cn } from '@/lib/utils';
import { memo } from 'react';

// Import icon data for offline use
import hugeiconsData from '@iconify-json/hugeicons/icons.json';
import simpleIconsData from '@iconify-json/simple-icons/icons.json';
import lucideData from '@iconify-json/lucide/icons.json';

// Add collections for offline use (works in both SSR and client)
try {
  // Type assertion to handle JSON import types
  if (hugeiconsData && typeof hugeiconsData === 'object' && 'icons' in hugeiconsData) {
    addCollection(hugeiconsData as any);
  }
  if (simpleIconsData && typeof simpleIconsData === 'object' && 'icons' in simpleIconsData) {
    addCollection(simpleIconsData as any);
  }
  if (lucideData && typeof lucideData === 'object' && 'icons' in lucideData) {
    addCollection(lucideData as any);
  }
} catch (error) {
  // Silently fail if collections are already added or if there's an error
  if (typeof console !== 'undefined' && console.debug) {
    console.debug('Icon collections loading:', error);
  }
}

interface CustomIconProps {
  icon: string;
  fallback?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  rotate?: number;
  flip?: string;
  color?: string;
}

const FALLBACK_ICON = 'hugeicons:folder-01';

const IconComponent = ({ icon, fallback, className, style, width, height, rotate, flip, color, ...props }: CustomIconProps) => {
  // Handle undefined or null icon
  if (!icon || typeof icon !== 'string') {
    return fallback || <span className={cn('inline-block w-4 h-4', className)} />;
  }

  // If the icon doesn't exist in loaded collections, use a fallback
  const resolvedIcon = iconExists(icon) ? icon : FALLBACK_ICON;

  return (
    <IconifyIcon
      icon={resolvedIcon}
      className={cn(className)}
      width={width}
      height={height}
      rotate={rotate}
      flip={flip}
      color={color}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style
      }}
    />
  );
};

// Memoize the Icon component to prevent unnecessary re-renders
export const Icon = memo(IconComponent);

// Re-export the original Icon for backward compatibility
export { Icon as IconifyIcon } from '@iconify/react';
