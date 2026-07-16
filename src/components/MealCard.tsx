import Image from "next/image";
import Link from "next/link";
import type { MealSummary } from "@/types/meal";

export default function MealCard({ meal }: { meal: MealSummary }) {
  return (
    <Link
      href={`/meal/${meal.id}`}
      className="group recipe-card block bg-[var(--color-board-raised)] pt-3 pb-4 px-4 transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-sm mb-3 bg-black/20">
        {meal.thumbnail ? (
          <Image
            src={meal.thumbnail}
            alt={meal.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[var(--color-cream)]/40 text-sm">
            Tidak ada gambar
          </div>
        )}
      </div>
      <h3 className="font-display font-700 text-lg leading-snug text-[var(--color-cream)] group-hover:text-[var(--color-mustard)] transition-colors">
        {meal.name}
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {meal.category && (
          <span className="rounded-full border border-[var(--color-mustard)]/30 bg-[var(--color-mustard)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-mustard)]">
            {meal.category}
          </span>
        )}
        {meal.area && (
          <span className="rounded-full border border-[var(--color-sage)]/30 bg-[var(--color-sage)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-sage)]">
            {meal.area}
          </span>
        )}
      </div>
    </Link>
  );
}
