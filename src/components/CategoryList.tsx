"use client";

import React from "react";

export default function CategoryList({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected?: string | null;
  onSelect: (cat: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {categories.map((c) => {
        const active = selected === c;
        return (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className={`w-full text-left rounded-md px-3 py-2 border transition-all ${
              active
                ? "bg-[var(--color-mustard)]/10 border-[var(--color-mustard)] text-[var(--color-mustard)]"
                : "bg-[var(--color-board-raised)] border-white/6 text-[var(--color-cream)]"
            }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
