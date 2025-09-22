import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "success" | "warning";

const variantStyles: Record<CalloutVariant, string> = {
  info: "border-primary/30 bg-primary/10 text-primary-foreground",
  success: "border-emerald-500/30 bg-emerald-500/10",
  warning: "border-amber-500/40 bg-amber-500/10",
};

interface CalloutProps {
  children: ReactNode;
  title?: string;
  variant?: CalloutVariant;
}

export function Callout({ children, title, variant = "info" }: CalloutProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 space-y-2 text-sm leading-relaxed text-foreground",
        variantStyles[variant]
      )}
    >
      {title ? (
        <p className="text-sm font-semibold text-foreground/90">{title}</p>
      ) : null}
      <div className="text-foreground/80 [&_*:last-child]:mb-0">{children}</div>
    </div>
  );
}
