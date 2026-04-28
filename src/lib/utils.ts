/** Format rupiah: 75000 → "Rp 75.000" */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format date string to Indonesian locale */
export function formatDate(dateStr: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...opts,
  });
}

/** Format datetime */
export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Order status → label + color class */
export function getOrderStatusInfo(status: string): {
  label: string;
  color: string;
  bg: string;
} {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    pending_payment: { label: "Menunggu Bayar", color: "#d97706", bg: "#fef3c7" },
    paid:            { label: "Dibayar",        color: "#2563eb", bg: "#dbeafe" },
    processing:      { label: "Diproses",       color: "#7c3aed", bg: "#ede9fe" },
    shipped:         { label: "Dikirim",        color: "#0891b2", bg: "#cffafe" },
    completed:       { label: "Selesai",        color: "#16a34a", bg: "#dcfce7" },
    cancelled:       { label: "Dibatalkan",     color: "#dc2626", bg: "#fee2e2" },
  };
  return map[status] ?? { label: status, color: "#6b7280", bg: "#f3f4f6" };
}

/** Payment status → label */
export function getPaymentStatusLabel(status: string): string {
  const map: Record<string, string> = {
    unpaid:   "Belum Dibayar",
    paid:     "Lunas",
    failed:   "Gagal",
    refunded: "Dikembalikan",
  };
  return map[status] ?? status;
}

/** Points source → label */
export function getPointsSourceLabel(source: string): string {
  const map: Record<string, string> = {
    purchase:  "Pembelian",
    referral:  "Referral",
    bonus:     "Bonus",
    review:    "Ulasan",
    redeem:    "Penukaran",
    manual:    "Manual",
    expired:   "Kadaluarsa",
  };
  return map[source] ?? source;
}

/** Initials from name: "Budi Santoso" → "BS" */
export function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
