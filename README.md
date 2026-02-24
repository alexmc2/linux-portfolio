# Linux Portfolio (AlexOS)

Portfolio site as a Linux-style desktop experience.

Visitors land on a simulated Ubuntu desktop where they can open app windows (About, Projects, Skills, Experience, Contact, Files, Terminal, Settings), move them around, and explore your work like an Linux operating system.

## What It Does

- Shows a boot screen before loading the desktop UI.
- Lets visitors open and manage multiple portfolio windows from a dock.
- Includes an app overview/search panel (like Activities on Linux).
- Provides a terminal where users can run playful commands like `help`, `neofetch`, `open <app>`, and `theme <preset>`.
- Includes a settings panel to customize themes, background, accent color, and visual effects.
- Saves layout and theme choices in local storage so the desktop feels persistent.

## Routes

- `/` - interactive Linux desktop portfolio
- `/blog` - redirects to external blog
- `/gallery` - redirects to external gallery

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Zustand for desktop state + persistence
- react-rnd for draggable/resizable windows

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run ESLint
