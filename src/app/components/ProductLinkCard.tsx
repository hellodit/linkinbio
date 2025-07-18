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
          <div className="font-bold text-lg text-center mb-3">{category}</div>
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
  return (
    <a
      href={url}
      className={`block bg-white mb-3 rounded-lg shadow-sm hover:bg-blue-50 transition-shadow duration-200 w-full${isFeatured ? " border-2 border-blue-400 animate-headShake" : ""}`}
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
            <div className="font-bold text-sm text-gray-900 mb-1 line-clamp-3 min-h-[48px]  ">
              {name}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Price</div>
              
              <div className="flex items-center gap-2">
              <span className="text-base font-bold text-gray-900">
                  {formatRupiah(price)}
                </span>
                {typeof original_price === 'number' && original_price > price && (
                  <span className="line-through text-gray-400 text-xs font-normal">
                    {formatRupiah(original_price)}
                  </span>
                )}
               
              </div>
            </div>
        
          </div>
        </div>
      </div>
    </a>
  );
} 