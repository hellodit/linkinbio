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
          <div className="font-bold text-lg text-center mb-3">{category}</div>
          <div className="flex flex-col gap-1 sm:gap-2">
            {items.map((link, idx) => (
              <a
                key={link.url + idx}
                href={link.url}
                className={"flex mb-2 hover:bg-blue-50 items-center justify-between bg-white rounded-xl p-3 sm:p-4 shadow w-full max-w-sm sm:max-w-full mx-auto transition-shadow duration-200"}
              >
                <span className="font-semibold text-sm sm:text-base">{link.label}</span>
                <Button size="icon" className="bg-blue-500 hover:bg-blue-600">
                  <MoveUpRight className="text-white" />
                </Button>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 