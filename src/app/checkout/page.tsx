"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckoutForm, type CheckoutAddress } from "@/components/checkout/CheckoutForm";
import { PaymentOptions } from "@/components/checkout/PaymentOptions";
import { ShippingOptions } from "@/components/checkout/ShippingOptions";
import { useCart } from "@/hooks/use-cart";
import { persistUserPoints, useUser } from "@/hooks/use-user";
import { confirmOrderPaid, placeOrder } from "@/app/actions/order";

const EMPTY_ADDRESS: CheckoutAddress = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

const SHIPPING_FEE: Record<string, number> = {
  "JNE REG": 18000,
  "J&T": 22000,
  SiCepat: 16000,
};

function QrisCode() {
  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 120 120"
      aria-label="QRIS"
      role="img"
      className="block"
    >
      <rect width="120" height="120" fill="white" />
      <rect x="6" y="6" width="28" height="28" fill="black" />
      <rect x="10" y="10" width="20" height="20" fill="white" />
      <rect x="14" y="14" width="12" height="12" fill="black" />
      <rect x="86" y="6" width="28" height="28" fill="black" />
      <rect x="90" y="10" width="20" height="20" fill="white" />
      <rect x="94" y="14" width="12" height="12" fill="black" />
      <rect x="6" y="86" width="28" height="28" fill="black" />
      <rect x="10" y="90" width="20" height="20" fill="white" />
      <rect x="14" y="94" width="12" height="12" fill="black" />
      <rect x="48" y="8" width="8" height="8" fill="black" />
      <rect x="60" y="8" width="6" height="6" fill="black" />
      <rect x="70" y="14" width="8" height="8" fill="black" />
      <rect x="44" y="28" width="10" height="10" fill="black" />
      <rect x="60" y="28" width="6" height="6" fill="black" />
      <rect x="72" y="30" width="10" height="10" fill="black" />
      <rect x="40" y="44" width="8" height="8" fill="black" />
      <rect x="54" y="46" width="10" height="10" fill="black" />
      <rect x="70" y="44" width="8" height="8" fill="black" />
      <rect x="84" y="44" width="6" height="6" fill="black" />
      <rect x="36" y="62" width="10" height="10" fill="black" />
      <rect x="52" y="64" width="6" height="6" fill="black" />
      <rect x="64" y="62" width="10" height="10" fill="black" />
      <rect x="80" y="64" width="8" height="8" fill="black" />
      <rect x="44" y="78" width="8" height="8" fill="black" />
      <rect x="58" y="78" width="10" height="10" fill="black" />
      <rect x="74" y="78" width="6" height="6" fill="black" />
      <rect x="88" y="78" width="8" height="8" fill="black" />
    </svg>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading, refreshPoints } = useUser();
  const { items, total, clearCart } = useCart();

  const [address, setAddress] = useState<CheckoutAddress>(EMPTY_ADDRESS);
  const [courier, setCourier] = useState("JNE REG");
  const [payment, setPayment] = useState("QRIS");
  const [isPaying, setIsPaying] = useState(false);
  const [showQris, setShowQris] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingOrderNumber, setPendingOrderNumber] = useState<string | null>(null);
  const [pendingOrderTotal, setPendingOrderTotal] = useState<number | null>(null);

  const shippingFee = items.length > 0 ? SHIPPING_FEE[courier] : 0;
  const finalTotal = useMemo(() => total + shippingFee, [total, shippingFee]);
  const pointsPreview = Math.floor(finalTotal / 10_000);

  const requiredAddressValid =
    address.fullName.trim() &&
    address.phone.trim() &&
    address.address.trim() &&
    address.city.trim() &&
    address.postalCode.trim();

  const canPay = Boolean(requiredAddressValid) && items.length > 0 && !isPaying;

  const autofillFromProfile = () => {
    setAddress({
      fullName: (user?.user_metadata?.full_name as string) ?? "",
      phone: (user?.user_metadata?.phone_number as string) ?? "",
      address: "",
      city: "",
      postalCode: "",
    });
  };

  const showQrisPanel = async () => {
    if (!canPay || !user) return;
    if (pendingOrderNumber) {
      setShowQris(true);
      return;
    }
    if (showQris) return;
    setIsPaying(true);
    setError(null);

    try {
      const result = await placeOrder({
        address,
        courier,
        payment,
        items: items.map((item) => ({
          productSlug: item.productId,
          quantity: item.quantity,
        })),
      });

      if (!result.success || !result.orderNumber) {
        setError(result.error ?? "Terjadi kesalahan. Coba lagi.");
        setIsPaying(false);
        return;
      }

      setPendingOrderNumber(result.orderNumber);
      setPendingOrderTotal(result.total ?? finalTotal);
      setShowQris(true);
      setIsPaying(false);
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
      setIsPaying(false);
    }
  };

  const confirmPayment = async () => {
    if (!canPay || !user || !pendingOrderNumber) return;
    setIsPaying(true);
    setError(null);

    try {
      const result = await confirmOrderPaid(pendingOrderNumber);

      if (!result.success) {
        setError(result.error ?? "Terjadi kesalahan. Coba lagi.");
        setIsPaying(false);
        return;
      }

      clearCart();
      if (typeof result.pointsBalance === "number") {
        persistUserPoints(user.id, result.pointsBalance);
      } else {
        // Fallback ke refresh jika balance tidak tersedia
        await refreshPoints();
      }
      router.push(
        `/checkout/success?order=${pendingOrderNumber}&points=${result.pointsEarned ?? 0}`
      );
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
      setIsPaying(false);
    }
  };

  /* ─── Loading state ─────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="container py-12 text-sm text-gray-500">
        Memuat checkout...
      </div>
    );
  }

  /* ─── Guest gate ────────────────────────────────────────────────────────── */
  if (!user) {
    return (
      <div className="container py-12">
        <section className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Checkout membutuhkan login
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Silakan masuk dulu untuk melanjutkan pembayaran.
          </p>
          <Link
            href="/login?next=/checkout"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Masuk
          </Link>
        </section>
      </div>
    );
  }

  /* ─── Main checkout ─────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-10">
      <div className="container">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
            Checkout
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Lengkapi alamat, kurir, dan metode pembayaran.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr,360px]">
          {/* ── Left: form sections ─────────────────────────────────── */}
          <div className="space-y-6">
            <CheckoutForm
              value={address}
              onChange={setAddress}
              onAutofill={autofillFromProfile}
            />
            <ShippingOptions value={courier} onChange={setCourier} />
            <PaymentOptions value={payment} onChange={setPayment} />
          </div>

          {/* ── Right: order summary ─────────────────────────────────── */}
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-base font-bold text-gray-900">
              Ringkasan Pembayaran
            </h2>

            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Subtotal ({items.length} item)</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Kurir ({courier})</span>
                <span>Rp {shippingFee.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Pembayaran</span>
                <span>{payment}</span>
              </div>
            </div>

            <div className="my-4 border-t border-dashed border-gray-200" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-800">
                Total Bayar
              </span>
              <span className="text-xl font-extrabold text-blue-600">
                Rp {finalTotal.toLocaleString("id-ID")}
              </span>
            </div>

            {/* Points preview */}
            {pointsPreview > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2.5 text-xs font-semibold text-amber-700"
              >
                <span>⭐</span>
                <span>
                  Kamu akan mendapat{" "}
                  <strong>{pointsPreview} poin</strong> dari pembelian ini!
                </span>
              </motion.div>
            )}

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  key="err"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 rounded-xl bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-600 border border-rose-100"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={showQrisPanel}
              disabled={!canPay || showQris}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isPaying ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Memproses...
                </>
              ) : showQris ? (
                "QRIS Ditampilkan"
              ) : (
                "Bayar Sekarang"
              )}
            </button>

            {showQris && (
              <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-emerald-900">Scan QRIS</p>
                    <p className="text-xs text-emerald-700">
                      Total bayar Rp {(pendingOrderTotal ?? finalTotal).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                    QRIS
                  </span>
                </div>

                <div className="mt-3 flex flex-col items-center gap-3">
                  <div className="rounded-xl bg-white p-3 shadow-sm">
                    <QrisCode />
                  </div>
                  <p className="text-center text-xs text-emerald-700">
                    Setelah pembayaran berhasil, klik tombol konfirmasi di bawah.
                  </p>
                  <button
                    onClick={confirmPayment}
                    disabled={!canPay || isPaying}
                    className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
                  >
                    {isPaying ? "Memverifikasi..." : "Saya sudah bayar"}
                  </button>
                  <button
                    onClick={() => setShowQris(false)}
                    disabled={isPaying}
                    className="w-full rounded-xl border border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:cursor-not-allowed"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}

            {!requiredAddressValid && (
              <p className="mt-2 text-xs text-rose-600">
                Lengkapi data alamat untuk melanjutkan.
              </p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
