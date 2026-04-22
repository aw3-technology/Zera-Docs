import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md bg-muted animate-pulse",
        className
      )}
      {...props}
    />
  )
}

/** Shimmer variant — a left-to-right gradient sweep for a more polished loading feel */
function SkeletonShimmer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  )
}

export { Skeleton, SkeletonShimmer }
