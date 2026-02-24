'use client';

import { useEffect, useMemo, useState } from 'react';
import { BatteryFull, ChevronDown, Volume2, Wifi } from 'lucide-react';

interface TopBarProps {
  isMobile: boolean;
  onToggleOverview: () => void;
}

export function TopBar({ isMobile, onToggleOverview }: TopBarProps) {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const centerTime = useMemo(
    () =>
      now.toLocaleString([], {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    [now],
  );

  return (
    <header className="desktop-topbar fixed inset-x-0 top-0 z-1200 h-10 border-b border-(--border-color) bg-(--topbar-color) px-2 text-(--topbar-text) backdrop-blur-md sm:px-4">
      {isMobile ? (
        <div className="mx-auto flex h-full w-full items-center justify-between gap-2">
          <button
            onClick={onToggleOverview}
            className="rounded px-2 py-1 text-xs font-medium tracking-wide transition hover:bg-white/10 sm:px-3 sm:text-sm"
            type="button"
          >
            Show Apps
          </button>

          <p className="min-w-0 truncate text-[11px] font-semibold tracking-wide sm:text-sm">
            {centerTime}
          </p>

          <div className="flex items-center gap-1 rounded-full bg-black/20 px-2 py-1 text-xs sm:gap-2 sm:px-3">
            <Wifi className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </div>
        </div>
      ) : (
        <div className="relative mx-auto flex h-full w-full max-w-475 items-center">
          <div className="flex items-center gap-1 text-(--muted-color)" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </div>

          <p className="pointer-events-none absolute left-1/2 min-w-0 -translate-x-1/2 truncate text-xs font-semibold tracking-wide">
            {centerTime}
          </p>

          <div className="ml-auto flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 text-xs">
            <Wifi className="h-3.5 w-3.5" />
            <Volume2 className="h-3.5 w-3.5" />
            <BatteryFull className="h-3.5 w-3.5" />
            <span>alex</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
        </div>
      )}
    </header>
  );
}
