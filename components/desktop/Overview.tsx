'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { appDefinitions } from '@/lib/content/apps';
import { AppId, DesktopWindow } from '@/lib/types/desktop';

import { AppIcon } from './AppIcon';

interface OverviewProps {
  open: boolean;
  windows: Record<AppId, DesktopWindow>;
  onClose: () => void;
  onOpenApp: (appId: AppId) => void;
}

export function Overview({ open, windows, onClose, onOpenApp }: OverviewProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return appDefinitions;
    }

    const normalized = query.trim().toLowerCase();

    return appDefinitions.filter((app) => {
      return (
        app.title.toLowerCase().includes(normalized) ||
        app.dockLabel.toLowerCase().includes(normalized) ||
        app.command.toLowerCase().includes(normalized)
      );
    });
  }, [query]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-1300 flex items-start justify-center bg-black/60 px-4 pb-8 pt-20 backdrop-blur-sm">
      <div className="w-full max-w-4xl rounded-2xl border border-(--border-color) bg-(--surface-color) p-5 shadow-2xl">
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-(--border-color) bg-black/20 px-3 py-2">
          <Search className="h-4 w-4 text-(--muted-color)" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search apps..."
            className="w-full bg-transparent text-sm text-(--text-color) outline-none placeholder:text-(--muted-color)"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-white/10 px-2 py-1 text-xs transition hover:bg-white/20"
          >
            Esc
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {filtered.map((app) => {
            const state = windows[app.id];
            const running = state?.open ?? false;

            return (
              <button
                key={app.id}
                type="button"
                onClick={() => {
                  onOpenApp(app.id);
                  onClose();
                }}
                className="group rounded-xl border border-(--border-color) bg-black/20 p-4 text-left transition hover:bg-black/30"
              >
                <span
                  className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: app.color }}
                >
                  <AppIcon appId={app.id} />
                </span>
                <p className="text-sm font-semibold text-(--text-color)">
                  {app.dockLabel}
                </p>
                <p className="text-xs text-(--muted-color)">
                  {running ? 'Running' : 'Open app'}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
