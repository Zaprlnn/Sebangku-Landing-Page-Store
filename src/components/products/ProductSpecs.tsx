interface Specs {
  players?: string;
  duration?: string;
  age?: string;
  contents?: string;
  [key: string]: string | undefined;
}

const SPEC_ICONS: Record<string, React.ReactNode> = {
  players: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  duration: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  age: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

const SPEC_LABELS: Record<string, string> = {
  players: "Jumlah Pemain",
  duration: "Durasi",
  age: "Usia",
  contents: "Isi Kotak",
};

export function ProductSpecs({ specs }: { specs?: Specs }) {
  const data: Specs = specs ?? {
    players: "2-4 pemain",
    duration: "30-45 menit",
  };

  const entries = Object.entries(data).filter(([, v]) => v);

  return (
    <div className="grid grid-cols-2 gap-3">
      {entries.map(([key, value]) => (
        <div
          key={key}
          className="flex flex-col gap-1 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
            {SPEC_ICONS[key] ?? null}
            {SPEC_LABELS[key] ?? key}
          </span>
          <span className="text-[14px] font-semibold text-gray-800">{value}</span>
        </div>
      ))}
    </div>
  );
}
