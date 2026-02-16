"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaPaperPlane, FaCloudUploadAlt, FaTimes, FaUser, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const AdminTicketDetail = () => {
    const { data: session } = useSession();
    const { id } = useParams();
    const router = useRouter();
    const [ticket, setTicket] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [attachments, setAttachments] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (id) {
            fetchTicketAndMessages();
        }
    }, [id]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchTicketAndMessages = async () => {
        try {
            const [ticketRes, messagesRes] = await Promise.all([
                axios.get(`/api/tickets/${id}`),
                axios.get(`/api/tickets/${id}/messages`)
            ]);
            setTicket(ticketRes.data);
            setMessages(messagesRes.data);
        } catch (err) {
            console.error("Failed to load ticket data:", err);
            router.push("/adminpanel/tickets");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (newStatus: string) => {
        setUpdatingStatus(true);
        try {
            await axios.patch(`/api/tickets/${id}`, { status: newStatus });
            setTicket({ ...ticket, status: newStatus });
        } catch (err) {
            console.error("Failed to update status:", err);
        } finally {
            setUpdatingStatus(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploading(true);
        const data = new FormData();
        data.append("file", file);
        try {
            const res = await axios.post("/api/upload", data);
            setAttachments([...attachments, res.data.url]);
        } catch (err) {
            console.error("Upload failed:", err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() && attachments.length === 0) return;

        setSending(true);
        try {
            // First send message
            const res = await axios.post(`/api/tickets/${id}/messages`, {
                content: newMessage,
                attachments: attachments
            });

            // If ticket was "Open", move to "In Progress"
            if (ticket.status === "Open") {
                await handleUpdateStatus("In Progress");
            }

            setMessages([...messages, {
                ...res.data,
                senderId: {
                    _id: (session?.user as any).id,
                    name: session?.user?.name,
                    role: (session?.user as any).role
                }
            }]);
            setNewMessage("");
            setAttachments([]);
        } catch (err) {
            console.error("Failed to send message:", err);
        } finally {
            setSending(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-black text-sm text-slate-400">Loading Support Feed...</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-8 pt-24 pb-12 flex flex-col">
            <div className="max-w-6xl mx-auto w-full flex-grow flex flex-col gap-8">
                {/* Top Navigation & Status */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4">
                        <Link
                            href="/adminpanel/tickets"
                            className="flex items-center gap-2 text-slate-500 hover:text-sangalo-900 transition-colors font-black text-[10px] uppercase tracking-widest no-underline"
                        >
                            <FaArrowLeft /> Back to List
                        </Link>
                        <div className="space-y-1">
                            <div className="text-[10px] font-black text-sangalo-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-sangalo-900 rounded-full" />
                                Support Case #{id?.toString().slice(-6)}
                            </div>
                            <h1 className="text-2xl font-black text-slate-900 leading-tight">{ticket?.subject}</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-200 flex items-center">
                            {["Open", "In Progress", "Resolved", "Closed"].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => handleUpdateStatus(s)}
                                    disabled={updatingStatus}
                                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${ticket.status === s
                                            ? "bg-sangalo-900 text-white shadow-lg"
                                            : "text-slate-500 hover:bg-slate-50"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 flex-grow">
                    {/* Main Chat Feed */}
                    <div className="lg:col-span-8 flex flex-col bg-white rounded-[3rem] border border-slate-200 shadow-premium overflow-hidden min-h-[600px]">
                        <div className="flex-grow overflow-y-auto p-10 space-y-10 no-scrollbar">
                            {messages.map((msg, idx) => {
                                const isMe = (msg.senderId?._id === (session?.user as any).id) || (msg.senderId === (session?.user as any).id);
                                const isAdmin = msg.senderId?.role === 'admin';

                                return (
                                    <div key={msg._id || idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] space-y-3 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                                            <div className="flex items-center gap-3 px-2">
                                                {!isMe && (
                                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-[10px] uppercase shadow-sm">
                                                        {msg.senderId?.name?.[0] || 'S'}
                                                    </div>
                                                )}
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    {isMe ? 'You (Admin)' : (msg.senderId?.name || 'Student')}
                                                </span>
                                            </div>

                                            <div className={`p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-sm border ${isMe
                                                    ? 'bg-sangalo-900 border-sangalo-800 text-white rounded-tr-none'
                                                    : 'bg-slate-50 border-slate-200 text-slate-700 rounded-tl-none'
                                                }`}>
                                                {msg.content}

                                                {msg.attachments && msg.attachments.length > 0 && (
                                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                                        {msg.attachments.map((url: string, i: number) => (
                                                            <a key={i} href={url} target="_blank" rel="noreferrer" className="block rounded-xl overflow-hidden border border-black/5 hover:border-sangalo-900/30 transition-all">
                                                                <img src={url} className="w-full h-auto object-cover max-h-48" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest px-2">
                                                {new Date(msg.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Admin Action Area */}
                        <div className="p-8 bg-slate-50 border-t border-slate-200">
                            <form onSubmit={handleSendMessage} className="space-y-4">
                                {attachments.length > 0 && (
                                    <div className="flex flex-wrap gap-3 pb-2">
                                        {attachments.map((url, i) => (
                                            <div key={i} className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-sangalo-900/30 group">
                                                <img src={url} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}
                                                    className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <label className="shrink-0 w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sangalo-900 hover:border-sangalo-900 transition-all cursor-pointer shadow-sm">
                                        <FaCloudUploadAlt className="text-xl" />
                                        <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} accept="image/*" />
                                    </label>

                                    <div className="flex-grow relative group">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Write your response to the student..."
                                            className="w-full bg-white border-2 border-slate-200 rounded-[2rem] px-8 py-4.5 text-slate-900 focus:outline-none focus:border-sangalo-900/50 transition-all text-sm font-medium shadow-sm pr-16"
                                        />
                                        <button
                                            type="submit"
                                            disabled={sending || (!newMessage.trim() && attachments.length === 0)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-sangalo-900 rounded-2xl flex items-center justify-center text-white hover:bg-sangalo-950 transition-all shadow-xl shadow-sangalo-900/20 active:scale-90 disabled:opacity-50 disabled:bg-slate-300"
                                        >
                                            <FaPaperPlane className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar: Student Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <section className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm space-y-6">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 pb-3 mb-2">
                                Student Intelligence
                            </div>

                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-24 h-24 rounded-[2rem] bg-sangalo-50 flex items-center justify-center text-3xl font-black text-sangalo-900 border-4 border-white shadow-xl relative overflow-hidden">
                                    {ticket.studentId?.name?.[0] || 'S'}
                                    <div className="absolute inset-x-0 bottom-0 bg-sangalo-900/10 h-1/3" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-black text-slate-900 leading-tight">{ticket.studentId?.name}</h3>
                                    <p className="text-xs font-bold text-slate-400">{ticket.studentId?.email}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Priority</div>
                                    <div className={`text-xs font-black uppercase tracking-widest ${ticket.priority === 'High' ? 'text-red-500' : 'text-blue-500'
                                        }`}>
                                        {ticket.priority}
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Responses</div>
                                    <div className="text-xs font-black text-slate-900">{messages.length}</div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-sangalo-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                            <div className="relative z-10 space-y-6">
                                <h4 className="text-lg font-black tracking-tight leading-tight">Resolution Action</h4>
                                <p className="text-white/70 text-[11px] font-bold leading-relaxed">
                                    Once fixed, mark as Resolved. Student will be notified and can close the ticket.
                                </p>
                                <button
                                    onClick={() => handleUpdateStatus("Resolved")}
                                    className="w-full bg-white text-sangalo-900 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-sangalo-50 transition-all flex items-center justify-center gap-3 active:scale-95"
                                >
                                    <FaCheckCircle className="text-sm" /> Mark as Resolved
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTicketDetail;
