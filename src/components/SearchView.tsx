"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import MealCard from "@/components/MealCard";
import MealGridSkeleton from "@/components/MealGridSkeleton";
import EmptyState from "@/components/EmptyState";
import CategoryList from "@/components/CategoryList";
import { useMealSearch } from "@/hooks/useMealSearch";
import useMealCategories from "@/hooks/useMealCategories";
import useMealsByCategory from "@/hooks/useMealsByCategory";

export default function SearchView() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const { meals, loading, error } = useMealSearch(query);
  const { categories, loading: categoriesLoading } = useMealCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const {
    meals: categoryMeals,
    loading: categoryLoading,
    error: categoryError,
  } = useMealsByCategory(selectedCategory);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display font-900 text-3xl sm:text-4xl mb-6">
        Cari resep
      </h1>
      <div className="max-w-xl mb-10">
        <SearchBar initialValue={query} size="lg" />
      </div>

      {!query.trim() && !selectedCategory && (
        <div>
          <p className="mb-4 italic text-center text-[var(--color-cream)]/60">
            Mau masak apa hari ini? Pilih kategori terlebih dahulu untuk melihat
            semua resep di kategori tersebut.
          </p>
          {categoriesLoading ? (
            <MealGridSkeleton count={8} />
          ) : (
            <CategoryList
              categories={categories}
              onSelect={(c) => setSelectedCategory(c)}
            />
          )}
        </div>
      )}

      {query.trim() && loading && <MealGridSkeleton count={8} />}

      {query.trim() && !loading && error && (
        <EmptyState title="Pencarian gagal." description={error} />
      )}

      {query.trim() && !loading && !error && meals.length === 0 && (
        <EmptyState
          title={`Tidak ada resep untuk "${query}".`}
          description="Coba kata kunci lain, misalnya nama bahan utama atau nama masakan yang lebih umum."
        />
      )}

      {query.trim() && !loading && !error && meals.length > 0 && (
        <>
          <p className="text-sm text-[var(--color-sage)] mb-6">
            {meals.length} resep ditemukan untuk &quot;{query}&quot;
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </>
      )}

      {selectedCategory && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-[var(--color-sage)]">
              Menampilkan resep di kategori "{selectedCategory}"
            </p>
            <button
              className="text-xs text-[var(--color-sage)] hover:text-[var(--color-mustard)]"
              onClick={() => setSelectedCategory(null)}
            >
              Hapus filter
            </button>
          </div>

          {categoryLoading && <MealGridSkeleton count={8} />}

          {!categoryLoading && categoryError && (
            <EmptyState title="Gagal memuat kategori" description={categoryError} />
          )}

          {!categoryLoading && !categoryError && categoryMeals.length === 0 && (
            <EmptyState
              title={`Tidak ada resep di kategori "${selectedCategory}".`}
              description="Coba pilih kategori lain."
            />
          )}

          {!categoryLoading && !categoryError && categoryMeals.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {categoryMeals.map((m) => (
                <MealCard key={m.id} meal={m} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
