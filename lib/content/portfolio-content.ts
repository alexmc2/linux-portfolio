export interface ProjectItem {
  id: string;
  name: string;
  url: string;
  repo: string;
  img: string | { dark: string; light: string };
  year: number;
  tags: string[];
  description: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface ExperienceEntry {
  id: string;
  period: string;
  title: string;
  org?: string;
  description: string;
}

export const author = {
  name: 'Alex McGarry',
  email: 'alexandramcgarryx@gmail.com',
};

export const socialLinks = {
  facebook: 'https://www.facebook.com/alex.mcgarry',
  instagram: 'https://www.instagram.com/alex_mcgy',
  github: 'https://github.com/alexmc2',
  linkedin: 'https://www.linkedin.com/in/alex-mcgarry/',
};

export const seoData = {
  title: 'Alex McGarry | Full-Stack Developer',
  description:
    'Alex McGarry is a full-stack developer specialising in building modern web and mobile applications with Next.js, React, TypeScript, and various databases.',
  image:
    'https://res.cloudinary.com/drbz4rq7y/image/upload/v1754664865/me-background2_vyn87g.jpg',
  url: 'https://www.amcgarry.co.uk',
  keywords: [
    'Alex McGarry',
    'Alex McGarry Portfolio',
    'Full-Stack Developer',
    'Next.js',
    'React',
    'TypeScript',
    'React Native',
  ],
};

export const heroSection = {
  // subtitle: "Hi, my name's",
  title: 'Alex McGarry',
  tagline: 'Full-Stack Developer',
  description:
    'I build full-stack web applications with JavaScript/TypeScript, React/Next.js, Node/Express, and PostgreSQL/Supabase. Adaptable and curious, and always keen to learn new technologies, I enjoy all aspects of the development process from data modelling and APIs through to UI design in Figma.',
  specialText:
    'Currently seeking a full-stack developer role in Brighton, London, Cambridge or remote',
};

export const aboutSection = {
  title: 'about me',
  list: {
    title: 'Technologies I work with:',
    items: [
      'Next.js 15 & React 19',
      'TypeScript & JavaScript',
      'Python & Flask',
      'Node.js & Express',
      'PostgreSQL, MongoDB & Supabase',
      'Tailwind CSS & Framer Motion',
      'LangChain & OpenAI APIs',
    ],
  },
  img: 'https://res.cloudinary.com/drbz4rq7y/image/upload/v1762699642/me_plocz0.jpg',
  intro:
    "After completing the Northcoders bootcamp in 2023, I've been developing my skills through a variety of projects. I am currently further honing my professional workflow on an advanced software development course with TechNative Digital in Brighton.",
  project: {
    intro: 'My latest project is',
    link: {
      label: 'CodeShare',
      url: 'https://codeshare.uk',
    },
    description:
      ', a real-time, accountless, browser-based collaborative code editor and whiteboard for pair programming. Building this has been a great learning experience in real-time synchronisation over networks, including setting up reliable peer-to-peer connections with WebRTC (with TURN support for NAT traversal) and keeping multiple users in sync using Yjs for shared state.',
  },
  closing:
    'I am constantly refining my skills and am keen to bring my enthusiasm and technical problem-solving abilities to a collaborative development team.',
};

export const projectsSection: ProjectItem[] = [
  {
    id: 'codeshare',
    name: 'CodeShare',
    url: 'https://codeshare.uk',
    repo: 'https://github.com/alexmc2/code-share',
    img: {
      dark: '/legacy/images/codeshare-light.webp',
      light: '/legacy/images/codeshare-dark.webp',
    },
    year: 2026,
    tags: ['React 19', 'TypeScript', 'WebRTC', 'Yjs', 'Node.js'],
    description:
      'A real-time, browser-based collaborative code editor and whiteboard for pair programming. Built with WebRTC for peer-to-peer data streaming, it features a full Monaco Editor environment, interactive drawing tools, and live chat.',
  },
  {
    id: 'coop-connect',
    name: 'Co-op Connect Management Platform',
    url: 'https://coop-connect-demo.vercel.app/members/login',
    repo: 'https://github.com/alexmc2/coop-connect-demo',
    img: {
      dark: '/legacy/images/coop-light.webp',
      light: '/legacy/images/coop-dark.webp',
    },
    year: 2025,
    tags: ['Next.js 15', 'TypeScript', 'PostgreSQL'],
    description:
      'Full-stack SaaS platform that digitises housing co-op operations including financial management, maintenance tracking, event coordination, and member communication through a real-time Progressive Web App.',
  },
  {
    id: 'discoverse',
    name: 'Discoverse - Music Discovery Platform',
    url: 'https://www.discoverse.co.uk',
    repo: 'https://github.com/alexmc2/music-map',
    img: '/legacy/images/discoverse.webp',
    year: 2025,
    tags: ['Next.js 15', 'React 19', 'TypeScript'],
    description:
      'Interactive music discovery platform that visualises artist connections in an interactive node graph. Features physics-based graph visualisation, Lottie animations, Spotify/Last.fm integration, and 30-second track previews.',
  },
  {
    id: 'synchroniser',
    name: 'Synchroniser',
    url: 'https://synchroniser.co.uk/',
    repo: 'https://github.com/alexmc2/video-wall',
    img: '/legacy/images/synchroniser.webp',
    year: 2025,
    tags: ['React 19', 'Vite', 'Tailwind CSS', 'TypeScript'],
    description:
      'Visual app for the synchronous (or asynchronous) playback of multiple YouTube or local videos (IN PROGRESS).',
  },
  {
    id: 'wheel-of-life',
    name: 'Stay Nimble Wheel of Life',
    url: 'https://www.wheeloflifereview.co.uk/',
    repo: 'https://github.com/alexmc2/wheel-of-life',
    img: '/legacy/images/wheel-of-life.webp',
    year: 2025,
    tags: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'jsPDF'],
    description:
      "Mini app built for Stay Nimble's work coaching platform. Features a guided life audit tool with local persistence, real-time visualisation, and PDF exports for coaching sessions.",
  },
  {
    id: 'cafe-demo-template',
    name: 'Business Website Template',
    url: 'https://www.cafedemo.co.uk/',
    repo: 'https://github.com/alexmc2/cafe-demo',
    img: '/legacy/images/cafe.webp',
    year: 2025,
    tags: ['Next.js 15', 'Sanity CMS'],
    description:
      'Reusable Next.js business template with Sanity Studio integration, enabling clients to manage all content and media assets independently.',
  },
  {
    id: 'brighton-rock',
    name: 'Brighton Rock Housing Co-op',
    url: 'https://www.brighton-rock.org/',
    repo: 'Private Repository',
    img: {
      dark: '/legacy/images/coop-website-light.webp',
      light: '/legacy/images/coop-website-dark.webp',
    },
    year: 2024,
    tags: ['Next.js', 'Tailwind CSS'],
    description:
      'Public website for Brighton Rock Housing Co-op, featuring event listings, co-op information, and contact details in a clean, accessible design.',
  },
  {
    id: 'eulogy-website',
    name: 'Eulogy Website & CMS',
    url: 'https://www.calvinmoorememories.co.uk/',
    repo: 'Private Repository',
    img: {
      dark: '/legacy/images/eulogy-light.webp',
      light: '/legacy/images/eulogy-dark.webp',
    },
    year: 2025,
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Sanity CMS'],
    description:
      'Custom website with Sanity CMS backend, providing the client with full control over content editing and site updates.',
  },
  {
    id: 'techbay',
    name: 'TechBay E-commerce',
    url: 'https://techbay-phi.vercel.app/',
    repo: 'https://github.com/alexmc2/e-commerce-site',
    img: '/legacy/images/techbay.webp',
    year: 2023,
    tags: ['MERN', 'Redux', 'PayPal API', 'React'],
    description:
      'E-commerce practice project built while learning the MERN stack. Features product listings and PayPal payment integration.',
  },
  {
    id: 'diet-sunglasses',
    name: 'Diet Sunglasses Photography',
    url: 'https://diet-sunglasses.vercel.app/',
    repo: 'https://github.com/alexmc2/diet-sunglasses',
    img: '/legacy/images/diet-sunglasses.webp',
    year: 2024,
    tags: ['Next.js', 'Tailwind CSS', 'Cloudinary'],
    description:
      'Modern photo slideshow with automated playback and smooth wipe transitions. Features intelligent image randomisation and Cloudinary optimisation.',
  },
];

export const skillsSection: SkillGroup[] = [
  {
    title: 'Frontend',
    items: [
      'React 19',
      'Next.js 15',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Framer Motion',
      'Figma',
      'Lottie',
    ],
  },
  {
    title: 'Backend',
    items: [
      'Node.js',
      'Express',
      'Python',
      'Flask',
      'PostgreSQL',
      'MongoDB',
      'Supabase',
      'RESTful APIs',
    ],
  },
  {
    title: 'DevOps',
    items: [
      'Vercel',
      'Cloudinary',
      'GitHub Actions workflows',
      'Progressive Web App deployment',
      'WebRTC with TURN support',
    ],
  },
  {
    title: 'Tooling',
    items: [
      'Monaco Editor',
      'Yjs',
      'Sanity CMS',
      'Prisma',
      'Jest',
      'Redux',
      'Adobe Photoshop',
      'Adobe Illustrator',
    ],
  },
];

export const experienceSection: ExperienceEntry[] = [
  {
    id: 'northcoders',
    period: '2023',
    title: 'Completed Northcoders Bootcamp',
    description:
      "After completing the Northcoders bootcamp in 2023, I've been developing my skills through a variety of projects.",
  },
  {
    id: 'technative',
    period: '2025-present',
    title: 'Advanced Software Development Course',
    org: 'TechNative Digital, Brighton',
    description:
      'I am currently further honing my professional workflow on an advanced software development course with TechNative Digital in Brighton.',
  },
  {
    id: 'codeshare',
    period: '2026',
    title: 'Built CodeShare',
    description:
      'A real-time, accountless, browser-based collaborative code editor and whiteboard for pair programming using WebRTC and Yjs.',
  },
  {
    id: 'seeking-role',
    period: 'Current',
    title: 'Open to Full-Stack Developer Opportunities',
    description:
      'I’m currently looking for full-stack developer opportunities. If you have a project or role you think I might be a good fit for, please get in touch!',
  },
];

export const contactSection = {
  title: 'get in touch',
  paragraphs: [
    'I’m currently looking for full-stack developer opportunities.',
    'If you have a project or role you think I might be a good fit for, please get in touch!',
  ],
  link: `mailto:${author.email}`,
};

export const navLinks = [
  { name: 'about', url: '/#about' },
  { name: 'skills', url: '/#skills' },
  { name: 'projects', url: '/#projects' },
  { name: 'blog', url: '/blog' },
  { name: 'gallery', url: '/gallery' },
  { name: 'contact', url: '/#contact' },
];

export const footerSection = {
  title: `© ${new Date().getFullYear()} Alex McGarry`,
  link: 'https://github.com/alexmc2',
};

export const blogLinks = {
  blog: 'https://www.amcgarry.co.uk/blog',
  gallery: 'https://www.amcgarry.co.uk/gallery',
  home: 'https://www.amcgarry.co.uk',
};

export type FileNode =
  | {
      type: 'folder';
      name: string;
      path: string;
      children: FileNode[];
    }
  | {
      type: 'file';
      name: string;
      path: string;
      mime: 'markdown' | 'text' | 'link';
      content: string;
    };

export const fileTree: FileNode = {
  type: 'folder',
  name: 'home',
  path: '/home',
  children: [
    {
      type: 'folder',
      name: 'alex',
      path: '/home/alex',
      children: [
        {
          type: 'file',
          name: 'README.md',
          path: '/home/alex/README.md',
          mime: 'markdown',
          content: `# Alex McGarry\n\nFull-Stack Developer focused on modern web apps with Next.js, React, TypeScript, Node, and PostgreSQL/Supabase.\n\nCurrently seeking a full-stack developer role in Brighton, London, Cambridge or remote.`,
        },
        {
          type: 'file',
          name: 'CV.md',
          path: '/home/alex/CV.md',
          mime: 'markdown',
          content: `# CV Snapshot\n\n- Northcoders bootcamp (2023)\n- Advanced software development course with TechNative Digital\n- Projects include CodeShare, Co-op Connect, and Discoverse\n- Contact: alexandramcgarryx@gmail.com`,
        },
        {
          type: 'folder',
          name: 'Projects',
          path: '/home/alex/Projects',
          children: [
            {
              type: 'file',
              name: 'codeshare.link',
              path: '/home/alex/Projects/codeshare.link',
              mime: 'link',
              content: 'https://codeshare.uk',
            },
            {
              type: 'file',
              name: 'github-profile.link',
              path: '/home/alex/Projects/github-profile.link',
              mime: 'link',
              content: 'https://github.com/alexmc2/profile',
            },
            {
              type: 'file',
              name: 'portfolio-site.link',
              path: '/home/alex/Projects/portfolio-site.link',
              mime: 'link',
              content: 'https://www.amcgarry.co.uk',
            },
            {
              type: 'file',
              name: 'project-list.md',
              path: '/home/alex/Projects/project-list.md',
              mime: 'markdown',
              content: projectsSection
                .map((project) => `- ${project.name} (${project.year}) -> ${project.url}`)
                .join('\n'),
            },
          ],
        },
      ],
    },
  ],
};
