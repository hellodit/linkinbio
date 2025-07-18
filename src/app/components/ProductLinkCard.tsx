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
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductLinkCard({ name, thumbnail, url, isFeatured, price }: {
  name: string;
  thumbnail: string;
  url: string;
  isFeatured?: boolean;
  price: number;
}) {
  return (
    <a
      href={url}
      className={`block bg-white mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 w-full${isFeatured ? " border-2 border-blue-400 animate-headShake" : ""}`}
    >
      <div className="flex">
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
        <div className="w-1/2 p-3 flex flex-col justify-between">
          <div>
            <div className="font-bold text-sm text-gray-900 mb-1 line-clamp-3 min-h-[48px]  ">
              {name}
            </div>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs text-gray-600">Product</span>
              <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">PROD</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Price</div>
              <div className="text-sm font-bold text-gray-900">
                {formatRupiah(price)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Status</div>
              <div className="text-sm font-bold text-gray-900">
                Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
} 