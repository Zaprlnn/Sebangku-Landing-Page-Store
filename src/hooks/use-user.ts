"use client";

/**
 * useUser — hook untuk mengakses data user + poin di komponen manapun.
 *
 * Poin diambil via fetch awal + polling setiap 30 detik sebagai fallback
 * yang aman tanpa memerlukan konfigurasi Realtime di Supabase.
 * Setelah pembelian, router.refresh() di checkout akan men-trigger
 * re-mount yang menarik data terbaru dari DB.
 */

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/providers/auth-provider";
import type { User } from "@supabase/supabase-js";

export interface UseUserReturn {
  user: User | null;
  loading: boolean;
  points: number | null;
  pointsLoading: boolean;
  refreshPoints: () => Promise<void>;
}

const POINTS_STORAGE_PREFIX = "sebangku-points:";
const POINTS_EVENT = "sebangku-points-updated";

let pollingUserId: string | null = null;
let pollingInterval: ReturnType<typeof setInterval> | null = null;
let pollingSubscribers = 0;
let pollingFetch: ((userId: string) => Promise<void>) | null = null;

function getPointsKey(userId: string) {
  return `${POINTS_STORAGE_PREFIX}${userId}`;
}

function readStoredPoints(userId: string): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(getPointsKey(userId));
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function writeStoredPoints(userId: string, value: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(getPointsKey(userId), String(value));
  window.dispatchEvent(
    new CustomEvent(POINTS_EVENT, { detail: { userId, value } })
  );
}

export function persistUserPoints(userId: string, value: number) {
  writeStoredPoints(userId, value);
}

function startPolling(userId: string, fetcher: (userId: string) => Promise<void>) {
  pollingFetch = fetcher;
  if (pollingInterval && pollingUserId === userId) return;
  if (pollingInterval) clearInterval(pollingInterval);
  pollingUserId = userId;
  pollingInterval = setInterval(() => {
    if (pollingFetch) pollingFetch(userId);
  }, 30_000);
}

function stopPolling() {
  if (!pollingInterval) return;
  clearInterval(pollingInterval);
  pollingInterval = null;
  pollingUserId = null;
  pollingFetch = null;
}

export function useUser(): UseUserReturn {
  const { user, loading, supabase } = useAuth();
  const [points, setPoints] = useState<number | null>(null);
  const [pointsLoading, setPointsLoading] = useState(false);

  const updatePoints = useCallback((userId: string, value: number) => {
    setPoints(value);
    writeStoredPoints(userId, value);
  }, []);

  const fetchPoints = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("user_points")
      .select("balance")
      .eq("user_id", userId)
      .single();
    const nextPoints = data?.balance ?? 0;
    updatePoints(userId, nextPoints);
  }, [supabase, updatePoints]);

  const refreshPoints = useCallback(async () => {
    if (!user) return;
    await fetchPoints(user.id);
  }, [user, fetchPoints]);

  useEffect(() => {
    if (!user) {
      setPoints(null);
      return;
    }

    const stored = readStoredPoints(user.id);
    if (stored !== null) setPoints(stored);

    let cancelled = false;
    setPointsLoading(true);

    // Initial fetch
    supabase
      .from("user_points")
      .select("balance")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (!cancelled) {
          const nextPoints = data?.balance ?? 0;
          updatePoints(user.id, nextPoints);
          setPointsLoading(false);
        }
      });

    const handlePointsEvent = (event: Event) => {
      if (!(event instanceof CustomEvent)) return;
      const detail = event.detail as { userId?: string; value?: number } | null;
      if (!detail || detail.userId !== user.id) return;
      if (typeof detail.value === "number") setPoints(detail.value);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== getPointsKey(user.id)) return;
      const nextPoints = Number(event.newValue);
      if (Number.isFinite(nextPoints)) setPoints(nextPoints);
    };

    window.addEventListener(POINTS_EVENT, handlePointsEvent);
    window.addEventListener("storage", handleStorage);

    pollingSubscribers += 1;
    startPolling(user.id, fetchPoints);

    return () => {
      cancelled = true;
      pollingSubscribers = Math.max(0, pollingSubscribers - 1);
      if (pollingSubscribers === 0) stopPolling();
      window.removeEventListener(POINTS_EVENT, handlePointsEvent);
      window.removeEventListener("storage", handleStorage);
    };
  }, [user?.id, supabase, fetchPoints]);

  return { user, loading, points, pointsLoading, refreshPoints };
}
