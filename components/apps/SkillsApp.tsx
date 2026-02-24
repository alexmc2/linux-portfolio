'use client';

import { skillsSection } from '@/lib/content/portfolio-content';

export function SkillsApp() {
  return (
    <div className="h-full p-4 text-(--text-color) sm:p-6">
      <h2 className="text-xl font-semibold">Skills</h2>
      <p className="mt-1 text-sm text-(--muted-color)">
        Grouped from existing portfolio skills and technologies.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {skillsSection.map((group) => (
          <section
            key={group.title}
            className="rounded-xl border border-(--border-color) bg-black/20 p-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-(--accent-color)">
              {group.title}
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              {group.items.map((item) => (
                <li
                  key={`${group.title}-${item}`}
                  className="rounded-md border border-transparent bg-black/25 px-2.5 py-1.5"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
