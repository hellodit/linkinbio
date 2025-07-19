# Link in Bio - Next.js & Tailwind CSS

![Link in Bio](public/images/linkinbio.png)

Project ini adalah aplikasi Link in Bio modern yang dibangun dengan Next.js 15 (App Router), TypeScript, dan Tailwind CSS v4, dengan pendekatan mobile first dan data dinamis dari file JSON.

## Fitur Utama
- **Mobile First**: Semua komponen dioptimalkan untuk tampilan mobile, responsif di semua device.
- **Profile Card**: Data profil dengan avatar, nama, dan deskripsi.
- **Product Carousel**: Carousel produk digital dengan gambar, nama, harga, dan status featured.
- **Link List**: Daftar link yang dikelompokkan berdasarkan kategori dari file `links.json`.
- **Product Cards**: Card produk dengan gambar, nama produk, harga, dan highlight jika featured.
- **Dark Mode**: Toggle dark mode di header menggunakan shadcn/ui components.
- **Customizable via JSON**: Semua data link, produk, dan profil bisa diubah langsung dari file JSON tanpa perlu edit kode.
- **TypeScript**: Full TypeScript support untuk type safety.
- **Modern UI Components**: Menggunakan shadcn/ui components untuk konsistensi design.

## Tech Stack
- **Framework**: Next.js 15.4.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Icons**: Lucide React
- **Carousel**: Embla Carousel
- **Analytics**: Vercel Analytics


## Setup & Menjalankan
1. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```
2. **Jalankan development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```
3. **Akses di browser**
   Buka [http://localhost:3000](http://localhost:3000)

## Kustomisasi Data
- **Links**: Edit `src/app/data/links.json` untuk menambah/mengubah link
- **Products**: Edit `src/app/data/products.json` untuk menambah/mengubah produk digital
- **Profile**: Edit data profil di `src/app/components/ProfileCard.tsx`

## Data Structure

### Links JSON
```json
[
  {
    "type": "default",
    "label": "Link Label",
    "url": "https://example.com",
    "category": "Category Name"
  }
]
```

### Products JSON
```json
[
  {
    "id": "1",
    "category": "Produk Digital",
    "type": "product",
    "name": "Nama Produk",
    "thumbnail": "/products/image.jpg",
    "url": "https://example.com",
    "price": 99000,
    "original_price": 199000,
    "is_featured": true
  }
]
```

## Catatan
- Gambar produk tersedia di folder `public/products/`
- Gambar umum tersedia di folder `public/images/`
- Menggunakan shadcn/ui components untuk konsistensi design
- Tailwind config sudah mobile first dan mendukung dark mode
- TypeScript types tersedia di `src/app/types/`

## Scripts Available
- `npm run dev` - Development server dengan Turbopack
- `npm run build` - Build production
- `npm run start` - Start production server
- `npm run lint` - ESLint check

---

> Dibuat dengan ❤️ oleh @codingtengahmalam
