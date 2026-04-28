import Link from "next/link";

const CATEGORIES = ["Semua", "Gamifikasi", "Tips Guru", "Review Produk"];

const FEATURED_ARTICLE = {
  slug: "5-manfaat-board-game-perkembangan-anak",
  date: "15 April 2026",
  readTime: "5 menit baca",
  title: "5 Manfaat Board Game untuk Perkembangan Anak",
  excerpt:
    "Board game bukan hanya sekadar hiburan, tetapi juga alat pembelajaran yang efektif. Temukan 5 manfaat utama bermain board game edukatif yang akan mengubah cara belajar anak.",
};

const ARTICLES = [
  {
    slug: "cara-memilih-permainan-sesuai-usia-anak",
    category: "Gamifikasi",
    categoryColor: "bg-violet-600 text-white",
    date: "12 April 2026",
    readTime: "4 menit",
    title: "Cara Memilih Permainan Sesuai Usia Anak",
    excerpt:
      "Panduan lengkap untuk orang tua dan guru dalam memilih permainan edukatif yang tepat untuk tahap perkembangan anak.",
    accent: "from-fuchsia-200 via-rose-100 to-orange-100",
  },
  {
    slug: "review-math-quest-petualangan-angka-seru",
    category: "Review Produk",
    categoryColor: "bg-emerald-600 text-white",
    date: "10 April 2026",
    readTime: "6 menit",
    title: "Review: Math Quest - Petualangan Angka yang Seru",
    excerpt:
      "Ulasan mendalam tentang Math Quest, board game matematika yang membuat anak-anak belajar tanpa merasa sedang belajar.",
    accent: "from-amber-200 via-orange-200 to-stone-300",
  },
  {
    slug: "mengintegrasikan-board-game-dalam-pembelajaran-kelas",
    category: "Tips Guru",
    categoryColor: "bg-blue-600 text-white",
    date: "8 April 2026",
    readTime: "7 menit",
    title: "Mengintegrasikan Board Game dalam Pembelajaran Kelas",
    excerpt:
      "Tips praktis bagi guru untuk menggunakan board game sebagai media pembelajaran yang interaktif dan menyenangkan.",
    accent: "from-sky-200 via-blue-100 to-indigo-100",
  },
  {
    slug: "pentingnya-keterampilan-sosial-di-era-digital",
    category: "Gamifikasi",
    categoryColor: "bg-violet-600 text-white",
    date: "5 April 2026",
    readTime: "5 menit",
    title: "Pentingnya Keterampilan Sosial di Era Digital",
    excerpt:
      "Di tengah dominasi gadget, board game menjadi jembatan penting untuk mengembangkan keterampilan sosial anak.",
    accent: "from-yellow-200 via-amber-100 to-red-100",
  },
  {
    slug: "board-game-terbaik-untuk-meningkatkan-literasi",
    category: "Review Produk",
    categoryColor: "bg-emerald-600 text-white",
    date: "2 April 2026",
    readTime: "6 menit",
    title: "Board Game Terbaik untuk Meningkatkan Literasi",
    excerpt:
      "Rekomendasi board game yang terbukti efektif meningkatkan kemampuan membaca dan memahami cerita.",
    accent: "from-lime-200 via-green-100 to-cyan-100",
  },
];

const POPULAR_TAGS = ["Matematika", "Literasi", "Board Game", "Parenting", "Strategi", "Aktivitas Rumah"];

const LATEST_ARTICLES = [
  {
    slug: "5-manfaat-board-game-perkembangan-anak",
    title: "5 Manfaat Board Game untuk Perkembangan Anak",
  },
  {
    slug: "mengintegrasikan-board-game-dalam-pembelajaran-kelas",
    title: "Mengintegrasikan Board Game dalam Pembelajaran Kelas",
  },
  {
    slug: "board-game-terbaik-untuk-meningkatkan-literasi",
    title: "Board Game Terbaik untuk Meningkatkan Literasi",
  },
];

function ArticleCard({
  slug,
  category,
  categoryColor,
  date,
  readTime,
  title,
  excerpt,
  accent,
}: (typeof ARTICLES)[number]) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-100"
    >
      <div className={`relative h-44 sm:h-52 overflow-hidden bg-gradient-to-br ${accent}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.45),transparent_22%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.25),transparent_20%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-28 w-28 rounded-3xl bg-white/85 shadow-xl border border-white/70 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <span className="text-5xl select-none">📘</span>
          </div>
        </div>
        <span className={`absolute left-4 bottom-4 rounded-full px-3 py-1 text-[11px] font-semibold shadow-sm ${categoryColor}`}>
          {category}
        </span>
      </div>
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-gray-400">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        <h3 className="text-[15px] md:text-base font-semibold leading-6 text-gray-900 transition-colors group-hover:text-blue-600">
          {title}
        </h3>
        <p className="text-sm leading-6 text-gray-500 line-clamp-3 min-h-[72px]">
          {excerpt}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-all duration-200 group-hover:gap-2">
          Baca Selengkapnya
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  return (
    <div className="overflow-x-clip bg-gray-50 text-gray-900">
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white">
          <div className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_18%_70%,rgba(255,255,255,0.14),transparent_20%),radial-gradient(circle_at_84%_14%,rgba(255,255,255,0.16),transparent_18%)]" />
          <div className="pointer-events-none absolute -left-10 top-16 h-36 w-36 rounded-full bg-white/8 blur-3xl animate-float-slow sm:h-48 sm:w-48" />
          <div className="pointer-events-none absolute right-[-2rem] top-8 h-44 w-44 rounded-full bg-white/10 blur-3xl animate-float-slower sm:h-56 sm:w-56" />

          <div className="container relative py-12 sm:py-14 md:py-20 text-center">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm animate-fade-up">
              <span className="text-base">📖</span>
              <span>Blog &amp; Artikel</span>
            </div>

            <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight leading-tight sm:text-4xl md:text-5xl lg:text-6xl animate-fade-up [animation-delay:120ms]">
              Tips, Panduan &amp; Ulasan
            </h1>
            <p className="mx-auto mt-4 max-w-2xl px-1 text-sm leading-6 text-blue-100 sm:leading-7 md:text-base md:leading-8 animate-fade-up [animation-delay:180ms]">
              Wawasan seputar pendidikan, permainan edukatif, dan perkembangan anak dari para ahli.
            </p>

            <div className="mx-auto mt-6 sm:mt-8 max-w-2xl animate-fade-up [animation-delay:240ms]">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  className="w-full rounded-full border border-white/15 bg-white px-12 py-3.5 text-sm text-gray-700 shadow-2xl shadow-blue-950/10 outline-none transition-all duration-200 placeholder:text-gray-400 focus:scale-[1.01] focus:border-blue-200 focus:ring-4 focus:ring-white/20 sm:py-4"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container py-8 md:py-10">
          <div className="flex flex-wrap gap-2 md:gap-3 animate-fade-up">
            {CATEGORIES.map((category, index) => (
              <Link
                key={category}
                href={category === "Semua" ? "/blog" : `/blog?category=${encodeURIComponent(category.toLowerCase())}`}
                className={`rounded-full px-4 py-2 text-sm transition-all duration-200 active:scale-95 ${
                  index === 0
                    ? "bg-gray-800 text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:text-blue-600 hover:shadow-sm"
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        <section className="container pb-10 md:pb-14">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 animate-fade-up">
            <span className="h-px w-8 bg-blue-600/60" />
            Artikel Unggulan
          </div>

          <Link
            href={`/blog/${FEATURED_ARTICLE.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-100 lg:grid-cols-[1.1fr_1fr] animate-fade-up"
          >
            <div className="relative min-h-[240px] sm:min-h-[280px] bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 p-4 sm:p-5 md:p-6">
              <div className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                Tips Guru
              </div>
              <div className="flex h-full items-center justify-center rounded-3xl bg-white/55 backdrop-blur-sm shadow-inner shadow-white/30">
                <div className="flex max-w-md items-end gap-2 sm:gap-3 px-4 sm:px-6 py-6 sm:py-8">
                  {[
                    "h-24 bg-amber-200",
                    "h-32 bg-orange-200",
                    "h-28 bg-yellow-300",
                    "h-36 bg-rose-200",
                    "h-20 bg-emerald-200",
                  ].map((bar, index) => (
                    <div
                      key={bar}
                      className={`w-6 sm:w-8 rounded-t-2xl shadow-lg shadow-black/5 ${bar} animate-float-slow`}
                      style={{ animationDelay: `${index * 120}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8 lg:p-10">
              <div className="flex items-center gap-3 text-[11px] text-gray-400">
                <span>{FEATURED_ARTICLE.date}</span>
                <span>•</span>
                <span>{FEATURED_ARTICLE.readTime}</span>
              </div>
              <h2 className="mt-3 sm:mt-4 max-w-xl text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-blue-600 sm:text-2xl md:text-3xl">
                {FEATURED_ARTICLE.title}
              </h2>
              <p className="mt-3 sm:mt-4 max-w-2xl text-sm leading-6 text-gray-500 md:text-base md:leading-7">
                {FEATURED_ARTICLE.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all duration-200 group-hover:gap-3">
                Baca Selengkapnya
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </section>

        <section className="container pb-16 md:pb-20">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">Artikel Lainnya</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr,300px]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {ARTICLES.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>

            <aside className="h-fit space-y-4 lg:sticky lg:top-24">
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900">Tag Populer</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag.toLowerCase())}`}
                      className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900">Artikel Terbaru</h3>
                <div className="mt-3 space-y-3">
                  {LATEST_ARTICLES.map((article) => (
                    <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
                      <p className="text-sm font-medium text-gray-700 transition-colors group-hover:text-blue-600 line-clamp-2">
                        {article.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
