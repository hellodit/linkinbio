import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProductLinkCard } from "./ProductLinkCard";
import links from "../data/links.json";

export function LinkList() {
  return (
    <div className="flex flex-col gap-3 mt-4">
      {links.map((link, idx) => (
        link.type === "product" ? (
          <ProductLinkCard
            key={idx}
            name={link.name || ""}
            thumbnail={link.thumbnail || ""}
            url={link.url}
          />
        ) : (
          <div key={idx} className="flex items-center justify-between bg-white rounded-xl p-3 shadow">
            <span className="font-medium text-sm">{link.label}</span>
            <Button size="icon" className="bg-lime-200 hover:bg-lime-300">
              <ArrowRight className="text-black" />
            </Button>
          </div>
        )
      ))}
    </div>
  );
} 