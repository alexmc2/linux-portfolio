'use client';

import { blogLinks, heroSection } from '@/lib/content/portfolio-content';

export function BlogApp() {
  return (
    <div className="h-full space-y-4 p-4 text-(--text-color) sm:p-6">
      <h2 className="text-xl font-semibold">Blog</h2>
      <p className="text-sm text-(--muted-color)">
        Existing blog and gallery remain hosted on amcgarry.co.uk.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <a
          href={blogLinks.blog}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-(--border-color) bg-black/20 p-4 transition hover:bg-black/30"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-(--muted-color)">External</p>
          <h3 className="mt-2 text-lg font-semibold">Blog Posts</h3>
          <p className="mt-2 text-sm text-(--muted-color)">
            Writing on engineering decisions, product experiments, and performance-first builds.
          </p>
        </a>

        <a
          href={blogLinks.gallery}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-(--border-color) bg-black/20 p-4 transition hover:bg-black/30"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-(--muted-color)">External</p>
          <h3 className="mt-2 text-lg font-semibold">Gallery</h3>
          <p className="mt-2 text-sm text-(--muted-color)">Collections of moments and visual work.</p>
        </a>
      </div>

      <div className="rounded-xl border border-(--border-color) bg-black/20 p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-(--muted-color)">Also available</p>
        <p className="mt-2 text-sm">Classic portfolio view preserves the existing scroll-based section flow.</p>
        <a href="/classic" className="mt-3 inline-block text-sm font-semibold text-(--accent-color) hover:underline">
          Open /classic
        </a>
        <p className="mt-4 text-xs text-(--muted-color)">{heroSection.specialText}</p>
      </div>
    </div>
  );
}
