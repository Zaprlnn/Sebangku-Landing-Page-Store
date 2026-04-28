export const CATEGORIES = [
  { slug: "board-game", label: "Board Game" },
  { slug: "card-game", label: "Card Game" },
  { slug: "puzzle", label: "Puzzle" },
  { slug: "edukatif", label: "Edukatif" },
];

export const SHIPPING_OPTIONS = [
  { id: "jne-reg", courier: "JNE", service: "Regular", etd: "2-3 hari" },
  { id: "jnt-ez", courier: "J&T", service: "Express", etd: "1-2 hari" },
  { id: "sicepat-reg", courier: "SiCepat", service: "Regular", etd: "2-3 hari" },
];

export const PAYMENT_METHODS = [
  { id: "qris", label: "QRIS", icon: "💳" },
  { id: "bca-transfer", label: "Transfer BCA", icon: "🏦" },
  { id: "bni-transfer", label: "Transfer BNI", icon: "🏦" },
];

export const POINTS_PER_IDR = 0.001; // 1 poin per Rp 1.000 belanja
export const LEVEL_THRESHOLDS = [0, 500, 1500, 3500, 7500, 15000];
