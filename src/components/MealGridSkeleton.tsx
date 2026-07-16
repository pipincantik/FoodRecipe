export default function MealGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="recipe-card bg-[var(--color-board-raised)] pt-3 pb-4 px-4 animate-pulse"
        >
          <div className="aspect-square w-full rounded-sm bg-white/5 mb-3" />
          <div className="h-4 w-3/4 rounded bg-white/5 mb-2" />
          <div className="h-3 w-1/2 rounded bg-white/5" />
        </div>
      ))}
    </div>
  );
}
