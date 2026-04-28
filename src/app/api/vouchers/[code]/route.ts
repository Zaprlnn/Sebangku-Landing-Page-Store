import { NextRequest, NextResponse } from "next/server";

// GET /api/vouchers/[code]
// Validates a voucher code during checkout
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  try {
    // TODO: Query Supabase for voucher validity, expiry, and discount value
    return NextResponse.json({
      valid: false,
      message: "Voucher tidak ditemukan",
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
