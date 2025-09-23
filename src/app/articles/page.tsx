import Link from 'next/link';
import { getArticleMeta } from '@/lib/articles';

export const metadata = {
  title: 'Artikel',
};

export const revalidate = 1800;
export const dynamic = "force-static";

export default async function ArticlesPage() {
  const articles = getArticleMeta();
  return (
    <div className="px-4 py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Artikel</h1>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.slug} className="border-b pb-4">
            <Link
              href={`/articles/${article.slug}`}
              className="text-primary font-semibold text-lg hover:underline"
            >
              {article.title}
            </Link>
            <p className="text-sm text-muted-foreground">{article.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
