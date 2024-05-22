import * as React from "react";

import { cn } from "@/lib/utils";
import { useFormField } from "./ui/form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasIcon?: boolean;
  hideErrorIcon?: boolean;
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasIcon, hideErrorIcon = false, ...props }, ref) => {
    const { error } = useFormField();
    return (
      <input
        type={type}
        className={cn(
          `w-full h-10 lg:h-12 bg-transparent disabled:bg-neutral-300 disabled:text-neutral-400 py-3 pl-4 flex items-center justify-between rounded-md border placeholder:text-neutral-400 text-white border-violet-400 focus:border-violet-500 outline-none text-[14px] lg:text-base font-medium ${
            hasIcon && "pr-10"
          }`,
          error && "border-error active:border-error focus:border-error",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
FormInput.displayName = "Input";

export { FormInput };
