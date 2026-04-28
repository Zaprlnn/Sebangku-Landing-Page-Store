"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Tables } from "@/lib/types/database";

type PointsLedger = Tables<"points_ledger">;

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface Props {
  history: PointsLedger[];
}

export function PointHistoryList({ history }: Props) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <span className="text-4xl">📭</span>
        <p className="text-sm font-semibold text-gray-500">
          Belum ada riwayat poin
        </p>
        <p className="text-xs text-gray-400">
          Mulai belanja untuk mendapatkan poin reward!
        </p>
      </div>
    );
  }

  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      animate="show"
      className="divide-y divide-gray-100"
    >
      <AnimatePresence>
        {history.map((entry) => {
          const isCredit = entry.points_delta > 0;
          return (
            <motion.li
              key={entry.id}
              variants={itemVariants}
              layout
              className="flex items-center gap-3 py-3 sm:gap-4"
            >
              {/* Icon badge */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base ${
                  isCredit
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-500"
                }`}
              >
                {isCredit ? "⭐" : "🎁"}
              </div>

              {/* Description & date */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {entry.note ?? (isCredit ? "Poin masuk" : "Poin keluar")}
                </p>
                <p className="text-xs text-gray-400">
                  {formatDate(entry.created_at)}
                </p>
              </div>

              {/* Delta */}
              <span
                className={`shrink-0 text-sm font-bold ${
                  isCredit ? "text-emerald-600" : "text-rose-500"
                }`}
              >
                {isCredit ? "+" : ""}
                {entry.points_delta.toLocaleString("id-ID")}
              </span>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </motion.ul>
  );
}
