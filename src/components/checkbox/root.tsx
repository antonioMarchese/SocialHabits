import { cn } from "@/lib/utils";

interface CheckboxRootProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CheckboxRoot({
  className,
  children,
  ...props
}: CheckboxRootProps) {
  return (
    <div
      {...props}
      className={cn(
        "w-full flex items-center justify-start gap-2 py-1 text-neutral-900",
        className
      )}
    >
      {children}
    </div>
  );
}
