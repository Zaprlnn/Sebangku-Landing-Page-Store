"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/lib/queries/profile";
import { getInitials } from "@/lib/utils";
import { logoutAction } from "@/app/(dashboard)/actions";

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Beranda",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/orders",
    label: "Pesanan",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/rewards",
    label: "Rewards",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    href: "/dashboard/badges",
    label: "Lencana",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
];

interface DashboardSidebarProps {
  user: User;
  profile: Profile | null;
  pointsBalance: number;
}

export function DashboardSidebar({ user, profile, pointsBalance }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const displayName = profile?.full_name ?? user.email?.split("@")[0] ?? "User";
  const initials = getInitials(displayName);

  const SidebarContent = () => (
    <div className="db-sidebar-inner">
      {/* Profile */}
      <div className="db-sidebar-profile">
        <div className="db-avatar">{initials}</div>
        <div className="db-sidebar-profile-info">
          <span className="db-sidebar-name">{displayName}</span>
          <span className="db-sidebar-email">{user.email}</span>
        </div>
      </div>

      {/* Points chip */}
      <div className="db-points-chip">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        <span>{pointsBalance.toLocaleString("id-ID")} poin</span>
      </div>

      {/* Nav */}
      <nav className="db-sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`db-nav-item${isActive ? " db-nav-item--active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="db-sidebar-footer">
        <form action={logoutAction}>
          <button type="submit" className="db-logout-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Keluar
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="db-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile topbar */}
      <div className="db-mobile-topbar">
        <button
          className="db-mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Buka menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <span className="db-mobile-title">Dashboard</span>
        <div className="db-avatar db-avatar--sm">{initials}</div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="db-drawer-overlay"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="db-drawer">
            <button
              className="db-drawer-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Tutup menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
