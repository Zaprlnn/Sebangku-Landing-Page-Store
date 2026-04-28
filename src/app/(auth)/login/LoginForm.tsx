"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

export function LoginForm({ reason }: { reason?: string }) {
  const router = useRouter();
  const { supabase } = useAuth();                  // ← ambil browser client dari AuthProvider
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (!response.ok) {
          setError(result?.error ?? "Login gagal. Coba lagi.");
          return;
        }

        /**
         * ─── KUNCI REAKTIVITAS ────────────────────────────────────────────
         * setSession() memberitahu instance browser client yang SAMA yang
         * digunakan AuthProvider. Ini secara langsung memperbarui in-memory
         * state Supabase dan SEGERA memicu onAuthStateChange di AuthProvider,
         * yang menyebabkan `user` di context berubah → Navbar re-render.
         *
         * Ini diperlukan karena createBrowserClient menyimpan sesi di
         * localStorage, bukan membaca cookie HTTP secara langsung.
         * ─────────────────────────────────────────────────────────────────
         */
        const { access_token, refresh_token } = result.session ?? {};
        if (access_token && refresh_token) {
          await supabase.auth.setSession({ access_token, refresh_token });
        }

        // Navigasi ke halaman utama (atau halaman sebelumnya).
        router.push("/");
      } catch {
        setError("Terjadi kesalahan jaringan. Coba lagi.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      {/* Banner: akun dihapus / tidak ditemukan */}
      {reason === "account_not_found" && (
        <div className="auth-alert auth-alert--warning" role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span>Akun tidak ditemukan. Kamu telah otomatis keluar.</span>
        </div>
      )}

      {/* Alert Error */}
      {error && (
        <div className="auth-alert auth-alert--error" role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Email */}
      <div className="auth-field">
        <label htmlFor="email" className="auth-label">Alamat Email</label>
        <div className="auth-input-wrap">
          <span className="auth-input-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </span>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="contoh@email.com"
            className="auth-input"
            required
            disabled={isPending}
          />
        </div>
      </div>

      {/* Password */}
      <div className="auth-field">
        <div className="auth-label-row">
          <label htmlFor="password" className="auth-label">Password</label>
          <Link href="/forgot-password" className="auth-link-small">Lupa password?</Link>
        </div>
        <div className="auth-input-wrap">
          <span className="auth-input-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            className="auth-input auth-input--password"
            required
            disabled={isPending}
          />
          <button
            type="button"
            className="auth-eye-btn"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
          >
            <EyeIcon open={showPassword} />
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="auth-submit-btn btn-ripple"
      >
        {isPending ? <span className="auth-spinner" /> : "Masuk"}
      </button>

      {/* Divider */}
      <div className="auth-divider">
        <span>atau</span>
      </div>

      {/* Register Link */}
      <p className="auth-switch">
        Belum punya akun?{" "}
        <Link href="/register" className="auth-link">
          Daftar sekarang
        </Link>
      </p>
    </form>
  );
}
