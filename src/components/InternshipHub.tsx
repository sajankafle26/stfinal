'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiService } from '@/services/apiService';
import { InternshipPosition } from '@/types';
import { FaBriefcase, FaTriangleExclamation, FaCode, FaArrowRight, FaCodeMerge, FaCircleCheck, FaLaptopCode, FaRocket } from 'react-icons/fa6';

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const InternshipHub = () => {
  const [internships, setInternships] = useState<InternshipPosition[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [data, settings] = await Promise.all([
          apiService.getInternships(),
          apiService.getSiteSettings()
        ]);
        setInternships(data || []);
        if (settings) setSiteSettings(settings);
      } catch (e) {
        console.error("Internship Hub Fetch Error:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="internships" className="py-32 px-6 relative overflow-hidden bg-white">
      {/* High-Fidelity Architectural Grid */}
      <div className="absolute inset-x-0 bottom-0 h-[600px] pointer-events-none opacity-[0.05] architect-grid" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#f8fbff] to-white pointer-events-none" />

      {/* Atmospheric Accents */}
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-[#00548B]/5 blur-[120px] rounded-full" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-start">

          {/* Left Info: Success Path Timeline */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-slate-50 text-slate-500 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-slate-100">
                <FaBriefcase className="text-[#00548B] shadow-[0_0_8px_#00548B]" /> Sangalo Software House
              </div>
              <h2 className="text-3xl md:text-3xl font-black text-slate-900 leading-[0.85] tracking-tight">
                Job-Ready
                <span className="text-[#00548B]">Career</span> Pipeline.
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
                We bridge the gap between classroom and industry. Every graduate secures a <span className="text-slate-900 font-bold">Guaranteed Paid Internship</span> contract inside our internal Dev Lab.
              </p>
            </div>

            {/* Success Timeline UI */}
            <div className="relative pl-10 space-y-12 before:content-[''] before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-50">
              {[
                {
                  icon: <FaLaptopCode />,
                  title: 'Deep-Tech Training',
                  desc: '8-12 weeks of intensive, high-throughput learning in our professional lab.',
                  status: 'Phase 01'
                },
                {
                  icon: <FaCircleCheck />,
                  title: 'Professional Mastery',
                  desc: 'Pass evaluations to secure institutional and global certifications.',
                  status: 'Phase 02'
                },
                {
                  icon: <FaRocket />,
                  title: 'Paid Internship Contract',
                  desc: 'Immediate placement into our software house to work on live enterprise apps.',
                  status: 'Phase 03'
                }
              ].map((path, i) => (
                <div key={i} className="relative group hover:translate-x-2 transition-transform duration-500">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-white border-2 border-[#00548B] rounded-full z-10 shadow-[0_0_8px_#00548B]" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        {path.status}
                      </span>
                      <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight leading-none">{path.title}</h4>
                    </div>
                    <p className="text-[13px] text-slate-400 font-medium leading-relaxed max-w-sm">{path.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href={`https://wa.me/${siteSettings?.whatsapp || '9851228383'}`} target="_blank" className="inline-flex items-center gap-4 bg-slate-900 text-white px-12 py-5 rounded-2xl font-black hover:bg-[#00548B] transition-all shadow-xl hover:shadow-blue-900/20 active:scale-95 group no-underline">
              Start Your Success Story <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Right Column: Swiper Slider for Internship Roles */}
          <div className="lg:col-span-7 w-full overflow-hidden">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[1, 2].map(i => (
                  <div key={i} className="h-80 bg-slate-50 rounded-[3.5rem] animate-pulse border border-slate-100 shadow-sm"></div>
                ))}
              </div>
            ) : (
              <div className="relative pb-16">
                <Swiper
                  spaceBetween={32}
                  slidesPerView={1}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  modules={[Autoplay, Pagination, A11y]}
                  breakpoints={{
                    640: { slidesPerView: 1.2 },
                    1024: { slidesPerView: 1.6 }
                  }}
                  className="!overflow-visible"
                >
                  {internships.map((intern) => (
                    <SwiperSlide key={intern.id || (intern as any)._id}>
                      <div className="relative group h-[450px]">
                        {/* Architectural Stack Visual */}
                        <div className="absolute inset-4 bg-[#00548B]/5 rounded-[3.5rem] rotate-3 scale-[1.05] transition-transform duration-700 group-hover:rotate-6" />

                        {/* Main Internship Card */}
                        <div className="relative h-full bg-white p-10 rounded-[3.5rem] shadow-[0_48px_96px_-48px_rgba(0,84,139,0.12)] border border-slate-100 flex flex-col justify-between transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_64px_128px_-48px_rgba(0,84,139,0.18)]">
                          <div className="space-y-8">
                            <div className="flex justify-between items-start">
                              <div className="w-16 h-16 bg-slate-50 text-[#00548B] rounded-[1.8rem] flex items-center justify-center text-3xl transition-all group-hover:bg-[#00548B] group-hover:text-white group-hover:-rotate-12 shadow-inner">
                                {intern.icon ? <i className={intern.icon}></i> : <FaCode />}
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00548B] bg-blue-50 px-5 py-2.5 rounded-full border border-blue-100">
                                {intern.type}
                              </span>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-[#00548B] transition-colors">{intern.title}</h3>
                              <div
                                className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3 prose-p:m-0"
                                dangerouslySetInnerHTML={{ __html: intern.description || "" }}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-10 border-t border-slate-50">
                            <div>
                              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Term</span>
                              <span className="text-sm font-black text-slate-800 tracking-tight">{intern.duration}</span>
                            </div>
                            <div className="text-right">
                              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Incentive</span>
                              <span className="text-sm font-black text-[#00548B] tracking-tight">{intern.stipend}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Simplified CTA Overlay Card */}
                <div className="mt-20 bg-slate-950 rounded-[3.5rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-[0_64px_128px_-32px_rgba(0,0,0,0.5)] group">
                  <div className="absolute inset-0 opacity-[0.03] architect-grid pointer-events-none" />
                  <div className="absolute -top-10 -right-10 w-[400px] h-[400px] bg-[#00548B]/10 blur-[100px] rounded-full pointer-events-none" />

                  <div className="space-y-2 z-10 text-center md:text-left">
                    <h3 className="text-24xl font-black tracking-tight leading-none uppercase">Ready for lift-off?</h3>
                    <p className="text-slate-400 font-medium max-w-sm italic">"The best way to predict the future is to architect it." — Enroll in our next batch.</p>
                  </div>
                  <Link href="/courses" className="bg-white text-slate-950 px-12 py-6 rounded-2xl font-black hover:bg-[#00548B] hover:text-white transition-all shrink-0 z-10 shadow-2xl active:scale-95 no-underline uppercase text-xs tracking-widest">
                    Apply for Batch
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default InternshipHub;
