import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/types/database";

export type UserPoints = Tables<"user_points">;
export type PointsLedger = Tables<"points_ledger">;
export type Reward = Tables<"rewards">;
export type RewardRedemption = Tables<"reward_redemptions">;

export async function getMyPoints(): Promise<UserPoints | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthenticated");

  const { data, error } = await supabase
    .from("user_points")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) return null;
  return data;
}

export async function getPointsHistory(): Promise<PointsLedger[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthenticated");

  const { data, error } = await supabase
    .from("points_ledger")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw error;
  return data ?? [];
}

export async function getActiveRewards(): Promise<Reward[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rewards")
    .select("*")
    .eq("is_active", true)
    .order("points_cost", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
