import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrderCTAProps {
  href: string;
  label: string;
  note?: ReactNode;
  align?: "left" | "center" | "right";
  target?: "_blank" | "_self";
}

export function OrderCTA({
  href,
  label,
  note,
  align = "center",
  target = "_blank",
}: OrderCTAProps) {
  const alignment =
    align === "left" ? "items-start text-left" : align === "right" ? "items-end text-right" : "items-center text-center";

  return (
    <div className={cn("flex w-full flex-col gap-2", alignment)}>
      {note ? <div className="text-xs text-muted-foreground">{note}</div> : null}
      <Button
        asChild
        size="lg"
        variant="default"
        className="w-full sm:w-auto text-primary-foreground hover:bg-primary/90"
      >
        <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>
          {label}
        </a>
      </Button>
    </div>
  );
}
