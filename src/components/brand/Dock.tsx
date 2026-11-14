import { cn } from "@/libs/utils"

/** Barra de acción fija al pie de la columna. */
export function Dock({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("dock", className)}>{children}</div>
}
