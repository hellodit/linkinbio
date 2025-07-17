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
      className={`block bg-white mb-2 rounded-xl shadow-md p-3 sm:p-4 flex flex-col gap-2 sm:gap-4 items-center w-full max-w-sm sm:max-w-full mx-auto hover:shadow-lg transition-shadow duration-200${isFeatured ? "border-2 border-blue-400" : ""}`}
    >
      <img
        src={thumbnail}
        alt={name}
        className="rounded-lg w-full h-full sm:h-56 object-cover bg-gray-100"
      />
      <div className="font-bold text-base sm:text-lg mb-1 sm:mb-2 w-full text-left">{name}</div>
      <div className="flex items-center gap-1 text-yellow-500 text-sm mb-1 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 inline"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
        4.8
        <span className="text-gray-400">({reviewCount})</span>
      </div>
      <div className="text-gray-600 text-sm mb-2 w-full text-left">{description}</div>
      <hr className="w-full border-t border-gray-200 my-1" />
      <div className="w-full flex flex-row items-center gap-2 mb-2">
        <div className="text-lg font-semibold text-green-600 flex-1 text-left">
          {formatRupiah(price)}
        </div>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Order Now
        </button>
      </div>
    </a>
  );
} 