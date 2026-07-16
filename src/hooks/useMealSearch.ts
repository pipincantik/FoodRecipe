"use client";

import { useCallback } from "react";
import { searchMealsByName } from "@/lib/mealdb";
import type { MealSummary } from "@/types/meal";
import { useAsyncMeals } from "./useAsyncMeals";

export function useMealSearch(query: string) {
  const trimmed = query.trim();
  const fetcher = useCallback(() => {
    if (!trimmed) return Promise.resolve<MealSummary[]>([]);
    return searchMealsByName(trimmed);
  }, [trimmed]);

  const { data, loading, error } = useAsyncMeals<MealSummary[]>(
    fetcher,
    [trimmed],
    [],
    "Gagal mencari resep. Coba lagi."
  );

  return { meals: data, loading: trimmed ? loading : false, error };
}
