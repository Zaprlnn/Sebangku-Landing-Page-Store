import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMyProfile } from "@/lib/queries/profile";
import { getMyPoints, getPointsHistory } from "@/lib/queries/points";
import { getMyOrders } from "@/lib/queries/orders";
import { ProfileClient } from "./ProfileClient";

export const metadata = {
  title: "Profil Saya — Sebangku Store",
  description: "Kelola akun, lihat poin, dan riwayat transaksi Anda.",
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/profile");

  const [profile, points, pointsHistory, orders] = await Promise.all([
    getMyProfile(),
    getMyPoints(),
    getPointsHistory(),
    getMyOrders(),
  ]);

  // Guard: jika data profil dihapus dari DB tapi session masih aktif,
  // paksa sign out agar cookie terhapus lalu redirect ke login.
  if (!profile) {
    await supabase.auth.signOut();
    redirect("/login?reason=account_not_found");
  }

  return (
    <ProfileClient
      user={{
        id: user.id,
        email: user.email ?? null,
        created_at: user.created_at,
      }}
      profile={profile}
      points={points}
      pointsHistory={pointsHistory}
      orders={orders}
    />
  );
}
