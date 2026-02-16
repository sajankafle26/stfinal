'use client';

import React from 'react';
import { FaScaleBalanced, FaShieldHalved, FaGavel, FaHandshakeAngle } from 'react-icons/fa6';

const TermsPage = () => {
    const sections = [
        {
            icon: <FaGavel />,
            title: "Agreement to Terms",
            content: "By accessing or using Sangalo Tech's platforms, you agree to be bound by these Terms and Conditions. These terms govern your use of our educational services, software products, and consulting facilities."
        },
        {
            icon: <FaHandshakeAngle />,
            title: "Institutional Conduct",
            content: "Students and clients are expected to maintain professional integrity. This includes respecting intellectual property, adhering to lab safety protocols, and engaging in collaborative learning environments with respect."
        },
        {
            icon: <FaShieldHalved />,
            title: "Intellectual Property",
            content: "All course materials, code snippets provided during training, and software architecture designs remains the exclusive property of Sangalo Tech unless explicitly stated otherwise in a separate contract."
        },
        {
            icon: <FaScaleBalanced />,
            title: "Liability & Warranty",
            content: "While we strive for 99.9% infrastructure stability and elite educational accuracy, Sangalo Tech provides services 'as is' without warranties of any kind regarding specific career outcomes or technical performance beyond documented SLAs."
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Premium Hero Section */}
            <section className="relative pt-44 pb-32 px-6 overflow-hidden border-b border-slate-100">
                <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none opacity-[0.05] architect-grid" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f8fbff] via-white to-white" />

                <div className="max-w-[1400px] mx-auto relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center gap-3 bg-slate-50 text-slate-500 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-slate-100 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00548B] shadow-[0_0_8px_#00548B]" /> Institutional Protocol
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.85]">
                        Terms & <br />
                        <span className="text-[#00548B]">Conditions</span>.
                    </h1>
                    <p className="text-slate-500 font-medium text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                        The legal framework governing our <span className="text-slate-900 font-black">engineering</span> excellence and institutional standards.
                    </p>
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-24 px-6 relative">
                <div className="max-w-[1000px] mx-auto space-y-24">
                    {sections.map((section, idx) => (
                        <div key={idx} className="group grid md:grid-cols-[100px_1fr] gap-12 items-start relative pb-24 border-b border-slate-50 last:border-0">
                            <div className="w-20 h-20 bg-slate-50 text-[#00548B] rounded-[2rem] flex items-center justify-center text-3xl shadow-inner border border-slate-100 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all duration-700">
                                {section.icon}
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{section.title}</h2>
                                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                    {section.content}
                                </p>
                                <div className="pt-4 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                                    <span className="w-8 h-[1px] bg-slate-200"></span>
                                    Protocol Section {idx + 1}.0
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Institutional Note */}
            <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] architect-grid" />
                <div className="max-w-[800px] mx-auto text-center space-y-8 relative z-10">
                    <p className="text-slate-400 font-bold italic text-lg leading-relaxed">
                        "We are committed to transparent, professional, and ethical engineering practices. These terms ensure a safe and productive environment for all students and software partners."
                    </p>
                    <div className="pt-8">
                        <p className="text-slate-900 font-black text-xs uppercase tracking-widest">Last Updated: February 2026</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default TermsPage;
