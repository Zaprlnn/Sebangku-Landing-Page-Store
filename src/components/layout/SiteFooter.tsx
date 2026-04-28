"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

const HIDDEN_PREFIXES = ["/login", "/register", "/dashboard", "/orders"];

export function SiteFooter() {
  const pathname = usePathname();
  const hideFooter = HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (hideFooter) return null;

  return <Footer />;
}
