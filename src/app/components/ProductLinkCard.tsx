import React from "react";
import Link from "next/link";

export function ProductLinkCard({ name, thumbnail, url, isFeatured, harga, label, action_text }: {
  name: string;
  thumbnail: string;
  url: string;
  isFeatured?: boolean;
  harga?: string;
  label?: string;
  action_text?: string;
}) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-4 flex flex-col gap-4 items-center${isFeatured ? " animate-bounce border-2 border-lime-400" : ""}`}>
      <div className="relative w-full">
        <img
          src={thumbnail}
          alt={name}
          className="rounded-lg w-full h-56 object-cover bg-gray-100"
        />
        {label && (
          <span className="absolute top-2 left-2 bg-lime-400 text-xs font-bold px-3 py-1 rounded-full shadow">{label}</span>
        )}
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="font-bold text-base md:text-lg text-left">{name}</div>
        {harga && <div className="text-lime-600 font-semibold text-left">{harga}</div>}
        {action_text && (
          <Link
            href={url}
            className="mt-2 inline-flex items-center justify-center gap-2 bg-lime-300 hover:bg-lime-400 rounded-full px-4 py-2 text-black font-semibold transition-colors w-fit"
          >
            {action_text}
          </Link>
        )}
      </div>
    </div>
  );
} 