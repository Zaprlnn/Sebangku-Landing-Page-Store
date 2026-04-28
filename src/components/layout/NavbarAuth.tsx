"use client";

import Link from "next/link";

export function NavbarAuth() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/95 backdrop-blur">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-[72px] gap-4">
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

          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 active:scale-95"
          >
            Beranda
          </Link>
        </div>
      </div>
    </header>
  );
}
