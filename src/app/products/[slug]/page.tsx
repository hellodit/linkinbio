import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { getProductBySlug, getProductSlugs } from "@/lib/products";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk tidak ditemukan",
    };
  }

  const { name, summary, coverImage } = product;

  return {
    title: `${name} | Coding Tengah Malam`,
    description: summary,
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title: name,
      description: summary,
      images: coverImage
        ? [
            {
              url: coverImage,
              width: 1200,
              height: 630,
              alt: name,
            },
          ]
        : undefined,
      type: 'website',
      url: `/products/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description: summary,
      images: coverImage ? [coverImage] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const {
    name,
    category,
    summary,
    price,
    original_price,
    url,
    coverImage,
    thumbnail,
    content,
    ctaLabel,
    ctaUrl,
    ctaHelperText,
    disableStickyCta,
  } = product;

  const isFree = price === 0;
  const finalCtaLabel = ctaLabel ?? (isFree ? "Download Gratis" : "Beli Sekarang");
  const finalCtaUrl = ctaUrl ?? url;
  const showStickyCta = disableStickyCta !== true;

  return (
    <div className="pb-24">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name,
            description: summary,
            image: coverImage || thumbnail,
            category,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'IDR',
              price: typeof price === 'number' ? price : undefined,
              url: typeof url === 'string' ? url : undefined,
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
      <div className="px-4 py-10">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-8 items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke halaman utama
          </Link>

          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xl">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={coverImage || thumbnail}
                alt={name}
                fill
                sizes="(min-width: 1280px) 1024px, (min-width: 768px) 90vw, 100vw"
                className="object-cover"
                priority
                quality={80}
              />
            </div>

            <div className="p-6 md:p-10">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge variant="secondary" className="uppercase">
                    {category}
                  </Badge>
                  <h1 className="text-2xl font-bold leading-tight text-foreground md:text-3xl">
                    {name}
                  </h1>
                  <div className="flex items-baseline justify-between rounded-xl border border-border/60 bg-background/60 p-4">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">Harga:</span>
                    <div className="flex items-center gap-2">
                      {typeof original_price === "number" && original_price > price ? (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatRupiah(original_price)}
                        </span>
                      ) : null}
                      <span className="text-xl font-semibold text-foreground">
                        {isFree ? "Gratis" : formatRupiah(price)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground md:text-base">
                    {summary}
                  </p>
                </div>

                <section className="space-y-6">
                  <div className="space-y-4 text-left">{content}</div>


                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showStickyCta ? (
        <div className="fixed inset-x-0 bottom-0 z-50 px-4 bg-white dark:bg-background/95">
          <div className="mx-auto flex max-w-lg justify-center py-4">
            <div className="w-full max-w-lg p-1 space-y-2">
              {ctaHelperText ? (
                <p className="text-xs text-muted-foreground text-center">{ctaHelperText}</p>
              ) : null}
              <Button
                asChild
                size="lg"
                variant="default"
                className="w-full text-primary-foreground hover:bg-primary/90"
              >
                <a
                  href={finalCtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  {finalCtaLabel}
                </a>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
