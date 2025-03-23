import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // Shadcn에서 제공하는 cn 함수

type ChipProps = {
  label: string;
  onClose?: () => void;
  className?: string
} & VariantProps<typeof chipVariants>;

const chipVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        filled: "bg-primary text-primary-foreground",
        outlined: "border border-primary text-primary",
        subtle: "bg-muted text-muted-foreground",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-1.5 ",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  }
);

export function Chip({ label, variant, size, onClose , className}: ChipProps) {
  return (
    <span className={cn(chipVariants({ variant, size ,className}))}>
      {label}
      {onClose && (
        <button
          onClick={onClose}
          className={` ml-2 rounded-full p-5 hover:bg-white/20`}
          aria-label="Remove"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </span>
  );
}
