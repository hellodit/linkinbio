import { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Feature =
  | string
  | {
      title: string;
      description?: string;
      icon?: ReactNode;
    };

interface FeatureGridProps {
  items: Feature[];
  columns?: 2 | 3;
}

function normalizeFeature(item: Feature) {
  if (typeof item === "string") {
    return { title: item };
  }
  return item;
}

export function FeatureGrid({ items, columns = 2 }: FeatureGridProps) {
  const layout = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <div className={cn("grid gap-3", layout)}>
      {items.map((item, idx) => {
        const feature = normalizeFeature(item);
        return (
          <div
            key={idx}
            className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/60 p-4"
          >
            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              {feature.icon ?? <Check className="h-4 w-4" />}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">{feature.title}</p>
              {feature.description ? (
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
