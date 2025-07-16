import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function ProfileCard() {
  return (
    <div className="flex flex-col items-center justify-center  bg-transparent">
      <div className="rounded-full p-1 mb-6" style={{ background: "linear-gradient(135deg, #ff6a3d 0%, #a844a1 100%)" }}>
        <Avatar className="w-28 h-28">
          <AvatarImage src="/avatar.jpg" alt="Rifki Abdurachman" />
          <AvatarFallback>RA</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-center font-extrabold text-3xl md:text-4xl leading-tight mb-4">
        <span>I do code and<br />make content </span>
        <span>
          <span className="text-[#ff6a3d]">about </span>
          <span className="text-[#a844a1]">it!</span>
        </span>
      </div>
      <div className="text-center text-gray-400 text-base max-w-xl mx-auto">
        I am a seasoned full-stack software engineer with over<br />
        8 years of professional experience,
      </div>
    </div>
  );
} 