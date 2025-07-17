import { Button } from "@/components/ui/button";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { ProductLinkCard } from "./ProductLinkCard";
import links from "../data/links.json";

// Group links by category
const grouped = links.reduce((acc, link) => {
  const cat = link.category || "Lainnya";
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(link);
  return acc;
}, {} as Record<string, typeof links>);

export function LinkList() {
  return (
    <div>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-6">
          <div className="font-bold text-lg text-center mb-3">{category}</div>
          <div className="flex flex-col gap-2 sm:gap-4">
            {items.map((link, idx) => (
              link.type === "product" ? (
                <ProductLinkCard
                  key={idx}
                  name={link.name || ""}
                  thumbnail={link.thumbnail || ""}
                  url={link.url}
                  isFeatured={link.is_featured === true}
                />
              ) : (
                <a
                  key={idx}
                  href={link.url}
                  className={`flex mb-2 hover:bg-blue-50 items-center justify-between bg-white rounded-xl p-3 sm:p-4 shadow w-full max-w-sm sm:max-w-full mx-auto transition-shadow duration-200${link.is_featured === true ? "  border-2 border-blue-400" : ""}`}
                >
                  <span className="font-semibold text-sm sm:text-base">{link.label}</span>
                  <Button size="icon" className="bg-blue-500 hover:bg-blue-600">
                    <MoveUpRight className="text-white" />
                  </Button>
                </a>
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 