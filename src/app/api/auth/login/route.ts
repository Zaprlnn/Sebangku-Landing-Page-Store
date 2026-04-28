import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/config";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi." }, { status: 400 });
    }

    const { url, anonKey } = getSupabaseEnv();
    const cookiesToSet: Array<{ name: string; value: string; options: Record<string, unknown> }> = [];

    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookies) {
          cookiesToSet.push(...cookies);
        },
      },
    });

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const message = error.message.toLowerCase().includes("invalid login")
        ? "Email atau password salah. Silakan coba lagi."
        : error.message.toLowerCase().includes("email not confirmed")
          ? "Akun belum diverifikasi. Cek email kamu untuk link konfirmasi."
          : error.message;
      return NextResponse.json({ error: message }, { status: 401 });
    }

    if (data.user?.id) {
      try {
        await supabase.rpc("update_daily_streak", { p_user_id: data.user.id });
      } catch {}
    }

    // Sertakan token sesi agar client bisa memanggil supabase.auth.setSession()
    // dan memperbarui in-memory auth state secara langsung (tanpa mengandalkan cookie).
    const response = NextResponse.json({
      message: "Login berhasil.",
      user: { id: data.user?.id ?? null, email: data.user?.email ?? null },
      session: {
        access_token: data.session?.access_token ?? null,
        refresh_token: data.session?.refresh_token ?? null,
      },
    });

    cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Login gagal. Coba lagi." }, { status: 500 });
  }
}
