"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const SHIPPING_FEE: Record<string, number> = {
  "JNE REG": 18000,
  "J&T": 22000,
  SiCepat: 16000,
};

export interface PlaceOrderInput {
  address: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  courier: string;
  payment: string;
  items: Array<{
    productSlug: string;
    quantity: number;
  }>;
}

export interface PlaceOrderResult {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  subtotal?: number;
  total?: number;
  error?: string;
}

export interface ConfirmPaymentResult {
  success: boolean;
  orderId?: string;
  pointsEarned?: number;
  pointsBalance?: number;
  error?: string;
}

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
  const supabase = await createClient();

  // 1. Verifikasi auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Anda harus login untuk melakukan pemesanan." };
  }

  if (input.items.length === 0) {
    return { success: false, error: "Keranjang kosong." };
  }

  if (input.items.some((item) => item.quantity <= 0)) {
    return { success: false, error: "Jumlah item tidak valid." };
  }

  const shippingFee = SHIPPING_FEE[input.courier];
  if (shippingFee === undefined) {
    return { success: false, error: "Kurir tidak valid." };
  }

  const address = {
    name: input.address.fullName.trim(),
    phone: input.address.phone.trim(),
    address: input.address.address.trim(),
    city: input.address.city.trim(),
    postalCode: input.address.postalCode.trim(),
  };

  if (!address.name || !address.phone || !address.address || !address.city || !address.postalCode) {
    return { success: false, error: "Alamat pengiriman belum lengkap." };
  }

  const { data: orderResult, error: orderError } = await supabase.rpc(
    "create_order_with_items",
    {
      p_items: input.items.map((item) => ({
        product_slug: item.productSlug,
        quantity: item.quantity,
      })),
      p_shipping_name: address.name,
      p_shipping_phone: address.phone,
      p_shipping_address: address.address,
      p_shipping_city: address.city,
      p_shipping_postal_code: address.postalCode,
      p_courier: input.courier,
      p_shipping_cost: shippingFee,
      p_payment_method: input.payment,
    }
  );

  const order = orderResult?.[0];

  if (orderError || !order) {
    console.error("[placeOrder] order error:", orderError);
    return { success: false, error: "Gagal membuat pesanan. Coba lagi." };
  }

  // Invalidate cache
  revalidatePath("/dashboard/orders");
  revalidatePath("/profile");
  revalidatePath("/dashboard");

  return {
    success: true,
    orderId: order.order_id,
    orderNumber: order.order_number,
    subtotal: Number(order.subtotal),
    total: Number(order.total),
  };
}

export async function confirmOrderPaid(orderNumber: string): Promise<ConfirmPaymentResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Anda harus login untuk melanjutkan." };
  }

  const { data: confirmResult, error } = await supabase.rpc("finalize_payment", {
    p_order_number: orderNumber,
  });

  const confirmed = confirmResult?.[0];

  if (error || !confirmed) {
    console.error("[confirmOrderPaid] error:", error);
    return { success: false, error: "Gagal mengonfirmasi pembayaran." };
  }

  revalidatePath("/dashboard/orders");
  revalidatePath("/profile");
  revalidatePath("/dashboard");

  return {
    success: true,
    orderId: confirmed.order_id,
    pointsEarned: confirmed.points_earned ?? 0,
    pointsBalance: confirmed.points_balance ?? 0,
  };
}
