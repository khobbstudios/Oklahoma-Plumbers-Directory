"use client";

import { useEffect, useState } from "react";
import { isOpenNow, type BusinessHours } from "@/lib/hours";

export function OpenStatusBadge({ hours }: { hours: BusinessHours }) {
  // Computed synchronously on first render (server and client) so the badge
  // never has a blank "pending" flash while client JS hydrates on mobile.
  const [open, setOpen] = useState(() => isOpenNow(hours));

  useEffect(() => {
    const update = () => setOpen(isOpenNow(hours));
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [hours]);

  return (
    <span
      className={`status-badge ${open ? "status-badge--open" : "status-badge--closed"}`}
      role="status"
      suppressHydrationWarning
    >
      <span className="status-dot" aria-hidden="true" />
      {open ? "Open Now" : "Closed"}
    </span>
  );
}
