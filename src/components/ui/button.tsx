import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/20 hover:-translate-y-0.5",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-lg hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-lg hover:shadow-secondary/20 hover:-translate-y-0.5",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5",
        link: "text-primary underline-offset-4 hover:underline",
        // Overwatch themed buttons
        overwatchPrimary: 
          "bg-[var(--primary-blue)] text-white uppercase tracking-widest font-bold shadow-md hover:bg-[var(--primary-blue)]/90 hover:shadow-lg hover:shadow-[var(--primary-blue)]/30 hover:-translate-y-0.5 hover:scale-105",
        overwatchSecondary: 
          "border-2 border-[var(--primary-blue)] bg-transparent text-white uppercase tracking-widest font-bold hover:bg-[var(--primary-blue)]/20 hover:shadow-lg hover:shadow-[var(--primary-blue)]/20 hover:-translate-y-0.5 hover:scale-105",
        overwatchAccent: 
          "bg-[var(--accent-orange)] text-white uppercase tracking-widest font-bold shadow-md hover:bg-[var(--accent-orange)]/90 hover:shadow-lg hover:shadow-[var(--accent-orange)]/30 hover:-translate-y-0.5 hover:scale-105",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        // Overwatch sizes
        overwatchDefault: "h-12 px-8 py-3 text-sm",
        overwatchLarge: "h-14 px-10 py-4 text-base",
      },
      glow: {
        none: "",
        subtle: "after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-100 after:transition-opacity after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:blur-sm after:z-[-1]",
        strong: "after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-100 after:transition-opacity after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:blur-md after:z-[-1]",
      },
      shine: {
        none: "",
        subtle: "before:absolute before:inset-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000 before:ease-in-out",
        strong: "before:absolute before:inset-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000 before:ease-in-out",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: "none",
      shine: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  glow?: "none" | "subtle" | "strong"
  shine?: "none" | "subtle" | "strong"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glow, shine, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, glow, shine, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
