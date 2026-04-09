import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right" | "top" | "bottom"
  children: React.ReactNode
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      {children}
    </>
  )
}

export function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: SheetContentProps) {
  const sideClasses = {
    right: "right-0 top-0 h-full w-full sm:max-w-[400px] border-l",
    left: "left-0 top-0 h-full w-full sm:max-w-[400px] border-r",
    top: "top-0 left-0 w-full h-full sm:max-h-[400px] border-b",
    bottom: "bottom-0 left-0 w-full h-full sm:max-h-[400px] border-t",
  }

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col bg-background shadow-2xl transition-transform duration-300 ease-in-out",
        sideClasses[side],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
