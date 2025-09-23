import { getArticleSlugs, getArticleBySlug } from '@/lib/articles';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getArticleBySlug(slug);
  const canonical = `/articles/${slug}`;
  return {
    title: meta.title,
    description: meta.excerpt,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title: meta.title,
      description: meta.excerpt,
      url: canonical,
    },
    twitter: {
      card: 'summary',
      title: meta.title,
      description: meta.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta, content } = await getArticleBySlug(slug);
  return (
    <div className="px-4 py-8 max-w-prose mx-auto">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: meta.title,
            description: meta.excerpt,
            datePublished: meta.date,
            dateModified: meta.date,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://codingtengahmalam.com'}/articles/${slug}`,
            },
          }),
        }}
      />
      <h1 className="text-3xl font-bold mb-2">{meta.title}</h1>
      <div className="text-sm text-muted-foreground mb-6">
        {new Date(meta.date).toLocaleDateString('id-ID')}
      </div>
      <article className="prose prose-slate dark:prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
