"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductEduValues } from "@/components/products/ProductEduValues";
import { ProductSpecs } from "@/components/products/ProductSpecs";
import { AddToCart } from "@/components/products/AddToCart";
import { ProductCard, ProductCardProps } from "@/components/products/ProductCard";
import type { ProductDetail } from "@/lib/products-data";

// ─── Related Products ─────────────────────────────────────────────────────────
const RELATED_PRODUCTS: ProductCardProps[] = [
  {
    slug: "story-builder",
    name: "Story Builder",
    price: 125000,
    imageUrl: "/images/products/placeholder.webp",
    age: "8-12 tahun",
    subject: "Literasi",
    rating: 4.5,
    reviews: 189,
    badge: "BARU",
  },
  {
    slug: "team-work-challenge",
    name: "Team Work Challenge",
    price: 165000,
    imageUrl: "/images/products/placeholder.webp",
    age: "9-12 tahun",
    subject: "Social Skills",
    rating: 4.6,
    reviews: 143,
  },
  {
    slug: "logic-puzzle-master",
    name: "Logic Puzzle Master",
    price: 135000,
    imageUrl: "/images/products/placeholder.webp",
    age: "8-11 tahun",
    subject: "Logika",
    rating: 4.7,
    reviews: 98,
  },
];

// ─── Trust Badges ─────────────────────────────────────────────────────────────
const TRUST_BADGES = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "Produk Bersertifikat",
    color: "text-blue-600",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14M5 12l4-4m-4 4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Gratis Ongkir >200rb",
    color: "text-emerald-600",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "Garansi 30 hari",
    color: "text-amber-600",
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Teman Anak",
    color: "text-rose-500",
  },
];

// ─── Tabs ──────────────────────────────────────────────────────────────────────
const TABS = ["Deskripsi", "Cara Bermain", "Spesifikasi", "Ulasan"];

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "#fbbf24" : "#e5e7eb"}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-bold text-amber-500">{rating}</span>
      <span className="text-sm text-gray-400">({reviews} ulasan)</span>
    </div>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────
interface Props {
  slug: string;
  product: ProductDetail;
}

export default function ProductDetailClient({ slug, product }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="container mx-auto px-4 xl:px-8 py-6 md:py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[13px] text-gray-400 mb-4 flex-wrap">
          <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-blue-600 transition-colors">Katalog</Link>
          <span>›</span>
          <span className="text-gray-600 font-medium line-clamp-1">{product.name}</span>
        </nav>

        {/* Back link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali ke Katalog
        </Link>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">

          {/* Left – Gallery */}
          <div>
            <ProductGallery images={product.images} />
          </div>

          {/* Right – Info */}
          <div className="flex flex-col gap-4">

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {product.age}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {product.subject}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-[1.75rem] font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <StarRating rating={product.rating} reviews={product.reviews} />

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-1 flex-wrap">
              <span className="text-2xl md:text-3xl font-bold text-blue-600">
                Rp {product.price.toLocaleString("id-ID")}
              </span>
              <span className="text-sm text-gray-400 line-through">
                Rp {product.originalPrice.toLocaleString("id-ID")}
              </span>
              <span className="text-[12px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full">
                -{product.discount}%
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100" />

            {/* Specs */}
            <ProductSpecs specs={{ players: product.players, duration: product.duration }} />

            {/* Edu Values */}
            <ProductEduValues />

            {/* Add to Cart */}
            <div className="border-t border-gray-100 pt-4">
              <AddToCart
                productId={slug}
                name={product.name}
                imageUrl={product.images[0] ?? "/images/products/placeholder.webp"}
                price={product.price}
                originalPrice={product.originalPrice}
              />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-2">
              {TRUST_BADGES.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-[12px] text-gray-600 font-medium">
                  <span className={b.color}>{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          {/* Tab bar */}
          <div className="flex overflow-x-auto border-b border-gray-100">
            {TABS.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`shrink-0 px-5 py-4 text-sm font-semibold transition-all duration-200 border-b-2 ${
                  activeTab === i
                    ? "border-blue-600 text-blue-600 bg-blue-50/50"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {tab}{i === 3 ? ` (${product.reviews})` : ""}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6 md:p-8">
            {activeTab === 0 && (
              <p className="max-w-3xl text-[15px] text-gray-600 leading-relaxed prose-article">
                {product.description}
              </p>
            )}
            {activeTab === 1 && (
              <ol className="max-w-3xl list-decimal list-inside space-y-3 text-[15px] text-gray-600 leading-relaxed">
                <li>Siapkan papan permainan dan kartu di tengah meja.</li>
                <li>Setiap pemain mengambil 5 kartu awal dari tumpukan.</li>
                <li>Pemain termuda memulai giliran pertama.</li>
                <li>Pada setiap giliran, jawab soal dan maju sesuai poin.</li>
                <li>Pemain pertama yang mencapai garis finish menang!</li>
              </ol>
            )}
            {activeTab === 2 && (
              <div className="max-w-xl">
                <ProductSpecs
                  specs={{
                    players: product.players,
                    duration: product.duration,
                    age: product.age,
                    contents: "Papan, 120 Kartu, 4 Pion, Dadu",
                  }}
                />
              </div>
            )}
            {activeTab === 3 && (
              <div className="flex flex-col gap-4 max-w-2xl">
                {[
                  { name: "Budi S.", rating: 5, comment: "Anak saya sangat suka! Matematika jadi menyenangkan." },
                  { name: "Ratna P.", rating: 5, comment: "Kualitas bagus, pengiriman cepat. Highly recommended!" },
                  { name: "Ahmad R.", rating: 4, comment: "Game yang bagus, anak belajar sambil bermain." },
                ].map((review, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-semibold text-gray-800">{review.name}</span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill={s <= review.rating ? "#fbbf24" : "#e5e7eb"}>
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-[13px] text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Produk Terkait</h2>
            <Link
              href="/products"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
            >
              Lihat Semua
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {RELATED_PRODUCTS.map((p) => (
              <ProductCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
