"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaPaperPlane, FaImage, FaCode, FaSpinner, FaUser, FaUserShield } from "react-icons/fa";

interface Message {
    _id: string;
    senderId: { _id: string; name: string; avatar?: string; role: string } | string;
    content: string;
    codeSnippet?: string;
    attachments?: string[];
    createdAt: string;
}

interface ChatInterfaceProps {
    ticketId: string;
    currentUserId: string; // To enable "My Message" styling
}

export default function ChatInterface({ ticketId, currentUserId }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    // Inputs
    const [content, setContent] = useState("");
    const [codeSnippet, setCodeSnippet] = useState(""); // Optional
    const [showCodeInput, setShowCodeInput] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, [ticketId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`/api/tickets/${ticketId}/messages`);
            setMessages(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() && !codeSnippet.trim()) return;

        setSending(true);
        try {
            await axios.post(`/api/tickets/${ticketId}/messages`, {
                content,
                codeSnippet: codeSnippet || undefined,
            });
            setContent("");
            setCodeSnippet("");
            setShowCodeInput(false);
            fetchMessages(); // Refresh immediately
        } catch (err) {
            console.error(err);
            alert("Failed to send message");
        } finally {
            setSending(false);
        }
    };

    if (loading) return <div className="p-4 text-center text-slate-500">Loading conversation...</div>;

    return (
        <div className="flex flex-col h-[600px] border border-slate-200 rounded-2xl bg-slate-50 overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, i) => {
                    // Normalize sender info
                    const sender = typeof msg.senderId === 'object' ? msg.senderId : { _id: msg.senderId, name: 'Unknown', role: 'student' };
                    const isMe = sender._id === currentUserId;
                    const isAdmin = sender.role === "admin";

                    return (
                        <div key={msg._id} className={`flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isAdmin ? "bg-indigo-600 text-white" : "bg-slate-300 text-slate-600"}`}>
                                {sender.avatar ? <img src={sender.avatar} className="w-full h-full rounded-full object-cover" /> : (
                                    isAdmin ? <FaUserShield className="text-xs" /> : <FaUser className="text-xs" />
                                )}
                            </div>

                            {/* Bubble */}
                            <div className={`max-w-[80%] rounded-2xl p-4 ${isMe ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"}`}>
                                <div className="flex justify-between items-center gap-4 mb-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isMe ? "text-indigo-200" : "text-slate-400"}`}>
                                        {sender.name} {isAdmin && !isMe && "(Admin)"}
                                    </span>
                                    <span className={`text-[9px] ${isMe ? "text-indigo-300" : "text-slate-400"}`}>
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>

                                <p className="whitespace-pre-wrap text-sm">{msg.content}</p>

                                {msg.codeSnippet && (
                                    <div className="mt-3 bg-black/90 p-3 rounded-lg overflow-x-auto">
                                        <pre className="text-xs text-green-400 font-mono">
                                            <code>{msg.codeSnippet}</code>
                                        </pre>
                                    </div>
                                )}

                                {msg.attachments && msg.attachments.length > 0 && (
                                    <div className="mt-2 text-xs opacity-70 italic">
                                        [Attachment]
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-slate-200 p-4">
                <form onSubmit={handleSend} className="space-y-3">
                    {showCodeInput && (
                        <div className="relative">
                            <textarea
                                value={codeSnippet}
                                onChange={(e) => setCodeSnippet(e.target.value)}
                                placeholder="Paste your code here..."
                                className="w-full h-32 bg-slate-900 text-green-400 font-mono text-sm p-3 rounded-xl focus:outline-none resize-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCodeInput(false)}
                                className="absolute top-2 right-2 text-slate-500 hover:text-white"
                            >
                                &times;
                            </button>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setShowCodeInput(!showCodeInput)}
                            className={`p-3 rounded-xl transition-colors ${showCodeInput ? "bg-slate-900 text-green-400" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                            title="Add Code Snippet"
                        >
                            <FaCode />
                        </button>
                        {/* Placeholder for Image Upload - can be expanded later */}
                        {/* <button type="button" className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200"><FaImage /></button> */}

                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
                        />

                        <button
                            type="submit"
                            disabled={sending || (!content.trim() && !codeSnippet.trim())}
                            className="bg-indigo-600 text-white p-3 rounded-xl px-6 font-bold hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                            {sending ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
