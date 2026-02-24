export type AppId =
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'contact'
  | 'blog'
  | 'files'
  | 'terminal'
  | 'settings';

export type BackgroundMode = 'gradient' | 'solid' | 'wallpaper';

export interface DesktopWindow {
  id: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z: number;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
}

export interface ThemePreset {
  id: string;
  name: string;
  colors: {
    shell: string;
    surface: string;
    surfaceRaised: string;
    border: string;
    text: string;
    muted: string;
    topBar: string;
    topBarText: string;
    dock: string;
    accent: string;
    success: string;
    danger: string;
  };
  gradients: string[];
  solid: string;
  wallpaper?: string;
}

export interface EffectsSettings {
  showGrid: boolean;
  scanlines: boolean;
  cursorGlow: boolean;
  retroCrt: boolean;
  soundEffects: boolean;
}

export interface ThemeSettings {
  preset: string;
  backgroundMode: BackgroundMode;
  gradientIndex: number;
  solidColor: string;
  wallpaper: string;
  accentColor: string;
  effects: EffectsSettings;
}

export type PanicMode = 'none' | 'panic' | 'boot';

export interface PersistedDesktopState {
  windows: Record<AppId, DesktopWindow>;
  topZ: number;
  activeWindowId: AppId | null;
  theme: ThemeSettings;
}

export interface DesktopState extends PersistedDesktopState {
  hydrated: boolean;
  overviewOpen: boolean;
  panicMode: PanicMode;
  panicProgress: number;
  bootProgress: number;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleFromDock: (id: AppId) => void;
  toggleMaximizeApp: (id: AppId) => void;
  setWindowPosition: (id: AppId, x: number, y: number) => void;
  setWindowSize: (id: AppId, width: number, height: number) => void;
  setOverviewOpen: (open: boolean) => void;
  setThemePreset: (presetId: string) => void;
  setBackgroundMode: (mode: BackgroundMode) => void;
  setGradientIndex: (index: number) => void;
  setSolidColor: (color: string) => void;
  setWallpaper: (wallpaper: string) => void;
  setAccentColor: (color: string) => void;
  setEffect: (key: keyof EffectsSettings, value: boolean) => void;
  resetDefaults: () => void;
  triggerKernelPanic: () => void;
  setPanicProgress: (progress: number) => void;
  setBootProgress: (progress: number) => void;
  setPanicMode: (mode: PanicMode) => void;
}
