'use client';

import { useEffect, useState } from 'react';

const storageKey = 'alex-linux-desktop-notes';
const starterNote = `# Notes

- Add your latest project links
- Prep CV tweaks for interviews
- Draft a new blog post idea`;

export function NotesApp() {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return starterNote;
    }

    try {
      return window.localStorage.getItem(storageKey) ?? starterNote;
    } catch {
      return starterNote;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, value);
    } catch {
      // No-op if local storage is unavailable.
    }
  }, [value]);

  return (
    <div className="flex h-full flex-col bg-[#f7ebbc] text-[#2f2619]">
      <div className="border-b border-[#ddcf97] bg-[#f1de9d] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em]">
        Notepad
      </div>

      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        spellCheck={false}
        className="h-full w-full resize-none border-0 bg-transparent p-4 font-mono text-sm leading-6 outline-none"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(215, 187, 105, 0.38) 1px, transparent 1px)',
          backgroundSize: '100% 1.5rem',
        }}
        aria-label="Notepad editor"
      />
    </div>
  );
}
