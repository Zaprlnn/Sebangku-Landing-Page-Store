"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CartItemCard } from "@/components/cart/CartItemCard";
import { CartSummary } from "@/components/cart/CartSummary";
import { VoucherInput } from "@/components/cart/VoucherInput";
import { useCart } from "@/hooks/use-cart";

export default function CartPage() {
  const { items, setItemQuantity, removeItem, total, clearCart } = useCart();
  const [voucherRate, setVoucherRate] = useState(0);

  const discountAmount = useMemo(() => Math.round(total * voucherRate), [total, voucherRate]);
  const shipping = items.length > 0 ? 18000 : 0;
  const finalTotal = total - discountAmount + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-gray-900 md:py-10">
      <div className="container">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">Keranjang Belanja</h1>
            <p className="mt-1 text-sm text-gray-500">{items.length} produk tersimpan di keranjang</p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
            >
              Kosongkan Keranjang
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
            <p className="text-lg font-semibold text-gray-800">Keranjang kamu masih kosong</p>
            <p className="mt-2 text-sm text-gray-500">Yuk mulai pilih board game dan buku edukatif favorit anak.</p>
            <Link
              href="/products"
              className="mt-5 inline-flex items-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Lihat Katalog
            </Link>
          </section>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemCard
                  key={item.productId}
                  item={item}
                  onIncrease={() => setItemQuantity(item.productId, item.quantity + 1)}
                  onDecrease={() => setItemQuantity(item.productId, item.quantity - 1)}
                  onRemove={() => removeItem(item.productId)}
                />
              ))}

              <VoucherInput onApply={setVoucherRate} />
            </div>

            <div className="h-fit xl:sticky xl:top-24">
              <CartSummary
                subtotal={total}
                discount={discountAmount}
                shipping={shipping}
                total={finalTotal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
