"use client";

import Link from "next/link";
import { StaggerItem, StaggerList } from "@/components/motion/StaggerList";
import { MotionButton } from "@/components/motion/MotionButton";

const PRODUCTS = [
  {
    slug: "monopoly-indonesia",
    name: "Monopoli Indonesia — Petualangan Nusantara",
    price: 285000,
    originalPrice: 350000,
    imageEmoji: "🗺️",
    imageBg: "from-blue-100 to-indigo-100",
    category: "Board Game",
    rating: 4.8,
    reviews: 124,
    badge: "SALE",
    discount: 19,
  },
  {
    slug: "story-puzzle",
    name: "Story Puzzle — Cerita Bergambar Anak",
    price: 175000,
    originalPrice: null,
    imageEmoji: "🧩",
    imageBg: "from-orange-100 to-amber-100",
    category: "Puzzle",
    rating: 4.7,
    reviews: 87,
    badge: "BARU",
    discount: null,
  },
  {
    slug: "math-war",
    name: "Math War 52 — Perang Kartu Angka",
    price: 74500,
    originalPrice: null,
    imageEmoji: "🃏",
    imageBg: "from-purple-100 to-violet-100",
    category: "Card Game",
    rating: 4.9,
    reviews: 203,
    badge: null,
    discount: null,
  },
  {
    slug: "sains-box",
    name: "Sains Box Jr. — Mini Laboratorium",
    price: 310000,
    originalPrice: 390000,
    imageEmoji: "🔬",
    imageBg: "from-green-100 to-emerald-100",
    category: "Edukasi",
    rating: 4.6,
    reviews: 56,
    badge: "SALE",
    discount: 21,
  },
  {
    slug: "word-quest",
    name: "Word Quest — Petualangan Kosakata",
    price: 145000,
    originalPrice: null,
    imageEmoji: "📖",
    imageBg: "from-rose-100 to-pink-100",
    category: "Edukasi",
    rating: 4.8,
    reviews: 91,
    badge: "BARU",
    discount: null,
  },
  {
    slug: "chess-kids",
    name: "Chess for Kids — Catur Bergambar",
    price: 95000,
    originalPrice: 120000,
    imageEmoji: "♟️",
    imageBg: "from-gray-100 to-slate-100",
    category: "Strategi",
    rating: 4.7,
    reviews: 44,
    badge: "SALE",
    discount: 21,
  },
];

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "#f59e0b" : "#e5e7eb"} aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
      <span className="text-[10px] text-gray-400">({reviews})</span>
    </div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="section-label">Pilihan Editor</p>
            <h2 className="section-title">Produk Terlaris</h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
          >
            Lihat Semua
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <StaggerList className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PRODUCTS.map((product) => (
            <StaggerItem
              key={product.slug}
              className="flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all duration-200 group"
            >
              {/* Product image area */}
              <Link href={`/products/${product.slug}`} className="block relative">
                <div className={`relative bg-gradient-to-br ${product.imageBg} h-48 flex items-center justify-center`}>
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300 select-none" aria-hidden="true">
                    {product.imageEmoji}
                  </span>

                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        product.badge === "SALE"
                          ? "bg-red-500 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {product.badge === "SALE" && product.discount
                        ? `-${product.discount}%`
                        : product.badge}
                    </span>
                  )}

                  {/* Wishlist button */}
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95"
                    aria-label={`Tambah ${product.name} ke wishlist`}
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </Link>

              {/* Product info */}
              <div className="p-3.5 flex flex-col gap-2 flex-1">
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit">
                  {product.category}
                </span>
                <Link href={`/products/${product.slug}`}>
                  <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <StarRating rating={product.rating} reviews={product.reviews} />

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mt-auto pt-1">
                  <span className="text-sm font-bold text-gray-900">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[10px] text-gray-400 line-through">
                      Rp {product.originalPrice.toLocaleString("id-ID")}
                    </span>
                  )}
                </div>

                {/* Add to cart */}
                <MotionButton
                  onClick={(e) => e.preventDefault()}
                  className="mt-1 w-full flex items-center justify-center gap-1.5 py-2 bg-blue-600 text-white text-[11px] font-semibold rounded-lg hover:bg-blue-700 transition-all btn-ripple"
                >
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  Tambah ke Keranjang
                </MotionButton>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
