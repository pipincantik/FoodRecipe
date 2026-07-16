"use client";

import { useCallback } from "react";
import { getMealById } from "@/lib/mealdb";
import type { MealDetail } from "@/types/meal";
import { useAsyncMeals } from "./useAsyncMeals";

export function useMealDetail(id: string) {
  const fetcher = useCallback(() => getMealById(id), [id]);
  const { data, loading, error } = useAsyncMeals<MealDetail | null>(
    fetcher,
    [id],
    null,
    "Gagal memuat detail resep."
  );
  return { meal: data, loading, error };
}
