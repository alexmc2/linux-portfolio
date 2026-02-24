'use client';

import { appDefinitionMap } from '@/lib/content/apps';
import { AppId, DesktopWindow } from '@/lib/types/desktop';

import { AppIcon } from './AppIcon';

const desktopShortcutIds: AppId[] = [
  'about',
  'projects',
  'skills',
  'experience',
  'contact',
  'blog',
];

interface DesktopShortcutsProps {
  isMobile: boolean;
  windows: Record<AppId, DesktopWindow>;
  activeWindowId: AppId | null;
  onOpenApp: (appId: AppId) => void;
}

export function DesktopShortcuts({
  isMobile,
  windows,
  activeWindowId,
  onOpenApp,
}: DesktopShortcutsProps) {
  if (isMobile) {
    return null;
  }

  return (
    <section className="pointer-events-none absolute inset-y-0 left-20 right-0 z-0">
      <div className="pointer-events-auto absolute left-2 top-12 grid grid-cols-2 gap-x-4 gap-y-4">
        {desktopShortcutIds.map((appId) => {
          const app = appDefinitionMap[appId];
          const state = windows[appId];
          const isOpen = state?.open ?? false;
          const isMinimized = state?.minimized ?? false;
          const isActive = activeWindowId === appId && isOpen && !isMinimized;

          return (
            <button
              key={appId}
              type="button"
              onClick={() => onOpenApp(appId)}
              className="group flex w-24 flex-col items-center rounded-xl px-1 py-1.5 text-center transition hover:bg-white/10"
            >
              <span
                className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl border shadow-lg"
                style={{
                  backgroundColor: app.color,
                  borderColor: isActive
                    ? 'var(--accent-color)'
                    : 'rgba(255,255,255,0.22)',
                }}
              >
                <AppIcon appId={appId} className="h-5 w-5 text-black/85" />
                {isOpen ? (
                  <span
                    className="absolute -bottom-1 h-1.5 w-6 rounded-full"
                    style={{
                      backgroundColor: isMinimized
                        ? 'var(--muted-color)'
                        : 'var(--accent-color)',
                    }}
                  />
                ) : null}
              </span>
              <span className="mt-1 w-full truncate px-1 text-xs font-medium text-(--topbar-text)">
                {app.dockLabel}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
