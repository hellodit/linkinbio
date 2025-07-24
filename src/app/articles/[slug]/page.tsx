import { getArticleSlugs, getArticleBySlug } from '@/lib/articles';
import type { Metadata } from 'next';
import { ProfileCard } from '../components/ProfileCard';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getArticleBySlug(slug);
  return { title: meta.title, description: meta.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta, content } = await getArticleBySlug(slug);
  return (
    <div className="px-4 py-8 max-w-prose mx-auto space-y-6">
      <ProfileCard />
      <div>
        <h1 className="text-3xl font-bold mb-2">{meta.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Badge variant="secondary">{meta.category}</Badge>
          <span>{new Date(meta.date).toLocaleDateString('id-ID')}</span>
        </div>
        <img src={meta.thumbnail} alt="" className="w-full rounded-lg mb-4" />
        <article className="prose prose-slate dark:prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
