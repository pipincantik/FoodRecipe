"use client";

import { useEffect, useState } from "react";
import { searchMealsByCategory } from "@/lib/mealdb";
import type { MealSummary } from "@/types/meal";

export default function useMealsByCategory(category: string | null) {
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!category) {
      setMeals([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    searchMealsByCategory(category)
      .then((m) => {
        if (mounted) setMeals(m);
      })
      .catch((err) => {
        if (mounted) setError(String(err.message ?? err));
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [category]);

  return { meals, loading, error } as const;
}
