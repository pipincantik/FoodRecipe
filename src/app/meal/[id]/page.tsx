"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMealDetail } from "@/hooks/useMealDetail";
import EmptyState from "@/components/EmptyState";

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 animate-pulse">
      <div className="h-4 w-24 rounded bg-white/5 mb-8" />
      <div className="aspect-video w-full rounded-lg bg-white/5 mb-8" />
      <div className="h-8 w-2/3 rounded bg-white/5 mb-4" />
      <div className="h-4 w-1/3 rounded bg-white/5" />
    </div>
  );
}

export default function MealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { meal, loading, error } = useMealDetail(id);

  if (loading) return <DetailSkeleton />;

  if (error || !meal) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <EmptyState
          title="Resep tidak ditemukan."
          description={error ?? "Coba kembali ke pencarian dan pilih resep lain."}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/search"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-sage)] hover:text-[var(--color-mustard)] transition-colors mb-8"
      >
        <svg
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4"
        >
          <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Kembali cari resep
      </Link>

      {meal.thumbnail && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8 bg-black/20">
          <Image
            src={meal.thumbnail}
            alt={meal.name}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-3">
        {meal.category && (
          <span className="rounded-full border border-[var(--color-mustard)]/30 bg-[var(--color-mustard)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-mustard)]">
            Kategori: {meal.category}
          </span>
        )}
        {meal.area && (
          <span className="rounded-full border border-[var(--color-sage)]/30 bg-[var(--color-sage)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage)]">
            Asal: {meal.area}
          </span>
        )}
      </div>

      <h1 className="font-display font-900 text-3xl sm:text-4xl mb-8 leading-tight">
        {meal.name}
      </h1>

      <div className="grid sm:grid-cols-[minmax(0,280px)_1fr] gap-10">
        <div>
          <h2 className="font-display font-700 text-xl mb-4">Bahan-bahan</h2>
          <ul className="space-y-2.5">
            {meal.ingredients.map((ing, i) => (
              <li
                key={i}
                className="flex justify-between gap-4 text-sm border-b border-white/5 pb-2.5"
              >
                <span className="text-[var(--color-cream)]">{ing.name}</span>
                <span className="text-[var(--color-cream)]/50 text-right shrink-0">
                  {ing.measure}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display font-700 text-xl mb-4">Cara membuat</h2>
          <ol className="space-y-4">
            {meal.instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display font-700 text-[var(--color-mustard)] shrink-0 w-6">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-[var(--color-cream)]/85">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          {meal.youtubeId && (
            <div className="mt-10">
              <h2 className="font-display font-700 text-xl mb-4">
                Video panduan
              </h2>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/40">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${meal.youtubeId}`}
                  title={`Video cara membuat ${meal.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {meal.source && (
            <a
              href={meal.source}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-xs text-[var(--color-sage)] hover:text-[var(--color-mustard)] underline underline-offset-4"
            >
              Lihat sumber asli
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
