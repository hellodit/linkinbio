import type { Metadata } from "next";
import { ProfileCard } from "./components/ProfileCard";
import { LinkList } from "./components/LinkList";

export const metadata: Metadata = {
  title: "Link in Bio - Coding Tengah Malam",
  description: "Link in Bio untuk Coding Tengah Malam - Portal member, produk digital, dan resource lainnya",
};

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-[#f7fafc] flex flex-col items-center py-4 px-2">
      <div className="w-full max-w-md flex flex-col gap-3 sm:gap-4 items-center mx-auto">
        <ProfileCard />
        <div className="w-full">
          <LinkList />
        </div>
      </div>
    </div>
  );
}
