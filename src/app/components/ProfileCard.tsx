import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Twitter, Linkedin, Mail, Youtube, Instagram } from "lucide-react";


const socials = [
    { icon: Linkedin, label: "Linkedin", url: "#" },
    { icon: Instagram, label: "Instagram", url: "#" },
    { icon: Youtube, label: "YouTube", url: "#" },
  ];
  

export function ProfileCard() {
  return (
    <div className="flex flex-col items-center justify-center bg-transparent p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="rounded-full p-1">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/avatar.jpg" alt="Asdita Prasetya" />
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-2xl md:text-3xl font-extrabold">Asdita Prasetya</p>
          <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mt-1">
            @codingtengahmalam
          </span>
        </div>
      </div>
      <div className="text-center mb-6">
        <p className="text-gray-700 text-base">
          Saya Bantu ningkatin skill codingmu 🚀👨‍🚀🌃
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
      {socials.map((s, i) => (
        <Button key={i} variant="outline" size="icon" asChild>
          <a href={s.url} aria-label={s.label} target="_blank" rel="noopener noreferrer">
            <s.icon className="w-5 h-5" />
          </a>
        </Button>
      ))}
    </div>
    </div>
  );
} 