import { createClient } from "@/lib/supabase/server";
import type { Tables, TablesInsert } from "@/lib/types/database";

export type Order = Tables<"orders">;
export type OrderItem = Tables<"order_items">;

export type OrderWithItems = Order & {
  order_items: OrderItem[];
};

export async function getMyOrders(): Promise<OrderWithItems[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthenticated");

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (*)
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as OrderWithItems[];
}

export async function getOrderByNumber(
  orderNumber: string
): Promise<OrderWithItems | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthenticated");

  const { data, error } = await supabase
    .from("orders")
    .select(`*, order_items (*)`)
    .eq("order_number", orderNumber)
    .eq("user_id", user.id)
    .single();

  if (error) return null;
  return data as OrderWithItems;
}

export async function createOrder(
  orderData: TablesInsert<"orders">
): Promise<Order> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .insert(orderData)
    .select()
    .single();
  if (error) throw error;
  return data;
}
