import Link from "next/link";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";

const RELATED_POSTS = [
  { slug: "5-manfaat-board-game-perkembangan-anak", title: "5 Manfaat Board Game untuk Perkembangan Anak", date: "18 Apr 2026" },
  { slug: "cara-memilih-board-game-usia-anak", title: "Cara Memilih Board Game Sesuai Usia Anak", date: "14 Apr 2026" },
  { slug: "board-game-meningkatkan-kerja-sama-keluarga", title: "Board Game: Cara Seru Pererat Ikatan Keluarga", date: "10 Apr 2026" },
];

const SAMPLE_ARTICLES: Record<string, {
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  content: string;
}> = {
  "5-manfaat-board-game-perkembangan-anak": {
    title: "5 Manfaat Board Game untuk Perkembangan Anak",
    category: "Edukasi",
    categoryColor: "bg-green-100 text-green-700",
    date: "18 April 2026",
    author: "Tim Sebangku",
    readTime: "5 menit baca",
    excerpt: "Board game bukan sekadar hiburan. Penelitian menunjukkan bahwa permainan ini meningkatkan kemampuan berpikir kritis anak secara signifikan.",
    content: `
## Mengapa Board Game Penting untuk Anak?
Dalam era digital yang didominasi layar, board game hadir sebagai alternatif yang menyehatkan dan mendidik. Berbeda dari video game, board game mendorong interaksi langsung antar pemain, membangun keterampilan sosial sekaligus kognitif.
## 1. Meningkatkan Kemampuan Berpikir Kritis
Setiap sesi board game menghadirkan situasi yang membutuhkan analisis, perencanaan, dan pengambilan keputusan. Anak belajar mempertimbangkan konsekuensi dari setiap langkah yang diambil.
## 2. Mengembangkan Keterampilan Sosial
Board game selalu dimainkan bersama. Ini melatih anak untuk berkomunikasi, menghargai giliran, menerima kekalahan dengan lapang dada, dan merayakan keberhasilan bersama.
## 3. Melatih Konsentrasi dan Kesabaran
Permainan yang membutuhkan strategi panjang melatih anak untuk fokus dan tidak mudah menyerah meskipun situasi sedang tidak menguntungkan.
## 4. Memperkuat Ikatan Keluarga
Momen bermain board game bersama keluarga menciptakan kenangan indah dan memperkuat hubungan emosional antar anggota keluarga.
## 5. Meningkatkan Kemampuan Matematika dan Bahasa
Banyak board game yang secara tidak sadar mengajarkan konsep matematika (menghitung, strategi numerik) dan memperkaya kosa kata melalui permainan kata.
> Bermain adalah cara tertinggi dalam penelitian. - Albert Einstein
Jadi, tunggu apa lagi? Yuk, temukan board game terbaik untuk si kecil di [Sebangku Store](/products)!
`,
  },
};

function getArticle(slug: string) {
  return SAMPLE_ARTICLES[slug] ?? {
    title: `Artikel: ${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`,
    category: "Blog",
    categoryColor: "bg-blue-100 text-blue-700",
    date: "21 April 2026",
    author: "Tim Sebangku",
    readTime: "3 menit baca",
    excerpt: "Artikel ini sedang dalam penyusunan. Nantikan konten lengkapnya segera!",
    content: "Konten artikel sedang dipersiapkan. Silakan kunjungi lagi nanti.",
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  return (
    <main className="bg-gray-50">
        {/* Hero Banner */}
        <div className="bg-white border-b border-gray-100">
          <div className="container pt-8 pb-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
              <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
              <span>›</span>
              <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
              <span>›</span>
              <span className="text-gray-600 line-clamp-1">{article.title}</span>
            </nav>

            {/* Category badge */}
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${article.categoryColor}`}>
              {article.category}
            </span>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4 max-w-3xl">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-base text-gray-500 max-w-2xl leading-relaxed mb-6">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm">✍️</span>
                <span>{article.author}</span>
              </div>
              <span>•</span>
              <span>📅 {article.date}</span>
              <span>•</span>
              <span>⏱️ {article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="container py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <article className="flex-1 min-w-0">
              {/* Cover image placeholder */}
              <div className="w-full h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-8 overflow-hidden">
                <span className="text-8xl select-none">📖</span>
              </div>

              {/* Article body */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
                <MarkdownRenderer content={article.content} />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {["Board Game", "Edukasi Anak", "Parenting", "Tips Bermain"].map((tag) => (
                  <span key={tag} className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <div className="mt-8 flex items-center gap-3 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                <span className="text-sm font-semibold text-gray-700">Bagikan:</span>
                {["WhatsApp", "Facebook", "Twitter/X"].map((platform) => (
                  <button
                    key={platform}
                    className="text-xs font-medium px-3 py-1.5 bg-white text-gray-600 rounded-lg border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-5">
              {/* Related articles */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Artikel Terkait</h3>
                <div className="flex flex-col gap-4">
                  {RELATED_POSTS.filter((p) => p.slug !== slug).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg">📄</span>
                      <div>
                        <p className="text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{post.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}>
                <span className="text-3xl mb-3 block">🎲</span>
                <h3 className="text-sm font-bold text-white mb-2">Temukan Board Game Seru!</h3>
                <p className="text-xs text-blue-100 mb-4">Ribuan pilihan board game edukatif tersedia di Sebangku Store.</p>
                <Link
                  href="/products"
                  className="inline-block w-full py-2 bg-white text-blue-700 text-xs font-bold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Belanja Sekarang
                </Link>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Kategori Blog</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Edukasi", count: 12, color: "bg-green-50 text-green-600" },
                    { label: "Tips & Trik", count: 8, color: "bg-blue-50 text-blue-600" },
                    { label: "Keluarga", count: 6, color: "bg-orange-50 text-orange-600" },
                    { label: "Review Produk", count: 15, color: "bg-purple-50 text-purple-600" },
                  ].map(({ label, count, color }) => (
                    <Link
                      key={label}
                      href={`/blog?category=${label.toLowerCase()}`}
                      className="flex items-center justify-between py-1.5 hover:text-blue-600 transition-colors"
                    >
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${color}`}>{label}</span>
                      <span className="text-xs text-gray-400">{count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    
  );
}
