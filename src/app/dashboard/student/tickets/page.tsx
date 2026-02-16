"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaPlus, FaTicket, FaClock, FaCircleCheck, FaCircleExclamation, FaHouse, FaArrowRightFromBracket, FaGraduationCap, FaCreditCard, FaGear } from "react-icons/fa6";
import { signOut } from "next-auth/react";

const StudentTickets = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/studentlogin");
        } else if (status === "authenticated") {
            fetchTickets();
        }
    }, [status]);

    const fetchTickets = async () => {
        try {
            const res = await axios.get("/api/tickets");
            setTickets(res.data);
        } catch (err) {
            console.error("Failed to fetch tickets:", err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Open": return "bg-green-500/10 text-green-400 border-green-500/20";
            case "In Progress": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "Resolved": return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
            case "Closed": return "bg-slate-500/10 text-slate-400 border-slate-500/20";
            default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
        }
    };

    const getPriorityStyle = (priority: string) => {
        switch (priority) {
            case "High": return "text-red-400";
            case "Medium": return "text-orange-400";
            case "Low": return "text-blue-400";
            default: return "text-slate-400";
        }
    };

    if (status === "loading" || loading) return (
        <div className="min-h-screen bg-[#0a1118] text-white flex items-center justify-center font-bold text-sm">
            Loading Support tickets...
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
                    <Link href="/dashboard/student/tickets" className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 transition-all font-bold text-sm">
                        <FaTicket /> Support Tickets
                    </Link>
                    <Link href="/dashboard/student/certificates" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all font-bold text-sm">
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
                    <div className="max-w-5xl mx-auto space-y-12">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-1">
                                <h1 className="text-3xl font-black text-white tracking-tight">Support Center</h1>
                                <p className="text-slate-500 text-sm font-medium">Need help? Raise a ticket and our team will get back to you.</p>
                            </div>

                            <Link
                                href="/dashboard/student/tickets/new"
                                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center gap-2 w-fit"
                            >
                                <FaPlus className="text-xs" /> New Ticket
                            </Link>
                        </div>

                        {tickets.length === 0 ? (
                            <div className="bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-16 text-center space-y-6">
                                <div className="w-20 h-20 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center mx-auto">
                                    <FaTicket className="text-3xl text-indigo-500" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-white">No active tickets</h2>
                                    <p className="text-slate-400 text-sm max-w-sm mx-auto">You haven't created any support tickets yet. Click the button above to ask a question.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {tickets.map((ticket: any) => (
                                    <Link
                                        key={ticket._id}
                                        href={`/dashboard/student/tickets/${ticket._id}`}
                                        className="bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] p-8 hover:border-indigo-500/30 transition-all group flex items-center justify-between no-underline"
                                    >
                                        <div className="flex items-center gap-8">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl bg-white/5 ${getStatusStyle(ticket.status).split(' ')[1]}`}>
                                                <FaTicket />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-white font-bold group-hover:text-indigo-400 transition-colors text-base">{ticket.subject}</h3>
                                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                                                    <span className={getPriorityStyle(ticket.priority)}>
                                                        {ticket.priority} Priority
                                                    </span>
                                                    <span className="text-slate-600 flex items-center gap-1.5 font-bold">
                                                        <FaClock className="text-indigo-500" /> {new Date(ticket.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(ticket.status)}`}>
                                                {ticket.status}
                                            </span>
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg shadow-indigo-600/0 group-hover:shadow-indigo-600/20">
                                                <FaPlus className="rotate-45" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentTickets;
