"use client";

import { useState } from "react";

interface Props {
  images: string[];
}

export function ProductGallery({ images }: Props) {
  const [active, setActive] = useState(0);
  const [wishlist, setWishlist] = useState(false);

  // Fallback images if empty
  const imgList =
    images.length > 0
      ? images
      : [
          "https://placehold.co/600x600/f3f4f6/a1a1aa.png?text=Board+Game",
          "https://placehold.co/600x600/eff6ff/93c5fd.png?text=Detail+1",
          "https://placehold.co/600x600/f0fdf4/86efac.png?text=Detail+2",
          "https://placehold.co/600x600/fef9c3/fbbf24.png?text=Detail+3",
        ];

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Main Image */}
      <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center border border-gray-100 shadow-sm">
        <img
          key={active}
          src={imgList[active]}
          alt="Product"
          className="object-cover w-full h-full transition-opacity duration-300 animate-fade-up"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://placehold.co/600x600/f3f4f6/a1a1aa.png?text=Board+Game";
          }}
        />
        {/* Wishlist button */}
        <button
          onClick={() => setWishlist((v) => !v)}
          className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 bg-white rounded-full shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Wishlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist ? "#ef4444" : "none"}>
            <path
              d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              stroke={wishlist ? "#ef4444" : "#9ca3af"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2.5 overflow-x-auto pb-1">
        {imgList.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`shrink-0 w-[72px] h-[72px] rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              active === i
                ? "border-blue-500 shadow-md shadow-blue-100 scale-105"
                : "border-gray-100 hover:border-blue-200"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/80x80/f3f4f6/a1a1aa.png?text=Img";
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
