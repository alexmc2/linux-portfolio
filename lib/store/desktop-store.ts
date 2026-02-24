'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { appDefinitions, appDefinitionMap } from '@/lib/content/apps';
import { defaultPresetId, getThemePreset } from '@/lib/themes/presets';
import {
  AppId,
  BackgroundMode,
  DesktopState,
  DesktopWindow,
  EffectsSettings,
  PersistedDesktopState,
  ThemeSettings,
} from '@/lib/types/desktop';

const createInitialWindows = (): Record<AppId, DesktopWindow> =>
  Object.fromEntries(
    appDefinitions.map((app, index) => [
      app.id,
      {
        id: app.id,
        title: app.title,
        x: app.defaultPosition.x,
        y: app.defaultPosition.y,
        width: app.defaultSize.width,
        height: app.defaultSize.height,
        z: index + 1,
        open: false,
        minimized: false,
        maximized: false,
      },
    ]),
  ) as Record<AppId, DesktopWindow>;

const defaultEffects: EffectsSettings = {
  showGrid: true,
  scanlines: false,
  cursorGlow: false,
  retroCrt: false,
  soundEffects: false,
};

const defaultTheme = (): ThemeSettings => {
  const preset = getThemePreset(defaultPresetId);

  return {
    preset: preset.id,
    backgroundMode: 'gradient',
    gradientIndex: 0,
    solidColor: preset.solid,
    wallpaper: preset.wallpaper ?? '',
    accentColor: preset.colors.accent,
    effects: defaultEffects,
  };
};

const defaultPersistedState = (): PersistedDesktopState => ({
  windows: createInitialWindows(),
  topZ: appDefinitions.length + 1,
  activeWindowId: null,
  theme: defaultTheme(),
});

const bringToFront = (state: DesktopState, id: AppId) => {
  const nextZ = state.topZ + 1;
  const target = state.windows[id];

  if (!target) {
    return state;
  }

  return {
    ...state,
    topZ: nextZ,
    activeWindowId: id,
    windows: {
      ...state.windows,
      [id]: {
        ...target,
        z: nextZ,
      },
    },
  };
};

export const useDesktopStore = create<DesktopState>()(
  persist(
    (set, get) => ({
      ...defaultPersistedState(),
      hydrated: false,
      overviewOpen: false,
      panicMode: 'none',
      panicProgress: 0,
      bootProgress: 0,
      openApp: (id) =>
        set((state) => {
          const target = state.windows[id];
          if (!target) {
            return state;
          }

          const openedState = {
            ...state,
            windows: {
              ...state.windows,
              [id]: {
                ...target,
                open: true,
                minimized: false,
              },
            },
          };

          return bringToFront(openedState, id);
        }),
      closeApp: (id) =>
        set((state) => {
          const target = state.windows[id];
          if (!target) {
            return state;
          }

          return {
            ...state,
            activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
            windows: {
              ...state.windows,
              [id]: {
                ...target,
                open: false,
                minimized: false,
                maximized: false,
                x: appDefinitionMap[id].defaultPosition.x,
                y: appDefinitionMap[id].defaultPosition.y,
                width: appDefinitionMap[id].defaultSize.width,
                height: appDefinitionMap[id].defaultSize.height,
              },
            },
          };
        }),
      focusApp: (id) =>
        set((state) => {
          const target = state.windows[id];
          if (!target || !target.open || target.minimized) {
            return state;
          }

          return bringToFront(state, id);
        }),
      minimizeApp: (id) =>
        set((state) => {
          const target = state.windows[id];
          if (!target || !target.open) {
            return state;
          }

          return {
            ...state,
            activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
            windows: {
              ...state.windows,
              [id]: {
                ...target,
                minimized: true,
              },
            },
          };
        }),
      toggleFromDock: (id) => {
        const state = get();
        const target = state.windows[id];

        if (!target.open) {
          get().openApp(id);
          return;
        }

        if (target.minimized) {
          get().openApp(id);
          return;
        }

        if (state.activeWindowId === id) {
          get().minimizeApp(id);
          return;
        }

        get().focusApp(id);
      },
      toggleMaximizeApp: (id) =>
        set((state) => {
          const target = state.windows[id];
          if (!target || !target.open) {
            return state;
          }

          const toggledState = {
            ...state,
            windows: {
              ...state.windows,
              [id]: {
                ...target,
                minimized: false,
                maximized: !target.maximized,
              },
            },
          };

          return bringToFront(toggledState, id);
        }),
      setWindowPosition: (id, x, y) =>
        set((state) => {
          const target = state.windows[id];
          if (!target || target.maximized) {
            return state;
          }

          return {
            ...state,
            windows: {
              ...state.windows,
              [id]: {
                ...target,
                x,
                y,
              },
            },
          };
        }),
      setWindowSize: (id, width, height) =>
        set((state) => {
          const target = state.windows[id];
          if (!target || target.maximized) {
            return state;
          }

          return {
            ...state,
            windows: {
              ...state.windows,
              [id]: {
                ...target,
                width,
                height,
              },
            },
          };
        }),
      setOverviewOpen: (open) => set((state) => ({ ...state, overviewOpen: open })),
      setThemePreset: (presetId) =>
        set((state) => {
          const preset = getThemePreset(presetId);

          return {
            ...state,
            theme: {
              ...state.theme,
              preset: preset.id,
              accentColor: preset.colors.accent,
              solidColor: preset.solid,
              wallpaper: state.theme.wallpaper || preset.wallpaper || '',
              gradientIndex: 0,
            },
          };
        }),
      setBackgroundMode: (mode: BackgroundMode) =>
        set((state) => ({
          ...state,
          theme: {
            ...state.theme,
            backgroundMode: mode,
          },
        })),
      setGradientIndex: (index) =>
        set((state) => ({
          ...state,
          theme: {
            ...state.theme,
            gradientIndex: index,
          },
        })),
      setSolidColor: (color) =>
        set((state) => ({
          ...state,
          theme: {
            ...state.theme,
            solidColor: color,
          },
        })),
      setWallpaper: (wallpaper) =>
        set((state) => ({
          ...state,
          theme: {
            ...state.theme,
            wallpaper,
          },
        })),
      setAccentColor: (color) =>
        set((state) => ({
          ...state,
          theme: {
            ...state.theme,
            accentColor: color,
          },
        })),
      setEffect: (key, value) =>
        set((state) => ({
          ...state,
          theme: {
            ...state.theme,
            effects: {
              ...state.theme.effects,
              [key]: value,
            },
          },
        })),
      resetDefaults: () =>
        set((state) => ({
          ...state,
          theme: defaultTheme(),
          windows: createInitialWindows(),
          activeWindowId: null,
          topZ: appDefinitions.length + 1,
          overviewOpen: false,
        })),
      triggerKernelPanic: () =>
        set((state) => ({
          ...state,
          overviewOpen: false,
          panicMode: 'panic',
          panicProgress: 0,
          bootProgress: 0,
        })),
      setPanicProgress: (progress) =>
        set((state) => ({ ...state, panicProgress: Math.max(0, Math.min(progress, 100)) })),
      setBootProgress: (progress) =>
        set((state) => ({ ...state, bootProgress: Math.max(0, Math.min(progress, 100)) })),
      setPanicMode: (mode) => set((state) => ({ ...state, panicMode: mode })),
    }),
    {
      name: 'alex-linux-desktop-state',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        windows: state.windows,
        topZ: state.topZ,
        activeWindowId: state.activeWindowId,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        state.hydrated = true;
      },
    },
  ),
);
