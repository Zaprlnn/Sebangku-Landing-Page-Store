import type { Metadata } from "next";
import { RegisterForm } from "./RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Daftar Akun — Sebangku Store",
  description: "Buat akun Sebangku Store gratis dan dapatkan akses ke ribuan board game edukatif.",
};

export default function RegisterPage() {
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
        <h1 className="auth-title">Buat akun baru</h1>
        <p className="auth-subtitle">Gratis! Bergabung dan mulai petualangan belajar bersama.</p>
      </div>

      <RegisterForm />
    </div>
  );
}
