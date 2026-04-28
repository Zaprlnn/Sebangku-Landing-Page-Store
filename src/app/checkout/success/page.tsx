import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

interface Props {
  searchParams: Promise<{ order?: string; points?: string }>;
}

const STATUS_STEPS = [
  { key: "pending_payment", label: "Menunggu Pembayaran", icon: "💳", desc: "Menunggu konfirmasi pembayaran" },
  { key: "paid",            label: "Pembayaran Diterima", icon: "✅", desc: "Pembayaran terverifikasi" },
  { key: "processing",      label: "Sedang Dikemas",      icon: "📦", desc: "Barang sedang dikemas dengan teliti" },
  { key: "shipped",         label: "Dikirim",             icon: "🚚", desc: "Paket dalam perjalanan ke lokasimu" },
  { key: "completed",       label: "Tiba",                icon: "🏠", desc: "Paket telah sampai di tujuan" },
];

function getStepIndex(status: string): number {
  const idx = STATUS_STEPS.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : 0;
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { order: orderNumber, points: pointsStr } = await searchParams;
  const pointsEarned = parseInt(pointsStr ?? "0", 10) || 0;

  /* Fetch order from DB */
  type OrderWithItems = {
    order_number: string;
    status: string;
    total: number;
    subtotal: number;
    shipping_cost: number;
    shipping_city: string;
    shipping_name: string;
    shipping_phone: string | null;
    created_at: string;
    order_items: Array<{
      id: string;
      product_name: string;
      quantity: number;
      unit_price: number;
      subtotal: number;
    }>;
  };

  let order: OrderWithItems | null = null;

  if (orderNumber) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("order_number", orderNumber)
      .single();
    order = data as OrderWithItems;
  }

  const currentStepIndex = order ? getStepIndex(order.status) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container max-w-2xl">
        {/* ── Header card ───────────────────────────────────────── */}
        <section className="rounded-3xl border border-emerald-100 bg-white p-6 text-center shadow-sm sm:p-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
            🎉
          </div>
          <h1 className="text-xl font-extrabold text-gray-900 sm:text-3xl">
            Pembayaran Berhasil!
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Terima kasih sudah berbelanja di{" "}
            <span className="font-semibold text-gray-700">Sebangku Store</span>.
          </p>

          {orderNumber && (
            <p className="mt-1 text-xs text-gray-400">
              Nomor pesanan:{" "}
              <span className="font-mono font-bold text-gray-700">
                {orderNumber}
              </span>
            </p>
          )}

          {/* Points earned badge */}
          {pointsEarned > 0 && (
            <div className="mx-auto mt-5 max-w-xs rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-bold text-amber-800">
                ⭐ Kamu mendapat{" "}
                <span className="text-lg">{pointsEarned}</span> Poin!
              </p>
              <p className="mt-1 text-xs text-amber-700">
                Poin otomatis ditambahkan ke akunmu dan bisa ditukar hadiah.
              </p>
            </div>
          )}

          {/* CTA buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard/orders"
              className="inline-flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 sm:w-auto"
            >
              Lihat Pesanan
            </Link>
            <Link
              href="/dashboard/rewards"
              className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
            >
              Tukar Poin
            </Link>
          </div>
        </section>

        {/* ── Order progress tracker ─────────────────────────────── */}
        {order && (
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-sm font-bold text-gray-900">
              Status Pengiriman
            </h2>

            <div className="relative">
              {/* Progress line */}
              <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-100" />
              <div
                className="absolute left-5 top-0 w-0.5 bg-blue-500 transition-all duration-700"
                style={{
                  height: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%`,
                }}
              />

              <ol className="space-y-6">
                {STATUS_STEPS.map((step, idx) => {
                  const isDone    = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  return (
                    <li key={step.key} className="flex items-start gap-4 pl-1">
                      {/* Dot */}
                      <div
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base transition-colors ${
                          isDone
                            ? "bg-blue-600 text-white"
                            : isCurrent
                            ? "bg-blue-50 ring-2 ring-blue-500 ring-offset-2"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {step.icon}
                      </div>
                      {/* Text */}
                      <div className="min-w-0 pt-1.5">
                        <p
                          className={`text-sm font-semibold ${
                            isCurrent
                              ? "text-blue-600"
                              : isDone
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                          {isCurrent && (
                            <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                              Sekarang
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-400">{step.desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>
        )}

        {/* ── Order detail ──────────────────────────────────────── */}
        {order && (
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-sm font-bold text-gray-900">
              Rincian Pesanan
            </h2>

            {/* Items */}
            <ul className="divide-y divide-gray-100">
              {order.order_items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {item.product_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.quantity}× Rp {item.unit_price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-gray-800">
                    Rp {item.subtotal.toLocaleString("id-ID")}
                  </span>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <div className="mt-3 space-y-1.5 border-t border-dashed border-gray-200 pt-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp {order.subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos kirim</span>
                <span>Rp {order.shipping_cost.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total</span>
                <span className="text-blue-600">
                  Rp {order.total.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Shipping info */}
            <div className="mt-4 rounded-xl bg-gray-50 p-3 text-xs text-gray-600">
              <p className="font-semibold text-gray-800">{order.shipping_name}</p>
              <p>{order.shipping_city}</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
