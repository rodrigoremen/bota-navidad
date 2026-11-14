import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/libs/utils"

const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,color,box-shadow,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine focus-visible:ring-offset-2 focus-visible:ring-offset-mint disabled:pointer-events-none disabled:opacity-45 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-bota text-primary-foreground shadow-[0_6px_18px_-8px_rgba(198,46,58,0.75)] hover:bg-bota-deep",
        secondary:
          "bg-pine text-secondary-foreground shadow-[0_6px_18px_-10px_rgba(31,92,74,0.8)] hover:bg-pine-deep",
        outline:
          "border border-pine/30 bg-transparent text-pine hover:border-pine/55 hover:bg-pine/[0.06]",
        "on-dark":
          "border border-cream/35 bg-cream/[0.06] text-cream backdrop-blur-[2px] hover:bg-cream/15 hover:border-cream/55",
        ghost: "text-pine hover:bg-pine/10",
        soft: "bg-pine/10 text-pine hover:bg-pine/16",
        destructive: "bg-bota text-primary-foreground hover:bg-bota-deep",
        link: "h-auto rounded-none p-0 text-pine underline underline-offset-4 hover:text-pine-deep",
      },
      size: {
        default: "h-12 px-5 text-[0.9rem]",
        sm: "h-9 gap-1.5 px-3.5 text-[0.84rem]",
        lg: "h-13 px-6 text-base",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
