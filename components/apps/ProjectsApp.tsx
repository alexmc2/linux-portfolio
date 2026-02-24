'use client';

import Image from 'next/image';

import { projectsSection } from '@/lib/content/portfolio-content';

export function ProjectsApp() {
  return (
    <div className="h-full space-y-4 p-4 text-(--text-color) sm:p-6">
      <header>
        <h2 className="text-xl font-semibold">My Projects</h2>
        <p className="text-sm text-(--muted-color)">
          Migrated from existing portfolio project data.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {projectsSection.map((project) => {
          const preview =
            typeof project.img === 'string' ? project.img : project.img.dark;
          const isRepoPrivate = project.repo.toLowerCase().includes('private');

          return (
            <article
              key={project.id}
              className="flex flex-col rounded-xl border border-(--border-color) bg-black/20 p-3"
            >
              <Image
                src={preview}
                alt={project.name}
                width={1000}
                height={560}
                className="mb-3 h-36 w-full rounded-lg object-cover"
              />
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold sm:text-base">
                  {project.name}
                </h3>
                <span className="text-xs text-(--muted-color)">
                  {project.year}
                </span>
              </div>
              <p className="mt-2 line-clamp-4 text-sm text-(--muted-color)">
                {project.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={`${project.id}-${tag}`}
                    className="rounded-full border border-(--border-color) px-2 py-0.5 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-2 text-xs">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded bg-(--accent-color) px-3 py-1.5 font-semibold text-black transition hover:opacity-90"
                >
                  Open Project
                </a>
                {isRepoPrivate ? (
                  <span className="rounded border border-(--border-color) px-3 py-1.5 text-(--muted-color)">
                    Private Repository
                  </span>
                ) : (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded border border-(--border-color) px-3 py-1.5 transition hover:bg-white/10"
                  >
                    View Repo
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
