import React from "react";

export function ProductLinkCard({ name, thumbnail, url, isFeatured }: {
  name: string;
  thumbnail: string;
  url: string;
  isFeatured?: boolean;
}) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 items-center${isFeatured ? " animate-bounce border-2 border-lime-400" : ""}`}>
      <img
        src={thumbnail}
        alt={name}
        className="rounded-lg w-full h-56 object-cover bg-gray-100"
      />
      <div className="font-bold text-base md:text-lg mb-2 w-full text-left">{name}</div>
    </div>
  );
} 