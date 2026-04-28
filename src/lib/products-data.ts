export interface ProductDetail {
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  age: string;
  subject: string;
  players: string;
  duration: string;
  images: string[];
  description: string;
  badge?: string;
}

export const MOCK_PRODUCTS: Record<string, ProductDetail> = {
  "math-quest": {
    name: "Math Quest - Petualangan Angka",
    price: 145000,
    originalPrice: 174000,
    discount: 20,
    rating: 4.9,
    reviews: 256,
    age: "7-9 tahun",
    subject: "Matematika",
    players: "2-4 pemain",
    duration: "30-45 menit",
    images: [],
    badge: "TERLARIS",
    description:
      "Math Quest adalah permainan edukatif yang mengajak anak-anak berpetualang dalam dunia angka. Dengan mekanisme permainan yang seru dan interaktif, anak akan belajar konsep matematika dasar seperti penjumlahan, pengurangan, perkalian, dan pembagian dengan cara yang menyenangkan. Dirancang bersama guru-guru berpengalaman dan ahli psikologi anak, Math Quest memastikan setiap tantangan sesuai dengan kemampuan kognitif anak usia 7-9 tahun.",
  },
  "story-builder": {
    name: "Story Builder - Cerita Kreatif",
    price: 125000,
    originalPrice: 150000,
    discount: 17,
    rating: 4.5,
    reviews: 189,
    age: "8-12 tahun",
    subject: "Literasi",
    players: "2-6 pemain",
    duration: "20-40 menit",
    images: [],
    badge: "BARU",
    description:
      "Story Builder mengajak anak membangun cerita bersama dengan kartu karakter, latar, dan kejadian unik. Permainan ini mengasah kreativitas, kemampuan berbicara, dan literasi anak dengan cara yang menyenangkan.",
  },
  "team-work-challenge": {
    name: "Team Work Challenge",
    price: 165000,
    originalPrice: 195000,
    discount: 15,
    rating: 4.6,
    reviews: 143,
    age: "9-12 tahun",
    subject: "Social Skills",
    players: "3-6 pemain",
    duration: "45-60 menit",
    images: [],
    description:
      "Team Work Challenge adalah permainan berbasis kerja sama yang mengajarkan anak pentingnya komunikasi, kepercayaan, dan strategi bersama. Setiap ronde membutuhkan kolaborasi aktif semua anggota tim.",
  },
  "logic-puzzle-master": {
    name: "Logic Puzzle Master",
    price: 135000,
    originalPrice: 160000,
    discount: 16,
    rating: 4.7,
    reviews: 98,
    age: "8-11 tahun",
    subject: "Logika",
    players: "1-4 pemain",
    duration: "25-45 menit",
    images: [],
    description:
      "Logic Puzzle Master menantang kemampuan berpikir logis anak dengan teka-teki visual dan pola. Tersedia dalam berbagai tingkat kesulitan sehingga cocok untuk semua tingkat kemampuan.",
  },
  "fraction-fun": {
    name: "Fraction Fun - Pecahan Seru",
    price: 155000,
    originalPrice: 185000,
    discount: 16,
    rating: 4.5,
    reviews: 112,
    age: "9-11 tahun",
    subject: "Matematika",
    players: "2-4 pemain",
    duration: "30-40 menit",
    images: [],
    description:
      "Fraction Fun membuat konsep pecahan menjadi mudah dan menyenangkan melalui visual kartu yang intuitif. Anak belajar mengenal, membandingkan, dan mengoperasikan pecahan tanpa merasa belajar.",
  },
  "word-adventure": {
    name: "Word Adventure",
    price: 115000,
    originalPrice: 135000,
    discount: 15,
    rating: 4.4,
    reviews: 67,
    age: "6-8 tahun",
    subject: "Literasi",
    players: "2-5 pemain",
    duration: "20-30 menit",
    images: [],
    badge: "BARU",
    description:
      "Word Adventure adalah permainan kata yang membantu anak mengenal kosakata baru, mengeja dengan benar, dan membangun kalimat sederhana — semuanya dalam format petualangan yang seru.",
  },
  "creative-thinking-box": {
    name: "Creative Thinking Box",
    price: 175000,
    originalPrice: 210000,
    discount: 17,
    rating: 4.9,
    reviews: 201,
    age: "10-12 tahun",
    subject: "Kreativitas",
    players: "2-6 pemain",
    duration: "40-60 menit",
    images: [],
    description:
      "Creative Thinking Box adalah kotak penuh tantangan kreatif: dari membangun benda dari material terbatas, hingga menyelesaikan dilema lateral. Cocok untuk mengembangkan inovasi dan pemikiran out-of-the-box.",
  },
  "number-race": {
    name: "Number Race",
    price: 95000,
    originalPrice: 115000,
    discount: 17,
    rating: 4.3,
    reviews: 45,
    age: "6-8 tahun",
    subject: "Matematika",
    players: "2-4 pemain",
    duration: "15-25 menit",
    images: [],
    description:
      "Number Race adalah permainan balapan angka yang mengajarkan konsep bilangan dasar kepada anak usia dini. Dengan desain papan yang menarik dan penuh warna, anak belajar menghitung sambil berlomba.",
  },
  "science-explorer-kit": {
    name: "Science Explorer Kit",
    price: 185000,
    originalPrice: 220000,
    discount: 16,
    rating: 4.8,
    reviews: 178,
    age: "10-12 tahun",
    subject: "Logika",
    players: "1-4 pemain",
    duration: "45-70 menit",
    images: [],
    badge: "TERLARIS",
    description:
      "Science Explorer Kit mengajak anak melakukan eksperimen ilmu pengetahuan sederhana yang mengagumkan. Setiap kit berisi bahan-bahan aman dan panduan langkah demi langkah yang mudah diikuti.",
  },
};
