"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

interface Props {
  level: number;
  xp: number;
  xpToNext: number;
}

const LEVEL_COLORS: Record<number, { bar: string; badge: string; glow: string }> = {
  1: { bar: "from-blue-400 to-blue-600",   badge: "bg-blue-100 text-blue-700",   glow: "rgba(59,130,246,0.35)" },
  2: { bar: "from-emerald-400 to-emerald-600", badge: "bg-emerald-100 text-emerald-700", glow: "rgba(16,185,129,0.35)" },
  3: { bar: "from-violet-400 to-violet-600", badge: "bg-violet-100 text-violet-700", glow: "rgba(139,92,246,0.35)" },
  4: { bar: "from-amber-400 to-orange-500", badge: "bg-amber-100 text-amber-700", glow: "rgba(245,158,11,0.35)" },
  5: { bar: "from-rose-400 to-pink-600",  badge: "bg-rose-100 text-rose-700",   glow: "rgba(244,63,94,0.35)" },
};

const LEVEL_NAMES: Record<number, string> = {
  1: "Pemula",
  2: "Petualang",
  3: "Pejuang",
  4: "Juara",
  5: "Legenda",
};

export function LevelProgressBar({ level, xp, xpToNext }: Props) {
  const colors = LEVEL_COLORS[level] ?? LEVEL_COLORS[1];
  const name   = LEVEL_NAMES[level]  ?? `Level ${level}`;
  const pct    = xpToNext > 0 ? Math.min((xp / xpToNext) * 100, 100) : 100;

  // Animated counter for XP
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 60, damping: 18 });
  const displayed = useTransform(spring, (v) => Math.round(v).toLocaleString("id-ID"));

  useEffect(() => {
    raw.set(xp);
  }, [xp, raw]);

  return (
    <div className="space-y-2">
      {/* Header row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-lg px-2.5 py-0.5 text-xs font-bold ${colors.badge}`}
          >
            Lv. {level} — {name}
          </span>
        </div>
        <p className="text-xs text-gray-500 shrink-0">
          <motion.span>{displayed}</motion.span>
          {" / "}
          {xpToNext.toLocaleString("id-ID")} XP
        </p>
      </div>

      {/* Progress track */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colors.bar}`}
          initial={{ width: "0%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ boxShadow: `0 0 12px ${colors.glow}` }}
        />
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 -skew-x-12 bg-white/25"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.6, delay: 0.8, ease: "easeInOut" }}
        />
      </div>

      {/* Percentage label */}
      <p className="text-right text-[11px] font-semibold text-gray-400">
        {pct.toFixed(0)}% menuju Level {level + 1}
      </p>
    </div>
  );
}
