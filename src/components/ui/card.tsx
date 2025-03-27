import * as React from "react"

import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "overwatch" | "hero" | "news" | "map"
  hoverEffect?: "none" | "lift" | "glow" | "border" | "scale"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverEffect = "none", ...props }, ref) => {
    const baseStyles = "rounded-xl border bg-card text-card-foreground shadow"
    
    const variantStyles = {
      default: "border-border bg-card",
      overwatch: "border-[var(--primary-blue)] bg-[var(--background-dark)] text-white",
      hero: "border-[var(--accent-orange)] bg-gradient-to-br from-[var(--dark-blue)] to-[var(--background-dark)] text-white",
      news: "border-[var(--secondary-blue)] bg-[var(--background-dark)] text-white",
      map: "border-[var(--primary-blue)] bg-gradient-to-b from-[var(--dark-blue)]/80 to-[var(--background-dark)] text-white",
    }
    
    const hoverStyles = {
      none: "",
      lift: "transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[var(--primary-blue)]/20",
      glow: "transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary-blue)]/40",
      border: "transition-all duration-300 hover:border-[var(--primary-blue)]",
      scale: "transition-all duration-300 hover:scale-[1.02]",
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          hoverStyles[hoverEffect],
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-bold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
