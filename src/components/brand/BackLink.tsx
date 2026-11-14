import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/libs/utils"

export function BackLink({
  href,
  children,
  className,
  tone = "pine",
}: {
  href: string
  children: React.ReactNode
  className?: string
  tone?: "pine" | "cream"
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1 rounded-full py-1 pr-3 text-[0.84rem] font-medium transition-colors",
        tone === "pine"
          ? "text-pine hover:bg-pine/10 hover:text-pine-deep"
          : "text-cream/80 hover:bg-cream/10 hover:text-cream",
        className
      )}
    >
      <ChevronLeft className="h-4 w-4" strokeWidth={2.2} />
      {children}
    </Link>
  )
}
