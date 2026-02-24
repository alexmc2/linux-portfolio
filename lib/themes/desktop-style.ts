import { CSSProperties } from 'react';

import { getThemePreset } from '@/lib/themes/presets';
import { ThemeSettings } from '@/lib/types/desktop';

export const getDesktopStyle = (theme: ThemeSettings): CSSProperties => {
  const preset = getThemePreset(theme.preset);
  const gradient =
    preset.gradients[
      theme.gradientIndex >= 0 ? theme.gradientIndex % preset.gradients.length : 0
    ];

  const backgroundImage =
    theme.backgroundMode === 'wallpaper'
      ? `linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.45)), url(${theme.wallpaper || preset.wallpaper || ''})`
      : theme.backgroundMode === 'gradient'
        ? gradient
        : 'none';

  const backgroundColor =
    theme.backgroundMode === 'solid' ? theme.solidColor : preset.colors.shell;

  return {
    ['--shell-color' as string]: preset.colors.shell,
    ['--surface-color' as string]: preset.colors.surface,
    ['--surface-raised' as string]: preset.colors.surfaceRaised,
    ['--border-color' as string]: preset.colors.border,
    ['--text-color' as string]: preset.colors.text,
    ['--muted-color' as string]: preset.colors.muted,
    ['--topbar-color' as string]: preset.colors.topBar,
    ['--topbar-text' as string]: preset.colors.topBarText,
    ['--dock-color' as string]: preset.colors.dock,
    ['--accent-color' as string]: theme.accentColor || preset.colors.accent,
    ['--success-color' as string]: preset.colors.success,
    ['--danger-color' as string]: preset.colors.danger,
    backgroundImage,
    backgroundColor,
    backgroundSize: theme.backgroundMode === 'wallpaper' ? 'cover' : 'cover',
    backgroundPosition: 'center',
  };
};
