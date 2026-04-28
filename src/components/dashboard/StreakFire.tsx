"use client";

import { motion } from "framer-motion";

interface Props {
  streak: number;
}

function StreakLabel(streak: number): { label: string; emoji: string; color: string } {
  if (streak >= 30) return { label: "Legenda 🏆", emoji: "🔥", color: "from-rose-500 to-orange-400" };
  if (streak >= 14) return { label: "Berapi-api!", emoji: "🔥", color: "from-orange-500 to-amber-400" };
  if (streak >= 7)  return { label: "Semangat!",  emoji: "🔥", color: "from-amber-500 to-yellow-400" };
  if (streak >= 3)  return { label: "Terus jaga!", emoji: "🌟", color: "from-yellow-400 to-lime-400" };
  return               { label: "Mulai streak!", emoji: "✨", color: "from-blue-400 to-cyan-400" };
}

export function StreakFire({ streak }: Props) {
  const { label, emoji, color } = StreakLabel(streak);

  return (
    <div className="flex items-center gap-3">
      {/* Animated fire icon */}
      <div className="relative">
        <motion.span
          className="block text-3xl leading-none select-none"
          animate={{
            scale: [1, 1.15, 0.95, 1.1, 1],
            rotate: [-4, 4, -3, 3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.span>

        {/* Glow ring */}
        {streak >= 7 && (
          <motion.div
            className={`absolute inset-0 -z-10 rounded-full bg-gradient-to-br ${color} blur-md opacity-0`}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
          />
        )}
      </div>

      {/* Counter + label */}
      <div>
        <div className="flex items-baseline gap-1">
          <motion.span
            key={streak}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`bg-gradient-to-r ${color} bg-clip-text text-2xl font-extrabold text-transparent`}
          >
            {streak}
          </motion.span>
          <span className="text-sm font-semibold text-gray-500">hari</span>
        </div>
        <p className="text-xs font-medium text-gray-400">{label}</p>
      </div>
    </div>
  );
}
