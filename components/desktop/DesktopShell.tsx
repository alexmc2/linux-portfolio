'use client';

import { useEffect, useMemo, useState } from 'react';

import { AboutApp } from '@/components/apps/AboutApp';
import { BlogApp } from '@/components/apps/BlogApp';
import { ContactApp } from '@/components/apps/ContactApp';
import { ExperienceApp } from '@/components/apps/ExperienceApp';
import { FilesApp } from '@/components/apps/FilesApp';
import { ProjectsApp } from '@/components/apps/ProjectsApp';
import { SettingsApp } from '@/components/apps/SettingsApp';
import { SkillsApp } from '@/components/apps/SkillsApp';
import { TerminalApp } from '@/components/apps/TerminalApp';
import { BootOverlay } from '@/components/desktop/BootOverlay';
import { Dock } from '@/components/desktop/Dock';
import { KernelPanicOverlay } from '@/components/desktop/KernelPanicOverlay';
import { Overview } from '@/components/desktop/Overview';
import { TopBar } from '@/components/desktop/TopBar';
import { WindowManager } from '@/components/desktop/WindowManager';
import { AppId } from '@/lib/types/desktop';
import { useDesktopStore } from '@/lib/store/desktop-store';
import { getDesktopStyle } from '@/lib/themes/desktop-style';

const MOBILE_BREAKPOINT = 960;
const STARTUP_DURATION_MS = 4000;
const PANIC_RELOAD_DURATION_MS = 3000;

const getStartupBootProgress = (elapsedMs: number): number => {
  const t = Math.max(0, Math.min(elapsedMs / STARTUP_DURATION_MS, 1));

  if (t <= 0.55) {
    return (t / 0.55) * 88;
  }

  if (t <= 0.85) {
    return 88 + ((t - 0.55) / 0.3) * 9;
  }

  return 97 + ((t - 0.85) / 0.15) * 3;
};

export function DesktopShell() {
  const hydrated = useDesktopStore((state) => state.hydrated);
  const windows = useDesktopStore((state) => state.windows);
  const activeWindowId = useDesktopStore((state) => state.activeWindowId);
  const overviewOpen = useDesktopStore((state) => state.overviewOpen);
  const theme = useDesktopStore((state) => state.theme);
  const panicMode = useDesktopStore((state) => state.panicMode);
  const panicProgress = useDesktopStore((state) => state.panicProgress);

  const openApp = useDesktopStore((state) => state.openApp);
  const closeApp = useDesktopStore((state) => state.closeApp);
  const focusApp = useDesktopStore((state) => state.focusApp);
  const minimizeApp = useDesktopStore((state) => state.minimizeApp);
  const toggleFromDock = useDesktopStore((state) => state.toggleFromDock);
  const toggleMaximizeApp = useDesktopStore((state) => state.toggleMaximizeApp);
  const setWindowPosition = useDesktopStore((state) => state.setWindowPosition);
  const setWindowSize = useDesktopStore((state) => state.setWindowSize);
  const setOverviewOpen = useDesktopStore((state) => state.setOverviewOpen);
  const setPanicProgress = useDesktopStore((state) => state.setPanicProgress);

  const [isMobile, setIsMobile] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [startupProgress, setStartupProgress] = useState(0);
  const [startupComplete, setStartupComplete] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    update();
    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (useDesktopStore.persist.hasHydrated()) {
      useDesktopStore.setState({ hydrated: true });
    }

    const unsub = useDesktopStore.persist.onFinishHydration(() => {
      useDesktopStore.setState({ hydrated: true });
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const start = window.performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = getStartupBootProgress(elapsed);

      setStartupProgress(progress);

      if (progress >= 100) {
        setStartupComplete(true);
        return;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOverviewOpen(false);
      }

      if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 't') {
        event.preventDefault();
        openApp('terminal');
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openApp, setOverviewOpen]);

  useEffect(() => {
    if (panicMode !== 'panic') {
      return;
    }

    let frame = 0;
    const start = window.performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(100, (elapsed / PANIC_RELOAD_DURATION_MS) * 100);

      setPanicProgress(progress);

      if (progress >= 100) {
        window.location.reload();
        return;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [panicMode, setPanicProgress]);

  const desktopStyle = useMemo(() => getDesktopStyle(theme), [theme]);
  const startupScreenProgress = startupProgress;

  const renderApp = (id: AppId) => {
    switch (id) {
      case 'about':
        return <AboutApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'skills':
        return <SkillsApp />;
      case 'experience':
        return <ExperienceApp />;
      case 'contact':
        return <ContactApp />;
      case 'blog':
        return <BlogApp />;
      case 'files':
        return <FilesApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'settings':
        return <SettingsApp />;
      default:
        return null;
    }
  };

  if (!hydrated || !startupComplete) {
    return <BootOverlay progress={startupScreenProgress} mode="startup" />;
  }

  return (
    <div
      className={`relative min-h-screen overflow-hidden text-(--text-color) ${theme.effects.retroCrt ? 'retro-crt' : ''}`}
      style={desktopStyle}
      onMouseMove={(event) => {
        if (!theme.effects.cursorGlow || isMobile) {
          return;
        }

        setCursor({ x: event.clientX, y: event.clientY });
      }}
    >
      <TopBar isMobile={isMobile} onToggleOverview={() => setOverviewOpen(!overviewOpen)} />
      <Dock
        isMobile={isMobile}
        windows={windows}
        activeWindowId={activeWindowId}
        onAppClick={toggleFromDock}
      />

      <main className={isMobile ? 'absolute inset-0 px-2 pb-24 pt-11' : 'absolute inset-0 pb-3 pl-18.5 pr-3 pt-10'}>
        <WindowManager
          isMobile={isMobile}
          windows={windows}
          activeWindowId={activeWindowId}
          renderApp={renderApp}
          onFocus={focusApp}
          onClose={closeApp}
          onMinimize={minimizeApp}
          onMaximize={toggleMaximizeApp}
          onPositionChange={setWindowPosition}
          onSizeChange={setWindowSize}
        />
      </main>

      <Overview
        open={overviewOpen}
        windows={windows}
        onClose={() => setOverviewOpen(false)}
        onOpenApp={openApp}
      />

      {theme.effects.showGrid ? (
        <div className="desktop-grid pointer-events-none fixed inset-0 z-10" />
      ) : null}
      {theme.effects.scanlines ? (
        <div className="desktop-scanlines pointer-events-none fixed inset-0 z-11" />
      ) : null}
      {theme.effects.cursorGlow && !isMobile ? (
        <div
          className="pointer-events-none fixed z-12 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: cursor.x,
            top: cursor.y,
            background:
              'radial-gradient(circle, color-mix(in srgb, var(--accent-color) 45%, transparent) 0%, rgba(0,0,0,0) 68%)',
            mixBlendMode: 'screen',
          }}
        />
      ) : null}

      {panicMode === 'panic' ? <KernelPanicOverlay progress={panicProgress} /> : null}
    </div>
  );
}
