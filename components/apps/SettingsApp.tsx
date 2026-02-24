'use client';

import { ChangeEvent } from 'react';

import { themePresets } from '@/lib/themes/presets';
import { useDesktopStore } from '@/lib/store/desktop-store';
import { EffectsSettings } from '@/lib/types/desktop';

const effectOptions: Array<{ key: keyof EffectsSettings; label: string }> = [
  { key: 'showGrid', label: 'Show grid' },
  { key: 'scanlines', label: 'Scanlines' },
  { key: 'cursorGlow', label: 'Cursor glow' },
  { key: 'retroCrt', label: 'Retro / CRT' },
  { key: 'soundEffects', label: 'Sound effects' },
];

export function SettingsApp() {
  const theme = useDesktopStore((state) => state.theme);
  const setThemePreset = useDesktopStore((state) => state.setThemePreset);
  const setBackgroundMode = useDesktopStore((state) => state.setBackgroundMode);
  const setGradientIndex = useDesktopStore((state) => state.setGradientIndex);
  const setSolidColor = useDesktopStore((state) => state.setSolidColor);
  const setWallpaper = useDesktopStore((state) => state.setWallpaper);
  const setAccentColor = useDesktopStore((state) => state.setAccentColor);
  const setEffect = useDesktopStore((state) => state.setEffect);
  const resetDefaults = useDesktopStore((state) => state.resetDefaults);

  const selectedPreset = themePresets.find((preset) => preset.id === theme.preset) ?? themePresets[0];

  return (
    <div className="h-full space-y-6 p-4 text-(--text-color) sm:p-6">
      <section>
        <h2 className="text-xl font-semibold">Customize Desktop</h2>
        <p className="mt-1 text-sm text-(--muted-color)">
          Theme and effects update immediately and persist across reloads.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-(--border-color) bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-(--muted-color)">Theme presets</p>
          <div className="grid grid-cols-2 gap-2">
            {themePresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setThemePreset(preset.id)}
                className="rounded border px-2 py-2 text-xs font-semibold transition hover:bg-white/10"
                style={{
                  borderColor: theme.preset === preset.id ? 'var(--accent-color)' : 'var(--border-color)',
                }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-(--border-color) bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-(--muted-color)">Background mode</p>
          <select
            value={theme.backgroundMode}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setBackgroundMode(event.target.value as 'gradient' | 'solid' | 'wallpaper')
            }
            className="w-full rounded border border-(--border-color) bg-black/25 px-3 py-2 text-sm"
          >
            <option value="gradient">Gradient</option>
            <option value="solid">Solid</option>
            <option value="wallpaper">Wallpaper</option>
          </select>

          {theme.backgroundMode === 'gradient' ? (
            <div>
              <p className="mb-2 text-xs text-(--muted-color)">Gradient preset</p>
              <div className="grid grid-cols-3 gap-2">
                {selectedPreset.gradients.map((gradient, index) => (
                  <button
                    type="button"
                    key={`${selectedPreset.id}-${index}`}
                    onClick={() => setGradientIndex(index)}
                    className="h-10 rounded border transition"
                    style={{
                      backgroundImage: gradient,
                      borderColor: theme.gradientIndex === index ? 'var(--accent-color)' : 'var(--border-color)',
                    }}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {theme.backgroundMode === 'solid' ? (
            <label className="block text-xs text-(--muted-color)">
              Solid color
              <input
                type="color"
                value={theme.solidColor}
                onChange={(event) => setSolidColor(event.target.value)}
                className="mt-1 h-10 w-full rounded border border-(--border-color) bg-transparent"
              />
            </label>
          ) : null}

          {theme.backgroundMode === 'wallpaper' ? (
            <label className="block text-xs text-(--muted-color)">
              Wallpaper URL
              <input
                type="text"
                value={theme.wallpaper}
                onChange={(event) => setWallpaper(event.target.value)}
                placeholder="/legacy/images/codeshare.webp"
                className="mt-1 w-full rounded border border-(--border-color) bg-black/25 px-3 py-2 text-sm"
              />
            </label>
          ) : null}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-(--border-color) bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-(--muted-color)">Accent color</p>
          <input
            type="color"
            value={theme.accentColor}
            onChange={(event) => setAccentColor(event.target.value)}
            className="h-10 w-full rounded border border-(--border-color) bg-transparent"
          />
        </div>

        <div className="space-y-3 rounded-xl border border-(--border-color) bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-(--muted-color)">Effects</p>
          <div className="grid gap-2">
            {effectOptions.map((effect) => (
              <label key={effect.key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={theme.effects[effect.key]}
                  onChange={(event) => setEffect(effect.key, event.target.checked)}
                />
                {effect.label}
              </label>
            ))}
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={resetDefaults}
        className="rounded border border-(--border-color) px-3 py-2 text-sm transition hover:bg-white/10"
      >
        Reset to defaults
      </button>
    </div>
  );
}
