import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
          <div className="font-bold text-lg mb-2">{category}</div>
          <div className="flex flex-col gap-2 sm:gap-3">
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
                <div
                  key={idx}
                  className={`flex items-center justify-between bg-white rounded-xl p-3 sm:p-4 shadow max-w-sm w-full mx-auto${link.is_featured === true ? " animate-bounce border-2 border-lime-400" : ""}`}
                >
                  <span className="font-medium text-sm sm:text-base">{link.label}</span>
                  <Button size="icon" className="bg-sky-400 hover:bg-sky-600">
                    <ArrowRight className="text-white" />
                  </Button>
                </div>
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 