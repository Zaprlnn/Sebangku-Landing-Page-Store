"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Reward } from "@/lib/queries/points";

interface Props {
  reward: Reward;
  userPoints: number;
  onRedeem?: (rewardId: string) => Promise<void>;
}

export function RewardCard({ reward, userPoints, onRedeem }: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const canRedeem = userPoints >= reward.points_cost && reward.is_active && !done;

  const handleRedeem = async () => {
    if (!canRedeem || !onRedeem) return;
    setLoading(true);
    try {
      await onRedeem(reward.id);
      setDone(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(0,0,0,0.09)" }}
      className="relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow"
    >
      {/* Inactive overlay */}
      {!reward.is_active && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-gray-100/70 backdrop-blur-[2px]">
          <span className="rounded-lg bg-gray-200 px-3 py-1 text-xs font-bold text-gray-500">
            Tidak Tersedia
          </span>
        </div>
      )}

      {/* Color band */}
      <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-violet-500" />

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Icon + name */}
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-violet-50 text-2xl">
            🎁
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-gray-900">{reward.name}</p>
            {reward.description && (
              <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">
                {reward.description}
              </p>
            )}
          </div>
        </div>

        {/* Cost badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 border border-amber-100">
            ⭐ {reward.points_cost.toLocaleString("id-ID")} Poin
          </span>
          {!canRedeem && !done && reward.is_active && (
            <span className="text-xs text-rose-500 font-medium">
              Poin kurang {(reward.points_cost - userPoints).toLocaleString("id-ID")}
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Redeem button */}
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-50 py-2.5 text-sm font-semibold text-emerald-600"
            >
              ✅ Berhasil ditukar!
            </motion.div>
          ) : (
            <motion.button
              key="btn"
              onClick={handleRedeem}
              disabled={!canRedeem || loading}
              whileTap={canRedeem && !loading ? { scale: 0.96 } : {}}
              className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                canRedeem
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "cursor-not-allowed bg-gray-100 text-gray-400"
              }`}
            >
              {loading ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Tukar Sekarang"
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
