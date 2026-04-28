interface SupabaseEnv {
  url: string;
  anonKey: string;
}

interface SupabaseServiceEnv {
  url: string;
  serviceRoleKey: string;
}

function isPlaceholder(value: string) {
  return value.includes("your_supabase_");
}

export function getSupabaseEnv(): SupabaseEnv {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase environment variable belum lengkap. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local"
    );
  }

  if (isPlaceholder(url) || isPlaceholder(anonKey)) {
    throw new Error(
      "Nilai Supabase di .env.local masih placeholder. Ganti dengan URL project dan anon key asli dari dashboard Supabase."
    );
  }

  return { url, anonKey };
}

export function getSupabaseServiceEnv(): SupabaseServiceEnv {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase service role env belum lengkap. Isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env.local"
    );
  }

  if (isPlaceholder(url) || isPlaceholder(serviceRoleKey)) {
    throw new Error(
      "Nilai Supabase service role di .env.local masih placeholder. Ganti dengan URL project dan service role key asli dari dashboard Supabase."
    );
  }

  return { url, serviceRoleKey };
}
