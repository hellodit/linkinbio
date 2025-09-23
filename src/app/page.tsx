import type { Metadata } from "next";

import nextDynamic from "next/dynamic";
const ProfileCard = nextDynamic(() => import("./components/ProfileCard").then(m => ({ default: m.ProfileCard })), { ssr: true });
const LinkList = nextDynamic(() => import("./components/LinkList").then(m => ({ default: m.LinkList })), { ssr: true });
const ProductFilterSort = nextDynamic(() => import("./components/ProductFilterSort").then(m => ({ default: m.ProductFilterSort })), { ssr: false, loading: () => null });
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getProducts } from "@/lib/products";
import RoutePrefetch from "./components/RoutePrefetch";

export const metadata: Metadata = {
  title: "Asdita - @codingtengahmalam",
  description:
    "Link in Bio untuk Coding Tengah Malam - Portal member, produk digital, dan resource lainnya",
};

export const revalidate = 600;
export const dynamic = "force-static";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="font-sans min-h-screen bg-background bg-[#F8F8F8] flex flex-col items-center px-4 transition-colors duration-300">
      <div className="bg-card w-full max-w-lg flex flex-col gap-2 md:w-full items-center mx-auto shadow-lg border border-border/50 p-4 rounded-lg">
        <RoutePrefetch hrefs={products.map(p => `/products/${p.slug}`)} limit={12} />
        <div className="w-full flex justify-end">
          <ThemeToggle />
        </div>
        <ProfileCard />

        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1 sm:gap-2">
            <ProductFilterSort products={products} />
          </div>
          <LinkList />
        </div>

        {/* Copyright Section */}
        <div className="w-full text-center mt-6 mb-2 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Asdita Prasetya. All rights reserved.
        </div>
      </div>
    </div>
  );
}
