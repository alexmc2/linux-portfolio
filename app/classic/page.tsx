import Link from 'next/link';

import {
  aboutSection,
  author,
  blogLinks,
  contactSection,
  experienceSection,
  footerSection,
  heroSection,
  projectsSection,
  skillsSection,
  socialLinks,
} from '@/lib/content/portfolio-content';

export default function ClassicPage() {
  return (
    <main className="min-h-screen bg-[#151820] px-5 py-12 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Classic View</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{heroSection.title}</h1>
          <p className="mt-1 text-base text-slate-300">{heroSection.tagline}</p>
          <p className="mt-4 text-sm leading-7 text-slate-200">{heroSection.description}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="hover:underline">
              GitHub
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
              LinkedIn
            </a>
            <a href={contactSection.link} className="hover:underline">
              Email
            </a>
            <Link href="/" className="font-semibold text-emerald-300 hover:underline">
              Open Linux Desktop
            </Link>
          </div>
        </header>

        <section id="about" className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold capitalize">{aboutSection.title}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-200">{aboutSection.intro}</p>
          <p className="mt-4 text-sm leading-7 text-slate-200">
            {aboutSection.project.intro}{' '}
            <a href={aboutSection.project.link.url} target="_blank" rel="noreferrer" className="text-emerald-300 hover:underline">
              {aboutSection.project.link.label}
            </a>
            {aboutSection.project.description}
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-200">{aboutSection.closing}</p>
          <ul className="mt-5 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
            {aboutSection.list.items.map((item) => (
              <li key={item} className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {skillsSection.map((group) => (
              <article key={group.title} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <h3 className="text-xs uppercase tracking-[0.16em] text-emerald-300">{group.title}</h3>
                <ul className="mt-3 grid gap-1 text-sm text-slate-200">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item}`}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <ol className="mt-4 space-y-4 border-l border-white/20 pl-4">
            {experienceSection.map((entry) => (
              <li key={entry.id}>
                <p className="text-xs uppercase tracking-[0.16em] text-emerald-300">{entry.period}</p>
                <p className="text-base font-semibold">{entry.title}</p>
                {entry.org ? <p className="text-sm text-slate-300">{entry.org}</p> : null}
                <p className="text-sm text-slate-200">{entry.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {projectsSection.map((project) => (
              <article key={project.id} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{project.year}</p>
                <h3 className="mt-1 text-lg font-semibold">{project.name}</h3>
                <p className="mt-2 text-sm text-slate-200">{project.description}</p>
                <div className="mt-2 flex flex-wrap gap-1 text-xs text-slate-300">
                  {project.tags.map((tag) => (
                    <span key={`${project.id}-${tag}`} className="rounded border border-white/10 px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex gap-3 text-sm">
                  <a href={project.url} target="_blank" rel="noreferrer" className="text-emerald-300 hover:underline">
                    Project
                  </a>
                  {project.repo.toLowerCase().includes('private') ? (
                    <span className="text-slate-400">Private Repo</span>
                  ) : (
                    <a href={project.repo} target="_blank" rel="noreferrer" className="text-emerald-300 hover:underline">
                      Repo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold capitalize">{contactSection.title}</h2>
          <div className="mt-3 space-y-1 text-sm text-slate-200">
            {contactSection.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-200">
            Email:{' '}
            <a href={contactSection.link} className="text-emerald-300 hover:underline">
              {author.email}
            </a>
          </p>
          <p className="mt-3 text-sm text-slate-300">
            Blog:{' '}
            <a href={blogLinks.blog} target="_blank" rel="noreferrer" className="text-emerald-300 hover:underline">
              {blogLinks.blog}
            </a>
          </p>
          <p className="mt-1 text-sm text-slate-300">
            Gallery:{' '}
            <a href={blogLinks.gallery} target="_blank" rel="noreferrer" className="text-emerald-300 hover:underline">
              {blogLinks.gallery}
            </a>
          </p>
        </section>

        <footer className="border-t border-white/10 pt-6 text-center text-sm text-slate-400">
          <a href={footerSection.link} target="_blank" rel="noreferrer" className="hover:underline">
            {footerSection.title}
          </a>
        </footer>
      </div>
    </main>
  );
}
