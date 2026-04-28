"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { NavbarAuth } from "@/components/layout/NavbarAuth";

const AUTH_PATHS = ["/login", "/register"];

export function SiteHeader() {
  const pathname = usePathname();
  const isAuthRoute = AUTH_PATHS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  return isAuthRoute ? <NavbarAuth /> : <Navbar />;
}