import Image from 'next/image';
import Link from 'next/link';
import { ArticleMeta } from '@/lib/articles';

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block bg-card rounded-lg overflow-hidden border border-border/50 hover:shadow-md transition-shadow"
    >
      <div className="relative w-full h-40">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-foreground line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
