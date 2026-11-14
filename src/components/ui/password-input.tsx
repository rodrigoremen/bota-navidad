"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/libs/utils"

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="relative">
      <Input
        {...props}
        ref={ref}
        type={visible ? "text" : "password"}
        className={cn("pr-12", className)}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-[0.875rem] text-pine/70 transition-colors hover:text-pine"
      >
        {visible ? (
          <EyeOff className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.9} />
        ) : (
          <Eye className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.9} />
        )}
      </button>
    </div>
  )
})
PasswordInput.displayName = "PasswordInput"
