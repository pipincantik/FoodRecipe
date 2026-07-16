"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/lib/mealdb";

export default function useMealCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getCategories()
      .then((c) => {
        if (mounted) setCategories(c);
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
  }, []);

  return { categories, loading, error } as const;
}
