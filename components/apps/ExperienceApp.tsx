'use client';

import { experienceSection } from '@/lib/content/portfolio-content';

export function ExperienceApp() {
  return (
    <div className="h-full p-4 text-(--text-color) sm:p-6">
      <h2 className="text-xl font-semibold">Experience Timeline</h2>
      <p className="mt-1 text-sm text-(--muted-color)">
        Built from existing portfolio copy and current status notes.
      </p>

      <ol className="relative mt-6 space-y-5 border-l border-(--border-color) pl-5">
        {experienceSection.map((item) => (
          <li key={item.id} className="relative rounded-xl border border-(--border-color) bg-black/20 p-4">
            <span className="absolute -left-6.5 top-5 inline-flex h-3 w-3 rounded-full bg-(--accent-color)" />
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--accent-color)">
              {item.period}
            </p>
            <h3 className="mt-1 text-base font-semibold">{item.title}</h3>
            {item.org ? <p className="text-sm text-(--muted-color)">{item.org}</p> : null}
            <p className="mt-2 text-sm text-(--muted-color)">{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
