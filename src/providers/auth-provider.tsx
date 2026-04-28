"use client";

/**
 * AuthProvider — sumber kebenaran tunggal untuk sesi Supabase di sisi klien.
 *
 * Mengapa ini diperlukan?
 * - Login dilakukan via fetch() ke Route Handler yang men-set cookie sb-*-auth-token
 *   secara langsung di HTTP response, BUKAN melalui createBrowserClient.
 * - Akibatnya, `onAuthStateChange` pada hook use-user.ts tidak pernah terpicu
 *   karena tidak ada kode JS yang "memberitahu" browser client bahwa sesi baru ada.
 *
 * Solusi:
 * 1. Buat SATU instance createBrowserClient (singleton) yang dibagikan via Context.
 * 2. Provider ini memanggil supabase.auth.getSession() sekali saat mount.
 * 3. `onAuthStateChange` pada instance yang SAMA akan bereaksi terhadap perubahan
 *    yang dipicu oleh router.refresh() setelah login berhasil.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/types/database";

// ── Tipe context ──────────────────────────────────────────────────────────────

interface AuthContextValue {
  /** Supabase browser client — gunakan untuk operasi client-side */
  supabase: SupabaseClient<Database>;
  /** Sesi aktif, null jika belum login */
  session: Session | null;
  /** User aktif, null jika belum login */
  user: User | null;
  /**
   * true selama cek sesi awal belum selesai.
   * Gunakan ini untuk mencegah hydration mismatch & flicker "Masuk".
   */
  loading: boolean;
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  /**
   * Simpan client dalam ref agar tidak re-created pada setiap render.
   * Ini penting: satu instance = satu event bus untuk onAuthStateChange.
   */
  const supabaseRef = useRef<SupabaseClient<Database>>(
    createClient() as SupabaseClient<Database>
  );
  const supabase = supabaseRef.current;

  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  /**
   * `loading` dimulai sebagai `true` untuk mencegah hydration mismatch:
   * server selalu render tanpa sesi → klien harus menunggu getSession()
   * sebelum merender konten yang bergantung pada auth.
   */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Baca sesi yang tersimpan di cookie/localStorage saat pertama mount.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Dengarkan setiap perubahan sesi secara real-time.
    //    Ini TERPICU ketika:
    //    - router.refresh() dijalankan setelah login via Route Handler
    //    - Token di-refresh otomatis
    //    - Logout via supabase.auth.signOut()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ supabase, session, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook konsumen ─────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth() harus digunakan di dalam <AuthProvider>.");
  }
  return ctx;
}
