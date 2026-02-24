'use client';

import Image from 'next/image';

import {
  aboutSection,
  heroSection,
  socialLinks,
} from '@/lib/content/portfolio-content';

export function AboutApp() {
  return (
    <div className="h-full space-y-5 p-5 text-sm text-(--text-color) sm:p-6 sm:text-base">
      <div>
        {/* <p className="text-xs uppercase tracking-[0.18em] text-(--muted-color)">
          {heroSection.subtitle}
        </p> */}
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          {heroSection.title}
        </h1>
        <p className="mt-1 text-sm font-medium text-(--accent-color)">
          {heroSection.tagline}
        </p>
        <p className="mt-3 text-sm text-(--muted-color)">
          {heroSection.specialText}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 rounded-xl border border-(--border-color) bg-black/20 p-4">
          <p>{aboutSection.intro}</p>
          <p>
            {aboutSection.project.intro}{' '}
            <a
              href={aboutSection.project.link.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-(--accent-color) hover:underline"
            >
              {aboutSection.project.link.label}
            </a>
            {aboutSection.project.description}
          </p>
          <p>{aboutSection.closing}</p>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-(--border-color) bg-black/20 p-3">
            <Image
              src={aboutSection.img}
              alt="Alex McGarry"
              width={900}
              height={640}
              className="h-48 w-full rounded-lg object-cover"
            />
          </div>

          <div className="rounded-xl border border-(--border-color) bg-black/20 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-(--muted-color)">
              Connect
            </p>
            <div className="space-y-2 text-sm">
              <a
                className="block hover:underline"
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="block hover:underline"
                href={socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="block hover:underline"
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-(--border-color) bg-black/20 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-(--muted-color)">
          {aboutSection.list.title}
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {aboutSection.list.items.map((item) => (
            <li key={item} className="rounded-md bg-black/20 px-3 py-2 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
