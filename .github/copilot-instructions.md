# GitHub Copilot Instructions

## Project Overview

This repository is a personal portfolio built as an interactive Linux-style desktop.

Tech stack:
- Next.js 16 App Router
- React 19 + TypeScript (strict)
- Tailwind CSS v4
- Zustand for desktop/window state
- react-rnd for draggable/resizable windows

Primary user flows:
- `/`: Linux desktop simulation (windows, dock, top bar, overlays)
- `/classic`: classic single-page portfolio fallback
- `/blog` and `/gallery`: redirect routes

## Repository Structure

- `app/`: route entry points and global styles
- `components/desktop/`: desktop shell, dock, window manager, overlays
- `components/apps/`: app window contents (about, projects, terminal, settings, etc.)
- `lib/store/desktop-store.ts`: Zustand state and actions
- `lib/types/desktop.ts`: shared desktop domain types (`AppId`, `DesktopWindow`, theme/state types)
- `lib/content/`: portfolio content + app definitions
- `lib/themes/`: theme presets and CSS variable mapping

## Architecture Rules

- Keep source of truth centralized:
  - App metadata and defaults in `lib/content/apps.ts`
  - Portfolio text/data in `lib/content/portfolio-content.ts`
  - Desktop behavior and persistence in `lib/store/desktop-store.ts`
- Do not duplicate state across components if it already exists in Zustand.
- Prefer deriving display from data structures rather than hardcoding repeated UI content.

When adding a new desktop app, update all required places together:
1. Add the new `AppId` in `lib/types/desktop.ts`.
2. Add its definition in `lib/content/apps.ts`.
3. Add render handling in `components/desktop/DesktopShell.tsx` (`renderApp` switch).
4. Ensure behavior in store actions still works with the new app id.

## React and TypeScript Conventions

- Use Server Components by default in `app/` routes.
- Add `'use client'` only when required (hooks, event handlers, browser APIs, Zustand usage).
- Use named exports for reusable components and helpers.
- Keep types explicit at module boundaries and avoid `any`.
- Keep `switch` statements over `AppId` exhaustive.
- Use `@/` alias imports for internal modules.

## Styling and Theming Rules

- Use Tailwind utility classes for layout/spacing/typography.
- Theme colors should come from CSS custom properties, not hardcoded per-component values when a token exists.
- Theme variables are defined by `lib/themes/desktop-style.ts` and consumed in components.
- Keep styling compatible with dynamic presets and accent color updates.

Use canonical Tailwind arbitrary-value syntax:
- `text-(--text-color)`
- `text-(--muted-color)`
- `text-(--accent-color)`
- `border-(--border-color)`
- `bg-(--accent-color)`
- Prefer canonical numeric utilities where available (`w-16` over `w-[64px]`, `z-2000` over `z-[2000]`).

## UX and Behavior Constraints

- Preserve desktop interaction semantics:
  - Dock toggles apps (open, focus, minimize behavior)
  - Active window z-index handling via store (`topZ` + `bringToFront` flow)
  - Overview and panic/boot overlays should remain functional
- Do not break keyboard shortcuts (for example Ctrl+Alt+T for terminal, Escape for overview close).
- Maintain mobile behavior (`/classic` fallback and force-desktop option).

## Content and Links

- Keep user-facing portfolio content in `lib/content/portfolio-content.ts`.
- Use `next/image` for image-heavy UI where possible and provide explicit `width`/`height`.
- External links that open a new tab should include `target="_blank"` and `rel="noreferrer"`.

## Change Quality Bar

For non-trivial changes:
- Keep modifications focused and consistent with existing patterns.
- Update related types/data/state together.
- Avoid introducing regressions in window movement, maximize/minimize, or persisted theme state.

Before finalizing changes, prefer running:
- `npm run lint`
- `npm run build`

If you cannot run checks, state that clearly in your response.
