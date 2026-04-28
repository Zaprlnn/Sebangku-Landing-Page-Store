"use client";

const FILTER_GROUPS = [
  {
    title: "KELOMPOK USIA",
    options: ["6-8 tahun", "7-9 tahun", "8-11 tahun", "9-12 tahun", "10-12 tahun"],
  },
  {
    title: "MATA PELAJARAN",
    options: ["Matematika", "Literasi", "Social Skills", "Logika", "Kreativitas"],
  },
  {
    title: "DURASI BERMAIN",
    options: ["15-30 menit", "30-45 menit", "45-60 menit", "60+ menit"],
  },
  {
    title: "JUMLAH PEMAIN",
    options: ["1-2 pemain", "2-4 pemain", "3-6 pemain", "4+ pemain"],
  },
];

export function ProductFilter() {
  return (
    <aside className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-600">
          <path d="M4 6h16M4 12h16m-7 6h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className="text-base md:text-lg font-semibold tracking-tight text-gray-900">Filter Produk</h2>
      </div>

      <div className="space-y-8">
        {FILTER_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="text-[11px] font-semibold text-gray-900 mb-4 tracking-[0.14em]">{group.title}</h3>
            <div className="space-y-3">
              {group.options.map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded shrink-0 checked:bg-blue-600 checked:border-blue-600 transition-colors" />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-sm leading-6 text-gray-600 group-hover:text-gray-900 transition-colors">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Rentang Harga */}
        <div>
          <h3 className="text-[11px] font-semibold text-gray-900 mb-4 tracking-[0.14em]">RENTANG HARGA</h3>
          <div className="px-1">
            <div className="relative h-1 bg-gray-200 rounded-full mb-6">
              <div className="absolute left-[10%] right-[30%] h-full bg-blue-600 rounded-full"></div>
              <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-sm cursor-grab"></div>
              <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow-sm cursor-grab"></div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-medium text-blue-600">
              <span className="bg-blue-50 px-2.5 py-1 rounded-md">Rp 50.000</span>
              <span className="bg-blue-50 px-2.5 py-1 rounded-md">Rp 200.000</span>
            </div>
          </div>
        </div>

        <button className="w-full py-3 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm mt-4">
          Reset Filter
        </button>
      </div>
    </aside>
  );
}
