import { Header } from "./components/Header";
import { ProfileCard } from "./components/ProfileCard";
import { Description } from "./components/Description";
import { SocialLinks } from "./components/SocialLinks";
import { LinkList } from "./components/LinkList";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-[#f7fafc] flex flex-col items-center py-4 px-2">
      <div className="w-full max-w-md flex flex-col gap-3 sm:gap-4 items-center mx-auto">
        <ProfileCard />
        <SocialLinks />
        <div className="w-full">
          <LinkList />
        </div>
      </div>
    </div>
  );
}
