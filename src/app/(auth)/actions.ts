"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type AuthState = {
  error?: string;
  success?: string;
} | null;

// ─── Login ───────────────────────────────────────────────
export async function loginAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    const message = error.message.toLowerCase().includes("invalid login")
      ? "Email atau password salah. Silakan coba lagi."
      : error.message.toLowerCase().includes("email not confirmed")
        ? "Akun belum diverifikasi. Cek email kamu untuk link konfirmasi."
        : error.message;
    return { error: message };
  }

  if (data.user?.id) {
    try {
      await supabase.rpc("update_daily_streak", { p_user_id: data.user.id });
    } catch {}
  }

  redirect("/");
}

// ─── Register ────────────────────────────────────────────
export async function registerAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = formData.get("name") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!name || !phoneNumber || !email || !password || !confirmPassword) {
    return { error: "Semua field wajib diisi." };
  }

  if (name.trim().length < 2) {
    return { error: "Nama minimal 2 karakter." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Format email tidak valid." };
  }

  const phoneRegex = /^[0-9+\-\s]{8,15}$/;
  if (!phoneRegex.test(phoneNumber.trim())) {
    return { error: "Nomor HP tidak valid." };
  }

  if (password.length < 8) {
    return { error: "Password minimal 8 karakter." };
  }

  if (password !== confirmPassword) {
    return { error: "Konfirmasi password tidak cocok." };
  }

  const admin = createAdminClient();
  const { data: existingPhone, error: phoneError } = await admin
    .from("profiles")
    .select("id")
    .eq("phone", phoneNumber.trim())
    .maybeSingle();

  if (phoneError) {
    return { error: "Gagal memeriksa nomor HP." };
  }

  if (existingPhone?.id) {
    return { error: "Nomor HP sudah terdaftar." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name.trim(), phone: phoneNumber.trim() },
    },
  });

  if (error) {
    console.error("SIGNUP ERROR:", error);
    return { error: error.message };
  }

  if (!data.user) {
    return { error: "Registrasi gagal. Coba lagi." };
  }

  // === INSERT MANUAL (trigger sudah off) ===
  const { error: insertError } = await admin.from("profiles").insert({
    id: data.user.id,
    full_name: name.trim(),
    phone: phoneNumber.trim(),
    role: "customer",
  });

  if (insertError) {
    console.error("INSERT PROFILE ERROR:", insertError);
    // Jangan gagalkan register, user sudah terdaftar
  }

  return {
    success: "Akun berhasil dibuat! Cek email untuk verifikasi.",
  };
}