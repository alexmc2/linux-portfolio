'use client';

import { useEffect, useMemo, useState } from 'react';
import { BatteryFull, ChevronDown, Volume2, Wifi } from 'lucide-react';

interface TopBarProps {
  onToggleOverview: () => void;
}

export function TopBar({ onToggleOverview }: TopBarProps) {
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
    <header className="desktop-topbar fixed inset-x-0 top-0 z-1200 h-10 border-b border-(--border-color) bg-(--topbar-color) px-4 text-(--topbar-text) backdrop-blur-md">
      <div className="mx-auto flex h-full w-full max-w-475 items-center justify-between">
        <button
          onClick={onToggleOverview}
          className="rounded px-3 py-1 text-sm font-medium tracking-wide transition hover:bg-white/10"
          type="button"
        >
          Activities
        </button>

        <p className="text-xs font-semibold tracking-wide sm:text-sm">
          {centerTime}
        </p>

        <div className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 text-xs">
          <Wifi className="h-3.5 w-3.5" />
          <Volume2 className="h-3.5 w-3.5" />
          <BatteryFull className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">alex</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </div>
      </div>
    </header>
  );
}
