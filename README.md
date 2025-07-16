# Link in Bio - Next.js & Tailwind CSS

Project ini adalah aplikasi Link in Bio modern yang dibangun dengan Next.js (App Router) dan Tailwind CSS, dengan pendekatan mobile first dan data dinamis dari file JSON.

## Fitur Utama
- **Mobile First**: Semua komponen dioptimalkan untuk tampilan mobile, responsif di semua device.
- **Profile & Social Card**: Data profil dan social link dibaca dari file `profile.json`.
- **Link Group by Category**: Semua link (termasuk produk) dikelompokkan berdasarkan kategori dari file `links.json`.
- **Produk Card**: Card produk dengan gambar besar, nama produk, dan highlight jika featured.
- **Dark Mode**: Toggle dark mode di header.
- **Customizable via JSON**: Semua data link, produk, dan profil bisa diubah langsung dari file JSON tanpa perlu edit kode.

## Struktur Project
```
src/
  app/
    components/
      Header.tsx
      LinkList.tsx
      ProductLinkCard.tsx
      ProfileSocialCard.tsx (jika digunakan)
    data/
      links.json      # Semua data link & produk
      profile.json    # Data profil & social links
    page.tsx         # Halaman utama
```

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
- **Profile & Social**: Edit `src/app/data/profile.json`
- **Link & Produk**: Edit `src/app/data/links.json` (bisa tambah kategori, produk, dsb)

## Catatan
- Pastikan gambar (avatar, thumbnail produk) tersedia di folder `public/dummy/` atau sesuaikan path-nya.
- Untuk icon social, bisa gunakan library seperti `react-icons` atau SVG inline.
- Tailwind config sudah mobile first dan mendukung dark mode.

---

> Dibuat dengan ❤️ oleh @codingtengahmalam
