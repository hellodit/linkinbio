import React from "react";
import Link from "next/link";

export function ProductLinkCard({ name, thumbnail, url, isFeatured }: { name: string; thumbnail: string; url: string; isFeatured?: boolean }) {
  return (
    <div className={`bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4 items-center${isFeatured ? " animate-bounce border-2 border-lime-400" : ""}`}>
      <img
        src={thumbnail}
        alt={name}
        className="rounded-lg w-full md:w-1/3 max-w-[180px] h-32 object-cover bg-gray-100"
      />
      <div className="flex-1 flex flex-col justify-between items-start w-full">
        <div className="font-bold text-base md:text-lg mb-2">{name}</div>
        <Link
          href={url}
          className="mt-2 inline-flex items-center gap-2 bg-lime-300 hover:bg-lime-400 rounded-full px-4 py-2 text-black font-semibold transition-colors"
        >
          <span>Detail Produk</span>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      </div>
    </div>
  );
} 