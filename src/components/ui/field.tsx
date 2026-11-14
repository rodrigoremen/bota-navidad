import { cn } from "@/libs/utils"

export function Field({
  label,
  hint,
  htmlFor,
  required,
  children,
  className,
}: {
  label: string
  hint?: string
  htmlFor?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-1 text-[0.9rem] font-medium text-pine"
      >
        {label}
        {required ? (
          <span className="text-bota" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? <p className="text-[0.78rem] leading-snug text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

export function FormMessage({
  children,
  tone = "error",
}: {
  children: React.ReactNode
  tone?: "error" | "success" | "info"
}) {
  if (!children) return null
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      aria-live={tone === "error" ? "assertive" : "polite"}
      className={cn(
        "rounded-xl px-3.5 py-2.5 text-[0.84rem] font-medium leading-snug",
        tone === "error" && "bg-bota/10 text-bota-deep",
        tone === "success" && "bg-pine/10 text-pine",
        tone === "info" && "bg-sand/25 text-ink/75"
      )}
    >
      {children}
    </p>
  )
}
