"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface ProductCardProps {
  slug: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  imageUrl: string;
  age?: string;
  subject?: string;
  rating?: number;
  reviews?: number;
  badge?: string | null;
}

function StarRating({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <div className="flex items-center gap-1.5 mt-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "#fbbf24" : "#e5e7eb"}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span className="text-[11px] font-semibold text-amber-500">{rating}</span>
      {reviews && <span className="text-[11px] text-gray-400">({reviews})</span>}
    </div>
  );
}

export function ProductCard({
  slug,
  name,
  price,
  originalPrice,
  imageUrl,
  age,
  subject,
  rating = 4.5,
  reviews,
  badge,
}: ProductCardProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 700);
    // TODO: dispatch add-to-cart action
  };

  const handleDetail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/products/${slug}`);
  };

  return (
    <div
      className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/products/${slug}`)}
    >
      {/* Image Container */}
      <div className="relative bg-gray-50/50 aspect-square flex items-center justify-center p-6 pb-2 overflow-hidden">
        <div className="w-full h-full relative flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://placehold.co/400x400/f3f4f6/a1a1aa.png?text=Board+Game";
            }}
          />
        </div>

        {badge && (
          <span
            className={`absolute top-4 left-4 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm z-10 ${
              badge === "TERLARIS" ? "bg-amber-500 text-white" : "bg-blue-600 text-white"
            }`}
          >
            {badge === "TERLARIS" && "🔥 "}
            {badge}
          </span>
        )}

        {/* Hover action buttons (overlay) */}
        <div
          className={`absolute inset-x-4 bottom-4 flex gap-2 transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0 animate-slide-up-fade" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <button
            onClick={handleDetail}
            className="btn-ripple flex-1 py-2.5 bg-white/90 backdrop-blur-sm text-gray-700 border border-gray-200 text-[13px] font-semibold rounded-xl hover:bg-white hover:shadow-md active:scale-[0.96] transition-all duration-150 shadow-sm"
          >
            Detail
          </button>
          <button
            onClick={handleAdd}
            className={`btn-ripple flex-1 flex items-center justify-center gap-1.5 py-2.5 text-white text-[13px] font-semibold rounded-xl active:scale-[0.96] transition-all duration-150 shadow-sm ${
              addedAnim
                ? "bg-emerald-500 border-emerald-500 shadow-emerald-200"
                : "bg-blue-600 border-blue-600 hover:bg-blue-700 shadow-blue-200"
            }`}
          >
            {addedAnim ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Ditambah
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Tambah
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {age && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full leading-none">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {age}
            </span>
          )}
          {subject && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full leading-none">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {subject}
            </span>
          )}
        </div>

        <h3 className="text-[14px] md:text-[15px] font-semibold text-gray-900 line-clamp-2 leading-[1.45] mb-1 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>

        <StarRating rating={rating} reviews={reviews} />

        <div className="mt-3 mb-1">
          <span className="font-bold text-blue-600 text-base md:text-[17px] tracking-tight">
            Rp {price.toLocaleString("id-ID")}
          </span>
          {originalPrice && (
            <span className="text-[12px] text-gray-400 line-through ml-2">
              Rp {originalPrice.toLocaleString("id-ID")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
