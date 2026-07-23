"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSupabaseUser, useUserOrders } from "@/lib/supabase/hooks";
import type { OrderStatus } from "@/lib/types";

const notifyingStatuses = new Set<OrderStatus>(["paid", "preparing", "ready", "customer_late"]);

type NotificationLinkProps = {
  className?: string;
  iconClassName?: string;
};

export function NotificationLink({
  className = "",
  iconClassName = "w-6 h-6",
}: NotificationLinkProps) {
  const { data: user } = useSupabaseUser();
  const { data: orders = [] } = useUserOrders(user?.id);
  const [clearedIds, setClearedIds] = useState<Set<string>>(new Set());
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user?.id) {
      setClearedIds(new Set());
      setSeenIds(new Set());
      return;
    }

    const readCleared = () => {
      const saved = localStorage.getItem(`edge-cleared-notifications-${user.id}`);
      setClearedIds(new Set(saved ? JSON.parse(saved) : []));
    };
    const readSeen = () => {
      const saved = localStorage.getItem(`edge-seen-notifications-${user.id}`);
      setSeenIds(new Set(saved ? JSON.parse(saved) : []));
    };

    readCleared();
    readSeen();
    window.addEventListener("edge-cleared-notifications-updated", readCleared);
    window.addEventListener("edge-seen-notifications-updated", readSeen);
    window.addEventListener("storage", readCleared);
    window.addEventListener("storage", readSeen);
    return () => {
      window.removeEventListener("edge-cleared-notifications-updated", readCleared);
      window.removeEventListener("edge-seen-notifications-updated", readSeen);
      window.removeEventListener("storage", readCleared);
      window.removeEventListener("storage", readSeen);
    };
  }, [user?.id]);

  const hasNotifications = useMemo(
    () =>
      orders.some(
        (order) =>
          notifyingStatuses.has(order.status) && !clearedIds.has(order.id) && !seenIds.has(order.id)
      ),
    [orders, clearedIds, seenIds]
  );

  return (
    <Link
      href="/notifications"
      aria-label="Notifications"
      className={`relative flex items-center justify-center transition-smooth focus-dashed ${className}`}
    >
      <span className={`relative block ${iconClassName}`}>
        <img src="/icons/notification-black.svg" alt="" className="w-full h-full dark:hidden object-contain" loading="eager" decoding="sync" />
        <img src="/icons/notification-white.svg" alt="" className="hidden w-full h-full dark:block object-contain" loading="eager" decoding="sync" />
        {hasNotifications && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-background" />
        )}
      </span>
    </Link>
  );
}
