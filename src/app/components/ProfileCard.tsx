import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, MessageCircle, Linkedin, Instagram, Youtube } from "lucide-react";

const socials = [
  { icon: Linkedin, label: "Linkedin", url: "#" },
  { icon: Instagram, label: "Instagram", url: "#" },
  { icon: Youtube, label: "YouTube", url: "#" },
];

export function ProfileCard() {
  return (
    <div className="relative w-full bg-transparent flex flex-col items-center">
      {/* Cover/banner */}
      <div className="h-20 w-full bg-cover bg-center rounded-b-xl"  />
      {/* Avatar & Main Info */}
      <div className="flex flex-col items-center -mt-16">
        <Avatar className="w-25 h-25 border-4 border-background shadow-lg">
          <AvatarImage src="/images/avatar.png" alt="Asdita Prasetya" />
        </Avatar>
        <div className="mt-4 text-center px-4">
          <span className="text-xl md:text-2xl font-extrabold text-black">Asdita Prasetya</span>
          <p className="text-black text-sm mt-2 max-w-2xl">
            Saya Bantuin software engineer upgrade skill lebih cepat
          </p>
          {/* Socials */}
          <div className="flex gap-3 mt-4 mb-2 justify-center">
            {socials.map((s, i) => (
              <Button key={i} variant="outline" size="icon" asChild>
                <a href={s.url} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  <s.icon className="w-5 h-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 