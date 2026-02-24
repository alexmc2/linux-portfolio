'use client';

import { ReactNode } from 'react';
import { Maximize2, Minus, Square, X } from 'lucide-react';
import { Rnd } from 'react-rnd';

import { AppId, DesktopWindow } from '@/lib/types/desktop';

interface AppWindowProps {
  windowState: DesktopWindow;
  active: boolean;
  children: ReactNode;
  onFocus: (id: AppId) => void;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onMaximize: (id: AppId) => void;
  onPositionChange: (id: AppId, x: number, y: number) => void;
  onSizeChange: (id: AppId, width: number, height: number) => void;
}

export function AppWindow({
  windowState,
  active,
  children,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onPositionChange,
  onSizeChange,
}: AppWindowProps) {
  const windowContent = (
    <div
      className="flex h-full flex-col overflow-hidden rounded-xl border border-(--border-color) bg-(--surface-color) shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm"
      onMouseDown={() => onFocus(windowState.id)}
    >
      <div
        className="window-drag-handle flex h-10 items-center justify-between border-b border-(--border-color) bg-black/20 px-3"
        style={{ cursor: windowState.maximized ? 'default' : 'move' }}
      >
        <div className="truncate pr-3 text-xs font-semibold tracking-wide text-(--text-color) sm:text-sm">
          {windowState.title}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onMinimize(windowState.id)}
            type="button"
            title="Minimize"
            className="inline-flex h-6 w-6 items-center justify-center rounded bg-black/20 text-(--text-color) transition hover:bg-white/15"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onMaximize(windowState.id)}
            type="button"
            title={windowState.maximized ? 'Restore' : 'Maximize'}
            className="inline-flex h-6 w-6 items-center justify-center rounded bg-black/20 text-(--text-color) transition hover:bg-white/15"
          >
            {windowState.maximized ? (
              <Square className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            onClick={() => onClose(windowState.id)}
            type="button"
            title="Close"
            className="inline-flex h-6 w-6 items-center justify-center rounded bg-(--danger-color)/80 text-black transition hover:bg-(--danger-color)"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </div>
  );

  if (windowState.maximized) {
    return (
      <div
        className="absolute inset-0"
        style={{
          zIndex: windowState.z,
          padding: '6px',
          outline: active ? '1px solid var(--accent-color)' : 'none',
          outlineOffset: '-2px',
        }}
      >
        {windowContent}
      </div>
    );
  }

  return (
    <Rnd
      size={{ width: windowState.width, height: windowState.height }}
      position={{ x: windowState.x, y: windowState.y }}
      minWidth={460}
      minHeight={260}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      style={{
        zIndex: windowState.z,
        outline: active ? '1px solid var(--accent-color)' : 'none',
        outlineOffset: '1px',
      }}
      onDragStart={() => onFocus(windowState.id)}
      onDragStop={(_event, data) => onPositionChange(windowState.id, data.x, data.y)}
      onResizeStart={() => onFocus(windowState.id)}
      onResizeStop={(_event, _dir, ref, _delta, pos) => {
        onSizeChange(windowState.id, ref.offsetWidth, ref.offsetHeight);
        onPositionChange(windowState.id, pos.x, pos.y);
      }}
    >
      {windowContent}
    </Rnd>
  );
}
