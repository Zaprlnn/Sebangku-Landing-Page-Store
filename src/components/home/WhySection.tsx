const WHY_FEATURES = [
  {
    icon: "🎓",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Nilai Edukasi Tinggi",
    stat: "10+",
    statLabel: "Kurikulum",
    desc: "Setiap produk dipilih bersama tim pendidik dan psikolog anak untuk memastikan manfaat belajar yang optimal.",
  },
  {
    icon: "🛡️",
    color: "bg-green-50",
    iconColor: "text-green-600",
    title: "Aman & Berkualitas",
    stat: "100%",
    statLabel: "Tersertifikasi",
    desc: "Semua produk telah lulus uji keamanan SNI dan tersertifikasi material ramah lingkungan untuk anak.",
  },
  {
    icon: "📋",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "Sertifikasi Guru",
    stat: "500+",
    statLabel: "Mitra Guru",
    desc: "Direkomendasikan langsung oleh ribuan guru dan tenaga pendidik dari Sabang sampai Merauke.",
  },
  {
    icon: "🤝",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
    title: "Garansi Kepuasan",
    stat: "30",
    statLabel: "Hari Garansi",
    desc: "Tidak puas? Kami jamin pengembalian produk dalam 30 hari tanpa pertanyaan berlebih.",
  },
];

export function WhySection() {
  return (
    <section className="py-14 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="section-label">Keunggulan Kami</p>
          <h2 className="section-title">Mengapa Memilih EduPlay?</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
            Kami bukan hanya menjual permainan — kami membangun pengalaman belajar yang menyenangkan untuk anak Indonesia.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {WHY_FEATURES.map(({ icon, color, iconColor, title, stat, statLabel, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all text-center sm:text-left"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-2xl mb-3 ${color} ${iconColor}`}>
                {icon}
              </div>
              <div className="mb-2">
                <span className="text-2xl font-extrabold text-gray-900">{stat}</span>
                <span className="text-xs text-gray-400 ml-1">{statLabel}</span>
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-1.5">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
