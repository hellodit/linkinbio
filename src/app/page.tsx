import type { Metadata } from "next";
import { ProfileCard } from "./components/ProfileCard";
import { LinkList } from "./components/LinkList";
import { ProductList } from "./components/ProductLinkCard";
import { Product } from "./types/product";
import { ProductCarousel } from "./components/ProductCarousel";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArticleCard } from "./components/ArticleCard";
import { getArticleMeta } from "@/lib/articles";
import productsData from "./data/products.json";

export const metadata: Metadata = {
  title: "Asdita - @codingtengahmalam",
  description: "Link in Bio untuk Coding Tengah Malam - Portal member, produk digital, dan resource lainnya",
};

export default function Home() {
  const products: Product[] = productsData as Product[];
  const projectArticles = getArticleMeta().filter(
    (a) => a.category.toLowerCase() === "project"
  );
  return (
    <div className="font-sans min-h-screen bg-background bg-[#F8F8F8] flex flex-col items-center px-4 transition-colors duration-300">
      <div className="bg-card w-full max-w-lg flex flex-col gap-2 md:w-full items-center mx-auto shadow-lg border border-border/50 p-4 rounded-lg">
        <div className="w-full flex justify-end">
          <ThemeToggle />
        </div>
        <ProfileCard />

        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1 sm:gap-2">
            <ProductList products={products} />
          </div>
          <LinkList />
          {projectArticles.length > 0 && (
            <div className="mt-4 space-y-2">
              <h2 className="text-lg font-bold text-foreground">Project Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Copyright Section */}
        <div className="w-full text-center mt-6 mb-2 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Asdita Prasetya. All rights reserved.
        </div>
      </div>
    </div>
  );
}
