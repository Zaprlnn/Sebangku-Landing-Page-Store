"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { registerAction, type AuthState } from "../actions";

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

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const strength = checks.filter(Boolean).length;
  const labels = ["", "Lemah", "Cukup", "Baik", "Kuat"];
  const colors = ["", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];

  if (!password) return null;

  return (
    <div className="pwd-strength">
      <div className="pwd-strength-bars">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="pwd-strength-bar"
            style={{ background: i <= strength ? colors[strength] : "#e5e7eb" }}
          />
        ))}
      </div>
      <span className="pwd-strength-label" style={{ color: colors[strength] }}>
        {labels[strength]}
      </span>
    </div>
  );
}

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    registerAction,
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <form action={formAction} className="auth-form" noValidate>
      {/* Alert Error */}
      {state?.error && (
        <div className="auth-alert auth-alert--error" role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>{state.error}</span>
        </div>
      )}

      {/* Alert Success */}
      {state?.success && (
        <div className="auth-alert auth-alert--success" role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span>{state.success}</span>
        </div>
      )}

      {/* Name */}
      <div className="auth-field">
        <label htmlFor="name" className="auth-label">Nama Lengkap</label>
        <div className="auth-input-wrap">
          <span className="auth-input-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </span>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Nama kamu"
            className="auth-input"
            required
          />
        </div>
      </div>

      {/* Phone */}
      <div className="auth-field">
        <label htmlFor="phoneNumber" className="auth-label">No. HP</label>
        <div className="auth-input-wrap">
          <span className="auth-input-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
              <line x1="12" y1="18" x2="12.01" y2="18"/>
            </svg>
          </span>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            autoComplete="tel"
            placeholder="08xxxxxxxxxx"
            className="auth-input"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="auth-field">
        <label htmlFor="reg-email" className="auth-label">Alamat Email</label>
        <div className="auth-input-wrap">
          <span className="auth-input-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </span>
          <input
            id="reg-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="contoh@email.com"
            className="auth-input"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="auth-field">
        <label htmlFor="reg-password" className="auth-label">Password</label>
        <div className="auth-input-wrap">
          <span className="auth-input-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input
            id="reg-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Min. 8 karakter"
            className="auth-input auth-input--password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <PasswordStrength password={password} />
      </div>

      {/* Confirm Password */}
      <div className="auth-field">
        <label htmlFor="confirmPassword" className="auth-label">Konfirmasi Password</label>
        <div className="auth-input-wrap">
          <span className="auth-input-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Ulangi password"
            className="auth-input auth-input--password"
            required
          />
          <button
            type="button"
            className="auth-eye-btn"
            onClick={() => setShowConfirm((p) => !p)}
            aria-label={showConfirm ? "Sembunyikan" : "Tampilkan"}
          >
            <EyeIcon open={showConfirm} />
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending || !!state?.success}
        className="auth-submit-btn btn-ripple"
      >
        {isPending ? <span className="auth-spinner" /> : "Buat Akun"}
      </button>

      {/* Divider */}
      <div className="auth-divider">
        <span>atau</span>
      </div>

      {/* Login Link */}
      <p className="auth-switch">
        Sudah punya akun?{" "}
        <Link href="/login" className="auth-link">
          Masuk sekarang
        </Link>
      </p>
    </form>
  );
}
