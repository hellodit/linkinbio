import React from "react";

export function ProductLinkCard({ name, thumbnail, url, isFeatured }: {
  name: string;
  thumbnail: string;
  url: string;
  isFeatured?: boolean;
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
    </a>
  );
} 