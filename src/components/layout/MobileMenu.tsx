"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect } from "react";

const NAV_LINKS = [
  { href: "/",         label: "Beranda",  icon: "🏠" },
  { href: "/products", label: "Katalog",  icon: "🎲" },
  { href: "/blog",     label: "Blog",     icon: "📖" },
  { href: "/cart",     label: "Keranjang",icon: "🛒" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  user?: { email?: string | null; user_metadata?: Record<string, unknown> } | null;
  points?: number | null;
  pointsLoading?: boolean;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.2 } },
  exit:   { opacity: 0, transition: { duration: 0.18 } },
};

const drawerVariants: Variants = {
  hidden: { x: "-100%" },
  show:   { x: 0,      transition: { type: "spring" as const, stiffness: 340, damping: 34 } },
  exit:   { x: "-100%",transition: { duration: 0.22, ease: "easeIn" as const } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show:   (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.06, duration: 0.3, ease: "easeOut" as const },
  }),
  exit:   { opacity: 0, x: -20, transition: { duration: 0.15, ease: "easeIn" as const } },
};

export function MobileMenu({ open, onClose, user, points, pointsLoading }: MobileMenuProps) {
  const pathname = usePathname();

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on route change
  useEffect(() => { onClose(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ?? "Pengguna";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            variants={drawerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-2xl md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm shadow-gray-200">
                  <Image
                    src="/images/logo.jpeg"
                    alt="Sebangku Store"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                </span>
                <span className="text-base font-extrabold text-gray-900">
                  Sebangku<span className="text-blue-600">Store</span>
                </span>
              </span>
              <button
                onClick={onClose}
                aria-label="Tutup menu"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* User info (if logged in) */}
            {user && (
              <motion.div
                custom={0}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="mx-4 mt-4 rounded-xl bg-blue-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">{displayName}</p>
                    <p className="truncate text-xs text-gray-500">{user.email ?? "-"}</p>
                  </div>
                </div>
                {(points !== null && points !== undefined || pointsLoading) && (
                  <div className="mt-2 flex items-center gap-1 rounded-lg bg-amber-50 border border-amber-100 px-2.5 py-1.5 text-xs font-semibold text-amber-700">
                    ⭐ {pointsLoading ? "Memuat poin..." : `${points!.toLocaleString("id-ID")} Poin`}
                  </div>
                )}
              </motion.div>
            )}

            {/* Nav links */}
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
              {NAV_LINKS.map(({ href, label, icon }, i) => (
                <motion.div key={href} custom={i + 1} variants={itemVariants} initial="hidden" animate="show" exit="exit">
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(href)
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-base leading-none">{icon}</span>
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer CTA */}
            <motion.div
              custom={NAV_LINKS.length + 1}
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="border-t border-gray-100 p-4"
            >
              <Link
                href={user ? "/profile" : "/login"}
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                {user ? "Lihat Profil" : "Masuk"}
              </Link>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
