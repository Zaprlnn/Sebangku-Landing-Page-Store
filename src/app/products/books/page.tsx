import Link from "next/link";

const BOOK_PRODUCTS = [
  {
    slug: "penemuan-robot-masa-depan",
    title: "Penemuan Robot Masa Depan",
    category: "Sains & Teknologi",
    age: "8-12 tahun",
    price: "IDR 29.000",
    oldPrice: "IDR 49.000",
    rating: 5,
    reviews: 312,
    badge: "TERLARIS",
    sale: "-41%",
  },
  {
    slug: "kreasi-bangun-ruang",
    title: "Kreasi Bangun Ruang",
    category: "Matematika",
    age: "7-10 tahun",
    price: "IDR 29.000",
    oldPrice: "IDR 49.000",
    rating: 4,
    reviews: 228,
    sale: "-41%",
  },
  {
    slug: "ayo-mengenal-anatomi-tubuh",
    title: "Ayo Mengenal Anatomi Tubuh",
    category: "Literasi Sains",
    age: "8-12 tahun",
    price: "IDR 29.000",
    oldPrice: "IDR 49.000",
    rating: 4,
    reviews: 198,
    badge: "BARU",
    sale: "-41%",
  },
  {
    slug: "ibadah-ke-tanah-suci",
    title: "Ibadah ke Tanah Suci",
    category: "Literasi Budaya",
    age: "6-10 tahun",
    price: "IDR 29.000",
    oldPrice: "IDR 49.000",
    rating: 4,
    reviews: 156,
    sale: "-41%",
  },
  {
    slug: "petualangan-di-hutan-tropis",
    title: "Petualangan di Hutan Tropis",
    category: "Cerita Edukasi",
    age: "6-9 tahun",
    price: "IDR 32.000",
    oldPrice: "IDR 55.000",
    rating: 4,
    reviews: 187,
    badge: "TERLARIS",
    sale: "-42%",
  },
  {
    slug: "mengenal-angka-bersama-teman",
    title: "Mengenal Angka Bersama Teman",
    category: "Matematika",
    age: "5-7 tahun",
    price: "IDR 25.000",
    oldPrice: "IDR 42.000",
    rating: 4,
    reviews: 143,
    badge: "BARU",
    sale: "-40%",
  },
];

const BOOK_FILTERS = [
  {
    title: "KATEGORI BUKU",
    items: ["Cerita Edukasi", "Sains & Teknologi", "Matematika", "Literasi Sains", "Literasi Budaya"],
  },
  {
    title: "KELOMPOK USIA",
    items: ["5-7 tahun", "6-9 tahun", "7-10 tahun", "8-12 tahun"],
  },
  {
    title: "KETERSEDIAAN",
    items: ["Tersedia", "Pre-Order", "Diskon"],
  },
];

function BookCard({
  title,
  category,
  age,
  price,
  oldPrice,
  rating,
  reviews,
  badge,
  sale,
}: (typeof BOOK_PRODUCTS)[number]) {
  return (
    <article className="group rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 aspect-[1.12] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_60%_80%,rgba(255,255,255,0.12),transparent_28%)]" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-[11px] font-bold bg-red-500 text-white px-2.5 py-1 rounded-full shadow-sm">{sale}</span>
          {badge && (
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm ${badge === "TERLARIS" ? "bg-amber-500 text-white" : "bg-emerald-500 text-white"}`}>
              {badge}
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/15 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[48%] max-w-[150px] rounded-2xl bg-white/95 shadow-xl border border-white/70 overflow-hidden transform-gpu transition-transform duration-300 group-hover:scale-[1.03] group-hover:-translate-y-[52%]">
          <div className="h-24 bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
            <div className="grid grid-cols-5 gap-1.5 px-3 py-2">
              {Array.from({ length: 10 }).map((_, index) => (
                <span key={index} className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 shadow-sm" />
              ))}
            </div>
          </div>
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300" />
        </div>
      </div>

      <div className="p-4 md:p-5">
        <div className="flex items-center gap-2 mb-2 text-[11px] font-medium text-gray-500">
          <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700">{category}</span>
          <span>{age}</span>
        </div>
        <h3 className="text-base md:text-lg font-bold text-gray-900 leading-snug line-clamp-2">{title}</h3>
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={index < rating ? "#fbbf24" : "#e5e7eb"}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          <span className="text-xs text-gray-400 ml-1">({reviews})</span>
        </div>
        <div className="mt-3">
          <div className="text-lg font-bold text-blue-700">{price}</div>
          <div className="text-xs text-gray-400 line-through">{oldPrice}</div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-full border border-gray-200 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 active:scale-95">
            Detail
          </button>
          <button className="flex-1 rounded-full bg-blue-600 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 active:translate-y-px">
            Tambah
          </button>
        </div>
      </div>
    </article>
  );
}

function BookFilter() {
  return (
    <aside className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm sticky top-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-5">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-blue-600">
          <path d="M4 6h16M4 12h16m-7 6h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 className="text-lg font-bold text-gray-900">Filter Produk</h2>
      </div>

      <div className="space-y-6">
        {BOOK_FILTERS.map((group) => (
          <section key={group.title}>
            <h3 className="text-xs font-bold text-gray-900 tracking-wider mb-4">{group.title}</h3>
            <div className="space-y-3">
              {group.items.map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <span className="relative">
                    <input type="checkbox" className="peer sr-only" />
                    <span className="block w-4 h-4 rounded-[4px] border border-gray-300 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors" />
                    <svg className="absolute inset-0 m-auto w-3 h-3 text-white opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </section>
        ))}

        <section>
          <h3 className="text-xs font-bold text-gray-900 tracking-wider mb-4">RENTANG HARGA</h3>
          <div className="relative h-1.5 rounded-full bg-blue-100 mb-5">
            <div className="absolute left-0 right-0 top-0 h-full rounded-full bg-blue-500" />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-600 shadow-sm" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-600 shadow-sm" />
          </div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-blue-600">
            <span className="px-2.5 py-1 rounded-full bg-blue-50">IDR 20.000</span>
            <span className="px-2.5 py-1 rounded-full bg-blue-50">IDR 60.000</span>
          </div>
        </section>

        <button className="w-full rounded-full border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-50 active:scale-95">
          Reset Filter
        </button>
      </div>
    </aside>
  );
}

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 xl:px-8 py-8 md:py-10">
          <div className="mb-8">
            <span className="section-label">EDUPLAY STORE</span>
            <h1 className="section-title text-3xl md:text-4xl">Katalog Buku Edukatif</h1>
            <p className="mt-2 text-gray-500 text-base md:text-lg max-w-2xl">
              Temukan buku edukatif yang mendukung literasi, sains, dan kreativitas anak dengan tampilan yang nyaman di desktop maupun mobile.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="flex bg-gray-50 rounded-full p-1 border border-gray-200 shadow-sm w-full sm:w-auto">
                  <Link
                    href="/products"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-gray-600 text-sm font-semibold transition-all duration-200 hover:text-blue-600 hover:bg-white/80 active:scale-95 active:translate-y-px"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <path d="M4 6h16M4 10h16M4 14h10M4 18h7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <span>Board Game</span>
                    <span className="bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full text-xs">9</span>
                  </Link>
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-blue-600 shadow-lg shadow-blue-200 animate-pulse" />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 shadow-md shadow-blue-200 active:scale-95 transition-transform duration-150">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <path d="M4 19V5a2 2 0 012-2h13.4a1 1 0 01.9 1.4L19 7l1.3 2.6a1 1 0 01-.9 1.4H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 19a2 2 0 002 2h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Buku Edukatif</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">6</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex w-full lg:w-[48%] gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari buku edukatif..."
                  className="w-full bg-white border border-gray-200 rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-500">
                  <path d="M3 6h18M6 12h12M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Terpopuler
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 xl:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 xl:gap-8">
          <div className="order-2 lg:order-1">
            <BookFilter />
          </div>

          <div className="order-1 lg:order-2 min-w-0">
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <p className="text-sm text-gray-500">
                Menampilkan <span className="font-semibold text-gray-900">6</span> buku edukatif
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M4 19h16M4 5h16M7 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Buku Cerita Edukasi Anak
              </span>
            </div>

            <div className="mb-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 md:p-5 text-white shadow-lg shadow-blue-200/60 overflow-hidden relative">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/10 -mr-6 -mt-8" />
              <div className="absolute right-8 bottom-0 h-16 w-16 rounded-full bg-white/10" />
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h2 className="text-base md:text-lg font-bold">Koleksi Buku Edukatif MARICA</h2>
                  <p className="text-blue-100 text-sm mt-1">Make Learning Addictive — Belajar jadi seru!</p>
                </div>
                <button className="self-start md:self-auto rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-all duration-200 hover:bg-white/25 active:scale-95">
                  Mulai IDR 25.000
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {BOOK_PRODUCTS.map((book) => (
                <BookCard key={book.slug} {...book} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button className="px-8 py-3 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-full hover:bg-gray-50 hover:text-blue-600 transition-all shadow-sm active:scale-95">
                Muat Lebih Banyak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}