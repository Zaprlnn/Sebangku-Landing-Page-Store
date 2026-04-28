import Link from "next/link";

export function CTABanner() {
  return (
    <section className="py-14 bg-white">
      <div className="container">
        <div
          className="relative rounded-3xl overflow-hidden px-8 py-12 sm:px-14 sm:py-16 text-center"
          style={{
            background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
          }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/10" />

          <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-3">
            Penawaran Terbatas
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
            Coba Order di Meja Sekarang!
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-md mx-auto mb-8">
            Dapatkan diskon 20% untuk pembelian pertamamu dan nikmati pengiriman gratis ke seluruh Indonesia.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 text-sm font-bold rounded-xl hover:bg-blue-50 transition-all shadow-md"
            >
              🛒 Shop Now
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 text-white text-sm font-semibold rounded-xl hover:bg-white/25 transition-all border border-white/30"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
