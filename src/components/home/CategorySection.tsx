"use client";

import Link from "next/link";
import { useRef } from "react";

const CATEGORIES = [
  { emoji: "🚀", label: "SD Kelas 1-3", color: "#1d4ed8", bg: "#dbeafe", href: "/products?category=sd-1-3", count: "120+" },
  { emoji: "➗", label: "Matematika", color: "#7c3aed", bg: "#f5f3ff", href: "/products?category=matematika", count: "180+" },
  { emoji: "♟️", label: "Strategi", color: "#dc2626", bg: "#fef2f2", href: "/products?category=strategi", count: "95+" },
  { emoji: "🎲", label: "Board Game", color: "#2563eb", bg: "#EFF6FF", href: "/products?category=board-game", count: "240+" },
  { emoji: "🃏", label: "Card Game", color: "#7c3aed", bg: "#F5F3FF", href: "/products?category=card-game", count: "180+" },
  { emoji: "📚", label: "Edukasi", color: "#16a34a", bg: "#F0FDF4", href: "/products?category=edukasi", count: "320+" },
  { emoji: "🧩", label: "Puzzle", color: "#ea580c", bg: "#FFF7ED", href: "/products?category=puzzle", count: "95+" },
  { emoji: "🎯", label: "Strategi", color: "#dc2626", bg: "#FEF2F2", href: "/products?category=strategi", count: "75+" },
  { emoji: "🏆", label: "Kompetisi", color: "#d97706", bg: "#FFFBEB", href: "/products?category=kompetisi", count: "60+" },
  { emoji: "🌍", label: "Geografi", color: "#059669", bg: "#ECFDF5", href: "/products?category=geografi", count: "45+" },
  { emoji: "🎪", label: "Lainnya", color: "#0891b2", bg: "#ECFEFF", href: "/products", count: "100+" },
];

export function CategorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -260, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 260, behavior: "smooth" });
  };

  return (
    <section className="py-12 bg-white">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="section-label">Koleksi Kami</p>
            <h2 className="section-title">Jelajahi Kategori</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              aria-label="Scroll kategori ke kiri"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={scrollRight}
              aria-label="Scroll kategori ke kanan"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 18l6-6-6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <Link
              href="/products"
              className="ml-2 text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              Lihat Semua
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto hide-scrollbar pb-2"
            style={{ scrollBehavior: "smooth" }}
          >
            {CATEGORIES.map(({ emoji, label, color, bg, href, count }, index) => (
              <Link
                key={`${label}-${href}-${count}-${index}`}
                href={href}
                className="flex-shrink-0 flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 group bg-white"
                style={{ minWidth: "110px" }}
              >
                <span
                  className="flex items-center justify-center w-16 h-16 rounded-2xl text-3xl group-hover:scale-110 transition-transform duration-200"
                  style={{ background: bg }}
                  aria-hidden="true"
                >
                  {emoji}
                </span>
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-800 leading-tight">{label}</p>
                  <p className="text-[10px] font-medium mt-0.5" style={{ color }}>{count} produk</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
