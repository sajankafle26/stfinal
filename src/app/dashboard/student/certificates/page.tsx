"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGraduationCap, FaTicket, FaHouse, FaArrowRightFromBracket, FaDownload, FaEye, FaAward, FaCalendarDays, FaPlus, FaCreditCard, FaGear } from "react-icons/fa6";
import { signOut } from "next-auth/react";
import CertificateTemplate from "@/components/CertificateTemplate";

const StudentCertificates = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCert, setSelectedCert] = useState<any>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/studentlogin");
        } else if (status === "authenticated") {
            fetchCertificates();
        }
    }, [status]);

    const fetchCertificates = async () => {
        try {
            const res = await axios.get("/api/certificates");
            setCertificates(res.data);
        } catch (err) {
            console.error("Failed to fetch certificates:", err);
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading" || loading) return (
        <div className="min-h-screen bg-[#0a1118] text-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold text-sm uppercase tracking-widest text-slate-500">Retrieving certificates...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0a1118] flex flex-col">
            <div className="flex flex-1 pt-20">
                {/* Sidebar */}
                <aside className="hidden lg:flex w-72 border-r border-slate-800/50 flex-col p-6 gap-2">
                    <div className="mb-4 px-4 py-6 bg-white/5 rounded-[2rem] border border-white/5 flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white shadow-xl shadow-indigo-600/20">
                            {session?.user?.name?.[0]}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-white font-bold text-sm truncate">{session?.user?.name}</p>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Student</p>
                        </div>
                    </div>

                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-4 mb-2">Navigation</p>
                    <Link href="/dashboard/student" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-bold text-sm">
                        <FaHouse /> Dashboard
                    </Link>
                    <Link href="/dashboard/student/tickets" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-bold text-sm">
                        <FaTicket /> Support Tickets
                    </Link>
                    <Link href="/dashboard/student/certificates" className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 transition-all font-bold text-sm">
                        <FaGraduationCap /> Certificates
                    </Link>
                    <Link href="/dashboard/student/payments" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-bold text-sm">
                        <FaCreditCard /> Payment History
                    </Link>
                    <Link href="/dashboard/student/settings" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-bold text-sm">
                        <FaGear /> Settings
                    </Link>

                    <div className="mt-auto">
                        <button
                            onClick={() => signOut()}
                            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-all font-bold text-sm"
                        >
                            <FaArrowRightFromBracket /> Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
                    <div className="max-w-6xl mx-auto space-y-12">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-white tracking-tight">Academic Certificates</h1>
                            <p className="text-slate-500 text-sm font-medium">View and download your earned certifications from Sangalo Tech.</p>
                        </div>

                        {certificates.length === 0 ? (
                            <div className="bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-16 text-center space-y-6">
                                <div className="w-20 h-20 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center mx-auto">
                                    <FaAward className="text-3xl text-indigo-500" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-white">No certificates yet</h2>
                                    <p className="text-slate-400 text-sm max-w-sm mx-auto">Certificates will automatically appear here once you complete your enrolled courses.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {certificates.map((cert: any) => (
                                    <div key={cert._id} className="bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] p-8 space-y-8 group hover:border-indigo-500/30 transition-all relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/10 transition-colors" />

                                        <div className="flex justify-between items-start">
                                            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-2xl text-indigo-400 group-hover:scale-110 transition-transform">
                                                <FaAward />
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">ID</p>
                                                <p className="text-xs font-bold text-white font-mono">{cert.certificateNumber}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-lg font-bold text-white leading-tight group-hover:text-indigo-400 transition-colors">{cert.courseTitle}</h3>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                <FaCalendarDays className="text-indigo-500" /> Issued: {new Date(cert.issueDate).toLocaleDateString()}
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setSelectedCert(cert)}
                                                className="flex-1 bg-white/5 hover:bg-white/10 text-white px-4 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border border-white/5"
                                            >
                                                <FaEye /> Preview
                                            </button>
                                            <button
                                                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                                            >
                                                <FaDownload /> PDF
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Certificate Preview Modal */}
            {selectedCert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setSelectedCert(null)} />
                    <div className="relative z-10 w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="absolute top-6 right-6 z-20">
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center transition-all backdrop-blur-md"
                            >
                                <FaPlus className="rotate-45" />
                            </button>
                        </div>
                        <div className="p-8 md:p-12 bg-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <CertificateTemplate cert={selectedCert} />
                        </div>
                        <div className="p-6 bg-white border-t border-slate-100 flex justify-end gap-4">
                            <button
                                onClick={() => window.print()}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 transition-all flex items-center gap-3"
                            >
                                <FaDownload /> Download / Print
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentCertificates;
