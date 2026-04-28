"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ProductCardProps } from "@/components/products/ProductCard";
import { ProductCard } from "@/components/products/ProductCard";
import { useCart } from "@/hooks/use-cart";

const PRODUCT_IMAGES = [
  "/images/products/placeholder.webp",
  "/images/products/placeholder.webp",
  "/images/products/placeholder.webp",
  "/images/products/placeholder.webp",
];

const RELATED_PRODUCTS: ProductCardProps[] = [
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

const TABS = ["Spesifikasi", "Nilai Edukasi", "Tutorial"] as const;

type TabKey = (typeof TABS)[number];

const EDU_VALUES = [
  {
    title: "Berpikir Kritis",
    description: "Anak dilatih menganalisis petunjuk dan mengambil keputusan berbasis logika.",
    color: "text-blue-700 bg-blue-50 border-blue-100",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 3a9 9 0 019 9 9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9z" stroke="currentColor" strokeWidth="2" />
        <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Kolaborasi",
    description: "Setiap misi mendorong komunikasi dan kerja tim antar pemain.",
    color: "text-emerald-700 bg-emerald-50 border-emerald-100",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M22 21v-2a4 4 0 00-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Numerasi",
    description: "Konsep penjumlahan, pengurangan, dan pecahan dikenalkan lewat permainan.",
    color: "text-amber-700 bg-amber-50 border-amber-100",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Ketekunan",
    description: "Level tantangan bertahap membantu anak belajar fokus sampai selesai.",
    color: "text-rose-700 bg-rose-50 border-rose-100",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 14.8 7.1 17.2 8 11.7 4 7.8 9.5 7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function TabContent({ activeTab }: { activeTab: TabKey }) {
  if (activeTab === "Spesifikasi") {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-gray-200">
              <th className="w-40 bg-gray-50 px-4 py-3 text-left font-semibold text-gray-600">Usia</th>
              <td className="px-4 py-3 text-gray-800">8-12 tahun</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="bg-gray-50 px-4 py-3 text-left font-semibold text-gray-600">Pemain</th>
              <td className="px-4 py-3 text-gray-800">2-4 pemain</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="bg-gray-50 px-4 py-3 text-left font-semibold text-gray-600">Durasi</th>
              <td className="px-4 py-3 text-gray-800">30-45 menit</td>
            </tr>
            <tr>
              <th className="bg-gray-50 px-4 py-3 text-left font-semibold text-gray-600">Isi Box</th>
              <td className="px-4 py-3 text-gray-800">Papan permainan, 120 kartu tantangan, 4 pion roket, 1 dadu, 1 buku panduan</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (activeTab === "Nilai Edukasi") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        {EDU_VALUES.map((item) => (
          <article key={item.title} className={`rounded-2xl border p-4 ${item.color}`}>
            <div className="mb-2 flex items-center gap-2 text-sm font-bold">
              {item.icon}
              {item.title}
            </div>
            <p className="text-sm leading-6 text-gray-700">{item.description}</p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.3fr,1fr]">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black/5">
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/ScMzIvxBSi4"
            title="Tutorial Ruang Angkasa Matematika"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Panduan Tambahan</p>
        <h3 className="mt-2 text-lg font-bold text-gray-900">Download Buku Panduan PDF</h3>
        <p className="mt-2 text-sm leading-6 text-gray-600">Gunakan panduan ini untuk aturan lengkap, variasi level, dan aktivitas tambahan di rumah.</p>
        <a
          href="/docs/ruang-angkasa-matematika.pdf"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Download PDF
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v12M7 10l5 5 5-5M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function RuangAngkasaMatematikaPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("Spesifikasi");
  const { addItem } = useCart();

  const price = 169000;
  const hasDiscount = true;

  const priceLabel = useMemo(() => `Rp ${price.toLocaleString("id-ID")}`, [price]);

  const decreaseQty = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQty = () => setQuantity((prev) => Math.min(20, prev + 1));

  const addToCart = () => {
    addItem({
      productId: "ruang-angkasa-matematika",
      name: "Ruang Angkasa Matematika",
      price,
      quantity,
      imageUrl: PRODUCT_IMAGES[0],
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-16 text-gray-900">
      <div className="container mx-auto px-4 py-8 xl:px-8 md:py-10">
        <nav className="mb-5 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/products" className="transition-colors hover:text-blue-600">Produk</Link>
          <span>/</span>
          <span className="font-medium text-gray-800">Ruang Angkasa Matematika</span>
        </nav>

        <section className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="grid gap-3 md:grid-cols-[90px,1fr]">
              <div className="flex gap-2 overflow-x-auto md:flex-col">
                {PRODUCT_IMAGES.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                      activeImage === index ? "border-blue-500 shadow-sm" : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                <img
                  src={PRODUCT_IMAGES[activeImage]}
                  alt="Ruang Angkasa Matematika"
                  className="aspect-square h-full w-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {hasDiscount && (
                  <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white">DISKON 20%</span>
                )}
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">STOK TERBATAS</span>
              </div>

              <h1 className="text-2xl font-bold leading-tight md:text-3xl">Ruang Angkasa Matematika</h1>
              <p className="mt-3 text-3xl font-extrabold text-blue-600">{priceLabel}</p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600">
                Board game bertema misi luar angkasa yang menggabungkan tantangan berhitung dan strategi. Anak belajar numerasi sambil menyelesaikan misi antar planet.
              </p>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Pilih Jumlah</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-gray-300 bg-white">
                    <button
                      onClick={decreaseQty}
                      className="h-10 w-10 rounded-l-full text-lg font-bold text-gray-700 transition-colors hover:bg-gray-100"
                      aria-label="Kurangi jumlah"
                    >
                      -
                    </button>
                    <span className="min-w-10 text-center text-base font-semibold">{quantity}</span>
                    <button
                      onClick={increaseQty}
                      className="h-10 w-10 rounded-r-full text-lg font-bold text-gray-700 transition-colors hover:bg-gray-100"
                      aria-label="Tambah jumlah"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={addToCart}
                    className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="flex overflow-x-auto border-b border-gray-200">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 border-b-2 px-5 py-4 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-5 md:p-6">
            <TabContent activeTab={activeTab} />
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
            <Link href="/products" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Lihat semua</Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {RELATED_PRODUCTS.map((product) => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
