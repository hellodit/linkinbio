"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/app/types/product";
import { ProductList } from "./ProductLinkCard";

type PriceFilter = "all" | "free" | "paid";
type SortOption = "default" | "price_asc" | "price_desc" | "name_asc" | "name_desc";

export function ProductFilterSort({ products }: { products: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = React.useState<string>(searchParams.get("category") ?? "all");
  const [price, setPrice] = React.useState<PriceFilter>((searchParams.get("price") as PriceFilter) ?? "all");
  const [featuredOnly, setFeaturedOnly] = React.useState<boolean>(searchParams.get("featured") === "1");
  const [sort, setSort] = React.useState<SortOption>((searchParams.get("sort") as SortOption) ?? "default");

  const hasActiveFilters = category !== "all" || price !== "all" || featuredOnly || sort !== "default";
  const activeCount = (category !== "all" ? 1 : 0) + (price !== "all" ? 1 : 0) + (featuredOnly ? 1 : 0) + (sort !== "default" ? 1 : 0);
  const [isOpen, setIsOpen] = React.useState<boolean>(hasActiveFilters);

  React.useEffect(() => {
    if (hasActiveFilters) {
      setIsOpen(true);
    }
  }, [hasActiveFilters]);

  const categories = React.useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category || "Lainnya"));
    return ["all", ...Array.from(set)];
  }, [products]);

  const originalOrderIndex = React.useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((p, idx) => map.set(p.id ?? p.slug ?? p.url, idx));
    return map;
  }, [products]);

  const filtered = React.useMemo(() => {
    let list = products;

    if (category !== "all") {
      list = list.filter((p) => (p.category || "Lainnya") === category);
    }

    if (price === "free") {
      list = list.filter((p) => p.price === 0);
    } else if (price === "paid") {
      list = list.filter((p) => p.price > 0);
    }

    if (featuredOnly) {
      list = list.filter((p) => p.is_featured === true);
    }

    const sorted = [...list];
    switch (sort) {
      case "price_asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sorted.sort((a, b) => {
          const ia = originalOrderIndex.get(a.id ?? a.slug ?? a.url) ?? 0;
          const ib = originalOrderIndex.get(b.id ?? b.slug ?? b.url) ?? 0;
          return ia - ib;
        });
    }

    return sorted;
  }, [products, category, price, featuredOnly, sort, originalOrderIndex]);

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (category && category !== "all") params.set("category", category); else params.delete("category");
    if (price && price !== "all") params.set("price", price); else params.delete("price");
    if (featuredOnly) params.set("featured", "1"); else params.delete("featured");
    if (sort && sort !== "default") params.set("sort", sort); else params.delete("sort");
    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : "/", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, price, featuredOnly, sort]);

  const clearAll = () => {
    setCategory("all");
    setPrice("all");
    setFeaturedOnly(false);
    setSort("default");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-foreground">Filter & Sort</div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <span className="text-xs text-muted-foreground">{activeCount} aktif</span>
          )}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="text-xs text-primary underline"
            aria-expanded={isOpen}
            aria-controls="filters-panel"
          >
            {isOpen ? "Sembunyikan" : "Tampilkan"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="filters-panel" className="flex flex-col gap-3 p-3 rounded-md border border-border/50 bg-background/60">
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              className="w-full sm:w-1/3 rounded-md border border-border/50 bg-background p-2 text-sm"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Semua Kategori" : cat}
                </option>
              ))}
            </select>

            <select
              className="w-full sm:w-1/3 rounded-md border border-border/50 bg-background p-2 text-sm"
              value={price}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPrice(e.target.value as PriceFilter)}
            >
              <option value="all">Semua Harga</option>
              <option value="free">Gratis</option>
              <option value="paid">Berbayar</option>
            </select>

            <select
              className="w-full sm:w-1/3 rounded-md border border-border/50 bg-background p-2 text-sm"
              value={sort}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as SortOption)}
            >
              <option value="default">Urutan Rekomendasi</option>
              <option value="price_asc">Harga Terendah</option>
              <option value="price_desc">Harga Tertinggi</option>
              <option value="name_asc">Nama A-Z</option>
              <option value="name_desc">Nama Z-A</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={featuredOnly}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFeaturedOnly(e.target.checked)}
              />
              Hanya Featured
            </label>
            <button type="button" onClick={clearAll} className="text-xs text-primary underline">
              Reset
            </button>
          </div>
        </div>
      )}

      <ProductList products={filtered} />
    </div>
  );
}

