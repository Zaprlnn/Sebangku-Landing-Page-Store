import { createClient } from "@/lib/supabase/server";

export async function getAllProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, slug, name, price, compare_at_price, badge, image_url, min_age, max_age, subject, is_active");
  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, slug, name, short_description, description, price, compare_at_price, stock, min_age, max_age, subject, duration_minutes, players_min, players_max, badge, image_url, metadata, is_active")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}
