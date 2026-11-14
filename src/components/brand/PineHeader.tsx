import { cn } from "@/libs/utils"

export function PineHeader({
  title,
  subtitle,
  children,
  className,
}: {
  title: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <header className={cn("pine-header px-6 pb-6 pt-7 text-center", className)}>
      <h1 className="text-balance text-[1.7rem] font-semibold leading-tight tracking-[-0.01em]">
        {title}
      </h1>
      {subtitle ? (
        <p className="mx-auto mt-1.5 max-w-[34ch] text-pretty text-[0.9rem] leading-snug text-cream/80">
          {subtitle}
        </p>
      ) : null}
      {children ? <div className="mt-5">{children}</div> : null}
    </header>
  )
}
