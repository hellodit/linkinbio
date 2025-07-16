import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Mail, Youtube, Instagram, Tiktok } from "lucide-react";

const socials = [
  { icon: Linkedin, label: "Linkedin", url: "#" },
  { icon: Instagram, label: "Instagram", url: "#" },
  { icon: Youtube, label: "YouTube", url: "#" },
];

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {socials.map((s, i) => (
        <Button key={i} variant="outline" size="icon" asChild>
          <a href={s.url} aria-label={s.label} target="_blank" rel="noopener noreferrer">
            <s.icon className="w-5 h-5" />
          </a>
        </Button>
      ))}
    </div>
  );
} 