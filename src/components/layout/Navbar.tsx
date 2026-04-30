"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useUser } from "@/hooks/use-user";
import { MobileMenu } from "@/components/layout/MobileMenu";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/products", label: "Katalog" },
  { href: "/blog", label: "Blog" },
];

// ─── Skeleton pill shown while auth state is resolving ──────────────────────
function SkeletonPill({ width }: { width: string }) {
  return (
    <span
      className={`hidden sm:inline-block ${width} h-8 rounded-xl bg-gray-100 animate-pulse`}
      aria-hidden="true"
    />
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  /**
   * `mounted` prevents a hydration mismatch: on the server `user` is always
   * null, so we render a neutral skeleton until the client has hydrated and
   * the real auth state is known.
   */
  const [mounted, setMounted] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { user, loading, points, pointsLoading } = useUser();

  // Mark client as mounted after first render.
  useEffect(() => setMounted(true), []);

  // Close profile dropdown on outside click.
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  // Display helpers — only evaluated after mount.
  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ?? "Pengguna";
  const displayPhone =
    (user?.user_metadata?.phone_number as string | undefined) ?? "-";

  const pointLabel = (() => {
    if (!mounted || loading) return null; // render skeleton
    if (!user) return "Login dulu";
    if (pointsLoading) return "Memuat...";
    if (points === null) return "0 Poin";
    return `${points.toLocaleString("id-ID")} Poin`;
  })();

  // Whether the auth section should show a skeleton
  const showSkeleton = !mounted || loading;

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/95 shadow-sm backdrop-blur">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-[72px] gap-4">
          {/* ── Logo ───────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Sebangku Store"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 10h16M4 14h10M4 18h7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-lg font-800 text-gray-900 font-extrabold leading-none">
              Sebangku<span className="text-blue-600">Store</span>
            </span>
          </Link>

          {/* ── Desktop Nav ─────────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(href)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Right Actions ───────────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              aria-label="Cari produk"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Keranjang belanja"
              className="relative flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 active:scale-95"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" />
                <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" />
                <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" />
              </svg>
              {mounted && itemCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold leading-none">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* ── Points badge ───────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-amber-100 bg-amber-50 text-[12px] font-semibold text-amber-700 min-w-[120px]">
              <span aria-hidden="true">⭐</span>
              {pointLabel === null ? (
                <span className="inline-block w-20 h-3 rounded bg-amber-200 animate-pulse" aria-hidden="true" />
              ) : (
                <span>Poin: {pointLabel}</span>
              )}
            </div>

            {/* ── Auth CTA ────────────────────────────────────────────────── */}
            {showSkeleton ? (
              /* Skeleton while auth is resolving */
              <SkeletonPill width="w-20" />
            ) : user ? (
              <>
                {/* ── Mobile: Avatar icon (opens drawer) ──────────────────── */}
                <button
                  id="navbar-profile-avatar-mobile"
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex sm:hidden items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-blue-600 border border-blue-100 transition-all duration-200 active:scale-95"
                  aria-label="Buka menu profil"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                    <path d="M4 20c1.8-3.2 5-5 8-5s6.2 1.8 8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>

                {/* ── Desktop: Profile dropdown ──────────────────────────── */}
                <div className="relative hidden sm:flex" ref={profileRef}>
                  <button
                    id="navbar-profile-btn"
                    type="button"
                    onClick={() => setProfileOpen((open) => !open)}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-blue-200 hover:text-blue-600 transition-all duration-200"
                    aria-expanded={profileOpen}
                    aria-haspopup="menu"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                        <path d="M4 20c1.8-3.2 5-5 8-5s6.2 1.8 8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span>Profil</span>
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className={`transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>

                  {profileOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg"
                    >
                      <p className="text-xs font-semibold text-gray-400">Profil Saya</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">{displayName}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{user.email ?? "-"}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{displayPhone}</p>

                      {/* Points summary inside dropdown */}
                      <div className="mt-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-100">
                        <span aria-hidden="true" className="text-sm">⭐</span>
                        <span className="text-xs font-semibold text-amber-700">
                          {pointsLoading
                            ? "Memuat poin..."
                            : `${(points ?? 0).toLocaleString("id-ID")} Poin`}
                        </span>
                      </div>

                      <Link
                        href="/profile"
                        className="mt-3 flex w-full items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors duration-200"
                        onClick={() => setProfileOpen(false)}
                      >
                        Lihat Profil
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* ── Mobile: Masuk link kecil ─────────────────────────────── */}
                <Link
                  id="navbar-login-btn-mobile"
                  href="/login"
                  className="flex sm:hidden items-center justify-center px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 active:scale-95"
                >
                  Masuk
                </Link>

                {/* ── Desktop: Masuk button ────────────────────────────────── */}
                <Link
                  id="navbar-login-btn"
                  href="/login"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm active:scale-95"
                >
                  Masuk
                </Link>
              </>
            )}

            {/* ── Hamburger ──────────────────────────────────────────────── */}
            <button
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
              className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 transition-all duration-200 active:scale-95"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

      </div>
    </header>

    {/* ── Mobile Menu — rendered OUTSIDE <header> to avoid backdrop-blur stacking context */}
    <MobileMenu
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      user={user}
      points={points}
      pointsLoading={pointsLoading}
    />
    </>
  );
}
