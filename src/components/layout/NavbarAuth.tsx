"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

const NAV_LINKS = [
  { href: "/",         label: "Beranda",   icon: "🏠" },
  { href: "/products", label: "Katalog",   icon: "🎲" },
  { href: "/blog",     label: "Blog",      icon: "📖" },
  { href: "/login",    label: "Masuk",     icon: "🔑" },
  { href: "/register", label: "Daftar",    icon: "✨" },
];

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.2 } },
  exit:   { opacity: 0, transition: { duration: 0.18 } },
};

const drawerVariants: Variants = {
  hidden: { x: "-100%" },
  show:   { x: 0, transition: { type: "spring" as const, stiffness: 340, damping: 34 } },
  exit:   { x: "-100%", transition: { duration: 0.22, ease: "easeIn" as const } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show:   (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.06 + i * 0.05, duration: 0.28, ease: "easeOut" as const },
  }),
  exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
};

export function NavbarAuth() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/95 backdrop-blur">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-[72px] gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Sebangku Store">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 shadow-sm shadow-blue-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 10h16M4 14h10M4 18h7" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-base md:text-lg font-extrabold text-gray-900 leading-none">
                Sebangku<span className="text-blue-600">Store</span>
              </span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Desktop: Beranda link */}
              <Link
                href="/"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 active:scale-95"
              >
                Beranda
              </Link>

              {/* Hamburger — mobile only */}
              <button
                id="navbar-auth-hamburger"
                aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={menuOpen}
                className="flex sm:hidden items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 transition-all duration-200 active:scale-95"
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="auth-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.aside
              key="auth-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu navigasi"
              variants={drawerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-2xl sm:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <span className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                    🎲
                  </span>
                  <span className="text-base font-extrabold text-gray-900">
                    Sebangku<span className="text-blue-600">Store</span>
                  </span>
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Tutup menu"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
                {NAV_LINKS.map(({ href, label, icon }, i) => (
                  <motion.div
                    key={href}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-base leading-none">{icon}</span>
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer CTA */}
              <motion.div
                custom={NAV_LINKS.length}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="border-t border-gray-100 p-4 space-y-2"
              >
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Masuk ke Akun
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Daftar Gratis
                </Link>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
