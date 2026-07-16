"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingNav() {
  const path = usePathname();

  return (
    <nav className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50">
      <div className="flex items-center gap-3 bg-[var(--color-board-raised)]/80 backdrop-blur-sm px-3 py-2 rounded-full border border-white/6 shadow-lg">
        <Link
          href="/"
          aria-label="Beranda"
          className={`flex items-center justify-center h-10 w-10 rounded-md transition-colors ${
            path === "/" ? "bg-[var(--color-mustard)]/10 text-[var(--color-mustard)]" : "text-[var(--color-cream)]/90"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z" />
          </svg>
        </Link>

        <Link
          href="/search"
          aria-label="Cari resep"
          className={`flex items-center justify-center h-10 w-10 rounded-md transition-colors ${
            path?.startsWith("/search") ? "bg-[var(--color-mustard)]/10 text-[var(--color-mustard)]" : "text-[var(--color-cream)]/90"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
