"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TABS = [
  {
    href: "/products",
    label: "Board Game",
    icon: (
      <path d="M4 6h16M4 10h16M4 14h10M4 18h7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    ),
    count: 9,
  },
  {
    href: "/products/books",
    label: "Buku Edukatif",
    icon: (
      <>
        <path d="M4 19V5a2 2 0 012-2h13.4a1 1 0 01.9 1.4L19 7l1.3 2.6a1 1 0 01-.9 1.4H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 19a2 2 0 002 2h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    count: 6,
  },
];

export function ProductTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeHref, setActiveHref] = useState(pathname);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    setActiveHref(pathname);
    setPendingHref(null);
  }, [pathname]);

  const handleNavigate = (href: string) => {
    if (href === pathname) return;
    setPendingHref(href);
    setTimeout(() => {
      router.push(href);
    }, 140);
  };

  return (
    <div className="flex bg-white rounded-full p-1 border border-gray-200 shadow-sm w-full md:w-auto">
      {TABS.map((tab) => {
        const isActive = activeHref === tab.href;
        const isPending = pendingHref === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            onClick={(event) => {
              event.preventDefault();
              handleNavigate(tab.href);
            }}
            className={`
              relative flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm
              transition-all duration-200 select-none overflow-hidden
              active:scale-95 active:translate-y-px
              ${isActive ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-gray-600 hover:text-blue-600"}
              ${isPending ? "scale-95 ring-4 ring-blue-100" : ""}
            `}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
              {tab.icon}
            </svg>
            <span>{tab.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>
              {tab.count}
            </span>
            <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 hover:opacity-100 bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
          </Link>
        );
      })}
    </div>
  );
}