import { cn } from "@/lib/utils";

interface CheckboxLabelProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  label: string;
}

export default function CheckboxLabel({
  className,
  label,
  ...props
}: CheckboxLabelProps) {
  return (
    <p {...props} className={cn("font-semibold", className)}>
      {label}
    </p>
  );
}
