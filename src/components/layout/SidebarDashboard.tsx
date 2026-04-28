"use client";
import Link from "next/link";

export function SidebarDashboard() {
  return (
    <aside>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/badges">Lencana</Link>
      <Link href="/dashboard/rewards">Tukar Poin</Link>
      <Link href="/dashboard/orders">Pesanan</Link>
    </aside>
  );
}
