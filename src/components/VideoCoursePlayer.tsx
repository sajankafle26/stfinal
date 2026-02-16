"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlay, FaCheckCircle, FaLock, FaTrophy, FaArrowLeft, FaQuestionCircle, FaPlus, FaRegCommentDots } from "react-icons/fa";
import CertificateTemplate from "./CertificateTemplate";

const VideoCoursePlayer = ({ course, onBack }: { course: any, onBack: () => void }) => {
    const [currentLesson, setCurrentLesson] = useState(course.lessons?.[0] || null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFullyCompleted, setIsFullyCompleted] = useState(false);
    const [certificate, setCertificate] = useState<any>(null);
    const [showCert, setShowCert] = useState(false);
    const [activeTab, setActiveTab] = useState<"lessons" | "support">("lessons");
    const [tickets, setTickets] = useState<any[]>([]);
    const [showNewTicketForm, setShowNewTicketForm] = useState(false);
    const [newTicketSubject, setNewTicketSubject] = useState("");
    const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

    useEffect(() => {
        fetchProgress();
    }, [course._id]);

    const fetchProgress = async () => {
        try {
            const res = await axios.get(`/api/courses/progress?courseId=${course._id}`);
            setCompletedLessons(res.data.lessonIds || []);
            checkCompletion(res.data.lessonIds || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchTickets = async () => {
        try {
            const res = await axios.get(`/api/tickets?courseId=${course._id}`);
            setTickets(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (activeTab === "support") {
            fetchTickets();
        }
    }, [activeTab, course._id]);

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTicketSubject.trim()) return;

        setIsSubmittingTicket(true);
        try {
            await axios.post("/api/tickets", {
                subject: newTicketSubject,
                courseId: course._id,
                priority: "Medium"
            });
            setNewTicketSubject("");
            setShowNewTicketForm(false);
            fetchTickets();
        } catch (err) {
            console.error(err);
            alert("Failed to create ticket.");
        } finally {
            setIsSubmittingTicket(false);
        }
    };

    const checkCompletion = (completed: string[]) => {
        if (course.lessons && completed.length >= course.lessons.length) {
            setIsFullyCompleted(true);
            fetchCertificate();
        }
    };

    const fetchCertificate = async () => {
        try {
            const res = await axios.post("/api/certificates/generate", { courseId: course._id });
            setCertificate(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const markAsCompleted = async (lessonId: string) => {
        try {
            const res = await axios.post("/api/courses/progress", {
                courseId: course._id,
                lessonId
            });
            const newCompleted = [...completedLessons];
            if (!newCompleted.includes(lessonId)) {
                newCompleted.push(lessonId);
                setCompletedLessons(newCompleted);
            }
            if (res.data.isFullyCompleted) {
                setIsFullyCompleted(true);
                fetchCertificate();
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="min-h-screen bg-[#0a1118] text-white flex items-center justify-center">Loading Player...</div>;

    if (showCert && certificate) {
        return (
            <div className="min-h-screen bg-slate-900 p-10 pt-32">
                <button onClick={() => setShowCert(false)} className="mb-8 text-indigo-400 font-bold flex items-center gap-2">
                    <FaArrowLeft /> Back to Course
                </button>
                <CertificateTemplate cert={certificate} />
                <div className="mt-12 text-center">
                    <button
                        onClick={() => window.print()}
                        className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition shadow-2xl"
                    >
                        Print / Save as PDF
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a1118] pt-24">
            <div className="grid lg:grid-cols-12 h-[calc(100vh-6rem)]">
                {/* Main Player Area */}
                <div className="lg:col-span-8 flex flex-col bg-black relative">
                    <div className="flex-1 flex items-center justify-center">
                        {currentLesson ? (
                            <iframe
                                src={currentLesson.videoUrl}
                                className="w-full h-full aspect-video"
                                allowFullScreen
                            />
                        ) : (
                            <div className="text-slate-500 font-bold">Select a lesson to start</div>
                        )}
                    </div>

                    <div className="bg-slate-900/80 backdrop-blur-md p-8 flex justify-between items-center border-t border-slate-800">
                        <div>
                            <h2 className="text-2xl font-black text-white">{currentLesson?.title || "Welcome"}</h2>
                            <p className="text-slate-400 text-sm">{currentLesson?.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {currentLesson && !completedLessons.includes(currentLesson._id) && (
                                <button
                                    onClick={() => markAsCompleted(currentLesson._id)}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                                >
                                    Mark as Completed
                                </button>
                            )}
                            {isFullyCompleted && certificate && (
                                <button
                                    onClick={() => setShowCert(true)}
                                    className="bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                                >
                                    <FaTrophy /> Get Certificate
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex border-b border-slate-800">
                    <button
                        onClick={() => setActiveTab("lessons")}
                        className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all ${activeTab === "lessons" ? "text-indigo-400 border-b-2 border-indigo-400 bg-white/5" : "text-slate-500 hover:text-slate-300"}`}
                    >
                        Lessons
                    </button>
                    <button
                        onClick={() => setActiveTab("support")}
                        className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all ${activeTab === "support" ? "text-indigo-400 border-b-2 border-indigo-400 bg-white/5" : "text-slate-500 hover:text-slate-300"}`}
                    >
                        Support (Tickets)
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {activeTab === "lessons" ? (
                        <div className="p-4 space-y-2">
                            {course.lessons?.map((lesson: any, index: number) => {
                                const isCompleted = completedLessons.includes(lesson._id);
                                const isActive = currentLesson?._id === lesson._id;

                                return (
                                    <button
                                        key={lesson._id}
                                        onClick={() => setCurrentLesson(lesson)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${isActive ? "bg-indigo-600/20 border border-indigo-600/30" : "hover:bg-white/5 border border-transparent"
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isCompleted ? "bg-green-500/10 text-green-400" : "bg-slate-800 text-slate-500"
                                            }`}>
                                            {isCompleted ? <FaCheckCircle /> : <span className="text-xs font-black">{index + 1}</span>}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`font-bold text-sm ${isActive ? "text-white" : "text-slate-400"}`}>{lesson.title}</p>
                                            <p className="text-[10px] text-slate-600 font-bold uppercase">{lesson.duration}</p>
                                        </div>
                                        {isActive && <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />}
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                                <p className="text-xs text-slate-400 font-bold">Have an issue or question?</p>
                                <button
                                    onClick={() => setShowNewTicketForm(true)}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                                >
                                    <FaPlus /> New Ticket
                                </button>
                            </div>

                            {showNewTicketForm && (
                                <form onSubmit={handleCreateTicket} className="bg-white/5 p-6 rounded-3xl border border-indigo-500/20 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Subject / Question</label>
                                        <input
                                            autoFocus
                                            required
                                            type="text"
                                            placeholder="e.g., Error on line 45, or clarify React use effect..."
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-indigo-500"
                                            value={newTicketSubject}
                                            onChange={(e) => setNewTicketSubject(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={isSubmittingTicket}
                                            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
                                        >
                                            {isSubmittingTicket ? "Creating..." : "Submit Ticket"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowNewTicketForm(false)}
                                            className="px-4 py-3 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="space-y-3">
                                {tickets.length === 0 ? (
                                    <div className="py-10 text-center">
                                        <FaQuestionCircle className="text-slate-800 text-4xl mx-auto mb-4" />
                                        <p className="text-slate-500 text-xs font-bold">No support tickets for this course yet.</p>
                                    </div>
                                ) : (
                                    tickets.map((ticket) => (
                                        <div
                                            key={ticket._id}
                                            className="p-4 bg-slate-800/30 border border-slate-800 rounded-2xl flex items-start gap-4 hover:border-slate-700 transition-colors cursor-pointer group"
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${ticket.status === 'Resolved' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'
                                                }`}>
                                                <FaRegCommentDots />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-white text-sm font-bold leading-tight mb-1 group-hover:text-indigo-400 transition-colors">{ticket.subject}</p>
                                                <div className="flex justify-between items-center text-[9px] uppercase tracking-widest font-black">
                                                    <span className={ticket.status === 'Resolved' ? 'text-green-500' : 'text-orange-500'}>{ticket.status}</span>
                                                    <span className="text-slate-600">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCoursePlayer;
