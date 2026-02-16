"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  FaCode,
  FaBullhorn,
  FaWordpress,
  FaMicrochip,
  FaClock,
  FaUsers,
  FaProjectDiagram,
  FaCertificate,
  FaArrowRight,
  FaGraduationCap,
} from "react-icons/fa";
import Link from "next/link";

import { apiService } from "@/services/apiService";
import type { Course, ProgramCategory } from "@/types";
import { slugify } from "@/utils/slug";

interface ProgramsProps {
  onCourseSelect?: (course: Course) => void; // ✅ optional
}

interface CourseCardProps {
  course: Course;
  // ✅ No onClick here; the whole card is wrapped in <Link />
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  };

  // ✅ Fallback image (prevents broken images / layout shift)
  const imgSrc =
    course.image ||
    "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&q=70&w=800";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group bg-white rounded-[1rem] p-2 border border-slate-200 transition-all duration-700 hover:-translate-y-4 cursor-pointer shadow-premium hover:shadow-4xl relative overflow-hidden"
    >
      {/* Dynamic Hover Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, #004381, transparent 70%)`,
        }}
      />

      <div className="relative aspect-[16/10] rounded-[0.5rem] overflow-hidden mb-8 z-10 shadow-inner bg-slate-100">
        {/* Optional: replace <img> with <Image> for optimization */}
        {/* See "Optional: Switch to next/image" below */}
        <img
          src={imgSrc}
          alt={course.title}
          title={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          loading="lazy"
        />
        <div className="absolute top-0 right-0 glass-panel px-4 py-1.5 rounded-full">
          <span className="text-[7px] uppercase tracking-widest bg-sangalo-900 p-2 text-white">
            {course.duration}
          </span>
        </div>
      </div>

      <div className="px-2 relative z-10 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-sangalo-700 uppercase tracking-widest bg-sangalo-50 px-3 py-1 rounded-lg border border-sangalo-100">
              {course.module}
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-sangalo-300 transition-colors"
                  style={{ transitionDelay: `${s * 50}ms` }}
                />
              ))}
            </div>
          </div>
          <h3 className="font-black text-slate-900 group-hover:text-sangalo-900 transition-colors leading-tight tracking-tight">
            {course.title}
          </h3>
        </div>

        <div
          className="text-sm text-slate-600 font-semibold leading-relaxed line-clamp-2"
          dangerouslySetInnerHTML={{ __html: course.description }}
        />

        <div className="flex justify-between items-center pt-6 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
              Program Fee
            </span>
            <span className="text-2xl font-black text-sangalo-900 tracking-tighter">
              {/* Keep your toLocaleString or switch to Intl.NumberFormat */}
              Rs. {course.price.toLocaleString("en-NP")}
              {/* or: {new Intl.NumberFormat("en-NP").format(course.price)} */}
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-sangalo-900 text-white flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6 shadow-xl shadow-sangalo-900/20 active:scale-95">
            <FaArrowRight className="text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Map any legacy categories to tab ids
function toProgramCategory(raw: unknown): ProgramCategory {
  const map: Record<string, ProgramCategory> = {
    // legacy/enum-like
    WEB_DEV: "js",
    LARAVEL: "js",
    WORDPRESS: "wp",
    DIGITAL_MARKETING: "dm",
    ROBOTICS_IOT: "robotics",
    // passthrough
    js: "js",
    dm: "dm",
    wp: "wp",
    robotics: "robotics",
  };
  return map[String(raw)] ?? "js";
}

const Programs = ({ onCourseSelect }: ProgramsProps) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<ProgramCategory>("js");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Background spotlight (throttled with rAF)
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = (((e.clientX - rect.left) / rect.width) * 100).toFixed(2) + "%";
    const my = (((e.clientY - rect.top) / rect.height) * 100).toFixed(2) + "%";

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", mx);
      el.style.setProperty("--my", my);
    });
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getCourses();

        const normalized: Course[] = (data || []).map((c: any) => ({
          ...c,
          slug: c.slug ?? slugify(c.title ?? `course-${c.id}`),
          category: toProgramCategory(c.category),
        }));

        setCourses(normalized);
      } catch (err) {
        console.error("Programs Fetch Error:", err);
        setError("Unable to load programs right now.");
        setCourses([]); // or set local fallback
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const filteredCourses = useMemo(
    () => courses.filter((course) => course.category === activeTab),
    [activeTab, courses]
  );

  const tabs = [
    { id: "js" as ProgramCategory, label: "Development", icon: <FaCode /> },
    { id: "dm" as ProgramCategory, label: "Marketing", icon: <FaBullhorn /> },
    { id: "wp" as ProgramCategory, label: "CMS/WP", icon: <FaWordpress /> },
    {
      id: "robotics" as ProgramCategory,
      label: "IoT/Robotics",
      icon: <FaMicrochip />,
    },
  ];

  return (
    <section
      id="programs"
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="py-32 px-6 relative overflow-hidden text-white"
    >
      {/* === Dark Premium Background (#004381) === */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundColor: "#004381" }} />
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_5%_10%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(800px_480px_at_95%_120%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
        <div className="absolute inset-0 opacity-[0.25]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div
          className="absolute inset-0"
          style={
            {
              background:
                "radial-gradient(420px 260px at var(--mx,50%) var(--my,30%), rgba(255,255,255,0.12), transparent 60%)",
            } as React.CSSProperties
          }
        />
      </div>

      <div className="max-w-[1400px] mx-auto space-y-24 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest border border-white/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white/80 animate-ping" />
              Enterprise Curriculum
            </div>
            <h2 className="text-3xl md:text-7xl font-black leading-[0.95] tracking-tight">
              Professional <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to white/70">
                Training Tracks.
              </span>
            </h2>
            <p className="text-xl text-white/80 font-semibold leading-relaxed">
              Every course is mentored by senior architects actively building enterprise products. High
              lab performance leads to <span className="text-white font-black">Direct Placement</span>.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-white/10 backdrop-blur-xl p-2 rounded-[2.5rem] overflow-x-auto w-full lg:w-auto shadow-premium border border-white/20 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap group ${activeTab === tab.id
                  ? "bg-white text-[#004381] shadow-2xl shadow-black/20"
                  : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                aria-pressed={activeTab === tab.id}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/10 rounded-[3rem] p-6 border border-white/20 animate-pulse space-y-8"
              >
                <div className="aspect-[16/10] bg-white/10 rounded-[2.5rem]" />
                <div className="px-2 space-y-4">
                  <div className="h-8 bg-white/10 rounded-xl w-3/4" />
                  <div className="h-4 bg-white/10 rounded-xl w-full" />
                  <div className="h-12 bg-white/10 rounded-xl w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="py-40 text-center bg-white/5 backdrop-blur-sm rounded-[4rem] border-2 border-dashed border-white/30 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center shadow-premium text-4xl text-white/60">
              <FaGraduationCap />
            </div>
            <div className="space-y-2">
              <p className="text-white/80 font-black uppercase tracking-widest text-sm">
                {error ? "Service Unavailable" : "Batch Synchronizing"}
              </p>
              <p className="text-white/70 font-medium">
                {error
                  ? "Unable to load programs right now. Please try again shortly."
                  : "New programs for this track are opening in Q3 2026."}
              </p>
            </div>
            <button
              onClick={() => setActiveTab("js")}
              className="bg-white text-[#004381] px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-black/20 hover:shadow-2xl active:scale-95 transition"
            >
              Browse Dev Tracks
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="block"
                onClick={() => onCourseSelect?.(course)}
                aria-label={`View ${course.title} course`}
              >
                <CourseCard course={course} />
              </Link>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        <div className="pt-20 flex flex-wrap items-center justify-center gap-x-16 gap-y-8 border-t border-white/20">
          {[
            { label: "Lab Sessions", val: "2Hrs / Day", icon: <FaClock /> },
            { label: "Project Shadowing", val: "Included", icon: <FaUsers /> },
            { label: "Internship Bridge", val: "100% Support", icon: <FaProjectDiagram /> },
            { label: "Certification", val: "Global Valid", icon: <FaCertificate /> },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shadow-sm border border-white/20 group-hover:bg-white group-hover:text-[#004381] transition-all duration-500">
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <div className="text-[9px] font-black text-white/60 uppercase tracking-widest">
                  {item.label}
                </div>
                <div className="text-sm font-black text-white">{item.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;