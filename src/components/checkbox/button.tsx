import { cn } from "@/lib/utils";
import clsx from "clsx";

interface CheckboxButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function CheckboxButton({
  checked,
  className,
  disabled = false,
  icon: Icon,
  ...props
}: CheckboxButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      type="button"
      className={cn(
        clsx(
          "w-5 h-5 flex items-center justify-center rounded-md border border-zinc-700 transition-all duration-300 disabled:cursor-not-allowed",
          {
            "bg-green-600 border-none": checked,
          }
        ),
        className
      )}
    >
      {checked && Icon}
    </button>
  );
}
