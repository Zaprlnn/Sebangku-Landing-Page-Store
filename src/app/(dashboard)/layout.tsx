import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMyProfile } from "@/lib/queries/profile";
import { getMyPoints } from "@/lib/queries/points";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/dashboard");

  const [profile, points] = await Promise.all([
    getMyProfile(),
    getMyPoints(),
  ]);

  // Guard: jika data profil dihapus dari DB tapi session masih aktif,
  // paksa sign out agar cookie terhapus lalu redirect ke login.
  if (!profile) {
    await supabase.auth.signOut();
    redirect("/login?reason=account_not_found");
  }

  return (
    <div className="db-layout">
      <DashboardSidebar
        user={user}
        profile={profile}
        pointsBalance={points?.balance ?? 0}
      />
      <main className="db-main">{children}</main>
    </div>
  );
}
