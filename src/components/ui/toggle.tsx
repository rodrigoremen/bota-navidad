"use client"

import { cn } from "@/libs/utils"

export function Toggle({
  checked,
  onChange,
  label,
  id,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
  id?: string
}) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-8 w-14 shrink-0 rounded-full transition-colors duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 focus-visible:ring-offset-mint",
        checked ? "bg-pine" : "bg-sand"
      )}
    >
      <span
        className={cn(
          "absolute top-1 h-6 w-6 rounded-full bg-cream shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-[left] duration-200 ease-out",
          checked ? "left-7" : "left-1"
        )}
      />
    </button>
  )
}
