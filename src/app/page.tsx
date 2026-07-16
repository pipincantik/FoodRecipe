"use client";

// SearchBar intentionally removed from homepage header — use /search page instead
import MealCard from "@/components/MealCard";
import MealGridSkeleton from "@/components/MealGridSkeleton";
import EmptyState from "@/components/EmptyState";
import { useRandomMeals } from "@/hooks/useRandomMeals";

export default function HomePage() {
  const { meals, loading, error } = useRandomMeals(8);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-mustard)] mb-4 fade-up">
            Resep dari seluruh dunia
          </p>
          <h1 className="font-display font-900 text-4xl sm:text-6xl leading-[1.05] max-w-2xl fade-up">
            Masak sesuatu yang{" "}
            <span className="italic text-[var(--color-mustard)]">baru</span>{" "}
            malam ini.
          </h1>
          <p className="mt-5 max-w-xl text-[var(--color-cream)]/60 text-base sm:text-lg fade-up">
            Cari lewat nama masakan, lihat bahan-bahannya, ikuti langkah
            demi langkah, dan tonton video kalau perlu bantuan.
          </p>
          {/* Search moved to dedicated search page — removed from homepage hero */}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display font-700 text-2xl">
            Coba masak ini
          </h2>
          <span className="text-xs uppercase tracking-wide text-[var(--color-sage)]">
            
          </span>
        </div>

        {loading && <MealGridSkeleton count={8} />}

        {!loading && error && (
          <EmptyState
            title="Dapur sedang tutup sebentar."
            description={error}
          />
        )}

        {!loading && !error && meals.length === 0 && (
          <EmptyState
            title="Belum ada resep yang bisa ditampilkan."
            description="Coba muat ulang halaman ini."
          />
        )}

        {!loading && !error && meals.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
