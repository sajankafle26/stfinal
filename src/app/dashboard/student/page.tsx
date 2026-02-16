"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGraduationCap, FaCirclePlay, FaTicket, FaHouse, FaArrowRight, FaClock, FaCalendarCheck, FaChartSimple, FaArrowRightFromBracket, FaCreditCard, FaGear } from "react-icons/fa6";
import { signOut } from "next-auth/react";

const StudentDashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/studentlogin");
        } else if (status === "authenticated") {
            fetchEnrolledCourses();
        }
    }, [status, session]);

    const fetchEnrolledCourses = async () => {
        try {
            const res = await axios.get("/api/user/enrolled-courses");
            setEnrolledCourses(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading" || loading) return (
        <div className="min-h-screen bg-[#0a1118] text-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold text-sm uppercase tracking-widest text-slate-500">Syncing your progress...</p>
            </div>
        </div>
    );

    const stats = [
        { label: "Active Courses", value: enrolledCourses.length, icon: FaGraduationCap, color: "text-indigo-400", bg: "bg-indigo-400/10" },
        { label: "Completed", value: "0", icon: FaCirclePlay, color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { label: "Suppport Tickets", value: "0", icon: FaTicket, color: "text-orange-400", bg: "bg-orange-400/10" },
    ];

    return (
        <div className="min-h-screen bg-[#0a1118] flex flex-col">
            <div className="flex flex-1 pt-20">
                {/* Sidebar - Hidden on mobile */}
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
                    <Link href="/dashboard/student" className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 transition-all font-bold text-sm">
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
                        {/* Welcome Banner */}
                        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />
                            <div className="relative z-10 space-y-4 text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                    Welcome back, <br />
                                    <span className="text-indigo-200">{session?.user?.name?.split(' ')[0]}!</span>
                                </h1>
                                <p className="text-indigo-100/70 font-medium max-w-md">Ready to continue your learning journey? Explore your courses and track your progress.</p>
                                <div className="flex flex-wrap items-center gap-4 pt-4 justify-center md:justify-start">
                                    <Link href="/#videos" className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                                        Explore More
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden lg:block relative z-10">
                                <div className="w-48 h-48 bg-white/10 backdrop-blur-md rounded-[3rem] border border-white/20 flex items-center justify-center">
                                    <FaGraduationCap className="text-8xl text-indigo-200/50" />
                                </div>
                            </div>
                        </section>

                        {/* Quick Stats */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-slate-900/40 border border-slate-800/50 p-8 rounded-[2.5rem] flex items-center gap-6 group hover:border-indigo-500/30 transition-all">
                                    <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                                        <stat.icon />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                                        <p className="text-2xl font-black text-white">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* Courses Grid */}
                        <section className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                    <FaCirclePlay className="text-indigo-500" /> My Learning Path
                                </h2>
                            </div>

                            {enrolledCourses.length === 0 ? (
                                <div className="bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-16 text-center space-y-6">
                                    <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto">
                                        <FaGraduationCap className="text-3xl text-slate-700" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-white">No courses started yet</h3>
                                        <p className="text-slate-500 text-sm max-w-sm mx-auto">Enroll in one of our professional IT programs or video masterclasses to begin.</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {enrolledCourses.map((course: any) => (
                                        <div key={course._id} className="bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] overflow-hidden group hover:border-indigo-500/30 transition-all hover:-translate-y-1 flex flex-col md:flex-row h-full">
                                            <div className="md:w-56 h-48 md:h-auto relative overflow-hidden shrink-0">
                                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-black/20" />
                                            </div>
                                            <div className="p-8 flex flex-col justify-between flex-grow">
                                                <div>
                                                    <div className="flex justify-between items-start gap-4 mb-2">
                                                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight line-clamp-2">
                                                            {course.title}
                                                        </h3>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                                                        <span className="flex items-center gap-1.5"><FaClock className="text-indigo-500" /> {course.totalHours || 'Lifetime Access'}</span>
                                                        <span className="flex items-center gap-1.5 text-emerald-500"><FaChartSimple /> Active</span>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={`/courses/${course._id}`}
                                                    className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-indigo-600 text-white hover:text-white px-6 py-3 rounded-xl font-bold text-xs transition-all w-full"
                                                >
                                                    Continue Learning <FaArrowRight />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;
