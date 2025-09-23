import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface HighlightsProps extends HTMLAttributes<HTMLDivElement> {
  items: string[];
  variant?: "default" | "minimal";
  columns?: 1 | 2;
}

export function Highlights({ 
  items, 
  variant = "default", 
  columns = 1, 
  className, 
  ...rest 
}: HighlightsProps) {
  const gridCols = columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1";
  
  if (variant === "minimal") {
    return (
      <div
        className={cn(
          "grid gap-3",
          gridCols,
          className
        )}
        {...rest}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="text-primary font-medium">•</span>
            <span className="leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-3",
        gridCols,
        className
      )}
      {...rest}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-3 rounded-lg border bg-card"
        >
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
            <Check className="w-3 h-3 text-primary" />
          </div>
          <span className="text-sm text-muted-foreground leading-relaxed">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Highlights;
