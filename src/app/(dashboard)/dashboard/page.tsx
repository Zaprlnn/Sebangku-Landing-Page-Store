import { createClient } from "@/lib/supabase/server";
import { getMyProfile } from "@/lib/queries/profile";
import { getMyPoints, getPointsHistory } from "@/lib/queries/points";
import { getMyOrders } from "@/lib/queries/orders";
import {
  formatRupiah,
  formatDate,
  getOrderStatusInfo,
  getInitials,
} from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Sebangku Store",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [profile, points, orders, history] = await Promise.all([
    getMyProfile(),
    getMyPoints(),
    getMyOrders(),
    getPointsHistory(),
  ]);

  const displayName = profile?.full_name ?? user?.email?.split("@")[0] ?? "User";
  const recentOrders = orders.slice(0, 3);
  const recentPoints = history.slice(0, 5);

  // Level progress
  const level = points?.level ?? 1;
  const balance = points?.balance ?? 0;
  const totalEarned = points?.total_earned ?? 0;
  const nextLevelPoints = level * 500;
  const progress = Math.min((totalEarned % 500) / 5, 100);

  return (
    <div className="db-page">
      {/* Greeting */}
      <div className="db-greeting">
        <div>
          <h1 className="db-page-title">Halo, {displayName}! 👋</h1>
          <p className="db-page-sub">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="db-stats-grid">
        <div className="db-stat-card db-stat-card--blue">
          <div className="db-stat-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <div>
            <div className="db-stat-value">{balance.toLocaleString("id-ID")}</div>
            <div className="db-stat-label">Poin Aktif</div>
          </div>
        </div>

        <div className="db-stat-card db-stat-card--purple">
          <div className="db-stat-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <div>
            <div className="db-stat-value">{orders.length}</div>
            <div className="db-stat-label">Total Pesanan</div>
          </div>
        </div>

        <div className="db-stat-card db-stat-card--amber">
          <div className="db-stat-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <div>
            <div className="db-stat-value">{points?.streak ?? 0}🔥</div>
            <div className="db-stat-label">Streak Hari</div>
          </div>
        </div>

        <div className="db-stat-card db-stat-card--green">
          <div className="db-stat-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="6"/>
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
            </svg>
          </div>
          <div>
            <div className="db-stat-value">Lv. {level}</div>
            <div className="db-stat-label">Level</div>
          </div>
        </div>
      </div>

      {/* Level progress */}
      <div className="db-card">
        <div className="db-card-header">
          <span className="db-card-title">Progress Level {level}</span>
          <span className="db-card-sub">{totalEarned % 500} / {nextLevelPoints} XP ke Level {level + 1}</span>
        </div>
        <div className="db-progress-bar">
          <div className="db-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="db-progress-labels">
          <span>Lv. {level}</span>
          <span className="db-stat-value--sm">{totalEarned.toLocaleString("id-ID")} total XP</span>
          <span>Lv. {level + 1}</span>
        </div>
      </div>

      <div className="db-two-col">
        {/* Recent orders */}
        <div className="db-card">
          <div className="db-card-header">
            <span className="db-card-title">Pesanan Terbaru</span>
            <Link href="/dashboard/orders" className="db-card-link">Lihat semua →</Link>
          </div>
          {recentOrders.length === 0 ? (
            <div className="db-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
              </svg>
              <p>Belum ada pesanan</p>
              <Link href="/products" className="db-empty-link">Mulai belanja</Link>
            </div>
          ) : (
            <div className="db-order-list">
              {recentOrders.map((order) => {
                const status = getOrderStatusInfo(order.status);
                return (
                  <div key={order.id} className="db-order-row">
                    <div>
                      <div className="db-order-num">#{order.order_number}</div>
                      <div className="db-order-date">{formatDate(order.created_at)}</div>
                    </div>
                    <div className="db-order-right">
                      <div className="db-order-total">{formatRupiah(order.total)}</div>
                      <span
                        className="db-badge"
                        style={{ color: status.color, background: status.bg }}
                      >
                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Points history */}
        <div className="db-card">
          <div className="db-card-header">
            <span className="db-card-title">Riwayat Poin</span>
          </div>
          {recentPoints.length === 0 ? (
            <div className="db-empty">
              <p>Belum ada riwayat poin</p>
            </div>
          ) : (
            <div className="db-points-list">
              {recentPoints.map((entry) => (
                <div key={entry.id} className="db-points-row">
                  <div>
                    <div className="db-points-source">{entry.source}</div>
                    <div className="db-order-date">{formatDate(entry.created_at)}</div>
                    {entry.note && (
                      <div className="db-points-note">{entry.note}</div>
                    )}
                  </div>
                  <div
                    className={`db-points-delta ${
                      entry.points_delta > 0
                        ? "db-points-delta--pos"
                        : "db-points-delta--neg"
                    }`}
                  >
                    {entry.points_delta > 0 ? "+" : ""}
                    {entry.points_delta}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
