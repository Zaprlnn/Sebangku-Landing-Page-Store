"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useAuth } from "@/providers/auth-provider";
import type { Profile } from "@/lib/queries/profile";
import type { UserPoints, PointsLedger } from "@/lib/queries/points";
import type { OrderWithItems } from "@/lib/queries/orders";
import {
  formatDate,
  formatDateTime,
  formatRupiah,
  getInitials,
  getOrderStatusInfo,
  getPointsSourceLabel,
} from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Props {
  user: { id: string; email: string | null; created_at: string };
  profile: Profile | null;
  points: UserPoints | null;
  pointsHistory: PointsLedger[];
  orders: OrderWithItems[];
}

// ─── Animation variants ──────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};

const modalVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
  exit: { opacity: 0, scale: 0.95, y: 8, transition: { duration: 0.18 } },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getLevelFromPoints(totalEarned: number) {
  if (totalEarned < 500)  return { level: 1, name: "Pemula",    next: 500,  color: "#6b7280" };
  if (totalEarned < 1500) return { level: 2, name: "Penggemar", next: 1500, color: "#2563eb" };
  if (totalEarned < 3000) return { level: 3, name: "Ahli",      next: 3000, color: "#7c3aed" };
  if (totalEarned < 6000) return { level: 4, name: "Master",    next: 6000, color: "#d97706" };
  return                         { level: 5, name: "Legenda",   next: 6000, color: "#dc2626" };
}

function roleLabel(role: string) {
  const map: Record<string, string> = {
    customer: "Customer", admin: "Admin", cashier: "Kasir",
  };
  return map[role.toLowerCase()] ?? role;
}

function roleBadgeStyle(role: string) {
  const map: Record<string, string> = {
    customer: "bg-blue-50 text-blue-600 border-blue-100",
    admin:    "bg-red-50 text-red-600 border-red-100",
    cashier:  "bg-emerald-50 text-emerald-600 border-emerald-100",
  };
  return map[role.toLowerCase()] ?? "bg-gray-50 text-gray-600 border-gray-100";
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-gray-100 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="px-6 pt-5 pb-4 border-b border-gray-50">
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ─── Transaction Detail Modal ─────────────────────────────────────────────────

function TransactionModal({
  order,
  onClose,
}: {
  order: OrderWithItems;
  onClose: () => void;
}) {
  const statusInfo = getOrderStatusInfo(order.status);
  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          variants={modalVariant}
          initial="hidden"
          animate="show"
          exit="exit"
          className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-400">Order #{order.order_number}</p>
              <p className="text-sm font-semibold text-gray-900">{formatDate(order.created_at)}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                style={{ color: statusInfo.color, background: statusInfo.bg }}
              >
                {statusInfo.label}
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                aria-label="Tutup"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Items */}
          <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
            {order.order_items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="#2563eb" strokeWidth="1.8"/>
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="#2563eb" strokeWidth="1.8"/>
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="#2563eb" strokeWidth="1.8"/>
                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="#2563eb" strokeWidth="1.8"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.product_name}</p>
                  <p className="text-xs text-gray-400">{item.quantity} × {formatRupiah(item.unit_price)}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900 shrink-0">{formatRupiah(item.subtotal)}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 space-y-2">
            {order.payment_method && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Metode Bayar</span>
                <span className="font-medium text-gray-700 capitalize">{order.payment_method}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-gray-500">
              <span>Ongkos Kirim</span>
              <span className="font-medium text-gray-700">{formatRupiah(order.shipping_cost)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-xs text-gray-500">
                <span>Diskon</span>
                <span className="font-medium text-emerald-600">- {formatRupiah(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100">
              <span>Total</span>
              <span>{formatRupiah(order.total)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function ProfileClient({ user, profile, points, pointsHistory, orders }: Props) {
  const router = useRouter();
  const { supabase } = useAuth();
  const [activeTab, setActiveTab] = useState<"poin" | "transaksi">("transaksi");
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null);
  const [isLoggingOut, startLogout] = useTransition();

  const displayName = profile?.full_name ?? user.email?.split("@")[0] ?? "Pengguna";
  const initials = getInitials(displayName);
  const role = profile?.role ?? "customer";
  const levelInfo = getLevelFromPoints(points?.total_earned ?? 0);
  const levelPct = Math.min(100, ((points?.total_earned ?? 0) / levelInfo.next) * 100);

  async function handleLogout() {
    startLogout(async () => {
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    });
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

          {/* ── Page Title ────────────────────────────────────────────── */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
            <h1 className="text-2xl font-extrabold text-gray-900">Profil Saya</h1>
            <p className="text-sm text-gray-400 mt-1">Kelola akun dan pantau aktivitas loyalitas kamu.</p>
          </motion.div>

          {/* ── Row 1: Identity + Gamification ───────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

            {/* Identity Card */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show" className="lg:col-span-2">
              <SectionCard className="h-full">
                <div className="p-6 flex flex-col h-full">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-extrabold text-white shrink-0"
                      style={{ background: `linear-gradient(135deg, ${levelInfo.color}cc, ${levelInfo.color})` }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {initials}
                    </motion.div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 truncate">{displayName}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email ?? "-"}</p>
                      <span className={`inline-flex mt-1.5 items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${roleBadgeStyle(role)}`}>
                        {roleLabel(role)}
                      </span>
                    </div>
                  </div>

                  {/* Info grid */}
                  <div className="mt-5 grid grid-cols-2 gap-3 flex-1">
                    {[
                      { label: "No. HP", value: profile?.phone ?? "-" },
                      { label: "Bergabung", value: profile?.created_at ? formatDate(profile.created_at) : formatDate(user.created_at) },
                      { label: "Poin Aktif", value: (points?.balance ?? 0).toLocaleString("id-ID") },
                      { label: "Total Dihabiskan", value: (points?.total_spent ?? 0).toLocaleString("id-ID") },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-xl bg-gray-50 border border-gray-100 p-3">
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">{label}</p>
                        <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Account controls */}
                  <div className="mt-5 flex gap-2">
                    <button
                      className="flex-1 px-3 py-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors"
                      onClick={() => router.push("/profile/edit")}
                    >
                      Edit Profil
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex-1 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-60"
                    >
                      {isLoggingOut ? "Keluar..." : "Keluar"}
                    </motion.button>
                  </div>
                </div>
              </SectionCard>
            </motion.div>

            {/* Gamification Dashboard */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="lg:col-span-3">
              <SectionCard className="h-full">
                <SectionHeader title="Dasbor Loyalitas" subtitle="Kumpulkan XP untuk naik level" />
                <div className="p-6 space-y-5">
                  {/* Level badge */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 border-2"
                      style={{ borderColor: levelInfo.color, background: `${levelInfo.color}15` }}
                      animate={{ boxShadow: [`0 0 0px ${levelInfo.color}40`, `0 0 12px ${levelInfo.color}40`, `0 0 0px ${levelInfo.color}40`] }}
                      transition={{ repeat: Infinity, duration: 2.5 }}
                    >
                      <span className="text-[10px] font-bold" style={{ color: levelInfo.color }}>LVL</span>
                      <span className="text-2xl font-extrabold leading-none" style={{ color: levelInfo.color }}>{levelInfo.level}</span>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold text-gray-900">{levelInfo.name}</p>
                        <p className="text-xs text-gray-400">{(points?.total_earned ?? 0).toLocaleString()} / {levelInfo.next.toLocaleString()} XP</p>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${levelInfo.color}99, ${levelInfo.color})` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${levelPct}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: "🔥", label: "Streak", value: `${points?.streak ?? 0} hari`, pulse: (points?.streak ?? 0) > 0 },
                      { icon: "⭐", label: "Total XP", value: (points?.total_earned ?? 0).toLocaleString("id-ID"), pulse: false },
                      { icon: "🏅", label: "Level", value: `${levelInfo.level} — ${levelInfo.name}`, pulse: false },
                    ].map(({ icon, label, value, pulse }) => (
                      <div key={label} className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
                        <motion.span
                          className="text-2xl block mb-1"
                          animate={pulse ? { scale: [1, 1.15, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          {icon}
                        </motion.span>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                        <p className="text-xs font-bold text-gray-800 mt-0.5 truncate">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Streak encouragement */}
                  {(points?.streak ?? 0) > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 border border-orange-100"
                    >
                      <span className="text-xl">🔥</span>
                      <div>
                        <p className="text-xs font-semibold text-orange-700">
                          Streak {points?.streak} hari! Pertahankan terus.
                        </p>
                        <p className="text-[11px] text-orange-400">Login setiap hari untuk menjaga streak kamu.</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </SectionCard>
            </motion.div>
          </div>

          {/* ── Row 2: Tabs (Poin History + Transaksi) ────────────────── */}
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show">
            <SectionCard>
              {/* Tab bar */}
              <div className="flex border-b border-gray-100">
                {(["transaksi", "poin"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-6 py-4 text-sm font-semibold transition-colors ${
                      activeTab === tab ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab === "transaksi" ? "Riwayat Transaksi" : "Riwayat XP"}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* ── Transaksi Tab ────────────────────────────────── */}
                {activeTab === "transaksi" && (
                  <motion.div
                    key="transaksi"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.22 }}
                  >
                    {orders.length === 0 ? (
                      <div className="py-16 text-center">
                        <span className="text-4xl block mb-3">🛒</span>
                        <p className="text-sm text-gray-400">Belum ada transaksi.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-50">
                        {orders.map((order, i) => {
                          const st = getOrderStatusInfo(order.status);
                          return (
                            <motion.button
                              key={order.id}
                              custom={i}
                              variants={fadeUp}
                              initial="hidden"
                              animate="show"
                              whileHover={{ backgroundColor: "#f8fafc" }}
                              onClick={() => setSelectedOrder(order)}
                              className="w-full text-left px-6 py-4 transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                  style={{ background: st.bg }}>
                                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke={st.color} strokeWidth="1.8" strokeLinecap="round"/>
                                    <rect x="9" y="3" width="6" height="4" rx="1" stroke={st.color} strokeWidth="1.8"/>
                                    <path d="M9 12h6M9 16h4" stroke={st.color} strokeWidth="1.8" strokeLinecap="round"/>
                                  </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-gray-900">#{order.order_number}</p>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                      style={{ color: st.color, background: st.bg }}>
                                      {st.label}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    {formatDate(order.created_at)} · {order.order_items.length} item
                                    {order.payment_method && ` · ${order.payment_method}`}
                                  </p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-sm font-bold text-gray-900">{formatRupiah(order.total)}</p>
                                  <p className="text-[10px] text-gray-400 mt-0.5">Lihat detail →</p>
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ── Poin History Tab ─────────────────────────────── */}
                {activeTab === "poin" && (
                  <motion.div
                    key="poin"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.22 }}
                  >
                    {pointsHistory.length === 0 ? (
                      <div className="py-16 text-center">
                        <span className="text-4xl block mb-3">⭐</span>
                        <p className="text-sm text-gray-400">Belum ada riwayat poin.</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-50">
                        {pointsHistory.map((log, i) => {
                          const isPositive = log.points_delta >= 0;
                          return (
                            <motion.div
                              key={log.id}
                              custom={i}
                              variants={fadeUp}
                              initial="hidden"
                              animate="show"
                              className="flex items-center gap-4 px-6 py-4"
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${
                                isPositive ? "bg-emerald-50" : "bg-red-50"
                              }`}>
                                {isPositive ? "⭐" : "💸"}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                  {log.note ?? getPointsSourceLabel(log.source)}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {getPointsSourceLabel(log.source)} · {formatDateTime(log.created_at)}
                                </p>
                              </div>
                              <motion.span
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`text-sm font-extrabold shrink-0 ${
                                  isPositive ? "text-emerald-600" : "text-red-500"
                                }`}
                              >
                                {isPositive ? "+" : ""}{log.points_delta.toLocaleString("id-ID")} XP
                              </motion.span>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </SectionCard>
          </motion.div>

        </div>
      </div>

      {/* ── Transaction Detail Modal ─────────────────────────────────── */}
      <AnimatePresence>
        {selectedOrder && (
          <TransactionModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
