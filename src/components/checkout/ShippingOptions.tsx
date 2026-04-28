"use client";

interface Props {
  value: string;
  onChange: (courier: string) => void;
}

const OPTIONS = [
  { id: "JNE REG", estimate: "2-3 hari", fee: 18000 },
  { id: "J&T", estimate: "1-2 hari", fee: 22000 },
  { id: "SiCepat", estimate: "2-4 hari", fee: 16000 },
];

export function ShippingOptions({ value, onChange }: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-base font-bold text-gray-900">Pilihan Kurir</h2>
      <div className="space-y-3">
        {OPTIONS.map((option) => {
          const active = value === option.id;
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 transition-colors ${
                active ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">{option.id}</p>
                <p className="text-xs text-gray-500">Estimasi {option.estimate}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <p className="text-sm font-bold text-gray-800">Rp {option.fee.toLocaleString("id-ID")}</p>
                <input
                  type="radio"
                  name="courier"
                  checked={active}
                  onChange={() => onChange(option.id)}
                  className="h-4 w-4"
                />
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
