import React from "react";
import { formatRupiah } from "@/lib/utils";

export function ProductLinkCard({ name, thumbnail, url, isFeatured, price, description, reviewCount }: {
  name: string;
  thumbnail: string;
  url: string;
  isFeatured?: boolean;
  price: number;
  description: string;
  reviewCount: number;
}) {
  return (
    <a
      href={url}
      className={`block bg-white mb-2 rounded-xl shadow-md sm:p-4 flex flex-col gap-2 sm:gap-4 items-center w-full max-w-sm sm:max-w-full mx-auto hover:shadow-lg transition-shadow duration-200${isFeatured ? "border-2 border-blue-400" : ""}`}
    >
      <div className="w-full aspect-[16/9]">
        <img
          src={thumbnail}
          alt={name}
          className="rounded-t-lg w-full h-full object-cover bg-gray-100"
        />
      </div>
      <div className="p-3 w-full">
        <div className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 w-full text-left">{name}</div>
        <div className="w-full flex flex-row items-center gap-2 mb-1 border-t border-gray-200 pt-2">
          <div className="text-lg font-semibold text-green-600 flex-1 text-left">
            {formatRupiah(price)}
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm py-1 px-2 rounded-lg transition-colors duration-200"
          >
            Order Now
          </button>
        </div>
      </div>
    </a>
  );
} 