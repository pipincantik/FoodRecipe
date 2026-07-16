import { Suspense } from "react";
import SearchView from "@/components/SearchView";
import MealGridSkeleton from "@/components/MealGridSkeleton";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-6 py-12">
          <MealGridSkeleton count={8} />
        </div>
      }
    >
      <SearchView />
    </Suspense>
  );
}
