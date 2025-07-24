import Link from 'next/link';
import { getArticleMeta } from '@/lib/articles';
import { ProfileCard } from '../components/ProfileCard';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Artikel',
};

export default async function ArticlesPage() {
  const articles = getArticleMeta();
  return (
    <div className="px-4 py-8 max-w-2xl mx-auto space-y-6">
      <ProfileCard />
      <h1 className="text-2xl font-bold">Artikel</h1>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.slug} className="border-b pb-4 space-y-1">
            <Link
              href={`/articles/${article.slug}`}
              className="text-primary font-semibold text-lg hover:underline"
            >
              {article.title}
            </Link>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{article.category}</Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(article.date).toLocaleDateString('id-ID')}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{article.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
