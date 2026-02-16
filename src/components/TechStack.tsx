"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaNodeJs,
  FaDatabase,
  FaCogs,
  FaExternalLinkAlt,
  FaTimes,
  FaSearch,
  FaBolt,
} from "react-icons/fa";

/* -------------------------------------------------------------------------- */
/*                               Data Structures                               */
/* -------------------------------------------------------------------------- */

type TopicCard = {
  id: keyof typeof TOPIC_SECTIONS | "html" | "css" | "javascript" | "node" | "express" | "mongodb";
  name: string;
  color: string; // Tailwind text color class
  Icon: React.ComponentType<any>;
  blurb: string;
  overview: string;
  docs: string;
  snippet?: string;
};

type Section = {
  group: string;
  items: { title: string; desc: string }[];
};

/* -------------------------------------------------------------------------- */
/*                        Full Topic Index (All Stacks)                        */
/* -------------------------------------------------------------------------- */

const TOPIC_SECTIONS: Record<string, Section[]> = {
  html: [
    {
      group: "HTML Basics",
      items: [
        { title: "Introduction to HTML", desc: "What HTML is and how browsers parse it in the web platform." },
        { title: "Document Structure & DOCTYPE", desc: "Use <!DOCTYPE html>, <html>, <head>, and <body> correctly." },
        { title: "Elements & Attributes", desc: "Nesting rules, global attributes, and semantics." },
        { title: "Headings & Paragraphs", desc: "Page hierarchy using <h1>–<h6> and <p> blocks." },
        { title: "Text Formatting", desc: "Strong/emphasis, code, small, sub/sup, quotes, and time." },
        { title: "Comments & Encoding", desc: "Write <!-- ... --> comments and use <meta charset='utf-8'>." },
      ],
    },
    {
      group: "Links & Navigation",
      items: [
        { title: "Anchor Links", desc: "Create hyperlinks, targets, rel security, and download attribute." },
        { title: "Internal Navigation", desc: "Fragment IDs for in‑page navigation (#section)." },
        { title: "mailto:, tel:", desc: "Email and phone links that launch native apps." },
        { title: "Base URL", desc: "Set a base path for relative resources via <base>." },
      ],
    },
    {
      group: "Images & Media",
      items: [
        { title: "Images (img)", desc: "Alt text, dimensions, density, and lazy loading." },
        { title: "Responsive Images", desc: "<picture>, <source>, srcset, and sizes for optimal delivery." },
        { title: "Video & Audio", desc: "<video>/<audio> with multiple sources, controls, and preload." },
        { title: "Captions & Tracks", desc: "Accessibility with <track kind='captions' ...>." },
        { title: "Favicons", desc: "Link favicons via <link rel='icon'> and webmanifest." },
      ],
    },
    {
      group: "Lists & Tables",
      items: [
        { title: "Lists", desc: "Unordered/ordered/description lists and nesting patterns." },
        { title: "Tables (Basics)", desc: "<table>, <tr>, <td>, <th> for tabular data." },
        { title: "Table Semantics", desc: "<thead>, <tbody>, <tfoot>, scope and caption." },
        { title: "Accessible Tables", desc: "Header associations for screen readers." },
      ],
    },
    {
      group: "Forms",
      items: [
        { title: "Form Basics", desc: "Form actions, methods, and encoding types." },
        { title: "Labels & Inputs", desc: "Associate <label> and inputs for inclusive UX." },
        { title: "Input Types", desc: "email, number, date, file, range, color, etc." },
        { title: "Textarea/Select/Datalist", desc: "Multi‑line, dropdowns, and autocompletion options." },
        { title: "Validation", desc: "required, pattern, min/max, and constraint APIs." },
        { title: "Fieldset & Legend", desc: "Group related controls with proper descriptions." },
      ],
    },
    {
      group: "Semantic & Layout",
      items: [
        { title: "Semantic Elements", desc: "<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>." },
        { title: "Block vs Inline", desc: "Understand normal flow and box behavior." },
        { title: "Metadata (Head)", desc: "<title>, <meta>, <link>, <base> usage." },
        { title: "Iframes & Sandbox", desc: "Embed pages securely with sandbox/allow policies." },
      ],
    },
    {
      group: "HTML APIs & Graphics",
      items: [
        { title: "Canvas vs SVG", desc: "Immediate vs retained mode graphics." },
        { title: "Geolocation API", desc: "Request and use user location (with permission)." },
        { title: "Drag & Drop", desc: "Native drag events and drop targets." },
        { title: "Web Storage", desc: "localStorage/sessionStorage basics." },
        { title: "Web Workers", desc: "Move heavy work off the main thread." },
      ],
    },
    {
      group: "Accessibility & SEO",
      items: [
        { title: "ARIA Basics", desc: "Enhance semantics with aria‑* where needed." },
        { title: "Alt Text & Landmarks", desc: "Describe media and define page regions." },
        { title: "Language & Direction", desc: "Set lang and dir on <html>." },
        { title: "Meta & Open Graph", desc: "Improve SEO and social previews." },
      ],
    },
    {
      group: "Performance & Security",
      items: [
        { title: "Preload & Prefetch", desc: "Hint critical resources and future navigations." },
        { title: "Defer & Async", desc: "Load scripts without blocking rendering." },
        { title: "Responsive Media", desc: "Ship smaller assets to mobile users." },
        { title: "CSP & Referrer Policy", desc: "Harden pages against attacks and leakage." },
      ],
    },
  ],

  css: [
    {
      group: "CSS Fundamentals",
      items: [
        { title: "Selectors & Specificity", desc: "Target elements and resolve conflicts with specificity/cascade." },
        { title: "Box Model", desc: "Content, padding, border, margin; sizing and overflow." },
        { title: "Units", desc: "px, em, rem, vw, vh; functions calc(), clamp() for responsiveness." },
        { title: "Colors & Typography", desc: "Color spaces, fonts, line‑height, letter‑spacing." },
      ],
    },
    {
      group: "Layout",
      items: [
        { title: "Flexbox", desc: "One‑dimensional layouts with alignment and spacing utilities." },
        { title: "Grid", desc: "Two‑dimensional layouts with areas, tracks, and gaps." },
        { title: "Positioning", desc: "relative, absolute, fixed, sticky, z‑index." },
        { title: "Floats & Clear", desc: "Legacy layout techniques & clearfix patterns." },
      ],
    },
    {
      group: "Effects & Media",
      items: [
        { title: "Backgrounds & Gradients", desc: "Layer images and create linear/radial gradients." },
        { title: "Borders & Shadows", desc: "Rounded corners and depth via box‑shadow." },
        { title: "Filters & Blend Modes", desc: "Blur, grayscale, multiply/screen overlays." },
        { title: "Media Queries", desc: "Responsive rules by width, motion, color scheme." },
      ],
    },
    {
      group: "Motion & Theming",
      items: [
        { title: "Transitions", desc: "Smoothly animate property changes." },
        { title: "Animations", desc: "Keyframes for complex animations." },
        { title: "Custom Properties", desc: "CSS variables for theming and tokens." },
        { title: "Dark Mode", desc: "Prefers‑color‑scheme and theme toggles." },
      ],
    },
    {
      group: "Architecture & Performance",
      items: [
        { title: "BEM/OOCSS/ITCSS", desc: "Scalable naming and layering strategies." },
        { title: "Critical CSS", desc: "Inline critical styles, lazy‑load the rest." },
        { title: "Minify & Purge", desc: "Reduce CSS size; remove unused rules." },
        { title: "DevTools & Audit", desc: "Inspect cascade, layout, and performance." },
      ],
    },
  ],

  javascript: [
    {
      group: "Core Language",
      items: [
        { title: "Syntax & Types", desc: "Primitives, objects, dynamic typing, and operators." },
        { title: "Variables & Scope", desc: "let/const/var, scope, hoisting, and TDZ." },
        { title: "Functions & Closures", desc: "Parameters, returns, lexical scope, and closures." },
        { title: "Objects & Classes", desc: "Prototype chain, this, classes, and inheritance." },
        { title: "Arrays & Iteration", desc: "map/filter/reduce, for...of, iterators." },
      ],
    },
    {
      group: "Async & Networking",
      items: [
        { title: "Promises", desc: "Compositional async with then/catch/finally." },
        { title: "async/await", desc: "Write asynchronous code like synchronous." },
        { title: "Fetch & XHR", desc: "AJAX calls, CORS, and JSON handling." },
        { title: "Timers & Events", desc: "setTimeout, setInterval, event loop basics." },
      ],
    },
    {
      group: "DOM & Browser",
      items: [
        { title: "DOM Selection & Update", desc: "querySelector, classList, dataset, attributes." },
        { title: "Events", desc: "addEventListener, delegation, and custom events." },
        { title: "Storage", desc: "localStorage/sessionStorage/cookies basics." },
        { title: "Modules", desc: "ESM import/export and bundling concepts." },
      ],
    },
    {
      group: "Quality & Patterns",
      items: [
        { title: "Error Handling", desc: "try/catch, throw, and custom errors." },
        { title: "Testing Basics", desc: "Unit testing concepts and tooling." },
        { title: "Performance", desc: "Debounce, throttle, memoization, and profiling." },
        { title: "Best Practices", desc: "Immutability, pure functions, and linting." },
      ],
    },
  ],

  node: [
    {
      group: "Runtime & Modules",
      items: [
        { title: "Intro to Node.js", desc: "V8 runtime for server‑side JavaScript." },
        { title: "CommonJS & ESM", desc: "require/module.exports vs import/export." },
        { title: "NPM & package.json", desc: "Dependencies, scripts, semver, and workspaces." },
        { title: "Env & Config", desc: "process.env, dotenv, and config patterns." },
      ],
    },
    {
      group: "Core APIs",
      items: [
        { title: "File System", desc: "Read/write files, streams, and watchers." },
        { title: "Path & URL", desc: "Cross‑platform paths and URL utilities." },
        { title: "HTTP/HTTPS", desc: "Servers, routing basics, and headers." },
        { title: "Events & Streams", desc: "EventEmitter, readable/writable streams." },
      ],
    },
    {
      group: "Process & Ops",
      items: [
        { title: "Child Processes", desc: "spawn/exec/fork and clustering." },
        { title: "Debug & Profile", desc: "Node Inspector, CPU/heap profiles." },
        { title: "Security Basics", desc: "Avoid eval, sanitize input, update deps." },
        { title: "Deployments", desc: "PM2, Docker, CI/CD, environment strategy." },
      ],
    },
  ],

  express: [
    {
      group: "Core Concepts",
      items: [
        { title: "Setup & Routing", desc: "Create app, define routes, and route params." },
        { title: "Middleware", desc: "Request/response lifecycle and custom middleware." },
        { title: "Req/Res Object", desc: "Headers, cookies, status, and JSON." },
        { title: "Static Files", desc: "Serve public assets efficiently." },
      ],
    },
    {
      group: "APIs & Validation",
      items: [
        { title: "RESTful CRUD", desc: "Design clean endpoints and controllers." },
        { title: "Validation & Sanitization", desc: "joi, zod, express‑validator patterns." },
        { title: "Error Handling", desc: "Centralized error middleware and logging." },
        { title: "Versioning", desc: "Prefix strategies and compatibility." },
      ],
    },
    {
      group: "Auth & Security",
      items: [
        { title: "Sessions & Cookies", desc: "Session stores and secure cookies." },
        { title: "JWT Auth", desc: "Stateless authentication and refresh tokens." },
        { title: "Helmet & CORS", desc: "Security headers and cross‑origin control." },
        { title: "Rate Limiting", desc: "Prevent abuse with throttling strategies." },
      ],
    },
    {
      group: "Tooling & Testing",
      items: [
        { title: "Templating", desc: "EJS, Pug, or Handlebars for server views." },
        { title: "Swagger / OpenAPI", desc: "API docs and interactive UIs." },
        { title: "Supertest & Jest", desc: "HTTP assertion and unit tests." },
        { title: "Performance", desc: "Compression, cache, and profiling." },
      ],
    },
  ],

  mongodb: [
    {
      group: "Core Concepts",
      items: [
        { title: "Documents & Collections", desc: "JSON‑like BSON, flexible schemas." },
        { title: "CRUD Operations", desc: "insertOne, find, updateOne, deleteOne." },
        { title: "Query Operators", desc: "$in, $gte, $regex, $and/$or queries." },
        { title: "Indexes", desc: "Single, compound, TTL, and text indexes." },
      ],
    },
    {
      group: "Modeling & Aggr.",
      items: [
        { title: "Schema Design", desc: "Embed vs reference, cardinality, and patterns." },
        { title: "Aggregation Pipeline", desc: "Stages: $match, $group, $project, $lookup." },
        { title: "Transactions", desc: "Multi‑document ACID transactions." },
        { title: "Mongoose (Optional)", desc: "Schemas, models, hooks, and validation." },
      ],
    },
    {
      group: "Ops & Scaling",
      items: [
        { title: "Replication", desc: "High availability via replica sets." },
        { title: "Sharding", desc: "Horizontal scale with shard keys." },
        { title: "Performance", desc: "Profiling, explain plans, and caching." },
        { title: "Security", desc: "Users/roles, SCRAM, network policies." },
      ],
    },
    {
      group: "Atlas & Tools",
      items: [
        { title: "MongoDB Atlas", desc: "Managed clusters, backups, and metrics." },
        { title: "Compass", desc: "GUI for queries, schema, and aggregation." },
        { title: "Backup/Restore", desc: "mongodump/mongorestore workflows." },
        { title: "CLI & Shell", desc: "mongosh and admin commands." },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*                             Cards (with snippets)                           */
/* -------------------------------------------------------------------------- */

const STACK_CARDS: TopicCard[] = [
  {
    id: "html",
    name: "HTML",
    color: "text-orange-400",
    Icon: FaHtml5,
    blurb: "Semantic structure for accessible, SEO‑friendly pages.",
    overview:
      "HTML provides the structure of every web page. Master elements, attributes, semantics, and accessibility to build robust foundations.",
    docs: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    snippet: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Hello HTML</title>
  </head>
  <body>
    <main>
      <h1>Semantic Structure</h1>
      <p>Build accessible documents with meaningful elements.</p>
    </main>
  </body>
</html>`,
  },
  {
    id: "css",
    name: "CSS",
    color: "text-blue-400",
    Icon: FaCss3Alt,
    blurb: "Layouts, responsiveness, and modern UI systems.",
    overview:
      "CSS controls presentation: responsive layouts (Flexbox/Grid), design tokens, dark mode, and scalable component styling.",
    docs: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    snippet: `/* Responsive grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}`,
  },
  {
    id: "javascript",
    name: "JavaScript",
    color: "text-yellow-300",
    Icon: FaJsSquare,
    blurb: "ES6+, async/await, modules, and the DOM.",
    overview:
      "JavaScript powers interactivity and logic. Learn async patterns, modules, DOM APIs, and modern tooling to build rich apps.",
    docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    snippet: `// Fetch + async/await
async function loadUsers() {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('Request failed');
  const users = await res.json();
  console.log(users);
}
loadUsers();`,
  },
  {
    id: "node",
    name: "Node.js",
    color: "text-green-500",
    Icon: FaNodeJs,
    blurb: "Server‑side runtime for scalable backends.",
    overview:
      "Node.js runs JS on the server. Build APIs, CLIs, and services with a vast ecosystem and great performance.",
    docs: "https://nodejs.org/en/docs",
    snippet: `// Simple Node HTTP server
import http from "node:http";
http.createServer((req, res) => {
  res.end("Hello from Node.js");
}).listen(3000);`,
  },
  {
    id: "express",
    name: "Express.js",
    color: "text-slate-200",
    Icon: FaCogs,
    blurb: "Minimalist web framework for APIs and apps.",
    overview:
      "Express provides routing and middleware to quickly build robust, testable APIs and web apps.",
    docs: "https://expressjs.com/",
    snippet: `// Express API route
import express from "express";
const app = express();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.listen(3000);`,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    color: "text-emerald-400",
    Icon: FaDatabase,
    blurb: "Document database with flexible schemas.",
    overview:
      "MongoDB stores JSON‑like documents and scales horizontally. Great for iterative products and modern services.",
    docs: "https://www.mongodb.com/docs/",
    snippet: `// Basic MongoDB connection (Node)
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGO_URI!);
await client.connect();
const db = client.db("app");
const users = await db.collection("users").find().toArray();`,
  },
];

/* -------------------------------------------------------------------------- */
/*                           Filtering (search inside)                         */
/* -------------------------------------------------------------------------- */

const useFilteredSections = (sections: Section[] | undefined, query: string) => {
  const q = query.trim().toLowerCase();
  return useMemo(() => {
    if (!sections) return [];
    if (!q) return sections;
    return sections
      .map((sec) => ({
        ...sec,
        items: sec.items.filter(
          (it) =>
            it.title.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q)
        ),
      }))
      .filter((sec) => sec.items.length > 0);
  }, [q, sections]);
};

/* -------------------------------------------------------------------------- */
/*                                 Component                                   */
/* -------------------------------------------------------------------------- */

const TechStack: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<TopicCard | null>(null);
  const [query, setQuery] = useState("");

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const activeSections = active ? TOPIC_SECTIONS[active.id] : undefined;
  const hasIndex = !!activeSections;
  const filtered = useFilteredSections(activeSections, query);

  const openModal = (card: TopicCard) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setActive(card);
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setOpen(false);
    setQuery("");
    setActive(null);
    document.body.style.overflow = "";
    if (lastFocus.current) lastFocus.current.focus();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (open) {
      window.addEventListener("keydown", onKey);
      setTimeout(() => dialogRef.current?.focus(), 0);
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="py-32 bg-[#050b14] text-white px-6 relative overflow-hidden">
      {/* Background Pattern & Glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse-slow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-16">
          <div className="space-y-6 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-blue-500/20">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
              Core Web Stack
            </div>
            <h2 className="text-3xl md:text-3xl font-black tracking-tight leading-none">
              Website{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Foundations.
              </span>
            </h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              Explore essential topics we teach and use in real projects: HTML, CSS,
              JavaScript, Node.js, Express, and MongoDB.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-2 text-right">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              System Uptime
            </div>
            <div className="text-4xl font-black text-slate-200">99.99%</div>
            <div className="h-1 w-32 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-full bg-blue-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y, Keyboard]}
            keyboard={{ enabled: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop
            speed={650}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            pagination={{ clickable: true }}
            navigation
            className="!pb-12"
          >
            {STACK_CARDS.map((card, idx) => (
              <SwiperSlide key={card.id}>
                <div className="group relative p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all duration-700 hover:-translate-y-3 shadow-2xl h-full flex flex-col">
                  {/* Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem] pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.10), transparent 70%)",
                    }}
                  />
                  <div className="relative z-10 space-y-6 flex-1">
                    <div className="relative">
                      <div
                        className={`w-20 h-20 bg-slate-900 rounded-[1.8rem] flex items-center justify-center text-4xl ${card.color} shadow-2xl border border-white/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                        aria-hidden
                      >
                        <card.Icon />
                      </div>
                      {/* Orbital Ring */}
                      <div className="absolute inset-[-10px] border border-white/5 rounded-[2.5rem] group-hover:border-blue-500/20 transition-colors duration-700 animate-[spin_10s_linear_infinite]" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black tracking-tight group-hover:text-blue-400 transition-colors">
                          {card.name}
                        </h3>
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                          v{idx + 1}.0
                        </span>
                      </div>
                      <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors">
                        {card.blurb}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => openModal(card)}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-colors"
                    >
                      {TOPIC_SECTIONS[card.id] ? "View All Topics" : "Read Overview"}
                    </button>
                    <a
                      href={card.docs}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                    >
                      Docs <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Modal */}
      {open && active && (
        <div
          aria-hidden={!open}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="topic-title"
            ref={dialogRef}
            tabIndex={-1}
            className="relative w-full max-w-5xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 md:px-8 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center ${active.color}`}
                >
                  <active.Icon />
                </div>
                <div>
                  <h3 id="topic-title" className="text-xl md:text-2xl font-black tracking-tight">
                    {active.name} {hasIndex ? "— Full Topic Index" : "— Overview"}
                  </h3>
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                    {hasIndex ? "Browse all categories & topics" : "Quick summary & resources"}
                  </p>
                </div>
              </div>

              <button
                aria-label="Close"
                onClick={closeModal}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 space-y-8">
              {hasIndex ? (
                <>
                  {/* Search */}
                  <div className="relative max-w-xl">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={`Search ${active.name} topics…`}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Topic Sections */}
                  <div className="max-h-[60vh] overflow-auto pr-1">
                    <div className="space-y-8">
                      {filtered.length === 0 ? (
                        <p className="text-slate-600">No topics found. Try another keyword.</p>
                      ) : (
                        filtered.map((section) => (
                          <div key={section.group} className="space-y-3">
                            <h4 className="text-lg font-black text-slate-900">{section.group}</h4>
                            <ul className="grid sm:grid-cols-2 gap-3">
                              {section.items.map((t) => (
                                <li
                                  key={t.title}
                                  className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white transition"
                                >
                                  <div className="text-sm font-bold text-slate-900">{t.title}</div>
                                  <div className="text-xs text-slate-600 mt-0.5">{t.desc}</div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={active.docs}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition inline-flex items-center gap-2"
                    >
                      Open Documentation <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                    <button
                      onClick={closeModal}
                      className="px-5 py-3 rounded-xl bg-slate-100 text-slate-900 text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition inline-flex items-center gap-2"
                    >
                      <FaBolt className="text-[10px]" /> Close
                    </button>
                  </div>
                </>
              ) : (
                /* Non-index fallback: Overview + snippet */
                <>
                  <p className="text-slate-700 leading-relaxed">{active.overview}</p>
                  {active.snippet && (
                    <div className="space-y-2">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Example
                      </div>
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-auto text-sm">
                        <code>{active.snippet}</code>
                      </pre>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={active.docs}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition inline-flex items-center gap-2"
                    >
                      Open Documentation <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                    <button
                      onClick={closeModal}
                      className="px-5 py-3 rounded-xl bg-slate-100 text-slate-900 text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition inline-flex items-center gap-2"
                    >
                      <FaBolt className="text-[10px]" /> Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TechStack;