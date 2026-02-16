import React from 'react';
import Link from 'next/link';
import { BsLightningCharge } from 'react-icons/bs';
import { FaMicrochip } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const About = () => {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden bg-white">
      {/* Precision Architectural Grid */}
      <div className="absolute inset-x-0 bottom-0 h-[600px] pointer-events-none opacity-[0.05] architect-grid" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#f8fbff] to-white pointer-events-none" />

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00548B]/3 blur-[120px] rounded-full" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Visual Side: Architectural Stack Concept */}
          <div className="relative group animate-on-scroll">
            {/* Background Perspective Blocks */}
            <div className="absolute inset-10 bg-[#00548B]/5 rounded-[3.5rem] rotate-6 scale-105 transition-transform duration-700 group-hover:rotate-12" />
            <div className="absolute inset-10 bg-slate-100 rounded-[3.5rem] -rotate-3 scale-95 transition-transform duration-700 group-hover:-rotate-6" />

            <div className="relative z-10 rounded-[3.5rem] overflow-hidden bg-white p-3 border border-slate-100 shadow-[0_48px_96px_-32px_rgba(0,0,0,0.08)]">
              <div className="rounded-[2.8rem] overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
                  alt="Engineering Lab"
                  className="w-full h-full object-cover grayscale-[20%] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Floating Achievement Card */}
            <div className="absolute -bottom-6 -right-6 md:-right-12 bg-white p-8 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-50 z-20 max-w-[280px]">
              <div className="flex items-center gap-5 mb-4">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl">
                  <BsLightningCharge className="text-xl text-[#00548B]" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900 tracking-tighter">100%</div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                    Job Placement
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                Our home-lab architecture redirects 100% of commercial overhead into your elite tech mentorship.
              </p>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-slate-50 text-slate-500 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-slate-100">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00548B] shadow-[0_0_8px_#00548B]" /> Higher Learning Standard
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                Best IT training  
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00548B] via-[#00548B]/80 to-slate-900">
                   institute in Nepal.
                </span>
              </h2>

              <div className="space-y-8">
                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                  <span className="text-slate-900 font-black italic">Sangalo Tech</span> bridges the gap between traditional academics and modern engineering through a rigorous, software-house approach.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  {[
                    "Industry-Active Mentors",
                    "Guaranteed Internship",
                    "Live Enterprise Projects",
                    "24/7 Professional Lab"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 group translate-x-0 hover:translate-x-2 transition-transform">
                      <AiOutlineCheckCircle className="text-[#00548B] text-xl" />
                      <span className="text-[13px] font-black text-slate-700 tracking-tight uppercase">{feature}</span>
                    </div>
                  ))}
                </div>

                <p className="text-base text-slate-400 font-medium leading-relaxed max-w-lg italic border-l-4 border-[#00548B]/20 pl-6">
                  "Our curriculum is architected by seniors actively working in global startups—no fluff, just skills."
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <Link href="/courses" className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black hover:bg-[#00548B] transition-all shadow-xl hover:shadow-blue-900/20 active:scale-95 no-underline">
                View Learning Tracks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;