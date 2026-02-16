"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGraduationCap, FaTicket, FaHouse, FaArrowRightFromBracket, FaCreditCard, FaCalendarDays, FaCircleCheck, FaClock, FaCircleXmark, FaFileInvoiceDollar, FaGear } from "react-icons/fa6";
import { signOut } from "next-auth/react";

const StudentPayments = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/studentlogin");
        } else if (status === "authenticated") {
            fetchPayments();
        }
    }, [status]);

    const fetchPayments = async () => {
        try {
            const res = await axios.get("/api/user/payments");
            setPayments(res.data);
        } catch (err) {
            console.error("Failed to fetch payments:", err);
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading" || loading) return (
        <div className="min-h-screen bg-[#0a1118] text-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold text-sm uppercase tracking-widest text-slate-500">Loading payment history...</p>
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
                    <Link href="/dashboard/student/payments" className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 transition-all font-bold text-sm">
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
                            <h1 className="text-3xl font-black text-white tracking-tight">Payment History</h1>
                            <p className="text-slate-500 text-sm font-medium">Track your course purchases and transaction status.</p>
                        </div>

                        {payments.length === 0 ? (
                            <div className="bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-16 text-center space-y-6">
                                <div className="w-20 h-20 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center mx-auto">
                                    <FaFileInvoiceDollar className="text-3xl text-indigo-500" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-white">No transactions found</h2>
                                    <p className="text-slate-400 text-sm max-w-sm mx-auto">You haven't made any purchases yet. Your payment receipts will appear here.</p>
                                </div>
                                <Link href="/courses" className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-500 transition-all">
                                    Browse Courses
                                </Link>
                            </div>
                        ) : (
                            <div className="bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] overflow-hidden">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-800/50 bg-white/5">
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Description</th>
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Date</th>
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Amount</th>
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50">
                                        {payments.map((payment: any) => (
                                            <tr key={payment._id} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="px-8 py-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 font-bold group-hover:scale-110 transition-transform">
                                                            <FaCreditCard />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-bold text-sm tracking-tight">{payment.courseTitle || "Course Purchase"}</p>
                                                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{payment.paymentMethod}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-8">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                                        <FaCalendarDays className="text-indigo-500/50" />
                                                        {new Date(payment.createdAt).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-8">
                                                    <p className="text-white font-black">Rs. {payment.amount?.toLocaleString()}</p>
                                                </td>
                                                <td className="px-8 py-8 text-right">
                                                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${payment.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                        payment.status === 'failed' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                        }`}>
                                                        {payment.status === 'completed' && <FaCircleCheck />}
                                                        {payment.status === 'failed' && <FaCircleXmark />}
                                                        {payment.status === 'pending' && <FaClock />}
                                                        {payment.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentPayments;
