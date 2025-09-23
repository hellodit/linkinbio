"use client";

import { useState } from "react";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface CollapsibleItem {
  title: string;
  content: string;
}

interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  items: CollapsibleItem[];
  defaultOpenIndex?: number;
  variant?: "default" | "card";
}

export function Collapsible({ 
  items, 
  defaultOpenIndex = -1,
  variant = "default",
  className, 
  ...rest 
}: CollapsibleProps) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  if (variant === "card") {
    return (
      <div className={cn("space-y-4", className)} {...rest}>
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          
          return (
            <div key={index} className={cn(
              "rounded-lg border bg-card transition-colors",
              isOpen && "ring-2 ring-ring/20"
            )}>
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className={cn(
                  "w-full flex items-center justify-between p-4 text-left rounded-lg",
                  "hover:bg-muted/50 transition-colors",
                  "focus:outline-none focus:bg-muted/50",
                  isOpen && "bg-muted/30"
                )}
              >
                <span className="text-sm font-medium">
                  {item.title}
                </span>
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-all duration-200",
                    isOpen && "rotate-180 text-foreground"
                  )} 
                />
              </button>
              
              {isOpen && (
                <div className="px-4 pb-4">
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {item.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)} {...rest}>
      <div className="space-y-0">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          
          return (
            <div key={index} className={cn(
              "border-b border-border last:border-b-0 transition-colors",
              isOpen && "bg-muted/20"
            )}>
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className={cn(
                  "w-full flex items-center justify-between py-4 text-left",
                  "hover:bg-muted/50 transition-colors",
                  "focus:outline-none focus:bg-muted/50",
                  isOpen && "bg-muted/30"
                )}
              >
                <span className="text-sm font-medium">
                  {item.title}
                </span>
                <ChevronDown 
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-all duration-200",
                    isOpen && "rotate-180 text-foreground"
                  )} 
                />
              </button>
              
              {isOpen && (
                <div className="pb-4">
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {item.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Collapsible;
