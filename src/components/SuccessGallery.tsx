"use client";
import React, { useEffect, useState } from "react";
import { apiService } from "@/services/apiService";
import { FaLinkedin } from "react-icons/fa6";

interface SuccessStory {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    linkedinUrl: string;
    course: string;
}

const SuccessGallery = () => {
    const [stories, setStories] = useState<SuccessStory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const data = await apiService.getSuccessStories();
                setStories(data);
            } catch (e) {
                console.error("Failed to fetch success stories", e);
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    if (loading) return null;
    if (!stories || stories.length === 0) return null;

    return (
        <section className="py-32 px-6 relative overflow-hidden bg-white">
            {/* Premium Architectural Grid Background */}
            <div className="absolute inset-x-0 bottom-0 h-[800px] pointer-events-none opacity-[0.05] architect-grid" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f8fbff] via-white to-white" />

            {/* Atmospheric Cinematic Accents */}
            <div className="absolute top-1/2 left-0 -translate-x-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#00548B]/5 blur-[120px] rounded-full" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-24 space-y-8">
                    <div className="inline-flex items-center gap-3 bg-slate-50 text-slate-500 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-slate-100 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00548B] shadow-[0_0_8px_#00548B]" /> Institutional Merit
                    </div>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[0.85] max-w-5xl">
                        Graduating Into <br />
                        <span className="text-[#00548B]">Global</span> Impact.
                    </h2>
                    <p className="text-slate-500 font-medium text-xl md:text-2xl max-w-3xl leading-relaxed">
                        From high-growth startups to enterprise leaders, our alumni are <span className="text-slate-900 font-black">engineering</span> the next generation of software infrastructure.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {stories.map((story: any) => (
                        <div
                            key={story.id || story._id}
                            className="relative group h-full"
                        >
                            {/* Visual Stack Layers */}
                            <div className="absolute inset-4 bg-slate-50 rounded-[3.5rem] rotate-2 scale-[1.02] transition-all duration-700 group-hover:rotate-6 shadow-inner" />

                            <div className="relative bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-[0_48px_96px_-48px_rgba(0,84,139,0.12)] flex flex-col items-center text-center space-y-8 transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-[0_64px_128px_-48px_rgba(0,84,139,0.18)] h-full">

                                <div className="relative">
                                    <div className="w-32 h-32 rounded-[2.5rem] p-1.5 bg-white border border-slate-100 shadow-sm group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700">
                                        <img
                                            src={story.image || `https://i.pravatar.cc/150?u=${story.name}`}
                                            alt={story.name}
                                            className="w-full h-full rounded-[2rem] object-cover"
                                        />
                                    </div>
                                    {/* LinkedIn Badge */}
                                    {story.linkedinUrl && (
                                        <a
                                            href={story.linkedinUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="absolute -bottom-2 -right-2 w-11 h-11 bg-white rounded-2xl flex items-center justify-center text-[#0077b5] shadow-2xl border border-slate-50 hover:scale-110 transition-transform duration-300"
                                        >
                                            <FaLinkedin className="text-xl" />
                                        </a>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{story.name}</h3>
                                    <p className="text-[9px] font-black text-[#00548B] uppercase tracking-[0.25em] flex items-center justify-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-[#00548B]"></span>
                                        {story.course}
                                    </p>
                                </div>

                                <div className="w-12 h-1 bg-slate-50 rounded-full mx-auto"></div>

                                <div className="space-y-1.5 mt-auto">
                                    <p className="text-slate-900 font-black text-sm uppercase tracking-widest">{story.role}</p>
                                    <div className="flex items-center justify-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                                        {story.company}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessGallery;
