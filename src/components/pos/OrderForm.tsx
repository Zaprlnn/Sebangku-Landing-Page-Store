"use client";

import { useMemo, useState } from "react";
import { MotionButton } from "@/components/motion/MotionButton";
import { MotionInput } from "@/components/ui/MotionInput";
import { RealtimeHighlight } from "@/components/motion/RealtimeHighlight";
import type { Inventory } from "@/lib/pos/schema";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface OrderFormProps {
  items: Inventory[];
}

export function OrderForm({ items }: OrderFormProps) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [listRef] = useAutoAnimate();

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? items[0],
    [items, selectedId]
  );

  const total = useMemo(() => {
    if (!selectedItem) return 0;
    return selectedItem.price * quantity;
  }, [selectedItem, quantity]);

  const submit = () => {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 900);
  };

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Transaksi</p>
        <h2 className="text-xl font-bold text-gray-900">Buat Order Kasir</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2" ref={listRef}>
        <div>
          <label className="mb-2 block text-xs font-semibold text-gray-500">Pilih Item</label>
          <select
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500"
          >
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} - Rp {item.price.toLocaleString("id-ID")}
              </option>
            ))}
          </select>
        </div>

        <MotionInput
          label="Jumlah"
          type="number"
          min={1}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
        />

        <MotionInput label="Nomor HP Pelanggan" placeholder="08xxxxxxxxxx" />

        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
          <p className="text-xs font-semibold text-blue-600">Total Tagihan</p>
          <RealtimeHighlight className="mt-2 block text-2xl font-bold text-blue-700" value={`Rp ${total.toLocaleString("id-ID")}`} />
          <p className="mt-2 text-xs text-blue-700/70">XP akan otomatis ditambahkan setelah transaksi berhasil.</p>
        </div>
      </div>

      <MotionButton
        loading={loading}
        onClick={submit}
        className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white"
      >
        Simpan Transaksi
      </MotionButton>
    </section>
  );
}
