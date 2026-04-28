import Link from "next/link";
import { StaggerItem, StaggerList } from "@/components/motion/StaggerList";

const ARTICLES = [
  {
    slug: "5-manfaat-board-game-perkembangan-anak",
    category: "Edukasi",
    categoryColor: "bg-green-100 text-green-700",
    emoji: "📚",
    bg: "from-green-100 to-emerald-50",
    title: "5 Manfaat Board Game untuk Perkembangan Anak",
    excerpt:
      "Board game bukan sekadar hiburan. Penelitian menunjukkan bahwa permainan ini meningkatkan kemampuan berpikir kritis anak secara signifikan.",
    date: "18 Apr 2026",
    readTime: "5 menit baca",
  },
  {
    slug: "cara-memilih-board-game-usia-anak",
    category: "Tips",
    categoryColor: "bg-blue-100 text-blue-700",
    emoji: "🎲",
    bg: "from-blue-100 to-sky-50",
    title: "Cara Memilih Board Game Sesuai Usia Anak",
    excerpt:
      "Tidak semua board game cocok untuk semua usia. Simak panduan lengkap memilih permainan yang tepat dari ahlinya.",
    date: "14 Apr 2026",
    readTime: "4 menit baca",
  },
  {
    slug: "board-game-meningkatkan-kerja-sama-keluarga",
    category: "Keluarga",
    categoryColor: "bg-orange-100 text-orange-700",
    emoji: "👨‍👩‍👧‍👦",
    bg: "from-orange-100 to-amber-50",
    title: "Board Game: Cara Seru Pererat Ikatan Keluarga",
    excerpt:
      "Luangkan malam akhir pekan dengan board game — cara terbaik membangun komunikasi dan tawa bersama orang-orang terkasih.",
    date: "10 Apr 2026",
    readTime: "3 menit baca",
  },
];

export function BlogPreview() {
  return (
    <section className="py-14 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-label">Inspirasi &amp; Tips</p>
            <h2 className="section-title">Artikel Terbaru</h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
          >
            Lihat Semua
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Blog layout: 2 columns on desktop */}
        <StaggerList className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Featured article (larger) */}
          <StaggerItem>
            <Link
              href={`/blog/${ARTICLES[0].slug}`}
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all duration-200 md:row-span-1"
            >
            {/* Thumbnail */}
            <div className={`relative h-52 sm:h-64 flex items-center justify-center bg-gradient-to-br ${ARTICLES[0].bg}`}>
              <span className="text-7xl group-hover:scale-110 transition-transform duration-300 select-none">
                {ARTICLES[0].emoji}
              </span>
              <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${ARTICLES[0].categoryColor}`}>
                {ARTICLES[0].category}
              </span>
            </div>
            {/* Content */}
            <div className="p-5 flex flex-col gap-2 flex-1">
              <h3 className="text-base font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                {ARTICLES[0].title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed flex-1">
                {ARTICLES[0].excerpt}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-400">{ARTICLES[0].date}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-[11px] text-gray-400">{ARTICLES[0].readTime}</span>
                </div>
                <span className="text-[11px] font-semibold text-blue-600 group-hover:underline">
                  Baca →
                </span>
              </div>
            </div>
            </Link>
          </StaggerItem>

          {/* Right column: 2 smaller articles stacked */}
          <div className="flex flex-col gap-5">
            {ARTICLES.slice(1).map((article) => (
              <StaggerItem key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all duration-200"
                >
                {/* Thumbnail */}
                <div className={`relative flex-shrink-0 w-28 sm:w-36 flex items-center justify-center bg-gradient-to-br ${article.bg}`}>
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300 select-none">
                    {article.emoji}
                  </span>
                  <span className={`absolute top-2 left-2 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${article.categoryColor}`}>
                    {article.category}
                  </span>
                </div>
                {/* Content */}
                <div className="p-4 flex flex-col gap-1.5 flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-1.5 border-t border-gray-100 mt-auto">
                    <span className="text-[10px] text-gray-400">{article.date}</span>
                    <span className="text-[10px] font-semibold text-blue-600 group-hover:underline">
                      Baca →
                    </span>
                  </div>
                </div>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerList>
      </div>
    </section>
  );
}
