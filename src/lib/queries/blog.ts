import { createClient } from "@/lib/supabase/server";

export async function getBlogPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getBlogBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();
  if (error) throw error;
  return data;
}
