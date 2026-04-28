"use client";

interface Props {
  value: string;
  onChange: (method: string) => void;
}

const METHODS = [
  {
    id: "QRIS",
    description: "Scan QR dari e-wallet atau mobile banking",
  },
];

export function PaymentOptions({ value, onChange }: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-base font-bold text-gray-900">Pilihan Pembayaran</h2>
      <div className="space-y-3">
        {METHODS.map((method) => {
          const active = value === method.id;
          return (
            <label
              key={method.id}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 transition-colors ${
                active ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">{method.id}</p>
                <p className="text-xs text-gray-500">{method.description}</p>
              </div>
              <input
                type="radio"
                name="payment"
                checked={active}
                onChange={() => onChange(method.id)}
                className="h-4 w-4 shrink-0"
              />
            </label>
          );
        })}
      </div>
    </section>
  );
}
