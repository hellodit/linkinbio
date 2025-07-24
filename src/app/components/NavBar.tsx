import Link from 'next/link';

export function NavBar() {
  return (
    <nav className="w-full bg-card border-b border-border/50 shadow-sm">
      <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-foreground">
          Home
        </Link>
        <Link href="/articles" className="text-sm font-medium text-muted-foreground hover:text-foreground">
          Artikel
        </Link>
      </div>
    </nav>
  );
}
