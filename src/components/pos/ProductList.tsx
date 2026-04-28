"use client";

import { useMemo } from "react";
import { StaggerItem, StaggerList } from "@/components/motion/StaggerList";
import { MotionButton } from "@/components/motion/MotionButton";
import type { Inventory } from "@/lib/pos/schema";

interface ProductListProps {
  items: Inventory[];
}

export function ProductList({ items }: ProductListProps) {
  const mapped = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        isLowStock: (item.stock ?? 0) <= 5,
      })),
    [items]
  );

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Inventory</p>
          <h2 className="text-xl font-bold text-gray-900">Produk Tersedia</h2>
        </div>
        <MotionButton className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Tambah Produk</MotionButton>
      </div>

      <StaggerList className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mapped.map((item) => (
          <StaggerItem
            key={item.id}
            className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{item.category ?? "Uncategorized"}</p>
              </div>
              <span className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-600">
                {item.type === "ONLINE_SALES" ? "Online" : "Cafe"}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Harga</p>
                <p className="text-base font-bold text-gray-900">Rp {item.price.toLocaleString("id-ID")}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Stok</p>
                <p className={item.isLowStock ? "text-sm font-semibold text-rose-500" : "text-sm font-semibold text-gray-700"}>
                  {item.stock ?? 0}
                </p>
              </div>
            </div>

            <MotionButton
              className="mt-4 w-full rounded-xl border border-blue-200 bg-white py-2 text-sm font-semibold text-blue-600"
            >
              Lihat Detail
            </MotionButton>
          </StaggerItem>
        ))}
      </StaggerList>
    </section>
  );
}
