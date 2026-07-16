"use client";

import { useEffect, useReducer } from "react";

type State<T> = {
  data: T;
  loading: boolean;
  error: string | null;
};

type Action<T> =
  | { type: "start" }
  | { type: "success"; payload: T }
  | { type: "error"; message: string };

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "start":
      return { ...state, loading: true, error: null };
    case "success":
      return { data: action.payload, loading: false, error: null };
    case "error":
      return { ...state, loading: false, error: action.message };
  }
}

/**
 * Generic async-fetch-in-effect hook that avoids synchronous setState calls
 * at the top of the effect body (each update is dispatched from a callback,
 * not the effect body itself).
 */
export function useAsyncMeals<T>(
  fetcher: () => Promise<T>,
  deps: unknown[],
  initialData: T,
  errorMessage: string
) {
  const [state, dispatch] = useReducer(reducer<T>, {
    data: initialData,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    Promise.resolve()
      .then(() => {
        if (!cancelled) dispatch({ type: "start" });
        return fetcher();
      })
      .then((result) => {
        if (!cancelled) dispatch({ type: "success", payload: result });
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: "error", message: errorMessage });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
