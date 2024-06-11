import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Loader from "../loader";

const buttonVariants = cva(
  "flex items-center justify-center rounded-[8px] md:text-[14px] text-[12px] font-bold gap-2 transition-colors focus-visible:outline-none disabled:pointer-events-none uppercase whitespace-nowrap hover:opacity-80 transition-opacity duration-300 ease-in-out",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-light active:bg-primary-dark disabled:bg-neutral-400",
        alt: "bg-secondary text-zinc-200 focus:text-white focus:bg-secondary-dark border-primary hover:text-white hover:bg-secondary-light  disabled:text-neutral-400 disabled:border-neutral-400",
        action:
          "bg-action-light text-white hover:bg-action-lighter focus:bg-action disabled:bg-neutral-400",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
  locked?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      icon,
      locked = false,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading && <Loader message="Carregando..." size="sm" />}
        {!isLoading && icon}
        {!isLoading && children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
