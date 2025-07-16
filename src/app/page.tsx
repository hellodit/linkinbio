import { Header } from "./components/Header";
import { ProfileCard } from "./components/ProfileCard";
import { Description } from "./components/Description";
import { SocialLinks } from "./components/SocialLinks";
import { LinkList } from "./components/LinkList";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-[#f7fafc] flex flex-col items-center py-4 px-2">
      <div className="w-full max-w-sm flex flex-col gap-3 sm:gap-4 items-center mx-auto">
        <ProfileCard />
        <SocialLinks />
        <div className="w-full">
          <span className="font-bold text-base sm:text-lg block mb-1 sm:mb-2">Link from Content</span>
          <LinkList />
        </div>
        <div className="w-full">
          <span className="font-bold text-base sm:text-lg block mb-1 sm:mb-2">Freebies</span>
          <div className="text-center text-muted-foreground py-6 sm:py-10 text-sm sm:text-base">Belum ada freebies.</div>
        </div>
      </div>
    </div>
  );
}
