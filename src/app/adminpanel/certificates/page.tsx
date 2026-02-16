"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaGraduationCap, FaDownload, FaEye, FaAward, FaCalendarDays, FaGear, FaCircleCheck, FaTrash, FaPlus } from "react-icons/fa6";
import CertificateTemplate from "@/components/CertificateTemplate";

const AdminCertificates = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'design'>('list');
    const [certificates, setCertificates] = useState([]);
    const [settings, setSettings] = useState({
        directorName: "Program Director",
        instructorName: "Lead Instructor",
        organizationName: "Sangalo Tech",
        academicCouncil: "Academic Council"
    });
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [selectedCert, setSelectedCert] = useState<any>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [certRes, settingsRes] = await Promise.all([
                axios.get("/api/certificates"),
                axios.get("/api/certificates/settings")
            ]);
            setCertificates(certRes.data);
            setSettings(settingsRes.data);
        } catch (err) {
            console.error("Failed to fetch admin certificates data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await axios.post("/api/certificates/settings", settings);
            alert("Settings saved successfully!");
        } catch (err) {
            console.error("Failed to save settings:", err);
            alert("Failed to save settings.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-sm uppercase tracking-widest text-slate-500">Loading Certificate Management...</p>
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight">Certification Center</h1>
                    <p className="text-slate-500 text-sm font-medium">Manage issued certificates and design the template details.</p>
                </div>

                <div className="flex bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
                    <button
                        onClick={() => setActiveTab('list')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'list' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'}`}
                    >
                        <FaAward /> Issued
                    </button>
                    <button
                        onClick={() => setActiveTab('design')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'design' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white'}`}
                    >
                        <FaGear /> Design
                    </button>
                </div>
            </div>

            {activeTab === 'list' ? (
                <div className="space-y-6">
                    {certificates.length === 0 ? (
                        <div className="bg-slate-900/40 border border-slate-800 border-dashed rounded-[3rem] p-20 text-center">
                            <FaAward className="text-5xl text-slate-800 mx-auto mb-6" />
                            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">No certificates issued yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {certificates.map((cert: any) => (
                                <div key={cert._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 hover:border-slate-700 transition-all group flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl">
                                            <FaAward />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold">{cert.userName}</h3>
                                            <p className="text-slate-500 text-xs font-medium">{cert.courseTitle}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">ID</p>
                                            <p className="text-xs font-bold text-white font-mono">{cert.certificateNumber}</p>
                                        </div>
                                        <div className="text-right hidden sm:block">
                                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">Date</p>
                                            <p className="text-xs font-bold text-white">{new Date(cert.issueDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedCert(cert)}
                                                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                                            >
                                                <FaEye />
                                            </button>
                                            <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-rose-400 hover:bg-rose-500/10 transition-all">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-12 animate-in fade-in duration-500">
                    <form onSubmit={handleSaveSettings} className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 space-y-8 h-fit">
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white">Template Configuration</h2>
                            <p className="text-slate-500 text-sm">Update the placeholder names used in the certificate footer.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Director Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                    value={settings.directorName}
                                    onChange={(e) => setSettings({ ...settings, directorName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Instructor Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                    value={settings.instructorName}
                                    onChange={(e) => setSettings({ ...settings, instructorName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Organization</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                    value={settings.organizationName}
                                    onChange={(e) => setSettings({ ...settings, organizationName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Academic Subtext</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                    value={settings.academicCouncil}
                                    onChange={(e) => setSettings({ ...settings, academicCouncil: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3"
                        >
                            {isSaving ? "Saving..." : <><FaCircleCheck /> Save Settings</>}
                        </button>
                    </form>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-sm font-black text-white uppercase tracking-widest">Live Preview</h2>
                        </div>
                        <div className="bg-slate-950/50 border border-slate-800 rounded-[3rem] p-1 scale-[0.85] origin-top border-dashed">
                            <CertificateTemplate cert={{
                                userName: "Student Name",
                                courseTitle: "Professional Training Course",
                                certificateNumber: "ST-DEBUG-001",
                                issueDate: new Date().toISOString()
                            }} />
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCertificates;
