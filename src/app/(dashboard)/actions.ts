"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export type ProfileState = { error?: string; success?: string } | null;

export async function updateProfileAction(
  _prev: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const full_name = (formData.get("full_name") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();

  if (!full_name || full_name.length < 2) {
    return { error: "Nama lengkap minimal 2 karakter." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi tidak valid. Silakan login ulang." };

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name,
      phone: phone || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) return { error: "Gagal menyimpan. Coba lagi nanti." };

  revalidatePath("/dashboard");
  return { success: "Profil berhasil diperbarui!" };
}
