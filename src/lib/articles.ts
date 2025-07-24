import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  thumbnail: string;
}

export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export function getArticleMeta(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => {
      const filePath = path.join(articlesDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        category: data.category as string,
        thumbnail: data.thumbnail as string,
      } as ArticleMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleBySlug(slug: string): Promise<{ meta: ArticleMeta; content: string }> {
  const filePath = path.join(articlesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  return {
    meta: {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      category: data.category as string,
      thumbnail: data.thumbnail as string,
    },
    content: processedContent.toString(),
  };
}
