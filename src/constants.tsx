
import { Course, Product, Blog, ProgramCategory, UpcomingBatch, ServiceItem, TechStackItem, InternshipPosition, VideoCourse, Testimonial, Instructor } from './types';
import { slugify } from '@/utils/slug';
export const COLORS = {
  primary: '#00548B',
  secondary: '#004a61',
  accent: '#f8a899',
  danger: '#ef4444'
};



const DEFAULT_INSTRUCTOR = {
  name: "Sangalo Mentor",
  role: "Senior Engineer",
  image: "https://i.pravatar.cc/150?u=sangalo-mentor",
  bio: "Seasoned practitioner mentoring hands-on, production-grade projects.",
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Aayush Shrestha',
    course: 'MERN Stack Mastery',
    quote: 'The practical approach at Sangalo Tech is unmatched. I went from zero coding knowledge to building full-scale apps in 3 months. Highly recommended!',
    image: 'https://i.pravatar.cc/150?u=aayush',
    placement: 'Software Engineer at F1Soft'
  },
  {
    id: 't2',
    name: 'Sushma Thapa',
    course: 'Digital Marketing Mastery',
    quote: 'Learning SEO and Ads from industry pros helped me grow my own business by 300%. The mentors are always available for help.',
    image: 'https://i.pravatar.cc/150?u=sushma',
    placement: 'Digital Strategist at Leapfrog'
  },
  {
    id: 't3',
    name: 'Bibek Gurung',
    course: 'Robotics & IoT Training',
    quote: 'The IoT course was a game-changer. Building real hardware projects and connecting them to the cloud gave me the confidence to start my own startup.',
    image: 'https://i.pravatar.cc/150?u=bibek',
    placement: 'IoT Developer at Robotics Association'
  }
];

export const VIDEO_COURSES: VideoCourse[] = [
  {
    id: 'vc1',
    title: 'Modern React & Next.js Masterclass 2025',
    category: 'Web Development',
    instructor: 'Sanjay Sangalo',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    previewUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    price: 999,
    originalPrice: 4999,
    lessons: 85,
    totalHours: '12.5',
    rating: 4.9
  },
  {
    id: 'vc2',
    title: 'Advanced UI Design with Figma & Prototyping',
    category: 'Design',
    instructor: 'Anjali Gurung',
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800',
    previewUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    price: 799,
    originalPrice: 3500,
    lessons: 42,
    totalHours: '8.2',
    rating: 4.8
  },
  {
    id: 'vc3',
    title: 'Digital Marketing Mastery: Zero to Pro',
    category: 'Marketing',
    instructor: 'Ramesh Thapa',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    previewUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    price: 499,
    originalPrice: 2500,
    lessons: 56,
    totalHours: '15.0',
    rating: 4.7
  }
];

export const INTERNSHIPS: InternshipPosition[] = [
  {
    id: 'i1',
    title: 'Junior Developer (12-Week Grad)',
    duration: '3 Months',
    type: 'On-site',
    description: 'Direct placement for our "Zero to Developer" graduates within Sangalo Software House.',
    stipend: 'Monthly Stipend',
    icon: 'fa-solid fa-rocket'
  },
  {
    id: 'i2',
    title: 'Frontend Developer Intern',
    duration: '3 Months',
    type: 'Hybrid',
    description: 'Work on real-world Next.js & React projects under senior guidance.',
    stipend: 'Performance Based',
    icon: 'fa-solid fa-code'
  },
  {
    id: 'i3',
    title: 'Digital Marketing Intern',
    duration: '2 Months',
    type: 'On-site',
    description: 'Manage SEO & Social media campaigns for our enterprise clients.',
    stipend: 'Monthly Allowance',
    icon: 'fa-solid fa-bullhorn'
  },
  {
    id: 'i4',
    title: 'UI/UX Design Intern',
    duration: '3 Months',
    type: 'Remote',
    description: 'Translate user requirements into beautiful Figma prototypes.',
    stipend: 'Performance Based',
    icon: 'fa-solid fa-bezier-curve'
  }
];

export const TECH_STACK: TechStackItem[] = [
  {
    id: 't1',
    name: 'React 19',
    description: 'Powers our dynamic UI with concurrent rendering and high performance.',
    icon: 'fa-brands fa-react',
    color: 'text-blue-400',
    docs: 'https://react.dev'
  },
  {
    id: 't2',
    name: 'Gemini 3.0',
    description: 'Drives our AI Career Advisor using the latest LLM reasoning capabilities.',
    icon: 'fa-solid fa-wand-magic-sparkles',
    color: 'text-indigo-400',
    docs: 'https://ai.google.dev'
  },
  {
    id: 't3',
    name: 'Tailwind CSS',
    description: 'Ensures a responsive, utility-first design system across all devices.',
    icon: 'fa-solid fa-wind',
    color: 'text-cyan-400',
    docs: 'https://tailwindcss.com'
  },
  {
    id: 't4',
    name: 'MongoDB',
    description: 'Scalable NoSQL database managing our enterprise software products.',
    icon: 'fa-solid fa-database',
    color: 'text-green-500',
    docs: 'https://mongodb.com'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Web App Development',
    slug: 'web-app-development',
    description: 'Bespoke enterprise solutions built with MERN & Next.js. We focus on scalability, security, and performance.',
    icon: 'fa-solid fa-laptop-code'
  },
  {
    id: 's2',
    title: 'Mobile Apps',
    slug: 'mobile-app-development',
    description: 'Native & Cross-platform apps for iOS and Android using React Native and Flutter for seamless experiences.',
    icon: 'fa-solid fa-mobile-screen-button'
  },
  {
    id: 's3',
    title: 'SEO & Marketing',
    slug: 'seo-and-performance-optimization',
    description: 'Data-driven strategies to scale your digital presence. Boost your rankings and reach your target audience effectively.',
    icon: 'fa-solid fa-chart-line'
  },
  {
    id: 's4',
    title: 'UI/UX & Prototyping',
    slug: 'ui-ux-design-and-prototyping',
    description: 'User-centric designs that convert visitors into customers. We create intuitive interfaces and engaging prototypes.',
    icon: 'fa-solid fa-pen-nib'
  },
  {
    id: 's5',
    title: 'E‑Commerce Solutions',
    slug: 'e-commerce-development',
    description: 'End-to-end e-commerce platforms with secure payment gateways and smooth checkout experiences.',
    icon: 'fa-solid fa-shopping-cart'
  },
  {
    id: 's6',
    title: 'Cloud & DevOps',
    slug: 'cloud-and-devops-services',
    description: 'Streamline your development lifecycle with automated deployments and reliable cloud infrastructure.',
    icon: 'fa-solid fa-cloud'
  }
];

export const UPCOMING_BATCHES: UpcomingBatch[] = [
  {
    id: 'b1',
    courseId: '4',
    courseTitle: 'MERN Stack',
    startDate: 'April 15, 2025',
    time: '7:00 AM - 9:00 AM',
    status: 'Enrolling',
    seatsLeft: 4
  },
  {
    id: 'b2',
    courseId: '3',
    courseTitle: 'React & Next JS',
    startDate: 'April 18, 2025',
    time: '4:00 PM - 6:00 PM',
    status: 'Enrolling',
    seatsLeft: 7
  },
  {
    id: 'b3',
    courseId: '7',
    courseTitle: 'Job‑Ready Program',
    startDate: 'May 02, 2025',
    time: '11:00 AM - 1:00 PM',
    status: 'Enrolling',
    seatsLeft: 12
  }
];




export const COURSES: Course[] = [
  {
    id: "UX-101",
    title: "UI/UX Design Training",
    slug: slugify("UI/UX Design Training"),
    category: "design",
    description:
      "User Research & Personas | Information Architecture | Wireframing | Visual UI Design | Prototyping & Usability Testing",
    price: 8000,
    duration: "2 Hours per day",
    image: "ui-ux.png",
    module: "Module I",
    curriculum: [
      {
        id: "ux-introduction",
        title: "Introduction to UI & UX Design",
        objectives: [
          "Understand what UI and UX design mean",
          "Differentiate UI, UX, and Product Design",
        ],
        keyTopics: [
          "What is User Experience (UX)",
          "What is User Interface (UI)",
          "UI vs UX vs Product Design",
          "Design maturity and real‑world examples",
        ],
        activities: ["Analyze UI/UX of popular apps"],
        deliverables: ["UI vs UX comparison notes"],
        tools: ["Notion"],
        duration: "1 session",
      },
      {
        id: "design-thinking",
        title: "Design Thinking Process",
        objectives: [
          "Learn problem‑solving through design thinking",
          "Apply user‑centric approach in design",
        ],
        keyTopics: [
          "Empathize, Define, Ideate, Prototype, Test",
          "Double Diamond model",
          "Human‑centered design principles",
        ],
        activities: ["Define a problem using real‑world scenarios"],
        deliverables: ["Problem statement & design brief"],
        tools: ["FigJam"],
        duration: "1 session",
        prerequisites: ["ux-introduction"],
      },
      {
        id: "user-research",
        title: "User Research Fundamentals",
        objectives: [
          "Conduct research to understand users",
          "Identify user needs and pain points",
        ],
        keyTopics: [
          "Qualitative vs quantitative research",
          "User interviews & surveys",
          "Research ethics & assumptions",
        ],
        activities: ["Create interview questions & surveys"],
        deliverables: ["User research plan"],
        tools: ["Google Forms", "FigJam"],
        duration: "2 sessions",
        prerequisites: ["design-thinking"],
      },
      {
        id: "personas-journey",
        title: "User Personas & Journey Mapping",
        objectives: [
          "Convert research into actionable insights",
          "Visualize user experience end‑to‑end",
        ],
        keyTopics: [
          "User personas",
          "Empathy maps",
          "Customer journey maps",
        ],
        activities: ["Build persona & journey map"],
        deliverables: ["Persona sheet & journey map"],
        tools: ["FigJam"],
        duration: "1–2 sessions",
        prerequisites: ["user-research"],
      },
      {
        id: "information-architecture",
        title: "Information Architecture",
        objectives: [
          "Organize content logically",
          "Improve usability and navigation",
        ],
        keyTopics: [
          "Information architecture basics",
          "Card sorting techniques",
          "Sitemaps & navigation structures",
        ],
        activities: ["Create sitemap for a sample website"],
        deliverables: ["Website sitemap"],
        tools: ["FigJam"],
        duration: "1 session",
        prerequisites: ["personas-journey"],
      },
      {
        id: "wireframing",
        title: "Wireframing Techniques",
        objectives: [
          "Design low‑fidelity layouts",
          "Translate ideas into structured screens",
        ],
        keyTopics: [
          "Low‑fidelity vs high‑fidelity wireframes",
          "Layout patterns",
          "Content hierarchy",
        ],
        activities: ["Design wireframes for 4–5 screens"],
        deliverables: ["Low‑fidelity wireframes"],
        tools: ["Figma"],
        duration: "1–2 sessions",
        prerequisites: ["information-architecture"],
      },
      {
        id: "ui-design-fundamentals",
        title: "UI Design Fundamentals",
        objectives: [
          "Create visually appealing interfaces",
          "Apply visual design principles",
        ],
        keyTopics: [
          "Color theory",
          "Typography",
          "Spacing, alignment, consistency",
          "Design systems basics",
        ],
        activities: ["Create UI style guide"],
        deliverables: ["Color & typography style guide"],
        tools: ["Figma"],
        duration: "2 sessions",
        prerequisites: ["wireframing"],
      },
      {
        id: "figma-tools",
        title: "Figma for UI/UX Design",
        objectives: [
          "Use Figma efficiently for design workflows",
          "Create reusable components",
        ],
        keyTopics: [
          "Frames, components & variants",
          "Auto layout",
          "Design tokens & libraries",
        ],
        activities: ["Build reusable UI components"],
        deliverables: ["Component library"],
        tools: ["Figma"],
        duration: "2 sessions",
        prerequisites: ["ui-design-fundamentals"],
      },
      {
        id: "prototyping",
        title: "Interactive Prototyping",
        objectives: [
          "Create clickable prototypes",
          "Simulate real user interaction",
        ],
        keyTopics: [
          "Low vs high‑fidelity prototypes",
          "Micro‑interactions",
          "Transitions & animations",
        ],
        activities: ["Build interactive prototype"],
        deliverables: ["Clickable prototype"],
        tools: ["Figma"],
        duration: "1–2 sessions",
        prerequisites: ["figma-tools"],
      },
      {
        id: "usability-testing",
        title: "Usability Testing",
        objectives: [
          "Evaluate designs with real users",
          "Identify usability issues",
        ],
        keyTopics: [
          "Usability testing methods",
          "Moderated vs unmoderated testing",
          "Usability metrics & reporting",
        ],
        activities: ["Conduct usability test"],
        deliverables: ["Usability test report"],
        tools: ["Google Meet", "Notion"],
        duration: "1 session",
        prerequisites: ["prototyping"],
      },
      {
        id: "handoff-collaboration",
        title: "Developer Handoff & Collaboration",
        objectives: [
          "Prepare designs for development",
          "Collaborate with developers effectively",
        ],
        keyTopics: [
          "Design handoff best practices",
          "Figma Dev Mode basics",
          "Design documentation",
        ],
        activities: ["Prepare handoff specs"],
        deliverables: ["Developer handoff document"],
        tools: ["Figma"],
        duration: "1 session",
        prerequisites: ["usability-testing"],
      },
      {
        id: "portfolio-project",
        title: "UI/UX Capstone Project",
        objectives: [
          "Apply the complete UI/UX process",
          "Build a portfolio‑ready case study",
        ],
        keyTopics: [
          "Case study storytelling",
          "Presentation & critique",
          "UX portfolio structure",
        ],
        activities: ["End‑to‑end project execution"],
        deliverables: ["Complete UI/UX case study"],
        tools: ["Figma", "Notion"],
        duration: "2–3 sessions",
        prerequisites: ["handoff-collaboration"],
      },
    ],
    prerequisites: ["Basic computer knowledge", "Creative mindset"],
    instructor: {
      name: "Anjali Gurung",
      title: "Lead UI/UX Designer",
      avatar: "https://i.pravatar.cc/150?u=anjali",
      bio: "Anjali has designed products for international clients and excels at teaching user‑centered design principles.",
    },
  },
  {
    id: "WD-101",
    title: "Web Design Training",
    slug: slugify("Web Design Training"),
    category: "frontend",
    description:
      "HTML5, CSS3, Responsive Design, Tailwind CSS, Bootstrap 5, Sass/SCSS, Git & Deployment",
    price: 8000,
    duration: "2 Hours per day",
    image: "web-design-training.png",
    module: "Module II",
    curriculum: [
      {
        id: "intro-web",
        title: "Introduction to the Web & Workflow",
        objectives: [
          "Understand how the web works end-to-end",
          "Set up a productive developer environment",
        ],
        keyTopics: [
          "Clients, servers, HTTP, DNS, hosting",
          "Static vs dynamic sites",
          "Folder structure & semantic file naming",
          "VS Code setup, extensions, Emmet, Live Server",
        ],
        activities: ["Create a project scaffold with assets, css, and pages"],
        deliverables: ["Starter project with README"],
        tools: ["VS Code", "Live Server", "Prettier", "ESLint"],
        duration: "1 session",
      },

      // HTML5
      {
        id: "html5-basics",
        title: "HTML5 Foundations",
        objectives: [
          "Write clean, semantic, accessible HTML",
          "Structure content using appropriate elements",
        ],
        keyTopics: [
          "Elements, tags, attributes",
          "Headings, paragraphs, lists",
          "Links, images, figure/figcaption",
          "Tables (semantics & accessibility)",
          "Forms: inputs, labels, validation attributes",
        ],
        activities: ["Mark up a multi-section article page"],
        deliverables: ["Semantic HTML page"],
        tools: ["VS Code", "Chrome DevTools"],
        duration: "1–2 sessions",
      },
      {
        id: "html5-semantics-a11y-seo",
        title: "Semantic HTML5, Accessibility & SEO Basics",
        objectives: [
          "Use semantic layout elements correctly",
          "Improve discoverability and accessibility",
        ],
        keyTopics: [
          "header, nav, main, section, article, aside, footer",
          "Alt text, labels, landmark roles (intro ARIA)",
          "Meta tags, Open Graph, favicons, basic SEO",
        ],
        activities: ["Refactor a page to semantic layout with landmarks"],
        deliverables: ["Accessible, SEO-friendly HTML skeleton"],
        tools: ["WAVE toolbar", "Lighthouse"],
        duration: "1 session",
        prerequisites: ["html5-basics"],
      },

      // CSS3
      {
        id: "css-fundamentals",
        title: "CSS Fundamentals",
        objectives: [
          "Connect and organize stylesheets",
          "Apply selectors and cascade effectively",
        ],
        keyTopics: [
          "Inline vs internal vs external CSS",
          "Specificity, cascade, inheritance",
          "Color systems (HEX, RGB, HSL)",
          "Units (px, %, em, rem, vh, vw)",
        ],
        activities: ["Style a basic page with consistent typography & colors"],
        deliverables: ["Base stylesheet with variables (custom properties)"],
        tools: ["Chrome DevTools"],
        duration: "1 session",
        prerequisites: ["html5-basics"],
      },
      {
        id: "css-box-typography",
        title: "Box Model & Typography",
        objectives: [
          "Master spacing and sizing with the box model",
          "Create readable, consistent typography",
        ],
        keyTopics: [
          "Margin, border, padding, content",
          "box-sizing, overflow, display",
          "Web fonts, Google Fonts, line-height, letter-spacing",
          "Fluid typography and clamp()",
        ],
        activities: ["Apply a type scale and spacing system to a page"],
        deliverables: ["Type scale & spacing tokens"],
        duration: "1 session",
        prerequisites: ["css-fundamentals"],
      },
      {
        id: "css-layout",
        title: "Modern Layout: Flexbox & CSS Grid",
        objectives: [
          "Build responsive layouts with Flexbox and Grid",
          "Choose the right layout system per component",
        ],
        keyTopics: [
          "Flexbox: axis, wrap, gap, alignment",
          "Grid: tracks, areas, repeat(), minmax(), auto-fit/fill",
          "Positioning (relative/absolute/fixed/sticky), z-index",
        ],
        activities: ["Recreate a landing page hero + features grid"],
        deliverables: ["Responsive layout for 2–3 sections"],
        duration: "2 sessions",
        prerequisites: ["css-box-typography"],
      },
      {
        id: "css-effects",
        title: "Transitions, Transforms & Animations",
        objectives: [
          "Enhance UI with tasteful motion",
          "Optimize animations for performance",
        ],
        keyTopics: [
          "transition, transform, keyframes",
          "Prefers-reduced-motion",
          "Shadows, gradients, blend modes",
        ],
        activities: ["Animate buttons, menus, and card hover states"],
        deliverables: ["Micro‑interactions pack"],
        duration: "1 session",
        prerequisites: ["css-fundamentals"],
      },

      // Responsive Web Design
      {
        id: "responsive-rwd",
        title: "Responsive Web Design",
        objectives: [
          "Design mobile‑first responsive layouts",
          "Use media queries and fluid techniques",
        ],
        keyTopics: [
          "Breakpoints strategy",
          "Fluid grids, max-width, responsive images",
          "Container queries (intro) & modern viewport units",
        ],
        activities: ["Make an existing desktop layout fully responsive"],
        deliverables: ["Responsive multi‑device page"],
        duration: "1 session",
        prerequisites: ["css-layout"],
      },

      // Bootstrap
      {
        id: "bootstrap-basics",
        title: "Bootstrap 5 Essentials",
        objectives: [
          "Build fast with Bootstrap utilities and components",
          "Customize Bootstrap styles safely",
        ],
        keyTopics: [
          "Setup via CDN & local",
          "Container & grid system",
          "Utilities (spacing, display, colors)",
          "Components: navbar, cards, forms, modals, carousel, accordion",
          "Icons (Bootstrap Icons)",
        ],
        activities: ["Assemble a 3‑page site using Bootstrap"],
        deliverables: ["Bootstrap multi‑page scaffold"],
        tools: ["Bootstrap 5"],
        duration: "1–2 sessions",
        prerequisites: ["responsive-rwd"],
      },
      {
        id: "bootstrap-customize",
        title: "Customizing Bootstrap",
        objectives: [
          "Override defaults with variables",
          "Keep a maintainable customization layer",
        ],
        keyTopics: [
          "Theming via variables",
          "Extending utilities",
          "Avoiding brittle overrides",
        ],
        activities: ["Create a custom theme variant"],
        deliverables: ["Theme variables file"],
        duration: "1 session",
        prerequisites: ["bootstrap-basics"],
      },

      // Tailwind CSS
      {
        id: "tailwind-setup",
        title: "Tailwind CSS Setup & Core Concepts",
        objectives: [
          "Install and configure Tailwind",
          "Use utility-first classes effectively",
        ],
        keyTopics: [
          "CDN vs CLI, JIT engine",
          "tailwind.config.js – theme, extend, plugins",
          "Responsive prefixes, state variants (hover, focus, dark)",
        ],
        activities: ["Configure Tailwind and build a hero + features section"],
        deliverables: ["Tailwind project starter"],
        tools: ["Tailwind CSS"],
        duration: "1 session",
        prerequisites: ["responsive-rwd"],
      },
      {
        id: "tailwind-components",
        title: "Building with Tailwind Utilities",
        objectives: [
          "Compose components with utilities",
          "Keep HTML readable and DRY with @apply",
        ],
        keyTopics: [
          "Spacing, colors, typography utilities",
          "Flexbox & Grid utilities",
          "Dark mode, container, aspect-ratio",
          "@layer, @apply, extracting components",
        ],
        activities: ["Build a landing page with reusable patterns"],
        deliverables: ["Component snippets library"],
        duration: "1 session",
        prerequisites: ["tailwind-setup"],
      },
      {
        id: "tailwind-advanced",
        title: "Advanced Tailwind & Performance",
        objectives: [
          "Customize deeply and ship optimized CSS",
          "Structure larger projects with partials",
        ],
        keyTopics: [
          "Custom themes, design tokens in config",
          "Plugins & forms/typography",
          "Tree‑shaking, content safelisting",
        ],
        activities: ["Implement a sitewide theme switch"],
        deliverables: ["Optimized production build"],
        duration: "1 session",
        prerequisites: ["tailwind-components"],
      },

      // Sass/SCSS
      {
        id: "sass-intro",
        title: "Sass/SCSS Fundamentals",
        objectives: [
          "Write modular, maintainable styles with Sass",
          "Leverage variables, mixins, and nesting",
        ],
        keyTopics: [
          "Sass vs SCSS syntax",
          "Variables, nesting, partials, imports",
          "Mixins, functions, extends, placeholders",
        ],
        activities: ["Refactor a CSS filebase to SCSS modules"],
        deliverables: ["SCSS architecture with partials"],
        tools: ["Sass (Dart Sass)"],
        duration: "1 session",
        prerequisites: ["css-fundamentals"],
      },
      {
        id: "sass-architecture",
        title: "Scalable CSS Architecture (BEM + Sass)",
        objectives: [
          "Adopt a naming convention and file structure",
          "Balance frameworks and custom styles",
        ],
        keyTopics: [
          "BEM methodology",
          "7-1 pattern, index files, globals",
          "Combining Sass with Bootstrap/Tailwind",
        ],
        activities: ["Create a minimal design system with tokens"],
        deliverables: ["Design tokens & utilities layer"],
        duration: "1 session",
        prerequisites: ["sass-intro"],
      },

      // Tooling, Git, Deployment
      {
        id: "tooling-git",
        title: "Git, GitHub & Project Hygiene",
        objectives: [
          "Version and collaborate with Git",
          "Maintain consistent code quality",
        ],
        keyTopics: [
          "git init, commit, branch, merge, PRs",
          ".gitignore, commit messages",
          "Prettier/ESLint basics for HTML/CSS",
        ],
        activities: ["Create a repo and open a PR"],
        deliverables: ["Repo with PR history and linted code"],
        tools: ["Git", "GitHub", "Prettier", "ESLint"],
        duration: "1 session",
      },
      {
        id: "deploy-hosting",
        title: "Optimization & Deployment",
        objectives: [
          "Ship a production-ready static site",
          "Measure and improve performance & accessibility",
        ],
        keyTopics: [
          "Image optimization (AVIF/WebP), responsive images",
          "Minification, critical CSS (intro)",
          "Lighthouse audits, basic SEO checklist",
          "Hosting with GitHub Pages/Netlify",
        ],
        activities: ["Deploy a site and pass performance budgets"],
        deliverables: ["Live URL + audit report"],
        tools: ["Lighthouse", "Image tooling", "Netlify/GitHub Pages"],
        duration: "1 session",
      },

      // Capstone
      {
        id: "capstone",
        title: "Capstone Project",
        objectives: [
          "Plan and build a fully responsive multi‑page website",
          "Demonstrate mastery across HTML, CSS, Tailwind/Bootstrap, Sass",
        ],
        keyTopics: [
          "IA & content strategy",
          "Component library & tokens",
          "Accessibility & performance polish",
        ],
        activities: [
          "Build 4–6 pages with a blog or feature section",
          "Peer review & iteration",
        ],
        deliverables: ["Live site + source code + handoff docs"],
        tools: ["Your choice: Tailwind or Bootstrap + Sass"],
        duration: "2–3 sessions",
        prerequisites: [
          "responsive-rwd",
          "bootstrap-basics",
          "tailwind-setup",
          "sass-intro",
        ],
      },
    ],
    prerequisites: ["Basic computer knowledge"],
    instructor: DEFAULT_INSTRUCTOR,
  },
  {
    id: "3",
    title: "React & Next.js Training",
    slug: slugify("React & Next.js Training"),
    category: "js",
    description:
      "Modern React (Hooks, State, Performance) + Next.js App Router (Server Components, Data Fetching, Caching, Routing, API Routes) with TypeScript, Testing & Deployment",
    price: 8000,
    duration: "2 Hours per day",
    image: "react-next.webp",
    module: "Module III",
    curriculum: [
      {
        id: "modern-js-prereq",
        title: "Modern JavaScript Essentials (Prereq)",
        objectives: [
          "Use modern ES6+ features comfortably",
          "Write clean, modular, asynchronous JavaScript",
        ],
        keyTopics: [
          "let/const, template literals, destructuring, spread/rest",
          "Arrow functions, modules (import/export)",
          "Promises, async/await, fetch, error handling",
          "Array/object patterns: map, filter, reduce",
        ],
        activities: ["Convert a legacy JS snippet to modern ES modules"],
        deliverables: ["Utility helpers mini‑pack"],
        tools: ["Node.js", "Vite/Parcel", "ESLint", "Prettier"],
        duration: "1 session (foundation)",
      },

      /* REACT ESSENTIALS */
      {
        id: "react-fundamentals",
        title: "React Fundamentals",
        objectives: [
          "Understand React’s component model and rendering",
          "Build UI with JSX and props",
        ],
        keyTopics: [
          "What React solves, declarative UI",
          "JSX, fragments, expressions, lists & keys",
          "Props, composition vs inheritance",
          "Component lifecycle (conceptual) with Hooks",
        ],
        activities: ["Build a card/list UI with props & keys"],
        deliverables: ["React starter app (Vite)"],
        tools: ["React", "Vite", "ESLint + React rules"],
        duration: "1–2 sessions",
        prerequisites: ["modern-js-prereq"],
      },
      {
        id: "state-effects",
        title: "State & Effects (Hooks Basics)",
        objectives: [
          "Manage local state and side effects properly",
          "Avoid common pitfalls with effects",
        ],
        keyTopics: [
          "useState, derived state, initializers",
          "useEffect: dependency arrays, cleanup, data fetching pattern",
          "Event handling, controlled vs uncontrolled components",
          "Conditional rendering patterns",
        ],
        activities: ["Interactive form with validation & effects"],
        deliverables: ["Form + list + filter component"],
        tools: ["React DevTools"],
        duration: "1–2 sessions",
        prerequisites: ["react-fundamentals"],
      },
      {
        id: "hooks-advanced",
        title: "Advanced Hooks & Performance",
        objectives: [
          "Prevent unnecessary renders and re‑computations",
          "Create reusable logic with custom hooks",
        ],
        keyTopics: [
          "useMemo, useCallback: when and why",
          "useRef for mutable values and DOM access",
          "Custom hooks (extraction, parameters, return shapes)",
          "Suspense (intro), lazy() & code‑splitting",
        ],
        activities: ["Build a custom useFetch/useDebounce hook"],
        deliverables: ["Hooks utilities package"],
        tools: ["React Profiler", "Lighthouse"],
        duration: "1–2 sessions",
        prerequisites: ["state-effects"],
      },
      {
        id: "forms-data",
        title: "Forms, Validation & Data Layer",
        objectives: [
          "Handle complex forms and async server state",
          "Design reliable data fetching flows",
        ],
        keyTopics: [
          "React Hook Form / Formik basics",
          "Zod/Yup for schema validation",
          "Server state vs client state",
          "TanStack Query (queries, mutations, cache, pagination)",
        ],
        activities: ["Build a CRUD form with optimistic updates"],
        deliverables: ["Validated form + data fetching module"],
        tools: ["React Hook Form", "Zod", "TanStack Query"],
        duration: "1–2 sessions",
        prerequisites: ["state-effects"],
      },
      {
        id: "routing-spa",
        title: "Routing in SPAs (React Router)",
        objectives: [
          "Build client‑side routed apps with nested layouts",
          "Use loaders/actions or data APIs (if applicable)",
        ],
        keyTopics: [
          "Routes, nested routes, params, search params",
          "Layouts, protected routes, code‑splitting by route",
          "Navigation patterns and scroll restoration",
        ],
        activities: ["Create a multi‑page SPA with nested routes"],
        deliverables: ["Routed SPA starter"],
        tools: ["React Router"],
        duration: "1 session",
        prerequisites: ["react-fundamentals"],
      },
      {
        id: "state-management",
        title: "App‑Scale State Management",
        objectives: [
          "Choose the right tool for state at scale",
          "Organize slices and selectors cleanly",
        ],
        keyTopics: [
          "Context API & performance caveats",
          "Redux Toolkit (slices, RTK Query)",
          "Alternative stores: Zustand/Jotai (overview)",
          "Server state vs client state boundaries",
        ],
        activities: ["Global auth/cart store + selector optimization"],
        deliverables: ["App state layer (Redux Toolkit/Zustand)"],
        duration: "1 session",
        prerequisites: ["hooks-advanced"],
      },
      {
        id: "react-testing",
        title: "Testing & Accessibility",
        objectives: [
          "Write confident unit/integration tests",
          "Ship accessible components",
        ],
        keyTopics: [
          "Jest + React Testing Library",
          "Mocking fetch/requests; testing hooks",
          "Cypress (E2E) overview",
          "A11y: roles, labels, ARIA basics, keyboard traps",
        ],
        activities: ["Add tests for a form + list + async flow"],
        deliverables: ["Test suite with >80% coverage (key paths)"],
        tools: ["Jest", "RTL", "Cypress", "axe DevTools"],
        duration: "1 session",
        prerequisites: ["forms-data"],
      },
      {
        id: "typescript-react",
        title: "TypeScript with React",
        objectives: [
          "Type props, state, hooks, and events",
          "Model API responses and utilities safely",
        ],
        keyTopics: [
          "Props & component generics",
          "Discriminated unions & utility types",
          "Typing custom hooks, React Query types",
          "strict mode, tsconfig hygiene",
        ],
        activities: ["Migrate components to TypeScript"],
        deliverables: ["Typed React app foundation"],
        tools: ["TypeScript", "ts-node", "ts-jest"],
        duration: "1 session",
        prerequisites: ["react-fundamentals"],
      },

      /* NEXT.JS – APP ROUTER & RSC */
      {
        id: "next-basics",
        title: "Next.js Fundamentals (App Router)",
        objectives: [
          "Build with file‑based routing and layouts",
          "Understand Server vs Client Components",
        ],
        keyTopics: [
          "Project structure: app/, routing & nested layouts",
          "Server Components vs Client Components",
          "Metadata, fonts, images, static assets",
          "Environment variables & config",
        ],
        activities: ["Convert a React SPA to Next.js App Router"],
        deliverables: ["Next.js base project with layouts"],
        tools: ["Next.js", "Vite (for prior SPA)", "ESLint/Next config"],
        duration: "1–2 sessions",
        prerequisites: ["react-fundamentals"],
      },
      {
        id: "next-data",
        title: "Data Fetching, Caching & Rendering",
        objectives: [
          "Choose SSR/SSG/ISR/CSR appropriately",
          "Use built‑in caching and revalidation",
        ],
        keyTopics: [
          "fetch in Server Components (caching, revalidate)",
          "SSR vs SSG vs ISR trade‑offs",
          "Route Handlers (API routes) & streaming",
          "Parallel/Intercepted routes (advanced routing)",
        ],
        activities: ["Products listing (SSG) + product detail (SSR)"],
        deliverables: ["Hybrid rendering demo with cache strategy"],
        tools: ["Next.js", "Postman/Insomnia"],
        duration: "1–2 sessions",
        prerequisites: ["next-basics"],
      },
      {
        id: "next-client",
        title: "Client Components & Interactivity",
        objectives: [
          "Add dynamic behavior where needed",
          "Balance RSC with client interactivity",
        ],
        keyTopics: [
          '"use client" boundary & trade‑offs',
          "Client hooks, forms, and event handlers",
          "Using TanStack Query in Client Components",
          "Progressive enhancement patterns",
        ],
        activities: ["Client search/filter + server‑rendered list"],
        deliverables: ["Client/Server composition patterns"],
        duration: "1 session",
        prerequisites: ["next-data"],
      },
      {
        id: "next-styling",
        title: "Styling in Next.js",
        objectives: [
          "Choose and set up a scalable styling approach",
          "Optimize CSS for performance",
        ],
        keyTopics: [
          "CSS Modules, global CSS",
          "Sass/SCSS setup",
          "Tailwind CSS setup & theming",
          "Critical CSS basics, font & image optimization",
        ],
        activities: ["Implement a design system with tokens"],
        deliverables: ["Theme + components library"],
        tools: ["Tailwind CSS or SCSS", "PostCSS"],
        duration: "1 session",
        prerequisites: ["next-basics"],
      },
      {
        id: "next-auth",
        title: "Authentication & Authorization",
        objectives: [
          "Implement secure auth flows",
          "Protect routes and handle sessions",
        ],
        keyTopics: [
          "Auth patterns (JWT, cookie sessions)",
          "NextAuth/Auth.js basics, providers",
          "Route protection (server + client), middleware",
          "RBAC/permissions, password reset flows",
        ],
        activities: ["Email/password + OAuth provider setup"],
        deliverables: ["Protected routes + session management"],
        tools: ["Auth.js/NextAuth", "Bcrypt/Argon2", "JWT"],
        duration: "1 session",
        prerequisites: ["next-data"],
      },
      {
        id: "next-api-db",
        title: "APIs, Database & Server Actions",
        objectives: [
          "Build APIs close to your UI",
          "Connect to a database and perform CRUD safely",
        ],
        keyTopics: [
          "Route Handlers (GET/POST/PUT/DELETE)",
          "Server Actions (intro and constraints)",
          "ORMs (Prisma) and DB choices (Postgres/MySQL/Mongo)",
          "Validation (Zod) & error handling",
        ],
        activities: ["Create CRUD API + form submitting to Server Action"],
        deliverables: ["Data layer + validated endpoints"],
        tools: ["Prisma", "PostgreSQL/PlanetScale/MongoDB", "Zod"],
        duration: "1–2 sessions",
        prerequisites: ["next-data", "forms-data"],
      },
      {
        id: "next-advanced",
        title: "Advanced Routing, Middleware & Edge",
        objectives: [
          "Leverage advanced app router capabilities",
          "Run logic at the Edge where it fits",
        ],
        keyTopics: [
          "Middleware (auth, rewrites, headers)",
          "Dynamic routes, parallel & intercepted routes",
          "Internationalization (i18n) basics",
          "Edge/ISR considerations and trade‑offs",
        ],
        activities: ["Add locale switch + middleware guard"],
        deliverables: ["i18n‑ready routes + middleware"],
        duration: "1 session",
        prerequisites: ["next-basics"],
      },
      {
        id: "quality-security",
        title: "Quality, Security & Observability",
        objectives: [
          "Ship production‑ready apps with confidence",
          "Harden security and monitor runtime",
        ],
        keyTopics: [
          "Env management, secret handling",
          "Security headers, XSS/CSRF basics, input sanitization",
          "Error boundaries, logging, monitoring",
          "Lighthouse, Web Vitals, bundle analysis",
        ],
        activities: ["Add security headers and error reporting"],
        deliverables: ["Security checklist + monitoring setup"],
        tools: ["Helmet (headers)", "Sentry/LogRocket", "Lighthouse"],
        duration: "1 session",
        prerequisites: ["react-testing", "next-basics"],
      },
      {
        id: "build-deploy",
        title: "Build, CI/CD & Deployment",
        objectives: [
          "Automate builds and previews",
          "Deploy to cloud with proper caching",
        ],
        keyTopics: [
          "Build outputs, image/font optimization",
          "CI pipelines (GitHub Actions) & lint/test gates",
          "Vercel/Netlify deployment, preview URLs",
          "CDN caching, stale‑while‑revalidate",
        ],
        activities: ["Configure CI + deploy production build"],
        deliverables: ["Live app + CI pipeline"],
        tools: ["Vercel/Netlify", "GitHub Actions"],
        duration: "1 session",
        prerequisites: ["next-data"],
      },

      /* CAPSTONE */
      {
        id: "capstone-react-next",
        title: "Capstone Project",
        objectives: [
          "Plan, build, and deploy a production‑grade app",
          "Demonstrate mastery of React + Next.js stack",
        ],
        keyTopics: [
          "Feature scoping, milestones, and backlog",
          "Hybrid rendering & cache strategy",
          "A11y, testing, and performance budgets",
        ],
        activities: [
          "End‑to‑end build: auth, dashboards, CRUD, search",
          "Peer review, refactor, finalize",
        ],
        deliverables: [
          "Deployed app with README + architecture doc",
          "Test coverage report & Lighthouse scores",
        ],
        tools: ["React", "Next.js", "Auth.js", "Prisma", "Vercel"],
        duration: "2–3 sessions",
        prerequisites: [
          "next-basics",
          "next-data",
          "state-management",
          "react-testing",
          "build-deploy",
        ],
      },
    ],
    prerequisites: ["HTML/CSS Basics", "Basic JavaScript knowledge"],
    instructor: DEFAULT_INSTRUCTOR,
  }
  ,
  {
    id: "4", // change if this collides with your existing MERN course
    title: "Full‑Stack MERN Development",
    slug: slugify("Full-Stack MERN Development"),
    category: "js",
    description:
      "MongoDB, Express, React & Node (MERN): REST APIs, Auth, Testing, Realtime, Payments, Docker, CI/CD, Cloud Deploy",
    price: 16000,
    duration: "2 Hours per day",
    image: "mern.jpg",
    module: "Module IV",
    curriculum: [
      {
        id: "foundation",
        title: "Program Foundations & Setup",
        objectives: [
          "Prepare a modern dev environment",
          "Understand MERN architecture and workflow"
        ],
        keyTopics: [
          "Node LTS, npm/yarn/pnpm",
          "VS Code setup, Prettier, ESLint, EditorConfig",
          "Git & GitHub workflow (branching, PRs)",
          "Monorepo vs polyrepo (overview)",
          "Env management (.env, dotenv)"
        ],
        activities: ["Initialize repo, configure lint/format hooks"],
        deliverables: ["Repo with README, ESLint/Prettier, git hooks"],
        tools: ["Node.js", "Git", "VS Code", "ESLint", "Prettier", "Husky"],
        duration: "1 session"
      },

      /* BACKEND — NODE & EXPRESS */
      {
        id: "node-express-basics",
        title: "Node.js & Express Fundamentals",
        objectives: [
          "Build and structure an Express API",
          "Implement robust routing & middleware"
        ],
        keyTopics: [
          "HTTP basics, REST design",
          "Express routing, routers, controllers",
          "Middleware patterns (auth, error, logger)",
          "Config & environment separation"
        ],
        activities: ["Scaffold API with routes for users/products"],
        deliverables: ["Express app with structured modules"],
        tools: ["Express", "Nodemon", "dotenv"],
        duration: "1–2 sessions",
        prerequisites: ["foundation"]
      },
      {
        id: "mongodb-mongoose",
        title: "MongoDB & Mongoose Modeling",
        objectives: [
          "Design schemas & relations in MongoDB",
          "Implement data validation and indexing"
        ],
        keyTopics: [
          "Mongoose schemas & models",
          "References vs embedded docs",
          "Indexes (single, compound, text)",
          "Aggregation pipeline",
          "Transactions (multi‑doc)"
        ],
        activities: ["Model User, Product, Order schemas"],
        deliverables: ["Models with validation & indexes"],
        tools: ["MongoDB", "Mongoose", "MongoDB Compass"],
        duration: "1–2 sessions",
        prerequisites: ["node-express-basics"]
      },
      {
        id: "validation-error",
        title: "Input Validation & Error Handling",
        objectives: [
          "Validate input safely at API boundaries",
          "Standardize error responses"
        ],
        keyTopics: [
          "Joi/Zod schema validation",
          "Centralized error handler",
          "Async handler wrappers",
          "HTTP status codes & problem details"
        ],
        activities: ["Add Zod validation to auth/product endpoints"],
        deliverables: ["Validation layer + error middleware"],
        tools: ["Zod or Joi"],
        duration: "1 session",
        prerequisites: ["node-express-basics"]
      },
      {
        id: "auth-security",
        title: "Authentication, Authorization & Security",
        objectives: [
          "Secure APIs with robust auth",
          "Harden Express apps against common threats"
        ],
        keyTopics: [
          "Password hashing (bcrypt/argon2)",
          "JWT access/refresh tokens",
          "Sessions vs JWT, cookies vs headers",
          "RBAC/permissions",
          "CORS, Helmet, rate limiting, HPP",
          "Sanitization & CSRF basics"
        ],
        activities: ["Implement login/register/refresh/me & role guards"],
        deliverables: ["Auth module with RBAC & security middleware"],
        tools: ["jsonwebtoken", "bcrypt/argon2", "helmet", "express-rate-limit"],
        duration: "1–2 sessions",
        prerequisites: ["validation-error"]
      },
      {
        id: "files-media",
        title: "File Uploads & Media Handling",
        objectives: [
          "Handle file uploads safely",
          "Store and serve media via cloud/CDN"
        ],
        keyTopics: [
          "Multer (disk/memory), validation",
          "Cloud storage (Cloudinary/S3) & signed URLs",
          "Image transforms, responsive images",
          "CDN basics & caching headers"
        ],
        activities: ["User avatar upload + product gallery"],
        deliverables: ["Upload pipeline with cloud storage"],
        tools: ["Multer", "Cloudinary/S3 SDK"],
        duration: "1 session",
        prerequisites: ["auth-security"]
      },
      {
        id: "querying-pagination",
        title: "Filtering, Sorting, Pagination & Search",
        objectives: [
          "Build powerful list endpoints",
          "Optimize queries for performance"
        ],
        keyTopics: [
          "Query params design (filter/sort/page/limit)",
          "Cursor vs skip/limit",
          "Text indexes & search",
          "N+1 avoidance, projections"
        ],
        activities: ["Product list with filters & search"],
        deliverables: ["Reusable query utilities"],
        tools: ["Mongoose"],
        duration: "1 session",
        prerequisites: ["mongodb-mongoose"]
      },
      {
        id: "caching-performance",
        title: "Caching & Performance",
        objectives: [
          "Reduce latency with caching",
          "Scale Node processes effectively"
        ],
        keyTopics: [
          "Redis caching patterns",
          "ETag/Last‑Modified, compression",
          "PM2 clustering & process management",
          "Pagination caching & cache invalidation"
        ],
        activities: ["Cache product list; measure improvements"],
        deliverables: ["Cache layer + performance report"],
        tools: ["Redis", "PM2", "compression"],
        duration: "1 session",
        prerequisites: ["querying-pagination"]
      },
      {
        id: "realtime-socketio",
        title: "Realtime with Socket.io",
        objectives: [
          "Implement realtime features",
          "Scale websockets with adapters"
        ],
        keyTopics: [
          "Sockets lifecycle, rooms, namespaces",
          "Notifications, presence, typing indicators",
          "Redis adapter for multi‑instance scale"
        ],
        activities: ["Build notifications/chat module"],
        deliverables: ["Socket.io service + client hook"],
        tools: ["Socket.io", "Redis adapter"],
        duration: "1 session",
        prerequisites: ["auth-security"]
      },
      {
        id: "payments",
        title: "Payments Integration",
        objectives: [
          "Integrate secure payment flows",
          "Handle webhooks and idempotency"
        ],
        keyTopics: [
          "Stripe Checkout & PaymentIntents",
          "Webhooks & signature verification",
          "Orders lifecycle & refunds"
        ],
        activities: ["Stripe checkout for cart"],
        deliverables: ["Payments module + webhook handler"],
        tools: ["Stripe"],
        duration: "1 session",
        prerequisites: ["node-express-basics", "auth-security"]
      },
      {
        id: "email-notify",
        title: "Email & Notifications",
        objectives: [
          "Send transactional emails reliably",
          "Template and queue outbound messages"
        ],
        keyTopics: [
          "Nodemailer + SMTP providers",
          "Templating (MJML/Handlebars)",
          "Queues (BullMQ) for retries",
          "In‑app notifications"
        ],
        activities: ["Order confirmation + password reset emails"],
        deliverables: ["Email service + templates"],
        tools: ["Nodemailer", "BullMQ/Redis"],
        duration: "1 session",
        prerequisites: ["auth-security"]
      },
      {
        id: "testing-quality",
        title: "Testing Strategy (API & E2E)",
        objectives: [
          "Write unit & integration tests",
          "Automate quality gates"
        ],
        keyTopics: [
          "Jest, Supertest for API",
          "Test DB setup & seed data",
          "Coverage thresholds & CI gates",
          "Cypress E2E (overview)"
        ],
        activities: ["Test auth + products + orders endpoints"],
        deliverables: ["Green test suite with coverage"],
        tools: ["Jest", "Supertest", "Cypress (optional)"],
        duration: "1 session",
        prerequisites: ["node-express-basics"]
      },
      {
        id: "logging-observability",
        title: "Logging, Monitoring & Error Tracking",
        objectives: [
          "Instrument services for visibility",
          "Track errors across client & server"
        ],
        keyTopics: [
          "Winston/Pino structured logs",
          "Request IDs & correlation",
          "Sentry/Logtail integration",
          "Health checks & uptime"
        ],
        activities: ["Add request/response logging + error tracking"],
        deliverables: ["Observability baseline"],
        tools: ["Winston/Pino", "Sentry"],
        duration: "1 session",
        prerequisites: ["node-express-basics"]
      },

      /* FRONTEND — REACT */
      {
        id: "react-foundations",
        title: "React Foundations for MERN",
        objectives: [
          "Build SPA with modern React",
          "Consume REST APIs with proper state management"
        ],
        keyTopics: [
          "Vite + React project setup",
          "Components, props, state, effects",
          "React Router (routes, loaders basics)",
          "Forms, validation (React Hook Form + Zod)"
        ],
        activities: ["Product listing + detail + cart UI"],
        deliverables: ["React SPA scaffold"],
        tools: ["React", "Vite", "React Router", "React Hook Form", "Zod"],
        duration: "1–2 sessions",
        prerequisites: ["foundation"]
      },
      {
        id: "react-data-state",
        title: "Client Data Layer & State",
        objectives: [
          "Handle server state and cache",
          "Manage global state for auth/cart"
        ],
        keyTopics: [
          "TanStack Query (queries, mutations, cache)",
          "Redux Toolkit or Zustand for app state",
          "Protected routes & token refresh",
          "Optimistic updates & pagination"
        ],
        activities: ["Authenticated cart & orders flow"],
        deliverables: ["Data layer + global state"],
        tools: ["TanStack Query", "Redux Toolkit/Zustand"],
        duration: "1 session",
        prerequisites: ["react-foundations", "auth-security"]
      },
      {
        id: "react-ui",
        title: "UI System & Styling",
        objectives: [
          "Create a consistent, accessible UI",
          "Ship responsive components quickly"
        ],
        keyTopics: [
          "Tailwind CSS or MUI design system",
          "Theming, tokens & dark mode",
          "A11y (roles, labels, keyboard traps)",
          "Reusable components & patterns"
        ],
        activities: ["Build navbar, forms, tables, modals"],
        deliverables: ["Reusable UI kit"],
        tools: ["Tailwind CSS or MUI"],
        duration: "1 session",
        prerequisites: ["react-foundations"]
      },

      /* INTEGRATION & DEPLOYMENT */
      {
        id: "docker-devops",
        title: "Docker, NGINX & Environment Strategy",
        objectives: [
          "Containerize services for consistency",
          "Serve production with reverse proxy"
        ],
        keyTopics: [
          "Dockerfiles for API & client",
          "Docker Compose (API, Mongo, Redis, client)",
          "NGINX reverse proxy, gzip, caching headers",
          "12‑factor configs"
        ],
        activities: ["Local stack with docker‑compose"],
        deliverables: ["Dockerized MERN app + proxy"],
        tools: ["Docker", "Docker Compose", "NGINX"],
        duration: "1 session",
        prerequisites: [
          "node-express-basics",
          "react-foundations",
          "caching-performance"
        ]
      },
      {
        id: "ci-cd-deploy",
        title: "CI/CD & Cloud Deployment",
        objectives: [
          "Automate build, test, and deploy",
          "Deploy to cloud with SSL and domain"
        ],
        keyTopics: [
          "GitHub Actions pipelines (lint/test/build)",
          "Envs & secrets, preview deployments",
          "VPS/Cloud (AWS/DO/Render/Vercel/Netlify)",
          "NGINX + Certbot (SSL), PM2"
        ],
        activities: ["Set up CI + deploy backend & frontend"],
        deliverables: ["Live app with pipeline & monitoring"],
        tools: ["GitHub Actions", "PM2", "Vercel/Netlify + VPS"],
        duration: "1 session",
        prerequisites: ["docker-devops", "testing-quality"]
      },

      /* ADVANCED & OPTIONAL TRACKS */
      {
        id: "queues-jobs",
        title: "Background Jobs & Scheduling (Optional)",
        objectives: [
          "Offload heavy work from request cycle",
          "Improve resilience with retries and DLQs"
        ],
        keyTopics: [
          "Queues with BullMQ (Redis)",
          "Retry strategies, backoff, concurrency",
          "Cron jobs & maintenance tasks"
        ],
        activities: ["Generate invoices & email via queue"],
        deliverables: ["Background jobs service"],
        tools: ["BullMQ", "node-cron", "Redis"],
        duration: "1 session",
        prerequisites: ["email-notify"]
      },
      {
        id: "graphql-alt",
        title: "GraphQL with Apollo (Optional)",
        objectives: [
          "Expose GraphQL API alongside REST",
          "Query from React efficiently"
        ],
        keyTopics: [
          "Schemas, resolvers, context",
          "Pagination & caching",
          "Security considerations"
        ],
        activities: ["Add GraphQL for product catalog"],
        deliverables: ["GraphQL endpoint + client"],
        tools: ["Apollo Server/Client"],
        duration: "1 session",
        prerequisites: ["mongodb-mongoose"]
      },

      /* CAPSTONE */
      {
        id: "capstone-mern",
        title: "Capstone Project (Production‑Grade)",
        objectives: [
          "Deliver a full MERN product end‑to‑end",
          "Demonstrate scalability, security & quality"
        ],
        keyTopics: [
          "Feature scoping & milestones",
          "Non‑functional requirements (perf, a11y, security)",
          "Docs & handoff"
        ],
        activities: [
          "Build a real app (e.g., e‑commerce/SaaS dashboard)",
          "Peer review, refactor, finalize",
          "Run Lighthouse, security headers, load tests (k6/artillery)"
        ],
        deliverables: [
          "Deployed app + CI pipeline",
          "API docs (OpenAPI/Swagger)",
          "Technical README + architecture diagram",
          "Test coverage & monitoring dashboard"
        ],
        tools: [
          "All MERN stack tools",
          "Swagger/OpenAPI",
          "Artillery/k6 (optional)"
        ],
        duration: "2–3 sessions",
        prerequisites: [
          "auth-security",
          "payments",
          "react-data-state",
          "ci-cd-deploy"
        ]
      }
    ],
    prerequisites: [
      "Advanced JavaScript (ES6+)",
      "React Basics",
      "Fundamental Git knowledge"
    ],
    instructor: DEFAULT_INSTRUCTOR
  },
  {
    id: "5",
    title: "Laravel Development",
    slug: slugify("Full-Stack Laravel Development"),
    category: "backend",
    description: "Laravel Framework – Build robust PHP applications.",
    price: 9500,
    duration: "2 Hours per day",
    image: "Laravel-development.webp",
    module: "2.5 Months",
    curriculum: [
      {
        id: "php-oop",
        title: "Advanced PHP & OOP",
        objectives: ["Apply SOLID principles in PHP"],
        keyTopics: ["Interfaces", "Traits", "Namespaces", "Composer"],
        deliverables: ["OOP utilities mini-pack"],
      },
      {
        id: "laravel-mvc",
        title: "Laravel MVC",
        objectives: ["Structure apps with controllers & services"],
        keyTopics: ["Routing", "Blade", "Service container"],
        deliverables: ["Feature: posts & comments"],
      },
      {
        id: "eloquent-migrations",
        title: "Eloquent & Migrations",
        objectives: ["Model relationships & migrations"],
        keyTopics: ["One-to-many", "Many-to-many", "Scopes"],
        deliverables: ["Schema & seeders"],
      },
      {
        id: "auth-breeze-jetstream",
        title: "Auth (Breeze/Jetstream)",
        objectives: ["Implement authentication & sessions"],
        keyTopics: ["Guards", "Policies", "Password reset"],
        deliverables: ["Auth-enabled app"],
      },
      {
        id: "apis-passport-sanctum",
        title: "APIs (Passport/Sanctum)",
        objectives: ["Secure API endpoints"],
        keyTopics: ["Token issuance", "Rate limiting"],
        deliverables: ["REST API with tokens"],
      },
      {
        id: "testing-pest",
        title: "Pest Testing",
        objectives: ["Write expressive tests"],
        keyTopics: ["Feature tests", "HTTP tests", "Factories"],
        deliverables: ["Green test suite"],
      },
    ],
    prerequisites: ["Basic PHP", "SQL knowledge"],
    instructor: {
      name: "Ramesh Thapa",
      title: "Senior Backend Developer",
      avatar: "https://i.pravatar.cc/150?u=ramesh",
      bio: "Ramesh is a veteran in the PHP ecosystem with 10+ years of building large‑scale ERPs.",
    },
  },
  {
    id: "WP-ADV-101",
    title: "WordPress Theme & Plugin Development",
    slug: slugify("WordPress Theme & Plugin Development"),
    category: "wp",
    description:
      "Classic & Block Theme Development | Plugin Development | Gutenberg Blocks | REST API | Security | Performance | Headless WordPress",
    price: 10000,
    duration: "2 Hours per day",
    image: "wordpress-advanced.jpg",
    module: "Module V",
    curriculum: [
      {
        id: "wp-intro",
        title: "WordPress Architecture & Modern Ecosystem",
        objectives: [
          "Understand how WordPress works internally",
          "Learn modern WordPress development workflows",
        ],
        keyTopics: [
          "WordPress core architecture",
          "Database structure (posts, meta, options)",
          "Themes vs plugins",
          "Classic vs Block (FSE) themes",
          "WordPress coding standards",
        ],
        activities: ["Install WordPress & explore file structure"],
        deliverables: ["Local WordPress setup"],
        tools: ["LocalWP/XAMPP", "VS Code"],
        duration: "1 session",
      },

      /* THEME DEVELOPMENT */
      {
        id: "classic-theme",
        title: "Classic WordPress Theme Development",
        objectives: [
          "Build custom themes from scratch",
          "Understand template hierarchy",
        ],
        keyTopics: [
          "Theme folder structure",
          "style.css & functions.php",
          "Template hierarchy",
          "The Loop",
          "Header, footer, sidebar templates",
        ],
        activities: ["Create a custom classic theme"],
        deliverables: ["Classic WordPress theme"],
        tools: ["VS Code"],
        duration: "2 sessions",
        prerequisites: ["wp-intro"],
      },
      {
        id: "theme-features",
        title: "Theme Features & Customization",
        objectives: [
          "Add dynamic capabilities to themes",
          "Use WordPress customization APIs",
        ],
        keyTopics: [
          "Theme supports",
          "Menus & widgets",
          "Custom logo & thumbnails",
          "Customizer API",
          "Enqueue scripts & styles properly",
        ],
        activities: ["Add theme options & menus"],
        deliverables: ["Feature‑rich theme"],
        duration: "1 session",
        prerequisites: ["classic-theme"],
      },

      /* BLOCK / FSE */
      {
        id: "block-theme",
        title: "Block Theme & Full Site Editing (FSE)",
        objectives: [
          "Build modern block‑based WordPress themes",
          "Work with Full Site Editing",
        ],
        keyTopics: [
          "Block themes vs classic themes",
          "theme.json deep dive",
          "Templates & template parts",
          "Global styles",
          "Patterns & reusable blocks",
        ],
        activities: ["Create a Block theme with global styles"],
        deliverables: ["FSE‑enabled block theme"],
        tools: ["WordPress 6+", "theme.json"],
        duration: "2 sessions",
        prerequisites: ["wp-intro"],
      },

      /* GUTENBERG */
      {
        id: "gutenberg-blocks",
        title: "Gutenberg Block Development",
        objectives: [
          "Develop custom Gutenberg blocks",
          "Understand block architecture",
        ],
        keyTopics: [
          "Gutenberg overview",
          "registerBlockType",
          "Block attributes & controls",
          "Dynamic vs static blocks",
          "Block styles & variations",
        ],
        activities: ["Build a custom Gutenberg block"],
        deliverables: ["Custom block plugin"],
        tools: ["React (JSX)", "wp-scripts"],
        duration: "2 sessions",
        prerequisites: ["block-theme"],
      },

      /* PLUGIN DEVELOPMENT */
      {
        id: "plugin-basics",
        title: "Plugin Development Fundamentals",
        objectives: [
          "Create standalone WordPress plugins",
          "Hook functionality into WordPress",
        ],
        keyTopics: [
          "Plugin file structure",
          "Hooks (actions & filters)",
          "Activation & deactivation hooks",
          "Shortcodes",
          "Settings API",
        ],
        activities: ["Build a utility plugin"],
        deliverables: ["Custom WordPress plugin"],
        duration: "2 sessions",
        prerequisites: ["wp-intro"],
      },
      {
        id: "advanced-plugins",
        title: "Advanced Plugin Development",
        objectives: [
          "Build scalable & secure plugins",
          "Store and manipulate data",
        ],
        keyTopics: [
          "Custom Post Types",
          "Custom Taxonomies",
          "Custom Fields & Meta boxes",
          "WP_List_Table",
          "AJAX in WordPress",
        ],
        activities: ["Create admin dashboard plugin"],
        deliverables: ["Admin plugin with CRUD"],
        duration: "2 sessions",
        prerequisites: ["plugin-basics"],
      },

      /* REST API & HEADLESS */
      {
        id: "rest-api",
        title: "WordPress REST API",
        objectives: [
          "Expose WordPress data as APIs",
          "Integrate with external apps",
        ],
        keyTopics: [
          "REST API fundamentals",
          "Custom API endpoints",
          "Authentication (JWT / Cookies)",
          "Consuming APIs in frontend",
        ],
        activities: ["Build custom REST endpoints"],
        deliverables: ["REST‑enabled plugin"],
        duration: "1–2 sessions",
        prerequisites: ["plugin-basics"],
      },
      {
        id: "headless-wp",
        title: "Headless WordPress (Modern Topic)",
        objectives: [
          "Use WordPress as a headless CMS",
          "Integrate with React / Next.js",
        ],
        keyTopics: [
          "Headless architecture",
          "WP REST vs GraphQL",
          "WPGraphQL basics",
          "Auth for headless WordPress",
        ],
        activities: ["Connect WordPress with frontend app"],
        deliverables: ["Headless WordPress setup"],
        tools: ["WPGraphQL", "React/Next.js"],
        duration: "1 session",
        prerequisites: ["rest-api"],
      },

      /* SECURITY & PERFORMANCE */
      {
        id: "wp-security",
        title: "WordPress Security Best Practices",
        objectives: [
          "Secure themes & plugins",
          "Prevent common vulnerabilities",
        ],
        keyTopics: [
          "Nonces & capability checks",
          "Sanitization & escaping",
          "SQL injection & XSS prevention",
          "User roles & permissions",
        ],
        activities: ["Harden a WordPress site"],
        deliverables: ["Security checklist"],
        duration: "1 session",
      },
      {
        id: "wp-performance",
        title: "Performance Optimization & SEO",
        objectives: [
          "Improve WordPress speed & SEO",
          "Optimize for Core Web Vitals",
        ],
        keyTopics: [
          "Caching strategies",
          "Query optimization",
          "Image optimization",
          "Lazy loading & CDN",
        ],
        activities: ["Optimize site performance"],
        deliverables: ["Performance report"],
        tools: ["Lighthouse", "Query Monitor"],
        duration: "1 session",
      },

      /* DEPLOYMENT */
      {
        id: "deployment",
        title: "Hosting, Deployment & Maintenance",
        objectives: [
          "Deploy WordPress projects professionally",
          "Manage updates and backups",
        ],
        keyTopics: [
          "Managed vs shared hosting",
          "Staging environments",
          "Migration tools",
          "Backup & maintenance plans",
        ],
        activities: ["Deploy site to production"],
        deliverables: ["Live WordPress site"],
        tools: ["cPanel", "WP Migration", "Git"],
        duration: "1 session",
      },

      /* CAPSTONE */
      {
        id: "wp-capstone",
        title: "Capstone Project (Theme + Plugin)",
        objectives: [
          "Build real‑world WordPress solutions",
          "Showcase portfolio‑ready projects",
        ],
        keyTopics: [
          "Custom Theme (Block or Classic)",
          "Custom Plugin with admin panel",
          "Security & performance",
          "Documentation",
        ],
        activities: ["End‑to‑end WordPress project"],
        deliverables: [
          "Custom theme",
          "Custom plugin",
          "Live demo & documentation",
        ],
        duration: "2–3 sessions",
        prerequisites: [
          "classic-theme",
          "block-theme",
          "plugin-basics",
        ],
      },
    ],
    prerequisites: ["HTML, CSS, Basic PHP knowledge"],
    instructor: {
      name: "Suman Giri",
      title: "Senior WordPress Engineer",
      avatar: "https://i.pravatar.cc/150?u=sumanwp",
      bio: "Suman has built scalable WordPress platforms, custom plugins, and headless WordPress solutions for global clients.",
    },
  }
  ,
  {
    id: "7",
    title: "Digital Marketing Mastery",
    slug: slugify("Digital Marketing Mastery"),
    category: "dm",
    description: "Master SEO, Ads, and Social Media Marketing.",
    price: 8000,
    duration: "2 Hours per day",
    image: "Digital_marketing_mastery.jpg",
    module: "2 Months",
    curriculum: [
      {
        id: "seo",
        title: "On/Off‑Page SEO",
        objectives: ["Improve rankings with ethical SEO"],
        keyTopics: ["Keyword research", "On‑page", "Link building"],
        deliverables: ["Optimized landing page"],
        tools: ["GSC", "Ahrefs/Semrush"],
      },
      {
        id: "google-ads",
        title: "Google Ads",
        objectives: ["Create and optimize PPC campaigns"],
        keyTopics: ["Search", "Performance Max", "Bidding"],
        deliverables: ["Live search campaign (test budget)"],
      },
      {
        id: "meta-ads",
        title: "Meta Ads",
        objectives: ["Run effective social ads"],
        keyTopics: ["Audiences", "Creatives", "Attribution"],
        deliverables: ["Creative variants & ad set"],
      },
      {
        id: "content-strategy",
        title: "Content Strategy",
        objectives: ["Build high‑intent content funnels"],
        keyTopics: ["Calendars", "Angles", "Repurposing"],
        deliverables: ["30‑day content plan"],
      },
      {
        id: "ga4-gtm",
        title: "GA4 & Tag Manager",
        objectives: ["Track events and conversions"],
        keyTopics: ["Events", "Custom dimensions", "Attribution"],
        deliverables: ["GA4 dashboard with key events"],
      },
      {
        id: "freelance-playbook",
        title: "Freelance Playbook",
        objectives: ["Acquire clients and price projects"],
        keyTopics: ["Positioning", "Outreach", "Proposals"],
        deliverables: ["Portfolio case study & proposal template"],
      },
    ],
    prerequisites: ["Basic social media usage"],
    instructor: {
      name: "Pooja Sharma",
      title: "Digital Strategist",
      avatar: "https://i.pravatar.cc/150?u=pooja",
      bio: "Managed ad budgets over $1M; specialist in performance marketing.",
    },
  },
  {
    id: "8",
    title: "Basic Arduino & Robotics",
    slug: slugify("Basic Arduino & Robotics"),
    category: "robotics",
    description: "Circuitry, sensors, and C++ programming for robots.",
    price: 18500,
    duration: "1.5 Hours per day",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    module: "8 Weeks",
    curriculum: [
      {
        id: "embedded-c",
        title: "Embedded C",
        objectives: ["Write C for microcontrollers"],
        keyTopics: ["GPIO", "Timers", "Interrupts"],
        deliverables: ["LED & sensor demos"],
        tools: ["Arduino IDE"],
      },
      {
        id: "microcontrollers",
        title: "Microcontrollers",
        objectives: ["Understand MCU architecture"],
        keyTopics: ["MCU basics", "Power", "Peripherals"],
        deliverables: ["Pin mapping exercise"],
      },
      {
        id: "i2c-spi",
        title: "I2C/SPI",
        objectives: ["Communicate with common buses"],
        keyTopics: ["Protocols", "Addressing", "Timing"],
        deliverables: ["Read sensor via I2C & SPI"],
      },
      {
        id: "kinematics",
        title: "Kinematics",
        objectives: ["Model simple robot motion"],
        keyTopics: ["Wheel kinematics", "PID basics"],
        deliverables: ["PID line follower logic"],
      },
      {
        id: "autonomous-nav",
        title: "Autonomous Navigation",
        objectives: ["Implement basic obstacle avoidance"],
        keyTopics: ["Ultrasonic/IR sensors", "State machines"],
        deliverables: ["Autonomous nav routine"],
      },
    ],
    prerequisites: ["Basic math skills"],
    instructor: {
      name: "Dr. Bibek Gurung",
      title: "Robotics Researcher",
      avatar: "https://i.pravatar.cc/150?u=bibekdr",
      bio: "PhD in Mechatronics; passionate about the next generation of engineers.",
    },
  },
  {
    id: "9",
    title: "IoT with ESP32 & Cloud",
    slug: slugify("IoT with ESP32 & Cloud"),
    category: "robotics",
    description: "Connect hardware to the web: MQTT/HTTP + Cloud dashboards.",
    price: 18500,
    duration: "2 Hours per day",
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",
    module: "2.5 Months",
    curriculum: [
      {
        id: "esp32-power",
        title: "ESP32 Power Modes",
        objectives: ["Optimize battery life"],
        keyTopics: ["Deep sleep", "Wake sources", "Power profiles"],
        deliverables: ["Low‑power sensor node"],
      },
      {
        id: "mqtt-http",
        title: "MQTT & HTTP",
        objectives: ["Publish/subscribe telemetry"],
        keyTopics: ["QoS", "Retain", "TLS basics"],
        deliverables: ["Telemetry + control loop"],
      },
      {
        id: "aws-iot-core",
        title: "AWS IoT Core",
        objectives: ["Secure device connectivity"],
        keyTopics: ["Certificates", "Policies", "Rules Engine"],
        deliverables: ["Ingest & route messages"],
      },
      {
        id: "node-red",
        title: "Node‑RED Dashboards",
        objectives: ["Create dashboards quickly"],
        keyTopics: ["Flows", "UI nodes", "Persistence"],
        deliverables: ["Real‑time dashboard"],
      },
      {
        id: "ota-alexa",
        title: "OTA Updates & Smart Home (Alexa)",
        objectives: ["Push firmware updates & voice control"],
        keyTopics: ["OTA pipeline", "Alexa skills basics"],
        deliverables: ["OTA‑enabled device & Alexa demo"],
      },
    ],
    prerequisites: ["Basic Arduino knowledge"],
    instructor: {
      name: "Dr. Bibek Gurung",
      title: "Robotics Researcher",
      avatar: "https://i.pravatar.cc/150?u=bibekdr",
      bio: "PhD in Mechatronics; passionate about the next generation of engineers.",
    },
  },
];


export const PRODUCTS: Product[] = [
  {
    id: 'school',
    title: 'School Management System',
    description: 'A complete School ERP with student enrollment, attendance, exams, fees management, parent portal, and more – accessible on both web and mobile.',
    image: 'https://picsum.photos/seed/school/600/400',
    link: 'https://sms-lake-three.vercel.app/'
  },
  {
    id: 'news',
    title: 'News Portal with Mobile App',
    description: 'Launch your own news portal with a fully integrated mobile app. Manage categories, publish articles, push notifications, and monetize easily.',
    image: 'https://picsum.photos/seed/news/600/400',
    link: 'https://newsportal-brown.vercel.app/'
  },
  {
    id: 'clinic',
    title: 'Clinic Management System',
    description: `A modern clinic and hospital ERP with appointment booking, patient records, billing, prescriptions, and inventory management – all in one. Demo Link <a href="https://cqms.vercel.app/" target="_blank" class="text-blue-600 underline">here</a>.`,
    image: 'https://picsum.photos/seed/clinic/600/400',
    link: 'https://cqms.vercel.app/'
  }
];


export const BLOGS = [

  {
    id: "mern-observability",
    title: "Observability for MERN: Logs, Metrics, and Traces that Matter",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop",
    date: "Nov 30, 2025",
    excerpt:
      "Going beyond console logs—discover how Node.js apps benefit from structured logging, OpenTelemetry traces, MongoDB performance insights, and user-centric Real User Monitoring (RUM).",
    "link": "https://blog.devgenius.io/observability-for-mern-logs-metrics-and-traces-that-matter-1234567890ab"
  },
  {
    id: "a11y-inclusive-ux",
    title: "Inclusive Web Design: Practical A11y Wins for Real Users",
    image:
      "https://images.unsplash.com/photo-1498050108023-3f4f38b88c1f?q=80&w=1600&auto=format&fit=crop",
    date: "Oct 18, 2025",
    excerpt:
      "Color contrast, focus states, and semantic landmarks aren’t optional. Here’s a practical checklist that improves accessibility scores and, more importantly, real human experience.",
    "link": "https://blog.devgenius.io/inclusive-web-design-practical-a11y-wins-for-real-users-abcdef123456"
  },
  {
    id: "mern-data-layer",
    title: "Choosing a Data Layer on MERN: REST, GraphQL, or tRPC?",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    date: "Sep 05, 2025",
    excerpt:
      "The right API layer depends on your product shape. Compare REST simplicity, GraphQL flexibility, and end-to-end type safety with tRPC for fast-moving teams and large codebases.",
    "link": "https://blog.devgenius.io/choosing-a-data-layer-on-mern-rest-graphql-or-trpc-7890abcdef12"
  },
];
