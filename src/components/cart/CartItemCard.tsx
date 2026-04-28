"use client";

import type { CartItem } from "@/hooks/use-cart";

interface Props {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItemCard({ item, onIncrease, onDecrease, onRemove }: Props) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-24 w-24 rounded-xl border border-gray-100 object-cover"
          onError={(event) => {
            (event.currentTarget as HTMLImageElement).src =
              "https://placehold.co/240x240/f3f4f6/a1a1aa.png?text=Produk";
          }}
        />

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-base font-bold text-gray-900">{item.name}</h3>
          <p className="mt-1 text-sm font-semibold text-blue-600">
            Rp {item.price.toLocaleString("id-ID")}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center overflow-hidden rounded-full border border-gray-300">
              <button
                onClick={onDecrease}
                className="h-9 w-9 text-lg font-bold text-gray-700 transition-colors hover:bg-gray-100"
                aria-label={`Kurangi jumlah ${item.name}`}
              >
                -
              </button>
              <span className="min-w-10 text-center text-sm font-semibold">{item.quantity}</span>
              <button
                onClick={onIncrease}
                className="h-9 w-9 text-lg font-bold text-gray-700 transition-colors hover:bg-gray-100"
                aria-label={`Tambah jumlah ${item.name}`}
              >
                +
              </button>
            </div>

            <button
              onClick={onRemove}
              className="text-sm font-medium text-rose-600 transition-colors hover:text-rose-700"
            >
              Hapus
            </button>
          </div>
        </div>

        <div className="text-right sm:min-w-28">
          <p className="text-xs text-gray-500">Subtotal</p>
          <p className="text-base font-bold text-gray-900">
            Rp {(item.price * item.quantity).toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </article>
  );
}
