# Highlights Component - Panduan Penggunaan

Komponen `Highlights` adalah komponen MDX yang dapat digunakan untuk menampilkan daftar highlight atau fitur penting dengan styling yang konsisten dan responsif.

## Fitur Komponen

- ✅ **Dua Variant**: `default` (dengan card dan check icon) dan `minimal` (bullet points sederhana)
- ✅ **Layout Responsif**: Mendukung 1 atau 2 kolom dengan responsive breakpoint
- ✅ **Styling Konsisten**: Menggunakan design system yang sama dengan komponen lainnya
- ✅ **TypeScript Ready**: Full type safety dan IntelliSense support

## Cara Penggunaan

### 1. Default Style (Card dengan Check Icon)

```mdx
<Highlights 
  items={[
    "Template effort breakdown berdasarkan role dan kompleksitas",
    "Simulasi margin otomatis dengan asumsi biaya operasional", 
    "Checklist risiko dan catatan komunikasi klien"
  ]}
/>
```

### 2. Minimal Style (Bullet Points)

```mdx
<Highlights 
  variant="minimal"
  items={[
    "Integrasi MDX dengan komponen kustom",
    "Video responsif dengan beberapa opsi sumber",
    "Layout yang mudah dikustomisasi"
  ]}
/>
```

### 3. Two Columns Layout

```mdx
<Highlights 
  columns={2}
  items={[
    "Responsive design",
    "Dark mode support",
    "TypeScript ready",
    "SEO optimized"
  ]}
/>
```

### 4. Kombinasi Variant dan Columns

```mdx
<Highlights 
  variant="minimal"
  columns={2}
  items={[
    "Fast loading",
    "Mobile first",
    "Accessibility compliant",
    "Cross browser support"
  ]}
/>
```

## Props Interface

```typescript
interface HighlightsProps {
  items: string[];           // Array of highlight text
  variant?: "default" | "minimal";  // Style variant (default: "default")
  columns?: 1 | 2;          // Number of columns (default: 1)
  className?: string;       // Additional CSS classes
}
```

## Contoh Penggunaan di Produk MDX

```mdx
---
id: my-product
slug: my-product
category: Produk Digital
type: product
name: My Awesome Product
thumbnail: /products/my-product.png
coverImage: /products/my-product-hero.png
url: https://example.com/my-product
price: 199000
original_price: 299000
is_featured: true
summary: Produk digital yang luar biasa dengan fitur-fitur canggih.
highlights:
  - Fitur utama pertama
  - Fitur utama kedua
  - Fitur utama ketiga
position: 1
ctaLabel: Beli Sekarang
ctaUrl: https://example.com/my-product#buy
ctaHelperText: Garansi uang kembali 7 hari
disableStickyCta: false
---

## Mengapa Memilih Produk Ini?

<Highlights 
  items={[
    "Template effort breakdown berdasarkan role dan kompleksitas",
    "Simulasi margin otomatis dengan asumsi biaya operasional", 
    "Checklist risiko dan catatan komunikasi klien"
  ]}
/>

## Spesifikasi Singkat

<Highlights 
  variant="minimal"
  items={[
    "Kategori: Produk Digital",
    "Harga: Rp199.000", 
    "Dukungan: Pembaruan gratis selama 6 bulan"
  ]}
/>

## Fitur Utama

<Highlights 
  columns={2}
  items={[
    "Responsive design",
    "Dark mode support",
    "TypeScript ready",
    "SEO optimized"
  ]}
/>
```

## Styling

Komponen menggunakan Tailwind CSS classes yang konsisten dengan design system:

- **Default variant**: Card dengan border, background, dan check icon
- **Minimal variant**: Simple bullet points dengan primary color
- **Responsive**: Grid layout yang beradaptasi dengan ukuran layar
- **Dark mode**: Otomatis mendukung dark mode

## Tips Penggunaan

1. **Gunakan default variant** untuk highlight fitur utama yang ingin ditekankan
2. **Gunakan minimal variant** untuk informasi tambahan atau spesifikasi
3. **Gunakan 2 kolom** untuk daftar yang panjang agar lebih efisien
4. **Kombinasi dengan komponen lain** seperti `Callout` atau `FeatureGrid` untuk variasi konten
