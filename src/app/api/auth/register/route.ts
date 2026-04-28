import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const { fullName, phoneNumber, email, password } = await request.json();

    if (!fullName || !phoneNumber || !email || !password) {
      return NextResponse.json({ error: "Semua field wajib diisi." }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data: existingPhone, error: phoneError } = await admin
      .from("profiles")
      .select("id")
      .eq("phone", phoneNumber.trim())
      .maybeSingle();

    if (phoneError) {
      return NextResponse.json({ error: "Gagal memeriksa nomor HP." }, { status: 500 });
    }

    if (existingPhone?.id) {
      return NextResponse.json({ error: "Nomor HP sudah terdaftar." }, { status: 409 });
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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName.trim(), phone_number: phoneNumber.trim() },
      },
    });

    if (error) {
      const message = error.message.toLowerCase().includes("already registered")
        ? "Email sudah terdaftar. Silakan login."
        : error.message;
      return NextResponse.json({ error: message }, { status: 409 });
    }

    if (!data.user) {
      return NextResponse.json({ error: "Registrasi gagal. Coba lagi." }, { status: 500 });
    }

    const { error: insertError } = await admin.from("profiles").insert({
      id: data.user.id,
      full_name: fullName.trim(),
      phone: phoneNumber.trim(),
      role: "customer",
    });

    if (insertError) {
      return NextResponse.json({ error: "Gagal menyimpan profil pengguna." }, { status: 500 });
    }

    const response = NextResponse.json({
      message: "Akun berhasil dibuat! Cek email kamu untuk link verifikasi sebelum login.",
    });

    cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
    return response;
  } catch (error) {
    return NextResponse.json({ error: "Registrasi gagal. Coba lagi." }, { status: 500 });
  }
}
