"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGraduationCap, FaTicket, FaHouse, FaArrowRightFromBracket, FaCreditCard, FaGear, FaLock, FaCircleCheck, FaSpinner, FaCircleXmark } from "react-icons/fa6";
import { signOut } from "next-auth/react";

const StudentSettings = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/studentlogin");
        }
    }, [status]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: "error", text: "New passwords do not match" });
            return;
        }

        if (formData.newPassword.length < 6) {
            setMessage({ type: "error", text: "Password must be at least 6 characters" });
            return;
        }

        setLoading(true);
        try {
            await axios.post("/api/user/change-password", {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });
            setMessage({ type: "success", text: "Password updated successfully!" });
            setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err: any) {
            setMessage({ type: "error", text: err.response?.data?.message || "Failed to update password" });
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") return (
        <div className="min-h-screen bg-[#0a1118] text-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold text-sm uppercase tracking-widest text-slate-500">Loading settings...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0a1118] flex flex-col font-sans">
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
                    <Link href="/dashboard/student/certificates" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-bold text-sm">
                        <FaGraduationCap /> Certificates
                    </Link>
                    <Link href="/dashboard/student/payments" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-bold text-sm">
                        <FaCreditCard /> Payment History
                    </Link>
                    <Link href="/dashboard/student/settings" className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 transition-all font-bold text-sm">
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
                    <div className="max-w-2xl mx-auto space-y-12">
                        <div className="space-y-1 text-center md:text-left">
                            <h1 className="text-3xl font-black text-white tracking-tight">Account Settings</h1>
                            <p className="text-slate-500 text-sm font-medium">Manage your security and account preferences.</p>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-10 md:p-16 space-y-10">
                            <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 text-xl">
                                    <FaLock />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Security</h2>
                                    <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Change your password</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {message.text && (
                                    <div className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                                        {message.type === 'success' ? <FaCircleCheck /> : <FaCircleXmark />}
                                        {message.text}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Password</label>
                                    <input
                                        required
                                        type="password"
                                        className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-5 px-6 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                                        placeholder="Min. 6 characters"
                                        value={formData.currentPassword}
                                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">New Password</label>
                                        <input
                                            required
                                            type="password"
                                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-5 px-6 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                                            placeholder="Min. 6 characters"
                                            value={formData.newPassword}
                                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm New Password</label>
                                        <input
                                            required
                                            type="password"
                                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-5 px-6 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                                            placeholder="Repeat password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
                                >
                                    {loading ? <FaSpinner className="animate-spin" /> : "Update Password"}
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentSettings;
