import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

import { getProductBySlug, getProductSlugs } from "@/lib/products";
import { formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SneakPeekCarousel } from "@/app/components/SneakPeekCarousel";

export async function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk tidak ditemukan",
    };
  }

  const { name, summary, coverImage } = product;

  return {
    title: `${name} | Coding Tengah Malam`,
    description: summary,
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
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const {
    name,
    category,
    description,
    summary,
    highlights,
    price,
    original_price,
    url,
    coverImage,
    thumbnail,
    sneakPeek,
  } = product;

  const isFree = price === 0;
  const ctaLabel = isFree ? "Download Gratis" : "Beli Sekarang";

  return (
    <>
      <div className="px-4 py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
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

            <div className="grid gap-8 p-6 md:grid-cols-[2fr,1fr] md:p-10">
              <div className="space-y-4">
                <Badge variant="secondary" className="uppercase">
                  {category}
                </Badge>
                <h1 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
                  {name}
                </h1>
                <p className="text-base text-muted-foreground md:text-lg">
                  {summary}
                </p>

                <section className="space-y-3">
                  <h2 className="text-lg font-semibold text-foreground">Apa saja di dalamnya</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                  <ul className="space-y-2">
                    {highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <aside className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-background/60 p-6 shadow-sm">
                <div className="space-y-1 text-right">
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">
                    Harga
                  </span>
                  <div className="flex items-center justify-end gap-2">
                    {typeof original_price === "number" && original_price > price ? (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatRupiah(original_price)}
                      </span>
                    ) : null}
                    <span className="text-2xl font-semibold text-foreground">
                      {isFree ? "FREE" : formatRupiah(price)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Gunakan tombol melayang di kanan bawah untuk melanjutkan ke halaman penawaran resmi Coding Tengah Malam.
                </p>
              </aside>
            </div>
          </div>

          {sneakPeek.length > 0 ? (
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold text-foreground">Sneak Peek</h2>
                <span className="text-xs text-muted-foreground">
                  Geser untuk melihat preview konten
                </span>
              </div>
              <SneakPeekCarousel images={sneakPeek} productName={name} />
            </section>
          ) : null}
        </div>
      </div>
      <div className="fixed inset-x-4 bottom-6 z-50 md:inset-x-auto md:right-10 md:bottom-10">
        <div className="mx-auto flex max-w-5xl justify-end">
          <div className="w-full max-w-sm rounded-full border border-border/60 bg-background/95 p-1 shadow-2xl backdrop-blur">
            <Button
              asChild
              size="lg"
              variant="default"
              className="w-full rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                {ctaLabel}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
