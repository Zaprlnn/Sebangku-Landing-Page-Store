import { ProductFilter } from "@/components/products/ProductFilter";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductTabs } from "@/components/products/ProductTabs";

const MOCK_PRODUCTS = [
  {
    slug: "math-quest",
    name: "Math Quest - Petualangan Angka",
    price: 145000,
    imageUrl: "/images/products/placeholder.webp",
    age: "7-9 tahun",
    subject: "Matematika",
    rating: 4.8,
    reviews: 256,
    badge: "TERLARIS",
  },
  {
    slug: "story-builder",
    name: "Story Builder - Cerita Kreatif",
    price: 125000,
    imageUrl: "/images/products/placeholder.webp",
    age: "8-12 tahun",
    subject: "Literasi",
    rating: 4.5,
    reviews: 189,
    badge: "BARU",
  },
  {
    slug: "team-work-challenge",
    name: "Team Work Challenge",
    price: 165000,
    imageUrl: "/images/products/placeholder.webp",
    age: "9-12 tahun",
    subject: "Social Skills",
    rating: 4.6,
    reviews: 143,
  },
  {
    slug: "logic-puzzle-master",
    name: "Logic Puzzle Master",
    price: 135000,
    imageUrl: "/images/products/placeholder.webp",
    age: "8-11 tahun",
    subject: "Logika",
    rating: 4.7,
    reviews: 98,
  },
  {
    slug: "fraction-fun",
    name: "Fraction Fun - Pecahan Seru",
    price: 155000,
    imageUrl: "/images/products/placeholder.webp",
    age: "9-11 tahun",
    subject: "Matematika",
    rating: 4.5,
    reviews: 112,
  },
  {
    slug: "word-adventure",
    name: "Word Adventure",
    price: 115000,
    imageUrl: "/images/products/placeholder.webp",
    age: "6-8 tahun",
    subject: "Literasi",
    rating: 4.4,
    reviews: 67,
    badge: "BARU",
  },
  {
    slug: "creative-thinking-box",
    name: "Creative Thinking Box",
    price: 175000,
    imageUrl: "/images/products/placeholder.webp",
    age: "10-12 tahun",
    subject: "Kreativitas",
    rating: 4.9,
    reviews: 201,
  },
  {
    slug: "number-race",
    name: "Number Race",
    price: 95000,
    imageUrl: "/images/products/placeholder.webp",
    age: "6-8 tahun",
    subject: "Matematika",
    rating: 4.3,
    reviews: 45,
  },
  {
    slug: "science-explorer-kit",
    name: "Science Explorer Kit",
    price: 185000,
    imageUrl: "/images/products/placeholder.webp",
    age: "10-12 tahun",
    subject: "Logika",
    rating: 4.8,
    reviews: 178,
    badge: "TERLARIS",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 text-gray-900">
      <div className="container mx-auto px-4 xl:px-8 py-8 md:py-10">
        {/* Header Section */}
        <div className="mb-8 md:mb-10 max-w-3xl">
          <span className="text-blue-600 text-xs font-semibold uppercase tracking-[0.18em] mb-2 block">
            EDUPLAY STORE
          </span>
          <h1 className="text-3xl md:text-[2.65rem] font-bold tracking-tight leading-tight mb-3">
            Katalog Produk
          </h1>
          <p className="text-base md:text-lg leading-7 text-gray-500">
            Temukan permainan dan buku edukatif yang sempurna untuk anak Anda
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between mb-6">
          <ProductTabs />

          <div className="flex w-full xl:w-auto flex-1 xl:max-w-xl gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Cari board game..."
                className="w-full bg-white border border-gray-200 rounded-full pl-11 pr-4 py-3 text-sm md:text-base text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-500">
                <path d="M3 6h18M6 12h12M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <select
                className="bg-transparent text-sm font-medium text-gray-700 outline-none"
                aria-label="Urutkan produk"
                defaultValue="populer"
              >
                <option value="terbaru">Terbaru</option>
                <option value="termurah">Termurah</option>
                <option value="populer">Populer</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <ProductFilter />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <p className="text-sm md:text-base text-gray-500 mb-4">
              Menampilkan <span className="font-semibold text-gray-900">9</span> board game
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
              {MOCK_PRODUCTS.map((product) => (
                <ProductCard key={product.slug} {...product} />
              ))}
            </div>

            <div className="mt-10 md:mt-12 flex justify-center">
              <button className="px-8 py-3 bg-white border border-gray-200 text-gray-600 text-sm font-medium rounded-full hover:bg-gray-50 hover:text-blue-600 transition-all shadow-sm">
                Muat Lebih Banyak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
