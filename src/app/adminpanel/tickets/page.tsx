"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaTicketAlt, FaFilter, FaSearch, FaUser, FaClock } from "react-icons/fa";

const AdminTickets = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("Open");

    useEffect(() => {
        fetchTickets();
    }, [filter]);

    const fetchTickets = async () => {
        try {
            const res = await axios.get("/api/tickets");
            // Filtering on client side for now as the server GET supports role-based list but not explicit status filter in query maybe?
            // Actually let's assume server GET /api/tickets returns all for admin.
            let data = res.data;
            if (filter !== "All") {
                data = data.filter((t: any) => t.status === filter);
            }
            setTickets(data);
        } catch (err) {
            console.error("Failed to fetch tickets:", err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Open": return "bg-red-500/10 text-red-500 border-red-500/20";
            case "In Progress": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "Resolved": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "Closed": return "bg-slate-500/10 text-slate-500 border-slate-500/20";
            default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 pt-24">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Student Support Tickets</h1>
                        <p className="text-slate-500 text-sm font-medium">Manage and respond to student inquiries.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
                            {["Open", "In Progress", "Resolved", "All"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${filter === f ? "bg-sangalo-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-100"
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="bg-white rounded-3xl p-12 text-center text-slate-400 font-bold text-sm border border-slate-200 animate-pulse">
                        Loading Tickets...
                    </div>
                ) : tickets.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-slate-200">
                        <FaTicketAlt className="text-5xl text-slate-200 mx-auto mb-6" />
                        <h2 className="text-xl font-bold text-slate-900">No {filter !== 'All' ? filter.toLowerCase() : ''} tickets found</h2>
                        <p className="text-slate-500 text-sm mt-2">All student inquiries have been addressed!</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Student</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Subject</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Priority</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {tickets.map((t: any) => (
                                    <tr key={t._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-sangalo-50 flex items-center justify-center text-sangalo-900 font-black text-xs uppercase shadow-sm">
                                                    {t.studentId?.name?.[0] || <FaUser />}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 text-sm">{t.studentId?.name || "Student"}</div>
                                                    <div className="text-[10px] text-slate-400 font-bold">{t.studentId?.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="font-bold text-slate-900 text-sm">{t.subject}</div>
                                            <div className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                                <FaClock className="text-[9px]" /> {new Date(t.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${t.priority === 'High' ? 'text-red-600' : t.priority === 'Medium' ? 'text-orange-500' : 'text-blue-500'
                                                }`}>
                                                {t.priority}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black border uppercase tracking-widest ${getStatusStyle(t.status)}`}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <Link
                                                href={`/adminpanel/tickets/${t._id}`}
                                                className="bg-sangalo-900 text-white px-5 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 inline-block no-underline"
                                            >
                                                Respond
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTickets;
