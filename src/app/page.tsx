import type { Metadata } from "next";
import { ProfileCard } from "./components/ProfileCard";
import { LinkList } from "./components/LinkList";
import { ProductCarousel } from "./components/ProductCarousel";

export const metadata: Metadata = {
  title: "Link in Bio - Coding Tengah Malam",
  description: "Link in Bio untuk Coding Tengah Malam - Portal member, produk digital, dan resource lainnya",
};

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-[#f7fafc] flex flex-col items-center px-4">
      <div className="bg-white w-full max-w-md flex flex-col gap-2 md:w-full items-center mx-auto shadow-xs p-4">
        <ProfileCard />
        <div className="w-full">
          <LinkList />
          <ProductCarousel />
        </div>
             {/* Product Carousel Section */}
      <div className="w-full max-w-6xl mt-8">
       
      </div>
      </div>
      
 
    </div>
  );
}
