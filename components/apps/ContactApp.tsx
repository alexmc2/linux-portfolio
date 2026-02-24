'use client';

import { FormEvent, useState } from 'react';

import { author, contactSection, socialLinks } from '@/lib/content/portfolio-content';

export function ContactApp() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent('Portfolio Contact');
    const body = encodeURIComponent(`From: ${email}\n\n${message}`);
    window.location.href = `mailto:${author.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="h-full space-y-5 p-4 text-(--text-color) sm:p-6">
      <header>
        <h2 className="text-xl font-semibold">{contactSection.title}</h2>
        <div className="mt-2 space-y-1 text-sm text-(--muted-color)">
          {contactSection.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-(--border-color) bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-(--muted-color)">Direct</p>
          <a
            href={contactSection.link}
            className="mt-3 block text-sm font-semibold text-(--accent-color) hover:underline"
          >
            {author.email}
          </a>

          <div className="mt-4 space-y-2 text-sm">
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="block hover:underline">
              LinkedIn
            </a>
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="block hover:underline">
              GitHub
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="block hover:underline">
              Facebook
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="block hover:underline">
              Instagram
            </a>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-3 rounded-xl border border-(--border-color) bg-black/20 p-4"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-(--muted-color)">Quick message</p>
          <label className="grid gap-1 text-xs uppercase tracking-[0.14em] text-(--muted-color)">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded border border-(--border-color) bg-black/25 px-3 py-2 text-sm text-(--text-color) outline-none focus:border-(--accent-color)"
            />
          </label>
          <label className="grid gap-1 text-xs uppercase tracking-[0.14em] text-(--muted-color)">
            Message
            <textarea
              required
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="rounded border border-(--border-color) bg-black/25 px-3 py-2 text-sm text-(--text-color) outline-none focus:border-(--accent-color)"
            />
          </label>
          <button
            type="submit"
            className="rounded bg-(--accent-color) px-3 py-1.5 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Open Email Client
          </button>
        </form>
      </section>
    </div>
  );
}
