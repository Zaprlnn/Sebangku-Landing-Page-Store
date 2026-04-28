import Link from "next/link";
import type { Metadata } from "next";
import { getMyOrders } from "@/lib/queries/orders";
import { formatRupiah, formatDate, getOrderStatusInfo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pesanan Saya — Sebangku Store",
  description: "Pantau status dan riwayat semua pesananmu.",
};

/** Step tracker per status */
const STATUS_STEPS = [
  { key: "pending_payment", label: "Menunggu Bayar" },
  { key: "paid",            label: "Dibayar"        },
  { key: "processing",      label: "Dikemas"        },
  { key: "shipped",         label: "Dikirim"        },
  { key: "completed",       label: "Selesai"        },
];

function getStepIndex(status: string): number {
  if (status === "cancelled") return -1;
  const idx = STATUS_STEPS.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : 0;
}

export default async function OrdersPage() {
  const orders = await getMyOrders();

  return (
    <div className="db-page">
      <div className="db-page-heading">
        <h1 className="db-page-title">Histori Pesanan</h1>
        <p className="db-page-sub">{orders.length} pesanan ditemukan</p>
      </div>

      {orders.length === 0 ? (
        <div className="db-card db-empty db-empty--lg">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.2">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h2 className="db-empty-title">Belum ada pesanan</h2>
          <p className="db-empty-desc">Yuk mulai belanja board game edukatif favorit kamu!</p>
          <Link
            href="/products"
            className="auth-submit-btn btn-ripple"
            style={{ display: "inline-flex", width: "auto", padding: "0 24px", textDecoration: "none" }}
          >
            Lihat Produk
          </Link>
        </div>
      ) : (
        <div className="db-orders-stack">
          {orders.map((order) => {
            const statusCfg  = getOrderStatusInfo(order.status);
            const stepIdx    = getStepIndex(order.status);
            const itemCount  = order.order_items?.length ?? 0;
            const cancelled  = order.status === "cancelled";

            return (
              <div key={order.id} className="db-order-card">
                {/* ── Header ──────────────────────────────────── */}
                <div className="db-order-card-header">
                  <div>
                    <span className="db-order-card-num">#{order.order_number}</span>
                    <span className="db-order-card-date">{formatDate(order.created_at)}</span>
                  </div>
                  <span
                    className="db-badge"
                    style={{ color: statusCfg.color, background: statusCfg.bg }}
                  >
                    {statusCfg.label}
                  </span>
                </div>

                {/* ── Progress tracker ────────────────────────── */}
                {!cancelled && (
                  <div style={{ padding: "12px 16px 0" }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0,
                      position: "relative",
                    }}>
                      {STATUS_STEPS.map((step, idx) => {
                        const done    = idx < stepIdx;
                        const current = idx === stepIdx;
                        const isLast  = idx === STATUS_STEPS.length - 1;
                        return (
                          <div
                            key={step.key}
                            style={{ flex: isLast ? "0 0 auto" : 1, display: "flex", alignItems: "center" }}
                          >
                            {/* Dot */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                              <div style={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                background: done ? "#2563eb" : current ? "#eff6ff" : "#f1f5f9",
                                border: current ? "2px solid #2563eb" : done ? "none" : "2px solid #e2e8f0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                fontSize: 10,
                                color: done ? "#fff" : current ? "#2563eb" : "#94a3b8",
                                fontWeight: 700,
                              }}>
                                {done ? "✓" : idx + 1}
                              </div>
                              <span style={{
                                fontSize: 10,
                                fontWeight: current ? 700 : 500,
                                color: current ? "#2563eb" : done ? "#374151" : "#94a3b8",
                                whiteSpace: "nowrap",
                              }}>
                                {step.label}
                              </span>
                            </div>
                            {/* Connector line */}
                            {!isLast && (
                              <div style={{
                                flex: 1,
                                height: 2,
                                background: done ? "#2563eb" : "#e2e8f0",
                                margin: "0 4px",
                                marginBottom: 16,
                                transition: "background 0.3s",
                              }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── Items preview ────────────────────────────── */}
                {order.order_items && order.order_items.length > 0 && (
                  <div className="db-order-items-preview">
                    {order.order_items.slice(0, 3).map((item) => (
                      <div key={item.id} className="db-order-item-row">
                        <div className="db-order-item-dot" />
                        <span className="db-order-item-name">{item.product_name}</span>
                        <span className="db-order-item-qty">×{item.quantity}</span>
                        <span className="db-order-item-price">{formatRupiah(item.subtotal)}</span>
                      </div>
                    ))}
                    {itemCount > 3 && (
                      <div className="db-order-more">+{itemCount - 3} item lainnya</div>
                    )}
                  </div>
                )}

                {/* ── Footer ──────────────────────────────────── */}
                <div className="db-order-card-footer">
                  {order.shipping_name && (
                    <div className="db-order-meta-row">
                      <span className="db-order-meta-label">Pemesan</span>
                      <span className="db-order-meta-val">{order.shipping_name}</span>
                    </div>
                  )}
                  {order.shipping_city && (
                    <div className="db-order-meta-row">
                      <span className="db-order-meta-label">Kota</span>
                      <span className="db-order-meta-val">{order.shipping_city}</span>
                    </div>
                  )}
                  <div className="db-order-total-row">
                    <span>Total</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="db-order-total-val">{formatRupiah(order.total)}</span>
                      <Link
                        href={`/checkout/success?order=${order.order_number}`}
                        style={{
                          background: "#2563eb",
                          color: "#fff",
                          borderRadius: 8,
                          padding: "4px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Detail
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
