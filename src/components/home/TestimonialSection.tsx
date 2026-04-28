"use client";

import { useRef } from "react";

const TESTIMONIALS = [
  {
    name: "Budi Santoso",
    role: "Guru SD Negeri 1 Bandung",
    avatar: "👨‍🏫",
    avatarBg: "#EFF6FF",
    rating: 5,
    text: "Sebangku Store benar-benar mengubah cara saya mengajar. Murid-murid jadi antusias dan semangat belajar matematika lewat board game yang kami beli di sini!",
    verified: true,
  },
  {
    name: "Rina Wulandari",
    role: "Ibu Rumah Tangga, Jakarta",
    avatar: "👩",
    avatarBg: "#FDF4FF",
    rating: 5,
    text: "Awalnya ragu beli online, tapi ternyata produknya keren banget! Anak-anak saya jadi hobi bermain bersama setelah beli Monopoli Nusantara dari Sebangku.",
    verified: true,
  },
  {
    name: "Pak Rahmat",
    role: "Founder TK Alam Ceria",
    avatar: "👨‍💼",
    avatarBg: "#F0FDF4",
    rating: 5,
    text: "Harganya terjangkau, kualitasnya premium. Saya sudah belanja lebih dari 20 jenis board game dan semuanya sesuai ekspektasi. Highly recommended!",
    verified: true,
  },
  {
    name: "Dewi Permata",
    role: "Psikolog Anak, Surabaya",
    avatar: "👩‍⚕️",
    avatarBg: "#FFF7ED",
    rating: 5,
    text: "Sebagai psikolog, saya sangat merekomendasikan produk-produk dari Sebangku Store. Semua sudah sesuai standar perkembangan anak yang saya pelajari.",
    verified: true,
  },
  {
    name: "Anton Wijaya",
    role: "Orang Tua, Medan",
    avatar: "👨",
    avatarBg: "#EFF6FF",
    rating: 5,
    text: "Pengiriman cepat, packaging aman, produk bagus. Anak saya yang 7 tahun suka banget main puzzle edukasi. Terima kasih Sebangku!",
    verified: false,
  },
];

export function TestimonialSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="py-14 bg-white">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div className="text-center sm:text-left w-full sm:w-auto">
            <p className="section-label">Ulasan Pelanggan</p>
            <h2 className="section-title">Kata Mereka tentang Sebangku</h2>
          </div>
          {/* Arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={scrollLeft}
              aria-label="Testimonial sebelumnya"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={scrollRight}
              aria-label="Testimonial berikutnya"
              className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth pb-2"
        >
          {TESTIMONIALS.map(({ name, role, avatar, avatarBg, rating, text, verified }) => (
            <div
              key={name}
              className="flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md hover:border-blue-100 transition-all"
              style={{ width: "300px", minWidth: "280px" }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: rating }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <span
                  className="flex items-center justify-center w-10 h-10 rounded-full text-xl shrink-0"
                  style={{ background: avatarBg }}
                >
                  {avatar}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
                    {verified && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#2563eb" className="shrink-0">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 truncate">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-5">
          <button
            onClick={scrollLeft}
            aria-label="Testimonial sebelumnya"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={scrollRight}
            aria-label="Testimonial berikutnya"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
