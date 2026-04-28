"use client";

import { useState } from "react";
import { MotionButton } from "@/components/motion/MotionButton";
import { MotionInput } from "@/components/ui/MotionInput";

export function VoucherInput({ onApply }: { onApply: (discount: number) => void }) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const applyVoucher = () => {
    const normalized = code.trim().toUpperCase();
    const voucherMap: Record<string, number> = {
      HEMAT10: 0.1,
      EDU15: 0.15,
      FREESHIP: 0.05,
    };

    const discount = voucherMap[normalized] ?? 0;
    onApply(discount);

    if (discount > 0) {
      setMessage(`Voucher ${normalized} berhasil dipakai`);
      return;
    }

    setMessage("Voucher tidak valid");
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="text-sm font-bold text-gray-900">Kode Voucher</h3>
      <p className="mt-1 text-xs text-gray-500">Contoh: HEMAT10, EDU15, FREESHIP</p>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <MotionInput
            label="Kode Voucher"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Masukkan kode voucher"
          />
        </div>
        <MotionButton
          onClick={applyVoucher}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Pakai
        </MotionButton>
      </div>

      {message && <p className="mt-2 text-xs text-gray-600">{message}</p>}
    </section>
  );
}
