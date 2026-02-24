'use client';

import { appDefinitions } from '@/lib/content/apps';
import { AppId, DesktopWindow } from '@/lib/types/desktop';

import { AppIcon } from './AppIcon';

interface DockProps {
  windows: Record<AppId, DesktopWindow>;
  activeWindowId: AppId | null;
  onAppClick: (appId: AppId) => void;
}

export function Dock({ windows, activeWindowId, onAppClick }: DockProps) {
  return (
    <aside className="pointer-events-none fixed bottom-4 left-3 top-14 z-1100 flex w-16">
      <div className="pointer-events-auto flex w-full flex-col items-center gap-2 rounded-2xl border border-(--border-color) bg-(--dock-color) px-2 py-3 shadow-2xl backdrop-blur-xl">
        {appDefinitions.map((app) => {
          const state = windows[app.id];
          const isOpen = state.open;
          const isActive =
            activeWindowId === app.id && !state.minimized && state.open;
          const isMinimized = state.open && state.minimized;

          return (
            <button
              type="button"
              key={app.id}
              title={app.dockLabel}
              onClick={() => onAppClick(app.id)}
              className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-transparent transition duration-150 hover:scale-105 hover:bg-white/15"
              style={{
                borderColor: isActive ? 'var(--accent-color)' : 'transparent',
                background: isActive ? 'rgba(255,255,255,0.12)' : undefined,
              }}
            >
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: app.color }}
              >
                <AppIcon appId={app.id} />
              </span>
              {isOpen ? (
                <span
                  className="absolute -right-1 h-2 w-1 rounded-full"
                  style={{
                    backgroundColor: isMinimized
                      ? 'var(--muted-color)'
                      : 'var(--accent-color)',
                    opacity: isActive ? 1 : 0.8,
                  }}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
