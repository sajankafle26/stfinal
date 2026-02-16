"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { Course, UpcomingBatch, SyllabusModule } from "@/types";
import { apiService } from "@/services/apiService";

// Font Awesome 6 (react-icons/fa6)
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaBolt,
  FaBriefcase,
  FaBuilding,
  FaCertificate,
  FaCheck,
  FaChevronDown,
  FaCircleCheck,
  FaCircleChevronDown,
  FaCreditCard,
  FaGithub,
  FaGlobe,
  FaHandshake,
  FaHeadset,
  FaListCheck,
  FaLinkedinIn,
  FaMicrochip,
  FaPaperPlane,
  FaRocket,
  FaScroll,
  FaServer,
  FaSpinner,
  FaUsers,
  FaClock,
  FaLink,
} from "react-icons/fa6";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

// Build a safe image src for next/image (supports absolute or relative paths)
const toHeroImageSrc = (src?: string) => {
  if (!src)
    return "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&q=70&w=1200";
  if (/^https?:\/\//.test(src)) return src; // absolute
  if (src.startsWith("/")) return src; // already rooted
  const resolved = `/${src}`; // public/
  console.log(`[CourseDetails] Resolved image src: ${src} -> ${resolved}`);
  return resolved;
};

// Extract hours (first number) from strings like "2 Hours per day"
const toHoursLabel = (duration: string) => {
  const m = duration?.match(/^\s*([\d.]+)/);
  return m ? `${m[1]} Hrs` : duration || "N/A";
};

// Curriculum helpers (accept legacy string[] or structured items)
type ReadingLink = { label: string; url?: string };
type MixedCurriculumItem =
  | string
  | {
    id: string;
    title: string;
    objectives?: string[];
    keyTopics?: string[];
    activities?: string[];
    deliverables?: string[];
    tools?: string[];
    duration?: string;
    prerequisites?: string[];
    reading?: ReadingLink[];
  };

const isCurriculumItem = (
  v: MixedCurriculumItem
): v is Exclude<MixedCurriculumItem, string> =>
  !!v && typeof v === "object" && "title" in v;

const getCurriculumTitle = (v: MixedCurriculumItem) =>
  isCurriculumItem(v) ? v.title : v;

const getModuleItems = (mod: SyllabusModule | any): string[] => {
  if (Array.isArray(mod?.topics)) return mod.topics as string[];
  if (Array.isArray(mod?.lessons)) {
    return mod.lessons.map((l: any) =>
      l?.duration ? `${l.title} • ${l.duration}` : l.title
    );
  }
  return [];
};

/* -------------------------------------------------------------------------- */
/*                              Syllabus Accordion                            */
/* -------------------------------------------------------------------------- */

interface SyllabusAccordionItemProps {
  module: SyllabusModule;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const SyllabusAccordionItem: React.FC<SyllabusAccordionItemProps> = ({
  module,
  index,
  isOpen,
  onToggle,
}) => {
  const items = useMemo(() => getModuleItems(module), [module]);

  return (
    <div
      className={`border rounded-2xl transition-all duration-300 overflow-hidden ${isOpen
        ? "bg-slate-50 border-sangalo-200 shadow-sm"
        : "bg-white border-slate-200 hover:border-slate-300"
        }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left group"
        aria-expanded={isOpen}
        aria-controls={`syllabus-panel-${index}`}
      >
        <div className="flex items-center gap-5">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all duration-300 text-lg ${isOpen
              ? "bg-sangalo-600 text-white shadow-md shadow-sangalo-600/20"
              : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
              }`}
          >
            {index < 9 ? `0${index + 1}` : index + 1}
          </div>
          <div>
            <h4
              className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${isOpen ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                }`}
            >
              {module.title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Module {index + 1}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-xs font-medium text-slate-400">
                {items.length} Lessons
              </span>
            </div>
          </div>
        </div>

        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen
            ? "bg-white text-sangalo-600 border-sangalo-200"
            : "bg-slate-50 border-slate-200 text-slate-400 group-hover:border-slate-300"
            }`}
        >
          <FaChevronDown
            className={`text-xs transition-transform duration-300 ${isOpen ? "rotate-180" : ""
              }`}
            aria-hidden
          />
        </div>
      </button>

      <div
        id={`syllabus-panel-${index}`}
        className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100 pb-8 px-6" : "max-h-0 opacity-0"
          }`}
      >
        <div className="pl-[4.25rem] grid sm:grid-cols-2 gap-x-8 gap-y-3">
          {items.map((topic, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-slate-600 font-medium group/topic"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 group-hover/topic:bg-emerald-100 transition-colors">
                <FaCheck className="text-[10px]" aria-hidden />
              </div>
              <span className="text-sm leading-relaxed">{topic}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                          Curriculum Accordion (Title + Content)            */
/* -------------------------------------------------------------------------- */

const SectionList = ({
  label,
  items,
  icon,
}: {
  label: string;
  items?: string[];
  icon?: React.ReactNode;
}) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-3">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
        {icon}
        {label}
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-sm">
            <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mt-0.5 shrink-0">
              <FaCheck className="text-[10px]" aria-hidden />
            </span>
            <span className="leading-relaxed">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ReadingList = ({ items }: { items?: ReadingLink[] }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-3">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
        <FaLink /> Recommended Reading
      </div>
      <ul className="space-y-2">
        {items.map((r, i) => (
          <li key={i}>
            {r.url ? (
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 font-semibold hover:underline text-sm"
              >
                {r.label}
              </a>
            ) : (
              <span className="text-slate-700 font-medium text-sm">{r.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CurriculumAccordion = ({
  curriculum,
  title = "Curriculum Modules",
  subtitle = "Roadmap to Expertise",
  description,
  defaultOpenIndex = 0,
}: {
  curriculum?: MixedCurriculumItem[];
  title?: string;
  subtitle?: string;
  description?: string;
  defaultOpenIndex?: number | null;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const items = curriculum ?? [];

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-100 text-center shadow-sm">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaListCheck className="text-3xl text-slate-400" aria-hidden />
        </div>
        <h4 className="text-xl font-bold text-slate-900">Curriculum</h4>
        <p className="text-slate-500 font-medium mt-2">
          The curriculum will be published soon.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          {subtitle && (
            <div className="inline-flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-wider text-xs bg-indigo-50 px-3 py-1 rounded-lg">
              {subtitle}
            </div>
          )}
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          {description && (
            <div
              className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl mt-2"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
      </div>

      <div className="space-y-4">
        {items.map((raw, i) => {
          const name = getCurriculumTitle(raw);
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-300 ${isOpen ? "bg-white border-slate-200 shadow-lg shadow-slate-200/50" : "bg-white border-slate-200 hover:border-indigo-200"
                }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
                aria-expanded={isOpen}
                aria-controls={`curriculum-panel-${i}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300 ${isOpen
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      }`}
                  >
                    {i + 1}
                  </div>
                  <h4
                    className={`text-lg font-bold tracking-tight transition-colors ${isOpen ? "text-indigo-900" : "text-slate-700"
                      }`}
                  >
                    {name}
                  </h4>
                </div>
                <div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen
                    ? "bg-indigo-50 text-indigo-600 border-indigo-100"
                    : "bg-white text-slate-400 border-slate-200 group-hover:border-slate-300"
                    }`}
                >
                  <FaChevronDown
                    className={`text-xs transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                      }`}
                    aria-hidden
                  />
                </div>
              </button>

              <div
                id={`curriculum-panel-${i}`}
                className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-6 pb-8 pt-2 space-y-8 border-t border-slate-50/50">
                  {!isCurriculumItem(raw) ? (
                    <p className="text-slate-600 font-medium leading-relaxed">
                      {raw}
                    </p>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-center gap-3">
                        {raw.duration && (
                          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md border border-slate-200">
                            <FaClock /> {raw.duration}
                          </span>
                        )}
                      </div>

                      <div className="grid gap-8">
                        <SectionList label="Objectives" items={raw.objectives} />
                        <SectionList label="Key Topics" items={raw.keyTopics} />
                        <SectionList label="Activities" items={raw.activities} />
                        <SectionList label="Deliverables" items={raw.deliverables} />
                        <SectionList label="Tools" items={raw.tools} />
                        <ReadingList items={raw.reading} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                             Main Course Details                            */
/* -------------------------------------------------------------------------- */

interface CourseDetailsProps {
  course: Course;
  onBack: () => void;
  onNavigate?: (target: string) => void;
}

const CourseDetails = ({ course, onBack }: CourseDetailsProps) => {
  const [batches, setBatches] = useState<UpcomingBatch[]>([]);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
    preferredBatch: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Normalize instructor fields (supports {avatar,title,links} and legacy {image,role})
  const instructor = course.instructor as any;
  const instructorName: string = instructor?.name ?? "Program Mentor";
  const instructorAvatar: string =
    instructor?.avatar ?? instructor?.image ?? "https://i.pravatar.cc/150?u=mentor";
  const instructorTitle: string = instructor?.title ?? instructor?.role ?? "Instructor";
  const instructorBio: string =
    instructor?.bio ?? "Mentoring driven learners to industry readiness.";
  const instructorLinkedIn: string | undefined = instructor?.links?.linkedin;
  const instructorPortfolio: string | undefined =
    instructor?.links?.portfolio || instructor?.links?.twitter;

  const heroStats: { label: string; val: string; Icon: React.ElementType }[] = [
    { label: "Intensity", val: "Industrial", Icon: FaBolt },
    { label: "Lab Time", val: toHoursLabel(course.duration), Icon: FaMicrochip },
    { label: "Mentorship", val: "1:8 Ratio", Icon: FaUsers },
    { label: "Placement", val: "Direct Hire", Icon: FaBriefcase },
  ];

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const allBatches = await apiService.getBatches();
        setBatches(
          (allBatches || []).filter(
            (b) => b.courseId === course.id || b.courseTitle === course.title
          )
        );
      } catch {
        setBatches([]);
      }
    };
    fetchBatches();
    window.scrollTo(0, 0);
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.submitEnrollment({
        ...formData,
        courseId: course.id,
        courseTitle: course.title,
      });
      setSuccess(true);
    } catch (err) {
      alert("Failed to submit enrollment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 blur-3xl opacity-20 animate-pulse" />
              <div className="w-28 h-28 bg-green-500 text-white rounded-[2.5rem] flex items-center justify-center text-5xl mx-auto shadow-4xl relative z-10 border-4 border-white">
                <FaCheck aria-hidden />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                Application Sent!
              </h2>
              <p className="text-slate-500 font-semibold px-6">
                We've reserved a tentative spot for you. Our counselor will call
                you within 24 hours to confirm.
              </p>
            </div>
            <button
              onClick={onBack}
              className="bg-sangalo-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-sangalo-900/30 hover:-translate-y-1 transition-all"
            >
              Return to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  const overviewItems: {
    title: string;
    desc: string;
    Icon: React.ElementType;
  }[] = [
      {
        title: "Industrial Lab sessions",
        desc: "Real-world office experience instead of boring classrooms.",
        Icon: FaBuilding,
      },
      {
        title: "Live Project Shadowing",
        desc: "Work alongside senior architects on live enterprise apps.",
        Icon: FaUsers,
      },
      {
        title: "Career Prep",
        desc: "Optimization of GitHub, LinkedIn, and mock interview drills.",
        Icon: FaRocket,
      },
      {
        title: "Direct Hiring",
        desc: "Top 20% performers are directly hired by our software house.",
        Icon: FaHandshake,
      },
    ];

  const outcomes: {
    label: string;
    desc: string;
    Icon: React.ElementType;
  }[] = [
      { label: "Industrial Lab", desc: "Real-world office environment.", Icon: FaBuilding },
      { label: "Cloud Access", desc: "Enterprise cloud resources.", Icon: FaServer },
      { label: "Certification", desc: "Industry recognized credentials.", Icon: FaCertificate },
      { label: "Global Job Sync", desc: "International interview prep.", Icon: FaGlobe },
    ];

  const heroImageSrc = toHeroImageSrc(course.image);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-32">
      {/* ===================== Enhanced Cinematic Hero ===================== */}
      {/* ===================== Enhanced Cinematic Hero (Improved Readability) ===================== */}
      <header className="relative h-[500px] flex items-end pb-16 overflow-hidden">
        <img
          src={heroImageSrc}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold border border-white/10">
                {course.category} Track
              </span>
              <span className="bg-sangalo-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg shadow-sangalo-500/20">
                {course.module}
              </span>
              <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold border border-white/10 flex items-center gap-2">
                <FaClock className="text-white/70" /> {course.duration}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight text-shadow-sm">
              {course.title}
            </h1>

            <div
              className="text-lg text-slate-200 font-medium leading-relaxed max-w-2xl line-clamp-3"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </div>
        </div>
      </header>
      {/* =================== /Enhanced Cinematic Hero ====================== */}

      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-16 mt-24">
        {/* Left Column: Details, Curriculum, Syllabus */}
        <div className="lg:col-span-8 space-y-24">
          {/* Overview Section */}
          <section id="overview" className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-wider text-xs bg-emerald-50 px-3 py-1 rounded-lg">
                <FaCircleCheck /> Strategic Learning Outcomes
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                What you will learn
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Industrial Lab sessions",
                  desc: "Real-world office experience instead of boring classrooms.",
                  Icon: FaBuilding,
                },
                {
                  title: "Live Project Shadowing",
                  desc: "Work alongside senior architects on live enterprise apps.",
                  Icon: FaUsers,
                },
                {
                  title: "Career Prep",
                  desc: "Optimization of GitHub, LinkedIn, and mock interview drills.",
                  Icon: FaRocket,
                },
                {
                  title: "Direct Hiring",
                  desc: "Top 20% performers are directly hired by our software house.",
                  Icon: FaHandshake,
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-sangalo-50 flex items-center justify-center shrink-0 text-sangalo-600 group-hover:bg-sangalo-600 group-hover:text-white transition-colors">
                    <item.Icon className="text-lg" aria-hidden />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum Accordion (Title + Content) */}
          <CurriculumAccordion
            curriculum={course.curriculum as MixedCurriculumItem[]}
          />


          {/* Instructor Card */}
          {course.instructor && (
            <section className="relative overflow-hidden group bg-slate-900 rounded-3xl shadow-2xl shadow-slate-900/20">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />

              <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 lg:gap-14">
                <div className="shrink-0 relative">
                  <img
                    src={instructorAvatar}
                    className="w-48 h-48 md:w-60 md:h-60 rounded-3xl object-cover border-[6px] border-white/5 shadow-2xl"
                    alt={instructorName}
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white text-slate-900 px-5 py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider shadow-lg">
                    {instructorTitle}
                  </div>
                </div>

                <div className="space-y-6 text-center md:text-left flex-grow">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Lead Program Mentor
                    </div>
                    <h3 className="text-4xl font-bold text-white tracking-tight">
                      {instructorName}
                    </h3>
                  </div>

                  <p className="text-lg text-slate-300 font-medium leading-relaxed italic border-l-2 border-indigo-500 pl-6">
                    "{instructorBio}"
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                    <button className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-slate-50 transition-all active:scale-95">
                      Request Consultation
                    </button>
                    <div className="flex gap-3">
                      {instructorLinkedIn && (
                        <a
                          href={instructorLinkedIn}
                          target="_blank"
                          rel="noreferrer"
                          className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-white border border-white/5"
                          aria-label="Mentor LinkedIn"
                        >
                          <FaLinkedinIn className="text-sm" />
                        </a>
                      )}
                      {instructorPortfolio && (
                        <a
                          href={instructorPortfolio}
                          target="_blank"
                          rel="noreferrer"
                          className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all text-white border border-white/5"
                          aria-label="Mentor Portfolio"
                        >
                          <FaGithub className="text-sm" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Outcomes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map((o, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-xl flex items-center justify-center text-xl mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <o.Icon aria-hidden />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 text-base">{o.label}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {o.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sticky Form */}
        <div className="lg:col-span-4 relative">
          {/* Sticky Sidebar Form */}
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-900/5 border border-slate-100 overflow-hidden relative group">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

              <div className="p-8 md:p-10 relative z-10">
                <div className="mb-8 pb-8 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Total Investment</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                      Rs. {course.price?.toLocaleString("en-NP")}
                    </span>
                  </div>
                  {(course as any).originalPrice && (
                    <div className="mt-2 text-sm font-medium text-slate-400 line-through">
                      Original Fee: Rs. {(course as any).originalPrice.toLocaleString("en-NP")}
                    </div>
                  )}

                  <div className="mt-5 flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg w-fit">
                    <FaCheck className="text-xs" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Scholarships Available</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-black text-slate-900 mb-2">Secure Your Spot</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Limited seats available for the upcoming intake. Apply now to reserve your priority slot.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider ml-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.studentName}
                      onChange={(e) =>
                        setFormData({ ...formData, studentName: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-slate-800 transition-all text-sm placeholder:text-slate-400"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider ml-1">Contact Info</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-slate-800 transition-all text-sm placeholder:text-slate-400"
                        placeholder="Email Address"
                      />
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-slate-800 transition-all text-sm placeholder:text-slate-400"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider ml-1">Preferred Schedule</label>
                    <div className="relative">
                      <select
                        required
                        value={formData.preferredBatch}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferredBatch: e.target.value,
                          })
                        }
                        className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-slate-800 transition-all appearance-none cursor-pointer text-sm"
                      >
                        <option value="">Select a time slot</option>
                        {batches.length > 0 ? (
                          batches.map((b) => (
                            <option key={b.id} value={b.time}>
                              {b.time} (Starts {b.startDate})
                            </option>
                          ))
                        ) : (
                          <option value="Waitlist">Join Priority Waitlist</option>
                        )}
                        <option value="Flexible">I'm flexible with timings</option>
                      </select>
                      <FaChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase text-slate-400 tracking-wider ml-1">Goals / Background</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-semibold text-slate-800 transition-all resize-none text-sm placeholder:text-slate-400"
                      rows={3}
                      placeholder="Briefly tell us about your goals..."
                    />
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                    {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                    {loading ? "Processing..." : "Submit Application"}
                  </button>

                  <p className="text-[10px] text-center text-slate-400 font-semibold leading-relaxed">
                    By submitting, you agree to our Terms & Conditions. <br /> Your information is safe with us.
                  </p>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-slate-50 rounded-xl py-3 px-2">
                    <div className="text-xl font-black text-slate-900">8</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Seats / Batch</div>
                  </div>
                  <div className="bg-green-50 rounded-xl py-3 px-2">
                    <div className="text-xl font-black text-green-600">Free</div>
                    <div className="text-[9px] font-bold text-green-600/70 uppercase tracking-widest">Demo Session</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all cursor-pointer group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner">
                  <FaHeadset />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-900 transition-colors">Have Questions?</h4>
                  <p className="text-xs font-semibold text-slate-400 group-hover:text-indigo-500 transition-colors flex items-center gap-1">
                    Chat with an Advisor <FaArrowRightLong size={10} className="group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Right Column */}
      </div>
    </div>
  );
};

export default CourseDetails;