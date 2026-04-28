import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Masuk — Sebangku Store",
  description: "Login ke akun Sebangku Store kamu untuk mulai berbelanja board game edukatif.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; next?: string }>;
}) {
  const { reason } = await searchParams;
  return (
    <div className="auth-card animate-fade-up">
      {/* Logo */}
      <div className="auth-logo">
        <Link href="/" className="auth-logo-link">
          <div className="auth-logo-icon">🎲</div>
          <span className="auth-logo-text">Sebangku<span>Store</span></span>
        </Link>
      </div>

      {/* Heading */}
      <div className="auth-heading">
        <h1 className="auth-title">Selamat datang kembali!</h1>
        <p className="auth-subtitle">Masuk ke akun kamu dan lanjutkan berbelanja.</p>
      </div>

      <LoginForm reason={reason} />
    </div>
  );
}
