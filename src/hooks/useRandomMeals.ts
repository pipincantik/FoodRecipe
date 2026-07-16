"use client";

import { useCallback } from "react";
import { getRandomMeals } from "@/lib/mealdb";
import type { MealSummary } from "@/types/meal";
import { useAsyncMeals } from "./useAsyncMeals";

export function useRandomMeals(count: number) {
  const fetcher = useCallback(() => getRandomMeals(count), [count]);
  const { data, loading, error } = useAsyncMeals<MealSummary[]>(
    fetcher,
    [count],
    [],
    "Gagal memuat resep. Coba muat ulang halaman."
  );
  return { meals: data, loading, error };
}
