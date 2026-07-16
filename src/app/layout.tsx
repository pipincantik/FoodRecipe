import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import Link from "next/link";
import FloatingNav from "@/components/FloatingNav";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const body = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dapur — cari resep dari seluruh dunia",
  description:
    "Cari resep berdasarkan nama, jelajahi bahan dan cara memasaknya, lengkap dengan video panduan. Ditenagai oleh TheMealDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-board)] text-[var(--color-cream)]">
        <header className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
            <Link href="/" className="group flex items-baseline gap-2">
              <span className="font-display font-900 text-2xl tracking-tight">
                Dapur
              </span>
              <span className="hidden sm:inline text-xs uppercase tracking-[0.2em] text-[var(--color-sage)] group-hover:text-[var(--color-mustard)] transition-colors">
                resep dunia
              </span>
            </Link>
            <div className="hidden" aria-hidden>
              {/* top nav removed in favor of floating bottom nav */}
            </div>
          </div>
        </header>
        <main className="flex-1 pb-28">{children}</main>
        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-8 text-xs text-[var(--color-cream)]/50 flex flex-col sm:flex-row gap-2 sm:justify-between">
            <span></span>
            <span></span>
          </div>
        </footer>
        <FloatingNav />
      </body>
    </html>
  );
}
