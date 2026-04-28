import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

// POST /api/webhook/midtrans
// Receives payment callback from Midtrans payment gateway
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      return NextResponse.json({ error: "MIDTRANS_SERVER_KEY belum diatur" }, { status: 500 });
    }

    const orderId = String(body?.order_id ?? "");
    const statusCode = String(body?.status_code ?? "");
    const grossAmount = String(body?.gross_amount ?? "");
    const signatureKey = String(body?.signature_key ?? "");
    const transactionStatus = String(body?.transaction_status ?? "");
    const fraudStatus = String(body?.fraud_status ?? "");

    const expected = createHash("sha512")
      .update(orderId + statusCode + grossAmount + serverKey)
      .digest("hex");

    if (!orderId || !signatureKey || expected !== signatureKey) {
      return NextResponse.json({ error: "Signature tidak valid" }, { status: 401 });
    }

    const admin = createAdminClient();

    const { data: order } = await admin
      .from("orders")
      .select("id, user_id, payment_status, total, order_number")
      .eq("order_number", orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: "Order tidak ditemukan" }, { status: 404 });
    }

    const isPaid =
      transactionStatus === "settlement" ||
      (transactionStatus === "capture" && fraudStatus !== "challenge");

    if (isPaid && order.payment_status !== "paid") {
      await admin
        .from("orders")
        .update({
          payment_status: "paid",
          status: "paid",
          paid_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      const pointsEarned = Math.floor(Number(order.total) / 10_000);
      if (pointsEarned > 0) {
        await admin.from("points_ledger").insert({
          user_id: order.user_id,
          source: "purchase",
          reference_id: order.id,
          points_delta: pointsEarned,
          note: `Pembelian #${order.order_number}`,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
