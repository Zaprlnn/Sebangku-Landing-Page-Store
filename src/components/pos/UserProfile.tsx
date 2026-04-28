"use client";

import { useMemo } from "react";
import { StaggerItem, StaggerList } from "@/components/motion/StaggerList";
import { RealtimeHighlight } from "@/components/motion/RealtimeHighlight";
import type { UserWithLogs } from "@/lib/pos/schema";

interface UserProfileProps {
  user: UserWithLogs;
}

export function UserProfile({ user }: UserProfileProps) {
  const recentLogs = useMemo(() => user.logs.slice(0, 4), [user.logs]);

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Loyalty</p>
          <h2 className="text-xl font-bold text-gray-900">Profil Pelanggan</h2>
          <p className="mt-1 text-sm text-gray-500">{user.full_name}</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
          {user.role ?? "CUSTOMER"}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
          <p className="text-xs text-gray-500">Total XP</p>
          <RealtimeHighlight className="text-2xl font-bold text-gray-900" value={user.total_xp ?? 0} />
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
          <p className="text-xs text-gray-500">Streak</p>
          <RealtimeHighlight className="text-2xl font-bold text-gray-900" value={user.streak_count ?? 0} />
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
          <p className="text-xs text-gray-500">Nomor HP</p>
          <p className="text-sm font-semibold text-gray-800">{user.phone_number ?? "-"}</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-sm font-semibold text-gray-900">Riwayat XP Terbaru</p>
        <StaggerList className="grid gap-3 sm:grid-cols-2">
          {recentLogs.map((log) => (
            <StaggerItem key={log.id} className="rounded-2xl border border-gray-100 bg-white p-3">
              <p className="text-xs text-gray-500">{log.description}</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">+{log.xp_added} XP</p>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
