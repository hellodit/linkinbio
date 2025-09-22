import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube } from "lucide-react";

const socials = [
  { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/codingtengahmalam" },
  { icon: Youtube, label: "YouTube", url: "https://www.youtube.com/@codingtengahmalam" },
];

export function ProfileCard() {
  return (
    <div className="relative w-full bg-transparent flex flex-col items-center">
      {/* Cover/banner */}
      <div className="h-20 w-full bg-cover bg-center rounded-b-xl"  />
      {/* Avatar & Main Info */}
      <div className="flex flex-col items-center -mt-16">
        <Image
          src="/images/avatar.png"
          alt="Asdita Prasetya"
          width={160}
          height={160}
          priority
          className="h-32 w-32 md:h-36 md:w-36 rounded-full border-4 border-background shadow-lg object-cover"
          sizes="(min-width: 768px) 144px, 128px"
        />
        <div className="mt-4 text-center px-4">
          <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border ring-inset">
            @codingtengahmalam          
          </span>
          <p className="text-xl md:text-2xl font-extrabold text-foreground">Asdita Prasetya</p>

          <p className="text-foreground text-sm mt-2 max-w-2xl">
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
