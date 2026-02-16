import React from 'react';
import { FaUserCheck, FaKey, FaUsers, FaGlobe, FaChevronRight, FaCodeBranch } from 'react-icons/fa6';

const WhyJoin = () => {
  const benefits = [
    {
      title: "Direct Hiring Pipeline",
      desc: "As an active software house, we feed our top project performers directly into our own engineering teams and global partner networks.",
      icon: <FaUserCheck />,
      accent: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "Cost-Optimized Learning",
      desc: "Our architectural lab model removes expensive commercial bloat. You get Silicon Valley-grade training at a localized, affordable investment.",
      icon: <FaGlobe />,
      accent: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      title: "Unlimited Lab Immersion",
      desc: "Professional mastery requires hours. Our facility is open 24/7 for you to build, break, and refine your code in a high-performance environment.",
      icon: <FaKey />,
      accent: "text-[#00548B]",
      bg: "bg-blue-50"
    }
  ];

  return (
    <section id="why-join" className="py-32 px-6 relative overflow-hidden bg-white">
      {/* Premium Architectural Grid Background */}
      <div className="absolute inset-x-0 bottom-0 h-[800px] pointer-events-none opacity-[0.05] architect-grid" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f8fbff] via-white to-white" />

      {/* Atmospheric Accents */}
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-[#00548B]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-blue-50/50 blur-[100px] rounded-full" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-center">

          {/* Left Narrative: Strategic Value */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-slate-50 text-slate-500 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-slate-100">
                <FaCodeBranch className="text-[#00548B] shadow-[0_0_8px_#00548B]" /> Global Tech Ecosystem
              </div>

              <h2 className="text-5xl md:text-5xl lg:text-5xl font-black text-slate-900 leading-[1] tracking-tight">
                Why Elite
                <span className="text-[#00548B]">Talents</span>  Choose Us.
              </h2>

              <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-xl">
                We operate on a <span className="text-slate-900 font-bold">Lab-First Philosophy</span>. Zero commercial bloat—just high-intensity engineering environments designed for rapid professional growth.
              </p>
            </div>

            {/* Architectural Timeline UI */}
            <div className="relative pl-10 space-y-12 before:content-[''] before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {[
                { step: '01', title: 'Deep Tech Training', desc: 'Master production-grade workflows on real-world stacks.' },
                { step: '02', title: 'Live Project Contribution', desc: 'Active involvement in internal product jira boards.' },
                { step: '03', title: 'Professional Placement', desc: 'Direct pathway to engineering roles in our network.' }
              ].map((path, i) => (
                <div key={i} className="relative group hover:translate-x-2 transition-transform duration-500">
                  <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-white border-2 border-[#00548B] rounded-full z-10 shadow-[0_0_8px_#00548B]" />
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 text-lg tracking-tight uppercase leading-none">{path.title}</h4>
                    <p className="text-[13px] text-slate-400 font-medium leading-relaxed max-w-sm">{path.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Stack Cards */}
          <div className="lg:col-span-7 grid gap-10">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="relative group lg:ml-10"
              >
                {/* Visual Stack Layers */}
                <div className="absolute inset-4 bg-slate-50 rounded-[3rem] rotate-2 scale-[1.02] transition-all duration-700 group-hover:rotate-6" />

                {/* Main Benefit Card */}
                <div className="relative bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-[0_48px_96px_-48px_rgba(0,84,139,0.12)] flex flex-col md:flex-row gap-10 items-center transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-[0_64px_128px_-48px_rgba(0,84,139,0.18)]">
                  <div
                    className={`w-20 h-20 ${benefit.bg} ${benefit.accent} rounded-[2rem] flex items-center justify-center text-3xl shrink-0 shadow-inner group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500`}
                  >
                    {benefit.icon}
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{benefit.title}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                  <div className="hidden md:flex ml-auto items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 text-slate-300 group-hover:text-white group-hover:bg-[#00548B] group-hover:scale-110 transition-all duration-500 shadow-sm">
                    <FaChevronRight className="text-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyJoin;