# MDX Components Documentation

Dokumentasi lengkap untuk semua komponen MDX yang tersedia di proyek Link in Bio ini. Komponen-komponen ini dapat digunakan dalam file MDX untuk membuat konten yang lebih kaya dan interaktif.

## 📋 Daftar Komponen

- [Video](#video)
- [SneakPeek](#sneakpeek)
- [Highlights](#highlights)
- [Collapsible](#collapsible)
- [Callout](#callout)
- [FeatureGrid](#featuregrid)
- [OrderCTA](#ordercta)
- [CustomHTML](#customhtml)

---

## 🎥 Video

Komponen untuk menampilkan video embed dari YouTube, Vimeo, atau URL langsung.

### Props

```typescript
interface VideoProps {
  youtubeId?: string;     // ID video YouTube
  vimeoId?: string | number; // ID video Vimeo
  src?: string;           // URL video langsung
  title?: string;         // Judul video (default: "Embedded video")
  aspect?: "16:9" | "4:3" | "1:1" | "21:9"; // Rasio aspek (default: "16:9")
  className?: string;     // CSS classes tambahan
}
```

### Contoh Penggunaan

#### YouTube Video
```mdx
<Video 
  youtubeId="dQw4w9WgXcQ" 
  title="Demo Produk" 
  aspect="16:9" 
/>
```

#### Vimeo Video
```mdx
<Video 
  vimeoId="123456789" 
  title="Tutorial Video" 
/>
```

#### Video Langsung
```mdx
<Video 
  src="https://example.com/video.mp4" 
  title="Video Lokal" 
  aspect="4:3"
/>
```

---

## 🖼️ SneakPeek

Komponen untuk menampilkan carousel gambar preview produk.

### Props

```typescript
interface SneakPeekProps {
  images: string[];       // Array URL gambar
  productName: string;    // Nama produk untuk alt text
}
```

### Contoh Penggunaan

```mdx
<SneakPeek
  productName="Demo Product With Video"
  images={[
    "/products/coding-project-planner.png", 
    "/products/coding-project-planner-red.png"
  ]}
/>
```

---

## ✨ Highlights

Komponen untuk menampilkan daftar highlight atau fitur penting.

### Props

```typescript
interface HighlightsProps {
  items: string[];                    // Array teks highlight
  variant?: "default" | "minimal";    // Variant tampilan (default: "default")
  columns?: 1 | 2;                   // Jumlah kolom (default: 1)
  className?: string;                // CSS classes tambahan
}
```

### Contoh Penggunaan

#### Default Style (Card dengan Check Icon)
```mdx
<Highlights 
  items={[
    "Template effort breakdown berdasarkan role dan kompleksitas",
    "Simulasi margin otomatis dengan asumsi biaya operasional", 
    "Checklist risiko dan catatan komunikasi klien"
  ]}
/>
```

#### Minimal Style (Bullet Points)
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

#### Two Columns Layout
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

---

## 📁 Collapsible

Komponen untuk konten yang dapat di-expand/collapse (FAQ, dokumentasi, dll).

### Props

```typescript
interface CollapsibleProps {
  items: CollapsibleItem[];           // Array item dengan title dan content
  defaultOpenIndex?: number;          // Index item yang terbuka default (-1 = none)
  variant?: "default" | "card";       // Variant tampilan (default: "default")
  className?: string;                // CSS classes tambahan
}

interface CollapsibleItem {
  title: string;    // Judul item
  content: string;  // Konten item
}
```

### Contoh Penggunaan

#### Default Style (List)
```mdx
<Collapsible 
  items={[
    {
      title: "Apakah bisa dibantu edit atau setting?",
      content: "Karena belum ada tim, untuk sekarang Landing Hero tidak menerima jasa edit atau setting template pada akun Scalev kamu. Tapi kamu tetap dapat bantuan support via grup telegram jika ada hal yang mau ditanyakan."
    },
    {
      title: "Apakah bisa refund pembelian template?",
      content: "Kami memberikan garansi uang kembali 7 hari jika template tidak sesuai dengan yang dijelaskan dalam deskripsi produk."
    }
  ]}
  defaultOpenIndex={0}
/>
```

#### Card Style
```mdx
<Collapsible 
  variant="card"
  items={[
    {
      title: "Bagaimana cara menggunakan komponen ini?",
      content: "Komponen Collapsible dapat digunakan untuk berbagai keperluan seperti FAQ, dokumentasi, atau konten yang dapat di-expand/collapse."
    }
  ]}
/>
```

---

## 💬 Callout

Komponen untuk menampilkan pesan penting dengan styling khusus.

### Props

```typescript
interface CalloutProps {
  title?: string;                     // Judul callout
  variant?: "info" | "success" | "warning"; // Variant warna (default: "info")
  children: ReactNode;               // Konten callout
}
```

### Contoh Penggunaan

#### Info Callout
```mdx
<Callout title="Gratis untuk komunitas" variant="info">
  Template ini bisa langsung Anda duplikasi di Google Sheets dan bebas dikustom sesuai workflow internal tim.
</Callout>
```

#### Success Callout
```mdx
<Callout title="Open source" variant="success">
  Semua kode tersedia di GitHub, sehingga Anda bisa fork, tambahkan fitur baru, dan berkolaborasi dengan komunitas.
</Callout>
```

#### Warning Callout
```mdx
<Callout title="Bonus marketing kit" variant="warning">
  Anda juga mendapatkan template copywriting email dan struktur landing page yang efektif untuk memperkenalkan platform donasi ke komunitas Anda.
</Callout>
```

---

## 🎯 FeatureGrid

Komponen untuk menampilkan grid fitur dengan ikon dan deskripsi.

### Props

```typescript
interface FeatureGridProps {
  items: FeatureItem[];              // Array item fitur
  columns?: 2 | 3;                  // Jumlah kolom (default: 2)
}

interface FeatureItem {
  title: string;        // Judul fitur
  description: string;  // Deskripsi fitur
}
```

### Contoh Penggunaan

```mdx
<FeatureGrid
  items={[
    {
      title: "Effort breakdown otomatis",
      description: "Hitung estimasi waktu berdasarkan kompleksitas fitur dan role engineer."
    },
    {
      title: "Simulasi margin",
      description: "Sesuaikan panduan biaya operasional lalu lihat proyeksi keuntungan secara real time."
    },
    {
      title: "Checklist risiko",
      description: "Catat asumsi, blocking, dan log komunikasi klien agar proposal bisa dipertahankan."
    }
  ]}
  columns={2}
/>
```

---

## 🛒 OrderCTA

Komponen untuk tombol call-to-action dengan styling konsisten.

### Props

```typescript
interface OrderCTAProps {
  href: string;                      // URL tujuan
  label: string;                     // Teks tombol
  note?: string;                     // Catatan di atas tombol
  align?: "left" | "center" | "right"; // Alignment (default: "center")
  target?: "_blank" | "_self";       // Target link (default: "_blank")
}
```

### Contoh Penggunaan

```mdx
<OrderCTA
  href="https://codingtengahmalam.myr.id/ebook/laravel-best-practice"
  label="Dapatkan Blueprint Laravel"
  note="Bonus template dokumentasi, checklist deployment, dan update gratis."
  align="center"
  target="_blank"
/>
```

---

## 🌐 CustomHTML

Komponen untuk render HTML kustom atau JSX elements.

### Props

```typescript
interface CustomHTMLProps {
  html?: string;                     // HTML string (menggunakan dangerouslySetInnerHTML)
  children?: ReactNode;             // JSX children (dirender langsung)
  className?: string;               // CSS classes tambahan
}
```

### Contoh Penggunaan

#### Method 1: Menggunakan html prop
```mdx
<CustomHTML html={'<div style="padding:12px;border:1px dashed #999;border-radius:8px"><strong>HTML Kustom:</strong> Ini konten <em>raw HTML</em> yang dirender lewat komponen.</div>'} />
```

#### Method 2: Menggunakan JSX children dengan style string
```mdx
<CustomHTML> 
  <div style="padding:12px;border:1px dashed #999;border-radius:8px">
    <strong>HTML Kustom:</strong> Ini konten <em>raw HTML</em> yang dirender lewat komponen.
  </div>
</CustomHTML>
```

#### Method 3: Menggunakan JSX children dengan style object
```mdx
<CustomHTML> 
  <div style={{padding: "12px", border: "1px dashed #999", borderRadius: "8px"}}>
    <strong>HTML Kustom:</strong> Ini konten <em>raw HTML</em> yang dirender lewat komponen.
  </div>
</CustomHTML>
```

#### Embed iframe
```mdx
<CustomHTML> 
  <iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/xA4uF1u5rlU?si=3-zHFZvshtEQxqGR" 
    title="YouTube video player" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerPolicy="strict-origin-when-cross-origin" 
    allowFullScreen
  />
</CustomHTML>
```

---

## 🎨 Styling dan Tema

Semua komponen menggunakan design system yang konsisten:

### Warna
- **Primary**: Warna utama untuk aksen dan tombol
- **Foreground**: Warna teks utama
- **Muted Foreground**: Warna teks sekunder
- **Background**: Warna latar belakang
- **Card**: Warna latar belakang kartu
- **Border**: Warna border

### Spacing
- Menggunakan Tailwind CSS spacing scale
- Konsisten dengan shadcn/ui design system

### Dark Mode
- Semua komponen otomatis mendukung dark mode
- Menggunakan CSS variables untuk tema

---

## 📝 Tips Penggunaan

### 1. **Kombinasi Komponen**
```mdx
## Fitur Utama

<FeatureGrid items={features} />

<Callout title="Bonus" variant="info">
  Dapatkan akses ke komunitas Discord eksklusif!
</Callout>

<Highlights variant="minimal" items={benefits} />
```

### 2. **Responsive Design**
Semua komponen sudah responsive dan akan beradaptasi dengan ukuran layar:
- Mobile-first approach
- Breakpoints yang konsisten
- Touch-friendly interactions

### 3. **Accessibility**
- Proper ARIA labels
- Keyboard navigation
- Focus states
- Screen reader support

### 4. **Performance**
- Lazy loading untuk gambar
- Optimized animations
- Minimal bundle size impact

---

## 🔧 Customisasi

### CSS Classes
Semua komponen menerima `className` prop untuk customisasi:

```mdx
<Highlights 
  items={items}
  className="my-custom-highlights"
/>
```

### Theme Customization
Untuk customisasi tema global, edit file `src/app/globals.css` dan Tailwind config.

---

## 📚 Contoh Lengkap

Berikut contoh penggunaan komponen dalam file MDX produk:

```mdx
---
id: my-awesome-product
slug: my-awesome-product
name: My Awesome Product
summary: Produk digital yang luar biasa dengan fitur-fitur canggih.
price: 199000
original_price: 299000
---

## Mengapa Memilih Produk Ini?

<Highlights 
  items={[
    "Template effort breakdown berdasarkan role dan kompleksitas",
    "Simulasi margin otomatis dengan asumsi biaya operasional", 
    "Checklist risiko dan catatan komunikasi klien"
  ]}
/>

## Demo Video

<Video youtubeId="dQw4w9WgXcQ" title="Demo Produk" />

## Fitur Utama

<FeatureGrid
  items={[
    {
      title: "Struktur produksi siap pakai",
      description: "Folder structure, service layer, dan konfigurasi environment yang mengikuti praktik terbaik Laravel 11."
    },
    {
      title: "Checklist deployment menyeluruh",
      description: "Panduan pengujian, optimasi cache, dan konfigurasi server agar rilis pertama berjalan mulus."
    }
  ]}
/>

## Sneak Peek

<SneakPeek
  productName="My Awesome Product"
  images={[
    "/products/product-1.png",
    "/products/product-2.png"
  ]}
/>

## FAQ

<Collapsible 
  items={[
    {
      title: "Apakah bisa dikustomisasi?",
      content: "Ya, template ini sangat fleksibel dan mudah dikustomisasi sesuai kebutuhan Anda."
    },
    {
      title: "Apakah ada dukungan?",
      content: "Kami menyediakan dukungan melalui Discord dan email untuk semua pembeli."
    }
  ]}
/>

<Callout title="Gratis untuk komunitas" variant="info">
  Template ini bisa langsung Anda duplikasi dan bebas dikustom sesuai workflow internal tim.
</Callout>

<OrderCTA
  href="https://example.com/checkout"
  label="Beli Sekarang"
  note="Garansi uang kembali 7 hari"
/>
```

---

## 🚀 Kesimpulan

Dengan komponen-komponen MDX ini, Anda dapat membuat konten produk yang:
- **Kaya dan interaktif**
- **Responsive dan accessible**
- **Konsisten dengan design system**
- **Mudah dikustomisasi**
- **SEO friendly**

Gunakan komponen-komponen ini untuk meningkatkan engagement dan user experience pada halaman produk Anda!
