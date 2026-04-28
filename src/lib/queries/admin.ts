import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/types/database";

export type Profile = Tables<"profiles">;
export type Order = Tables<"orders">;
export type Product = Tables<"products">;

export async function getAdminSummary() {
  const supabase = await createClient();

  const [{ count: totalUsers }, { count: totalOrders }, { count: totalProducts }] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
  ]);

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const { data: recentOrders } = await supabase
    .from("orders")
    .select("total")
    .gte("created_at", since.toISOString());

  const revenue30d = (recentOrders ?? []).reduce((acc, order) => acc + (order.total ?? 0), 0);

  return {
    totalUsers: totalUsers ?? 0,
    totalOrders: totalOrders ?? 0,
    totalProducts: totalProducts ?? 0,
    revenue30d,
  };
}

export async function getAdminUsers(limit = 12): Promise<Profile[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}

export async function getAdminOrders(limit = 10): Promise<Order[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("orders")
    .select("id, order_number, total, status, created_at, user_id")
    .order("created_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}

export async function getAdminProducts(limit = 8): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("id, name, price, stock, is_active")
    .order("created_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}
