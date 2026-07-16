# Dapur — Meal Finder

Front-end replika sederhana dari konsep MealApp (https://meal.perspektive.id/),
dibangun dengan Next.js 15 (App Router) + TypeScript + Tailwind CSS,
menggunakan data resep dari [TheMealDB API](https://www.themealdb.com/api.php).

## Fitur

- **Beranda** — hero pencarian + grid resep 
- **Cari resep** (`/search?q=...`) — cari resep berdasarkan nama
- **Detail resep** (`/meal/[id]`) — gambar, kategori, area asal, daftar
  bahan + takaran, langkah memasak, dan video YouTube (jika tersedia)

Semua data diambil langsung dari browser (client-side fetch) ke TheMealDB
menggunakan API key uji publik `1` — tidak ada backend/API key rahasia
yang perlu disiapkan.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Build produksi

```bash
npm run build
npm start
```

## Struktur proyek

```
src/
  app/
    page.tsx              # Beranda
    search/page.tsx        # Halaman pencarian (Suspense wrapper)
    meal/[id]/page.tsx      # Halaman detail resep
    layout.tsx              # Root layout, font, header/footer
    globals.css             # Design tokens (warna, animasi)
  components/
    MealCard.tsx
    SearchBar.tsx
    SearchView.tsx
    MealGridSkeleton.tsx
    EmptyState.tsx
  hooks/
    useAsyncMeals.ts         # Generic async-fetch hook (reducer based)
    useRandomMeals.ts
    useMealSearch.ts
    useMealDetail.ts
  lib/
    mealdb.ts                # Semua pemanggilan & normalisasi data TheMealDB
  types/
    meal.ts                  # Tipe data meal (raw API & yang sudah dinormalisasi)
```

## Catatan

- Endpoint publik TheMealDB hanya menyediakan satu resep acak per panggilan,
  jadi `getRandomMeals(n)` melakukan beberapa panggilan paralel/berurutan
  dan menghilangkan duplikat berdasarkan id.
- Gambar dilayani dari `www.themealdb.com`, sudah didaftarkan di
  `next.config.ts` (`images.remotePatterns`).
