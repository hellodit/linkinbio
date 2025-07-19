import React from "react";
import { formatRupiah } from "@/lib/utils";
import { Product } from "@/app/types/product";
import Image from "next/image";

export function ProductList({ products }: { products: Product[] }) {
  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const cat = product.category || "Lainnya";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div>
      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} className="mb-6">
          <div className="font-bold text-lg text-center mb-3 text-foreground">{category}</div>
          <div className="flex flex-col gap-1 sm:gap-2">
            {items.map((product, idx) => (
              <ProductLinkCard
                key={product.id || product.url || idx}
                name={product.name}
                thumbnail={product.thumbnail}
                url={product.url}
                isFeatured={product.is_featured === true}
                price={product.price}
                original_price={product.original_price}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export function ProductLinkCard({ name, thumbnail, url, isFeatured, price, original_price }: {
  name: string;
  thumbnail: string;
  url: string;
  isFeatured?: boolean;
  price: number;
  original_price?: number;
}) {
  const renderPrice = () => {
    if (price === 0) {
      return <span className="text-base font-bold text-red-500">FREE</span>;
    }

    return (
      <span className="text-base font-bold text-foreground">
        {formatRupiah(price)}
      </span>
    );
  };

  const renderOriginalPrice = () => {
    if (typeof original_price === 'number' && original_price > price) {
      return (
        <span className="line-through text-muted-foreground text-xs font-normal">
          {formatRupiah(original_price)}
        </span>
      );
    }
    return null;
  };

  return (
    <a
      href={url}
      className={`block bg-card mb-3 rounded-lg shadow-sm border border-border/50 hover:bg-accent transition-all duration-200 w-full${isFeatured ? " border-2 border-primary/50 animate-headShake" : ""}`}
    >
      <div className="flex min-h-[130px]  ">
        {/* Left Section - Thumbnail */}
        <div className="w-1/2 relative">
          <Image
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover rounded-l-lg"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
         
        </div>

        {/* Right Section - Information */}
        <div className="w-1/2 p-3 flex flex-col justify-between ">
          <div>
            <div className="font-bold text-sm text-foreground mb-1 line-clamp-3 min-h-[48px]  ">
              {name}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-1">Price</div>
              
              <div className="flex items-center gap-2">
                {renderPrice()}
                {renderOriginalPrice()}
              </div>
            </div>
        
          </div>
        </div>
      </div>
    </a>
  );
} 