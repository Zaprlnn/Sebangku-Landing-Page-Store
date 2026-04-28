import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMyProfile } from "@/lib/queries/profile";
import { getAdminOrders, getAdminProducts, getAdminSummary, getAdminUsers } from "@/lib/queries/admin";
import { formatDate, formatRupiah } from "@/lib/utils";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/admin");

  const profile = await getMyProfile();
  if (profile?.role !== "ADMIN") redirect("/dashboard");

  const [summary, users, orders, products] = await Promise.all([
    getAdminSummary(),
    getAdminUsers(),
    getAdminOrders(),
    getAdminProducts(),
  ]);

  return (
    <div className="db-page">
      <div className="db-greeting">
        <div>
          <h1 className="db-page-title">Admin Console</h1>
          <p className="db-page-sub">Kontrol akses dan ringkasan operasional.</p>
        </div>
      </div>

      <div className="db-stats-grid">
        <div className="db-stat-card db-stat-card--blue">
          <div className="db-stat-icon">👥</div>
          <div>
            <div className="db-stat-value">{summary.totalUsers}</div>
            <div className="db-stat-label">Total User</div>
          </div>
        </div>
        <div className="db-stat-card db-stat-card--purple">
          <div className="db-stat-icon">🧾</div>
          <div>
            <div className="db-stat-value">{summary.totalOrders}</div>
            <div className="db-stat-label">Total Order</div>
          </div>
        </div>
        <div className="db-stat-card db-stat-card--amber">
          <div className="db-stat-icon">📦</div>
          <div>
            <div className="db-stat-value">{summary.totalProducts}</div>
            <div className="db-stat-label">Produk Aktif</div>
          </div>
        </div>
        <div className="db-stat-card db-stat-card--green">
          <div className="db-stat-icon">💰</div>
          <div>
            <div className="db-stat-value">{formatRupiah(summary.revenue30d)}</div>
            <div className="db-stat-label">Omzet 30 Hari</div>
          </div>
        </div>
      </div>

      <div className="db-two-col">
        <div className="db-card">
          <div className="db-card-header">
            <span className="db-card-title">User Terbaru</span>
          </div>
          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/60 px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{u.full_name ?? "-"}</p>
                  <p className="text-xs text-gray-500">{u.phone ?? "-"}</p>
                </div>
                <div className="text-xs font-semibold text-gray-500">{u.role}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="db-card">
          <div className="db-card-header">
            <span className="db-card-title">Order Terbaru</span>
          </div>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/60 px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">#{order.order_number}</p>
                  <p className="text-xs text-gray-500">{formatDate(order.created_at)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatRupiah(order.total)}</p>
                  <p className="text-xs text-gray-500">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="db-card">
        <div className="db-card-header">
          <span className="db-card-title">Produk Terbaru</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
              <p className="text-sm font-semibold text-gray-900">{product.name}</p>
              <p className="text-xs text-gray-500">Stok: {product.stock}</p>
              <p className="text-xs text-gray-500">{formatRupiah(product.price)}</p>
              <span className="mt-2 inline-flex rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-gray-600">
                {product.is_active ? "Aktif" : "Draft"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
