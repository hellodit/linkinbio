import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-neutral-100 p-2">
          {/* Ganti dengan logo SVG */}
          <span className="font-bold">MokUI</span>
        </span>
        <span className="font-semibold text-lg">MokUI Design</span>
      </div>
      <Button variant="outline">Subscribes</Button>
    </header>
  );
} 