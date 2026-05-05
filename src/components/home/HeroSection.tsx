"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATS = [
  { value: "10.000+", label: "Produk Tersedia", icon: "📦" },
  { value: "500+", label: "Reseller Aktif", icon: "🤝" },
  { value: "4.9/5", label: "Rating Terbaik", icon: "⭐" },
  { value: "50+", label: "Kota Dikirim", icon: "🚚" },
];

const ROTATING_WORDS = ["Edukatif", "Smartif", "Fun"];

const HERO_CARDS = [
  {
    emoji: "🦊",
    name: "FoxMath",
    bg: "#c2410c",
    glowColor: "rgba(249,115,22,0.5)",
    stars: 4.8,
    badge: "🔢",
    badgeLabel: "Matematika",
    price: "Rp 125.000",
  },
  {
    emoji: "🦌",
    name: "DeerWord",
    bg: "#7c3aed",
    glowColor: "rgba(139,92,246,0.5)",
    stars: 4.9,
    badge: "📖",
    badgeLabel: "Bahasa",
    price: "Rp 89.000",
  },
  {
    emoji: "🐻",
    name: "BearLogic",
    bg: "#0369a1",
    glowColor: "rgba(14,165,233,0.5)",
    stars: 4.7,
    badge: "🧠",
    badgeLabel: "Logika",
    price: "Rp 149.000",
  },
  {
    emoji: "🐼",
    name: "PandaStrat",
    bg: "#1e293b",
    glowColor: "rgba(100,116,139,0.5)",
    stars: 5.0,
    badge: "♟️",
    badgeLabel: "Strategi",
    price: "Rp 175.000",
  },
  {
    emoji: "🦁",
    name: "LionKing",
    bg: "#b45309",
    glowColor: "rgba(245,158,11,0.5)",
    stars: 4.8,
    badge: "👑",
    badgeLabel: "Kompetisi",
    price: "Rp 210.000",
  },
  {
    emoji: "🐸",
    name: "FrogScience",
    bg: "#15803d",
    glowColor: "rgba(34,197,94,0.5)",
    stars: 4.6,
    badge: "🔬",
    badgeLabel: "Sains",
    price: "Rp 99.000",
  },
  {
    emoji: "🦋",
    name: "ButterflyArt",
    bg: "#be185d",
    glowColor: "rgba(236,72,153,0.5)",
    stars: 4.7,
    badge: "🎨",
    badgeLabel: "Seni",
    price: "Rp 115.000",
  },
  {
    emoji: "🐬",
    name: "DolphinGeo",
    bg: "#0e7490",
    glowColor: "rgba(6,182,212,0.5)",
    stars: 4.8,
    badge: "🌍",
    badgeLabel: "Geografi",
    price: "Rp 135.000",
  },
];

// Animated rotating word component
function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block relative"
      style={{ minWidth: "160px", verticalAlign: "bottom" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[index]}
          initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -40, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{
            background: "linear-gradient(90deg, #facc15, #fb923c)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function HeroSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const posRef = useRef(0);
  const animFrameRef = useRef<number>(0);

  // Smooth auto-scroll using requestAnimationFrame with pause on hover/touch
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const speed = 0.7;

    const tick = () => {
      if (!isPausedRef.current && slider) {
        posRef.current += speed;
        const half = slider.scrollWidth / 2;
        if (posRef.current >= half) {
          posRef.current = 0;
        }
        slider.scrollLeft = posRef.current;
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    const pause = () => { isPausedRef.current = true; };
    const resume = () => { isPausedRef.current = false; };

    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", resume);
    slider.addEventListener("touchstart", pause, { passive: true });
    slider.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      slider.removeEventListener("mouseenter", pause);
      slider.removeEventListener("mouseleave", resume);
      slider.removeEventListener("touchstart", pause);
      slider.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #060d24 0%, #0b1437 35%, #0f1e4a 70%, #0d1b3e 100%)",
        minHeight: "580px",
      }}
    >
      {/* Background decorative blobs */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute -top-20 left-1/3 w-96 h-96 rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #3b82f6, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 -right-20 w-72 h-72 rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-10 left-10 w-56 h-56 rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #f59e0b, transparent 70%)",
          }}
        />
        {/* Subtle grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Hero content */}
      <div className="container relative z-10">
        <div className="pt-12 pb-6 text-center">
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-semibold"
            style={{
              background: "rgba(59,130,246,0.15)",
              color: "#93c5fd",
              border: "1px solid rgba(59,130,246,0.25)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            #1 Toko Board Game Edukatif Indonesia
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-white"
          >
            Belajar Lebih Seru dengan{" "}
            <br className="hidden sm:block" />
            Board Game <RotatingWord />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-sm sm:text-base text-blue-200/80 max-w-lg mx-auto mb-8 leading-relaxed"
          >
            Temukan ribuan permainan seru yang dirancang bersama pendidik untuk
            mendukung tumbuh kembang anak dan kebersamaan keluarga.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold rounded-xl transition-all duration-200 hover:scale-105 btn-ripple"
              style={{
                background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                color: "white",
                boxShadow: "0 4px 24px rgba(59,130,246,0.45)",
              }}
            >
              🛒 Belanja Sekarang
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-white/20"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              Pelajari Lebih Lanjut
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Auto-scroll character slider */}
      <div className="relative w-full overflow-hidden pb-8">
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-hidden hide-scrollbar"
          style={{
            WebkitOverflowScrolling: "touch",
            padding: "8px 32px 16px",
          }}
          aria-hidden="true"
        >
          {/* Duplicate cards for seamless infinite loop */}
          {[...HERO_CARDS, ...HERO_CARDS].map((card, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 rounded-2xl cursor-pointer select-none"
              style={{
                width: "172px",
                background: `linear-gradient(160deg, ${card.bg}ee, ${card.bg}aa)`,
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: `0 6px 24px ${card.glowColor}`,
              }}
              whileHover={{
                scale: 1.08,
                y: -8,
                boxShadow: `0 20px 48px ${card.glowColor}`,
                border: "1px solid rgba(255,255,255,0.35)",
              }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
            >
              <div className="relative p-5 pb-4 text-center">
                {/* Star rating */}
                <div
                  className="absolute top-3 right-3 flex items-center gap-0.5 rounded-full px-2 py-0.5"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  <span className="text-yellow-400 text-[10px]">★</span>
                  <span className="text-white text-[10px] font-bold">
                    {card.stars}
                  </span>
                </div>

                {/* Subject badge */}
                <div
                  className="absolute top-3 left-3 flex items-center justify-center w-7 h-7 rounded-full text-sm"
                  style={{ background: "rgba(255,255,255,0.22)" }}
                >
                  {card.badge}
                </div>

                {/* Character emoji */}
                <div className="text-6xl mb-3 mt-6 transition-transform duration-300">
                  {card.emoji}
                </div>

                <p className="text-white text-sm font-bold mb-0.5 truncate">
                  {card.name}
                </p>
                <p
                  className="text-[11px] font-medium mb-1.5"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {card.badgeLabel}
                </p>
                <p className="text-white text-xs font-semibold">{card.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fade-out edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none"
          style={{ background: "linear-gradient(to right, #060d24, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none"
          style={{ background: "linear-gradient(to left, #060d24, transparent)" }}
        />
      </div>

      {/* Stats bar */}
      <div
        className="relative z-10"
        style={{
          background: "rgba(0,0,0,0.25)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.08]">
            {STATS.map(({ value, label, icon }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.08 }}
                className="flex flex-col items-center py-4 gap-0.5"
              >
                <span className="text-xl mb-0.5" aria-hidden="true">
                  {icon}
                </span>
                <span className="text-xl font-extrabold text-white">
                  {value}
                </span>
                <span className="text-[10px] text-blue-300/70 font-medium">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
