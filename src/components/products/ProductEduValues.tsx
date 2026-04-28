interface EduValue {
  label: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

const DEFAULT_VALUES: EduValue[] = [
  {
    label: "Logika & Strategi",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-100",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707M12 21a9 9 0 110-18 9 9 0 010 18z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Kreativitas",
    color: "text-purple-700",
    bgColor: "bg-purple-50 border-purple-100",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M12 2a10 10 0 11-4 19.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Komunikasi",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50 border-emerald-100",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Pemecahan Masalah",
    color: "text-amber-700",
    bgColor: "bg-amber-50 border-amber-100",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export function ProductEduValues({ values }: { values?: string[] }) {
  const items = values
    ? values.map((label, i) => ({ ...DEFAULT_VALUES[i % DEFAULT_VALUES.length], label }))
    : DEFAULT_VALUES;

  return (
    <div>
      <p className="text-[13px] font-semibold text-gray-500 mb-2">Nilai Edukatif</p>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[12px] font-medium ${item.color} ${item.bgColor}`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
