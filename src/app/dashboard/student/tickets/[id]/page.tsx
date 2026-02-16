"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaPaperPlane, FaCloudUploadAlt, FaTimes, FaUser, FaClock } from "react-icons/fa";

const TicketDetail = () => {
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
            router.push("/dashboard/student/tickets");
        } finally {
            setLoading(false);
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
            alert("Upload failed.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() && attachments.length === 0) return;

        setSending(true);
        try {
            const res = await axios.post(`/api/tickets/${id}/messages`, {
                content: newMessage,
                attachments: attachments
            });
            setMessages([...messages, { ...res.data, senderId: { _id: (session?.user as any).id, name: session?.user?.name, role: (session?.user as any).role } }]);
            setNewMessage("");
            setAttachments([]);
        } catch (err) {
            console.error("Failed to send message:", err);
        } finally {
            setSending(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-[#0a1118] text-white flex items-center justify-center font-bold text-sm">Loading Conversation...</div>;

    return (
        <div className="min-h-screen bg-[#0a1118] p-6 pt-32 pb-6 flex flex-col">
            <div className="max-w-5xl mx-auto w-full flex-grow flex flex-col space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
                    <div className="space-y-4">
                        <Link
                            href="/dashboard/student/tickets"
                            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-bold text-[10px] uppercase tracking-widest no-underline"
                        >
                            <FaArrowLeft /> All Tickets
                        </Link>
                        <div className="space-y-2">
                            <h1 className="text-xl md:text-2xl font-black text-white leading-tight">{ticket?.subject}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                                <span className={`px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20`}>
                                    Status: {ticket?.status}
                                </span>
                                <span className="text-slate-500 flex items-center gap-2">
                                    <FaClock /> Created {new Date(ticket?.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Container */}
                <div className="flex-grow bg-slate-900/40 border border-slate-800 rounded-[3rem] overflow-hidden flex flex-col min-h-[500px] shadow-2xl relative">
                    <div className="flex-grow overflow-y-auto p-10 space-y-8 no-scrollbar">
                        {messages.map((msg, idx) => {
                            const isMe = msg.senderId?._id === (session?.user as any).id;
                            const isAdmin = msg.senderId?.role === 'admin';

                            return (
                                <div key={msg._id || idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] space-y-3 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                                        <div className="flex items-center gap-3 mb-1">
                                            {!isMe && (
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] uppercase ${isAdmin ? 'bg-amber-500/10 text-amber-500' : 'bg-indigo-500/10 text-indigo-400'}`}>
                                                    {msg.senderId?.name?.[0] || 'U'}
                                                </div>
                                            )}
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                {isMe ? 'You' : (isAdmin ? 'Admin' : msg.senderId?.name)}
                                            </span>
                                        </div>

                                        <div className={`p-6 rounded-[2rem] text-sm font-medium leading-relaxed border shadow-lg ${isMe
                                                ? 'bg-indigo-600 border-indigo-500 text-white rounded-tr-none'
                                                : 'bg-slate-800/80 border-slate-700 text-slate-200 rounded-tl-none'
                                            }`}>
                                            {msg.content}

                                            {msg.attachments && msg.attachments.length > 0 && (
                                                <div className="mt-4 grid grid-cols-2 gap-3">
                                                    {msg.attachments.map((url: string, i: number) => (
                                                        <a key={i} href={url} target="_blank" rel="noreferrer" className="block rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all">
                                                            <img src={url} className="w-full h-auto object-cover max-h-40" />
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-8 bg-slate-900/60 border-t border-slate-800">
                        <form onSubmit={handleSendMessage} className="space-y-4">
                            {attachments.length > 0 && (
                                <div className="flex flex-wrap gap-2 pb-2">
                                    {attachments.map((url, i) => (
                                        <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-indigo-500/30 group">
                                            <img src={url} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}
                                                className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <FaTimes className="text-[10px]" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="relative flex items-center gap-4">
                                <label className={`shrink-0 w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500 transition-all cursor-pointer ${isUploading ? 'opacity-50' : ''}`}>
                                    <FaCloudUploadAlt className="text-xl" />
                                    <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} accept="image/*" />
                                </label>

                                <div className="flex-grow relative">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type your message here..."
                                        className="w-full bg-slate-800 border-2 border-slate-800 rounded-3xl px-8 py-4 px-6 text-white focus:outline-none focus:border-indigo-500/50 transition-all text-sm font-medium pr-20"
                                    />
                                    <button
                                        type="submit"
                                        disabled={sending || (!newMessage.trim() && attachments.length === 0)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-90 disabled:opacity-50 disabled:bg-slate-700"
                                    >
                                        <FaPaperPlane className="text-xs" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketDetail;
