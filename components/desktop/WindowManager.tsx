'use client';

import { ReactNode } from 'react';

import { AppId, DesktopWindow } from '@/lib/types/desktop';

import { AppWindow } from './AppWindow';

interface WindowManagerProps {
  windows: Record<AppId, DesktopWindow>;
  activeWindowId: AppId | null;
  renderApp: (id: AppId) => ReactNode;
  onFocus: (id: AppId) => void;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onMaximize: (id: AppId) => void;
  onPositionChange: (id: AppId, x: number, y: number) => void;
  onSizeChange: (id: AppId, width: number, height: number) => void;
}

export function WindowManager({
  windows,
  activeWindowId,
  renderApp,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onPositionChange,
  onSizeChange,
}: WindowManagerProps) {
  return (
    <section className="relative h-full w-full overflow-hidden">
      {(Object.keys(windows) as AppId[])
        .map((id) => windows[id])
        .filter((windowState) => windowState.open && !windowState.minimized)
        .sort((a, b) => a.z - b.z)
        .map((windowState) => (
          <AppWindow
            key={windowState.id}
            windowState={windowState}
            active={activeWindowId === windowState.id}
            onFocus={onFocus}
            onClose={onClose}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onPositionChange={onPositionChange}
            onSizeChange={onSizeChange}
          >
            {renderApp(windowState.id)}
          </AppWindow>
        ))}
    </section>
  );
}
