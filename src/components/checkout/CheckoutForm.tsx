"use client";

import { MotionButton } from "@/components/motion/MotionButton";
import { MotionInput, MotionTextarea } from "@/components/ui/MotionInput";

export interface CheckoutAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

interface Props {
  value: CheckoutAddress;
  onChange: (next: CheckoutAddress) => void;
  onAutofill?: () => void;
}

export function CheckoutForm({ value, onChange, onAutofill }: Props) {
  const update = (key: keyof CheckoutAddress, nextValue: string) => {
    onChange({ ...value, [key]: nextValue });
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-bold text-gray-900">Alamat Pengiriman</h2>
        {onAutofill && (
          <MotionButton
            onClick={onAutofill}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            Auto-fill dari profil
          </MotionButton>
        )}
      </div>

      <div className="grid gap-4 min-w-0 sm:grid-cols-2">
        <MotionInput
          label="Nama Lengkap"
          value={value.fullName}
          onChange={(event) => update("fullName", event.target.value)}
          placeholder="Nama penerima"
        />

        <MotionInput
          label="No. HP"
          value={value.phone}
          onChange={(event) => update("phone", event.target.value)}
          placeholder="08xxxxxxxxxx"
        />

        <MotionTextarea
          label="Alamat Lengkap"
          value={value.address}
          onChange={(event) => update("address", event.target.value)}
          placeholder="Nama jalan, nomor rumah, kecamatan"
          wrapperClassName="sm:col-span-2"
        />

        <MotionInput
          label="Kota"
          value={value.city}
          onChange={(event) => update("city", event.target.value)}
          placeholder="Contoh: Bandung"
        />

        <MotionInput
          label="Kode Pos"
          value={value.postalCode}
          onChange={(event) => update("postalCode", event.target.value)}
          placeholder="40123"
        />
      </div>
    </section>
  );
}
