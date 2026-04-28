"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";

interface Props {
  productId: string;
  name?: string;
  imageUrl?: string;
  price: number;
  originalPrice?: number | null;
}

export function AddToCart({ productId, name, imageUrl, price }: Props) {
  const router = useRouter();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [cartAnim, setCartAnim] = useState(false);

  const handleAdd = () => {
    addItem({
      productId,
      quantity: qty,
      price,
      name: name ?? productId.replace(/-/g, " "),
      imageUrl: imageUrl ?? "/images/products/placeholder.webp",
    });
    setCartAnim(true);
    setTimeout(() => setCartAnim(false), 800);
  };

  const handleBuyNow = () => {
    handleAdd();
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Stock badge */}
      <div className="flex items-center gap-1.5 text-[13px] text-emerald-600 font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
        Stok tersedia
      </div>

      {/* Quantity Stepper */}
      <div className="flex items-center gap-3">
        <span className="text-[13px] text-gray-500 font-medium">Jumlah:</span>
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-90 transition-all"
            aria-label="Kurangi"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
          <span className="w-10 text-center text-[14px] font-semibold text-gray-800 select-none">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-90 transition-all"
            aria-label="Tambah"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-3 mt-1">
        <button
          onClick={handleAdd}
          className={`btn-ripple flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl active:scale-[0.97] transition-all duration-200 shadow-sm ${
            cartAnim
              ? "bg-emerald-500 text-white shadow-emerald-200"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200"
          }`}
        >
          {cartAnim ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Ditambahkan!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Tambah ke Keranjang
            </>
          )}
        </button>

        <button
          onClick={handleBuyNow}
          className="btn-ripple flex-1 py-3 text-sm font-semibold rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:scale-[0.97] transition-all duration-200"
        >
          Beli Sekarang
        </button>
      </div>

      {/* Secondary links */}
      <div className="flex gap-4 mt-1">
        <button className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-blue-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Unduh Aturan
        </button>
        <button className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-blue-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
          </svg>
          Tutorial Video
        </button>
      </div>
    </div>
  );
}
