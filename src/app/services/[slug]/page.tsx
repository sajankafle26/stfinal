"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiService } from '@/services/apiService';
import { ServiceItem } from '@/types';
import { FaArrowLeft, FaEnvelope, FaPhone, FaRocket, FaCheckCircle, FaLaptopCode, FaMobileAlt, FaChartPie, FaPenNib, FaShoppingCart, FaCloud } from 'react-icons/fa';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap: Record<string, any> = {
    's1': FaLaptopCode,
    's2': FaMobileAlt,
    's3': FaChartPie,
    's4': FaPenNib,
    's5': FaShoppingCart,
    's6': FaCloud,
};

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [service, setService] = useState<ServiceItem | null>(null);
    const [siteSettings, setSiteSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                const [data, settings] = await Promise.all([
                    apiService.getServiceBySlug(slug),
                    apiService.getSiteSettings()
                ]);
                if (data) setService(data);
                if (settings) setSiteSettings(settings);
            } catch (err) {
                console.error("Failed to fetch service details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0c10]">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0c10] p-6 text-white text-center">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <h1 className="text-4xl font-black mb-4 tracking-tighter">Service Not Found</h1>
                    <p className="text-slate-400 mb-8 max-w-md font-medium">
                        The digital path you seek has been moved or doesn't exist in our current architecture.
                    </p>
                    <Link
                        href="/services"
                        className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300"
                    >
                        <FaArrowLeft /> Explore All Services
                    </Link>
                </motion.div>
            </div>
        );
    }

    const Icon = iconMap[service.id] || FaRocket;

    return (
        <div className="min-h-screen bg-[#0a0c10] text-slate-200 selection:bg-blue-500/30">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-indigo-600/5 rounded-full blur-[150px]" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-all font-bold uppercase tracking-[0.2em] text-xs group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to Services
                        </Link>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-8 backdrop-blur-md">
                                <FaRocket className="animate-bounce-slow" />
                                <span>Premium Service</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
                                {service.title}
                            </h1>
                            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                                Elevating your digital presence with world-class {service.title.toLowerCase()} tailored to your unique scaling needs.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="hidden lg:flex justify-end"
                        >
                            <div className="w-80 h-80 rounded-[3rem] bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-white/10 flex items-center justify-center relative group">
                                <div className="absolute inset-0 bg-blue-600/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                {service.icon?.startsWith('fa') ? (
                                    <i className={`${service.icon} text-9xl text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]`}></i>
                                ) : (
                                    <Icon className="text-9xl text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-24 px-6 relative z-10">
                <div className="grid lg:grid-cols-3 gap-20">
                    {/* Left: Detailed Overview */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-16"
                    >
                        <section className="space-y-8">
                            <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-4">
                                <span className="w-12 h-1 bg-blue-600 rounded-full" />
                                Service Overview
                            </h2>
                            <div
                                className="prose prose-invert prose-lg max-w-none text-slate-400 font-medium leading-loose
                prose-headings:text-white prose-strong:text-blue-400 prose-ul:list-none prose-li:pl-0"
                                dangerouslySetInnerHTML={{ __html: service.description }}
                            />
                        </section>

                        <section className="bg-slate-900/40 p-12 rounded-[3.5rem] border border-white/5 backdrop-blur-sm shadow-2xl space-y-10 group">
                            <h3 className="text-3xl font-black text-white tracking-tight">Why Partner With Us?</h3>
                            <ul className="grid md:grid-cols-2 gap-8">
                                {[
                                    { title: "Strategic Architecture", desc: "Built for unlimited scale and long-term sustainability." },
                                    { title: "Velocity & Quality", desc: "Rapid deployment without compromising pixel perfection." },
                                    { title: "Elite Team", desc: "Work directly with senior engineers and design thinkers." },
                                    { title: "Total Transparency", desc: "Real-time updates and seamless integration with your team." }
                                ].map((item, i) => (
                                    <li key={i} className="space-y-3">
                                        <div className="flex items-center gap-3 text-blue-500">
                                            <FaCheckCircle />
                                            <span className="font-black uppercase tracking-widest text-xs">{item.title}</span>
                                        </div>
                                        <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </motion.div>

                    {/* Right: Premium CTA Sidebar */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="sticky top-32"
                        >
                            <div className="bg-gradient-to-br from-blue-700 to-indigo-800 p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(37,99,235,0.3)] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-black/20 rounded-full blur-3xl" />

                                <div className="relative z-10">
                                    <h3 className="text-3xl font-black text-white mb-6 tracking-tight leading-tight">Elevate Your Vision Today</h3>
                                    <p className="text-white/80 font-medium mb-10 leading-relaxed">
                                        Ready to transcend standard solutions? Let's engineer your digital breakthrough.
                                    </p>

                                    <div className="space-y-4 mb-10">
                                        <a
                                            href={`mailto:${siteSettings?.email || 'studio@sangalotech.com'}`}
                                            className="flex items-center gap-5 bg-white/10 hover:bg-white/20 p-5 rounded-[1.5rem] transition-all border border-white/10 no-underline text-white group/link"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/link:bg-blue-500 transition-colors">
                                                <FaEnvelope className="text-xl" />
                                            </div>
                                            <div className="text-sm font-bold truncate opacity-90">{siteSettings?.email || 'studio@sangalotech.com'}</div>
                                        </a>

                                        <a
                                            href={`tel:${siteSettings?.phone?.split('/')[0]?.trim() || '+9779851228383'}`}
                                            className="flex items-center gap-5 bg-white/10 hover:bg-white/20 p-5 rounded-[1.5rem] transition-all border border-white/10 no-underline text-white group/link"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover/link:bg-green-500 transition-colors">
                                                <FaPhone className="text-xl" />
                                            </div>
                                            <div className="text-sm font-bold opacity-90">{siteSettings?.phone || '+977-9851228383'}</div>
                                        </a>
                                    </div>

                                    <Link
                                        href="/#contact"
                                        className="w-full bg-white text-blue-700 py-5 rounded-2xl font-black text-center uppercase tracking-[0.2em] text-xs hover:shadow-2xl hover:-translate-y-1 transition-all block no-underline shadow-lg"
                                    >
                                        Initiate Discussion
                                    </Link>
                                </div>
                            </div>

                            {/* Related Tags Decor */}
                            <div className="mt-8 p-8 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-sm">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Technological Focus</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Scalable Architecture', 'Next-Gen UX', 'Cloud Native', 'API First'].map(tag => (
                                        <span key={tag} className="px-4 py-2 bg-slate-800/50 rounded-lg text-[10px] font-black text-slate-400 border border-white/5 uppercase tracking-wider">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
}
