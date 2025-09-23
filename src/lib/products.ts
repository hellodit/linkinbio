import fs from "fs/promises";
import path from "path";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";

import type { Product, ProductDocument, ProductFrontmatter } from "@/app/types/product";
import { productMdxComponents } from "@/components/mdx/product-mdx-components";

const PRODUCTS_DIR = path.join(process.cwd(), "src/content/products");
const FILE_EXTENSION = ".mdx";

type RawFrontmatter = Record<string, unknown>;

function assertString(value: unknown, field: string, slug: string): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  throw new Error(`Product "${slug}" is missing required string frontmatter field "${field}".`);
}

function toOptionalString(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  return undefined;
}

function toNumber(value: unknown, field: string, slug: string): number {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  throw new Error(`Product "${slug}" has invalid number for frontmatter field "${field}".`);
}

function toOptionalNumber(value: unknown, field: string, slug: string): number | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  return toNumber(value, field, slug);
}

function toBoolean(value: unknown): boolean | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") {
      return true;
    }
    if (normalized === "false") {
      return false;
    }
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  return Boolean(value);
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") {
        return item.trim();
      }
      if (item == null) {
        return "";
      }
      return String(item);
    })
    .filter((item) => item.length > 0);
}

function normalizeFrontmatter(slug: string, data: RawFrontmatter): ProductFrontmatter {
  const id = assertString(data.id ?? slug, "id", slug);
  const resolvedSlug = assertString(data.slug ?? slug, "slug", slug);
  const category = assertString(data.category ?? "Produk Digital", "category", slug);
  const type = assertString(data.type ?? "product", "type", slug);
  const name = assertString(data.name, "name", slug);
  const thumbnail = assertString(data.thumbnail, "thumbnail", slug);
  const coverImage = toOptionalString(data.coverImage) ?? thumbnail;
  const url = assertString(data.url, "url", slug);
  const price = toNumber(data.price, "price", slug);
  const original_price = toOptionalNumber(data.original_price, "original_price", slug);
  const is_featured = toBoolean(data.is_featured);
  const summary = assertString(data.summary, "summary", slug);
  const position = toOptionalNumber(data.position, "position", slug);
  const ctaLabel = toOptionalString(data.ctaLabel);
  const ctaUrl = toOptionalString(data.ctaUrl);
  const ctaHelperText = toOptionalString(data.ctaHelperText);
  const disableStickyCtaRaw = toBoolean(data.disableStickyCta);

  return {
    id,
    slug: resolvedSlug,
    category,
    type,
    name,
    thumbnail,
    coverImage,
    url,
    price,
    original_price,
    is_featured,
    summary,
    position,
    ctaLabel,
    ctaUrl,
    ctaHelperText,
    disableStickyCta: disableStickyCtaRaw === true ? true : undefined,
  } satisfies ProductFrontmatter;
}

async function readProductSource(slug: string) {
  const filePath = path.join(PRODUCTS_DIR, `${slug}${FILE_EXTENSION}`);
  return fs.readFile(filePath, "utf8");
}

const loadProductDocument = cache(async (slug: string): Promise<ProductDocument> => {
  const source = await readProductSource(slug);

  const { frontmatter, content } = await compileMDX<RawFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
    components: productMdxComponents,
  });

  const metadata = normalizeFrontmatter(slug, frontmatter ?? {});

  return {
    ...metadata,
    content,
  } satisfies ProductDocument;
});

const loadProductFrontmatter = cache(async (): Promise<ProductFrontmatter[]> => {
  let entries;
  try {
    entries = await fs.readdir(PRODUCTS_DIR, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const slugs = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(FILE_EXTENSION))
    .map((entry) => entry.name.replace(FILE_EXTENSION, ""));

  const products = await Promise.all(slugs.map((slug) => loadProductDocument(slug)));

  return products
    .map((product) => {
      const { content, ...metadata } = product;
      void content;
      return metadata;
    })
    .sort((a, b) => {
      const positionA = a.position ?? Number.MAX_SAFE_INTEGER;
      const positionB = b.position ?? Number.MAX_SAFE_INTEGER;

      if (positionA !== positionB) {
        return positionA - positionB;
      }

      if (a.is_featured && !b.is_featured) {
        return -1;
      }

      if (!a.is_featured && b.is_featured) {
        return 1;
      }

      return a.name.localeCompare(b.name);
    });
});

export async function getProducts(): Promise<Product[]> {
  return loadProductFrontmatter();
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await loadProductFrontmatter();
  return products.map((product) => product.slug);
}

export async function getProductBySlug(slug: string): Promise<ProductDocument | null> {
  try {
    return await loadProductDocument(slug);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`Failed to load product with slug "${slug}":`, error);
    }
    return null;
  }
}
