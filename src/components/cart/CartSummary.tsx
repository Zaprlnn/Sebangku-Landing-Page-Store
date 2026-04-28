import Link from "next/link";

export function CartSummary({
  subtotal,
  discount,
  shipping,
  total,
}: {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}) {
  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-gray-900">Ringkasan Belanja</h3>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal</span>
          <span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex items-center justify-between text-gray-600">
          <span>Diskon Voucher</span>
          <span>- Rp {discount.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex items-center justify-between text-gray-600">
          <span>Ongkir</span>
          <span>Rp {shipping.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <div className="my-4 border-t border-dashed border-gray-200" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800">Total</span>
        <span className="text-xl font-extrabold text-blue-600">
          Rp {Math.max(total, 0).toLocaleString("id-ID")}
        </span>
      </div>

      <Link
        href="/checkout"
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Checkout
      </Link>
    </aside>
  );
}
