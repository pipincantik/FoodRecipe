"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function SearchBar({
  initialValue = "",
  size = "md",
}: {
  initialValue?: string;
  size?: "md" | "lg";
}) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  const isLarge = size === "lg";

  return (
    <form onSubmit={handleSubmit} className="w-full" role="search">
      <div
        className={`relative flex items-center gap-3 rounded-full bg-[var(--color-board-raised)] border border-white/10 focus-within:border-[var(--color-mustard)] transition-colors ${
          isLarge ? "px-6 py-4" : "px-4 py-2.5"
        } overflow-hidden`}
      >
        <svg
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-[var(--color-sage)] shrink-0 ${
            isLarge ? "w-6 h-6" : "w-5 h-5"
          }`}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Cari resep, mis. Arrabiata, rendang, ramen…"
          aria-label="Cari resep"
          className={`flex-1 bg-transparent outline-none placeholder:text-[var(--color-cream)]/35 text-[var(--color-cream)] ${
            isLarge ? "text-lg pr-24" : "text-sm pr-20"
          }`}
        />
        <button
          type="submit"
          aria-label="Cari resep"
          className={`absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-[var(--color-mustard)] text-[var(--color-board)] font-semibold hover:bg-[var(--color-mustard-dim)] transition-colors ${
            isLarge ? "h-12 px-6 text-sm" : "h-10 px-4 text-xs"
          }`}
        >
          Cari
        </button>
      </div>
    </form>
  );
}
