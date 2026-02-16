'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Course } from '@/types';
import { FaArrowRight } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import ShiftPopoverInline from './ShiftPopoverInline';
import { slugify } from '@/utils/slug';
import Link from 'next/link';

interface HeroProps {
  initialCourses?: Course[];
  onCourseSelect?: (course: Course) => void;
}

const Hero = ({ initialCourses = [], onCourseSelect }: HeroProps) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await import("@/services/apiService").then(m => m.apiService.getCourses());
        const formatted = data.map(c => ({
          title: c.title,
          duration: c.duration,
          price: `Rs. ${c.price.toLocaleString()}`,
          slug: c.slug,
          desc: c.description,
          img: c.image || 'https://broadwayinfosys.com/uploads/card/1770120336_69237.png'
        }));
        setCourses(formatted.length ? formatted : [
          {
            title: 'UI/UX Design',
            duration: '1 Month',
            price: 'Rs. 8,000',
            slug: slugify('UI/UX Design Training'),
            desc: 'Learn user interface and user experience design principles for web and mobile apps.',
            img: 'ui-ux.png',
          },
          {
            title: 'Web Design',
            duration: '1 Month',
            price: 'Rs. 8,000',
            slug: slugify('Web Design Training'),
            desc: 'Master HTML, CSS, and modern web design tools to create stunning websites.',
            img: 'web-design-training.png',
          },
          {
            title: 'MERN Stack',
            duration: '2 Months',
            price: 'Rs. 16,000',
            slug: slugify('MERN Stack Training'),
            desc: 'Learn full-stack web development with React, Node.js, and MongoDB.',
            img: 'mern.jpg',
          },
        ]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative pt-2 pb-20 md:pt-8 md:pb-2 px-6 bg-[#004a6154] overflow-hidden border-b border-slate-200">
      {/* Spotlight */}
      <div className="absolute inset-0 opacity-20 pointer-events-none banner" />
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16 relative z-10 items-center">
        {/* LEFT: TEXT */}
        <div className="lg:col-span-7 space-y-12 text-center lg:text-left">
          {/* Top badge + Title + Subhead */}
          <div className="space-y-6">
            <div
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md  px-5 py-2.5 rounded-full border border-white shadow-lg mx-auto lg:mx-0"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sangalo-900 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sangalo-900" />
              </span>
              <span className="text-xs font-extrabold tracking-widest uppercase text-sangalo-900">
                Admission Open 2025
              </span>
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-6xl  font-extrabold leading-[0.95] tracking-tight text-slate-900"
            >
              Job‑Ready Program
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r   from-slate-900 via-slate-900 to-indigo-600 ps-4"
              >
                Internship Granted.
              </span>
            </h1>

            <p className="text-lg md:text-xl lg:text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Our home‑based office model significantly reduces operational overhead,
              allowing us to offer industry‑grade training at a more affordable fee.
            </p>
          </div>

          {/* Modules & Duration */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Modules &amp; Duration <span className="text-slate-400">(6 months)</span>
            </div>

            <ul className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {[
                { title: 'UI/UX', duration: '1 month' },
                { title: 'Web Design', duration: '1 month' },
                { title: 'MERN Stack', duration: '2 month' },
                { title: 'Internship', duration: '2 months' },
              ].map((m, i) => {
                const chip = (
                  <li
                    key={i}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm"
                  >
                    <span className="inline-flex h-2 w-2 rounded-full bg-slate-900" />
                    <span className="text-sm font-semibold text-slate-900">{m.title}</span>
                    <span className="text-[11px] text-slate-500">• {m.duration}</span>
                  </li>
                );

                if (m.title !== 'Internship') return chip;

                // Wrap only the Internship chip with the popover
                return (
                  <ShiftPopoverInline
                    key={i}
                    items={[
                      {
                        id: 'morning',
                        title: 'Morning Shift',
                        time: '6:00 AM – 10:00 AM',
                        notes: ['Suitable for Student before collage ', 'Hybrid option'],
                      },
                      {
                        id: 'evening',
                        title: 'Evening Shift',
                        time: '10:00 PM – 3:00 PM',
                        notes: ['Suitable for Student After Day collage ', 'Hybrid option'],
                      },
                      {
                        id: 'night',
                        title: 'Night Shift',
                        time: '3:00 PM – 8:00 PM',
                        notes: ['Suitable for Student After Day collage ', 'Online/Hybrid option'],
                      },
                    ]}
                    side="top-right"
                  >
                    {/* Make the Internship chip look clickable */}
                    <li className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900/30">
                      <span className="inline-flex h-2 w-2 rounded-full bg-slate-900" />
                      <span className="text-sm font-semibold text-slate-900">Internship</span>
                      <span className="text-[11px] text-slate-500">• 2 months</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        className="ml-1 text-slate-500"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </li>
                  </ShiftPopoverInline>
                );
              })}
            </ul>
          </div>

          {/* TRUST ROW with ShiftAccordion on the RIGHT (requested) */}
          <div className="pt-10 border-t border-slate-200/50">
            <div className="flex flex-col sm:flex-row sm:items-start gap-8">
              {/* Left: Avatars + text */}
              <div className="flex items-center gap-6 flex-1">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/100?u=grad-${i}`}
                      className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                      alt=""
                    />
                  ))}
                  <div
                    className="w-12 h-12 rounded-full bg-slate-900 text-white  flex items-center justify-center text-[10px] font-black border-4 border-white shadow-lg"
                  >
                    +5k
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-500">
                  Trusted by <span className="text-slate-900">5000+ Students</span> across Nepal
                </p>
              </div>

              {/* Right: ShiftAccordion (compact) */}


            </div>
          </div>
        </div>

        {/* RIGHT: SWIPER */}
        <div className="lg:col-span-5 relative hidden md:block">
          <Swiper
            modules={[Autoplay, EffectCards, Pagination]}
            effect="cards"
            grabCursor
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="heroSwiper my-6 w-full max-w-[420px] mx-auto overflow-visible shadow-2xl shadow-sangalo-900/10"
          >
            {courses.map((course, i) => (
              <SwiperSlide key={i}>
                <div
                  className="bg-white rounded-[2rem] p-5 border border-slate-200  shadow-[0_12px_30px_rgba(15,23,42,0.06)] flex flex-col cursor-pointer group transition-all duration-400 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]"
                >
                  <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                    <img
                      src={course.img}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      alt={course.title}
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite loop
                        target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
                        console.error(`Failed to load image for course: ${course.title}`, course.img);
                      }}
                      loading="lazy"
                    />
                    <div
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur  px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase text-slate-900 ring-1 ring-slate-200"
                    >
                      {course.duration}
                    </div>
                  </div>
                  <Link href={`/courses/${course.slug}`} className="flex flex-col flex-1">
                    <h3 className="text-[22px] leading-7 font-extrabold text-slate-900 mb-2">
                      {course.title}
                    </h3>
                    <div
                      className="text-sm text-slate-500 font-medium mb-8 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: course.desc }}
                    />

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Fee Starting From</span>
                        <span className="text-2xl font-extrabold text-slate-900">
                          {course.price}
                        </span>
                      </div>
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center  bg-slate-50 text-slate-900 ring-1 ring-slate-200 transition-all duration-300   group-hover:bg-slate-900 group-hover:text-white group-hover:ring-slate-900/0"
                      >
                        <FaArrowRight />
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Hero;
