import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import linksData from "../data/links.json";
import { Link } from "@/app/types/link";

const links: Link[] = linksData as Link[];

// Group links by category
const groupedLinks = links.reduce((acc: Record<string, Link[]>, link) => {
  const cat = link.category || "Lainnya";
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(link);
  return acc;
}, {} as Record<string, Link[]>);

export function LinkList() {
  return (
    <div>
      {Object.entries(groupedLinks).map(([category, items]) => (
        <div key={category} className="mb-6">
          <div className="font-bold text-lg text-center mb-3 text-foreground">{category}</div>
          <div className="flex flex-col gap-1 sm:gap-2">
            {items.map((link, idx) => (
              <a
                key={link.url + idx}
                href={link.url}
                className={"flex mb-2 hover:bg-accent items-center justify-between bg-card rounded-xl p-3 sm:p-4 shadow-sm border border-border/50 w-full max-w-sm sm:max-w-full mx-auto transition-all duration-200 hover:shadow-md"}
              >
                <span className="font-semibold text-sm sm:text-base text-foreground">{link.label}</span>
                <Button size="icon" className="bg-primary hover:bg-primary/90">
                  <MoveUpRight className="text-primary-foreground" />
                </Button>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 