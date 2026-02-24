'use client';

import Image from 'next/image';
import { LayoutGrid } from 'lucide-react';

import { appDefinitions } from '@/lib/content/apps';
import { socialLinks } from '@/lib/content/portfolio-content';
import { AppId, DesktopWindow } from '@/lib/types/desktop';

import { AppIcon } from './AppIcon';

type DockItem =
  | {
      type: 'app';
      id: string;
      label: string;
      appId: AppId;
      iconPath: string;
    }
  | {
      type: 'external';
      id: string;
      label: string;
      href: string;
      iconPath: string;
    };

const desktopDockItems: DockItem[] = [
  {
    type: 'external',
    id: 'chrome-linkedin',
    label: 'Chrome (LinkedIn)',
    href: socialLinks.linkedin,
    iconPath: '/ubuntu-icons/chrome.png',
  },
  {
    type: 'app',
    id: 'vscode',
    label: 'Visual Studio Code',
    appId: 'code',
    iconPath: '/ubuntu-icons/vscode.png',
  },
  {
    type: 'app',
    id: 'files',
    label: 'Files',
    appId: 'files',
    iconPath: '/ubuntu-icons/files.png',
  },
  {
    type: 'app',
    id: 'terminal',
    label: 'Terminal',
    appId: 'terminal',
    iconPath: '/ubuntu-icons/terminal.png',
  },
  {
    type: 'app',
    id: 'notes',
    label: 'Text Editor',
    appId: 'notes',
    iconPath: '/ubuntu-icons/text-editor.png',
  },
  {
    type: 'app',
    id: 'settings',
    label: 'Settings',
    appId: 'settings',
    iconPath: '/ubuntu-icons/settings.png',
  },
];

interface DockProps {
  isMobile: boolean;
  windows: Record<AppId, DesktopWindow>;
  activeWindowId: AppId | null;
  overviewOpen: boolean;
  onAppClick: (appId: AppId) => void;
  onToggleOverview: () => void;
  onOpenExternalLink: (url: string) => void;
}

export function Dock({
  isMobile,
  windows,
  activeWindowId,
  overviewOpen,
  onAppClick,
  onToggleOverview,
  onOpenExternalLink,
}: DockProps) {
  if (isMobile) {
    return (
      <aside className="pointer-events-none fixed inset-x-0 bottom-2 z-1100 flex justify-center px-2">
        <div className="pointer-events-auto flex max-w-full items-center gap-2 overflow-x-auto rounded-2xl border border-(--border-color) bg-(--dock-color) px-3 py-2 shadow-2xl backdrop-blur-xl [scrollbar-width:none]">
          {appDefinitions.map((app) => {
            const state = windows[app.id];
            const isOpen = state?.open ?? false;
            const isActive = activeWindowId === app.id && isOpen && !(state?.minimized ?? false);
            const isMinimized = isOpen && (state?.minimized ?? false);

            return (
              <button
                type="button"
                key={app.id}
                title={app.dockLabel}
                onClick={() => onAppClick(app.id)}
                className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-transparent transition duration-150 hover:bg-white/15"
                style={{
                  borderColor: isActive ? 'var(--accent-color)' : 'transparent',
                  backgroundColor: isActive ? 'rgba(255,255,255,0.12)' : undefined,
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
                    className="absolute -bottom-1 h-1 w-2 rounded-full"
                    style={{
                      backgroundColor: isMinimized ? 'var(--muted-color)' : 'var(--accent-color)',
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

  return (
    <aside className="pointer-events-none fixed inset-y-0 left-0 z-1100 flex w-16">
      {/* Keep launchers below the fixed 40px top bar on desktop. */}
      <div className="pointer-events-auto flex h-full w-full flex-col items-center gap-1.5 border-r border-(--border-color) bg-(--dock-color) pb-2 pt-11 shadow-2xl backdrop-blur-md">
        {desktopDockItems.map((item) => {
          let isOpen = false;
          let isActive = false;
          let isMinimized = false;

          if (item.type === 'app') {
            const appState = windows[item.appId];

            if (appState) {
              isOpen = appState.open;
              isActive = activeWindowId === item.appId && appState.open && !appState.minimized;
              isMinimized = appState.open && appState.minimized;
            }
          }

          return (
            <button
              key={item.id}
              type="button"
              title={item.label}
              onClick={() => {
                if (item.type === 'external') {
                  onOpenExternalLink(item.href);
                  return;
                }

                onAppClick(item.appId);
              }}
              className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-transparent transition duration-150 hover:scale-105 hover:bg-white/12"
              style={{
                borderColor: isActive ? 'var(--accent-color)' : 'transparent',
                backgroundColor: isActive ? 'rgba(255,255,255,0.12)' : undefined,
              }}
            >
              <Image
                src={item.iconPath}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 select-none object-contain"
                loading="eager"
                draggable={false}
              />
              {isOpen ? (
                <span
                  className="absolute left-0 h-5 w-0.5 rounded-full"
                  style={{
                    backgroundColor: isMinimized ? 'var(--muted-color)' : 'var(--accent-color)',
                    opacity: isActive ? 1 : 0.9,
                  }}
                />
              ) : null}
            </button>
          );
        })}

        <button
          type="button"
          title="Show Applications"
          onClick={onToggleOverview}
          className="group relative mt-auto flex h-11 w-11 items-center justify-center rounded-xl border border-transparent transition duration-150 hover:scale-105 hover:bg-white/12"
          style={{
            borderColor: overviewOpen ? 'var(--accent-color)' : 'transparent',
            backgroundColor: overviewOpen ? 'rgba(255,255,255,0.12)' : undefined,
          }}
        >
          <LayoutGrid className="h-5 w-5 text-white/90" />
          {overviewOpen ? (
            <span
              className="absolute left-0 h-5 w-0.5 rounded-full"
              style={{
                backgroundColor: 'var(--accent-color)',
                opacity: 1,
              }}
            />
          ) : null}
        </button>
      </div>
    </aside>
  );
}
