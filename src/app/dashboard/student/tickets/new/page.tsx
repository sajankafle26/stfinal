"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaPaperPlane, FaCloudUploadAlt, FaTimes } from "react-icons/fa";

const NewTicket = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        subject: "",
        priority: "Medium",
        message: ""
    });
    const [attachments, setAttachments] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(false);

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
            alert("Failed to upload file. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const removeAttachment = (index: number) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.subject || !formData.message) return;

        setLoading(true);
        try {
            // Create Ticket
            const ticketRes = await axios.post("/api/tickets", {
                subject: formData.subject,
                priority: formData.priority
            });

            // Send Initial Message
            await axios.post(`/api/tickets/${ticketRes.data._id}/messages`, {
                content: formData.message,
                attachments: attachments
            });

            router.push("/dashboard/student/tickets");
        } catch (err) {
            console.error("Failed to create ticket:", err);
            alert("Failed to create ticket. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a1118] p-6 pt-32 pb-20">
            <div className="max-w-3xl mx-auto space-y-10">
                <Link
                    href="/dashboard/student/tickets"
                    className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors font-bold text-sm no-underline"
                >
                    <FaArrowLeft /> Back to Tickets
                </Link>

                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-white tracking-tight">Ask a Question</h1>
                    <p className="text-slate-500 text-sm font-medium">Explain your issue in detail and attach screenshots if needed.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10">
                    <div className="space-y-6">
                        {/* Subject */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-5">Subject</label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="What can we help you with?"
                                className="w-full bg-slate-800/50 border-2 border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium text-sm"
                                required
                            />
                        </div>

                        {/* Priority */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-5">Priority Level</label>
                            <div className="grid grid-cols-3 gap-4">
                                {["Low", "Medium", "High"].map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, priority: p })}
                                        className={`py-3 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all ${formData.priority === p
                                                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                                : "bg-slate-800/50 border-slate-800 text-slate-500 hover:border-slate-700"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-5">Your Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Describe your question or issue in detail..."
                                className="w-full bg-slate-800/50 border-2 border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium h-48 text-sm"
                                required
                            />
                        </div>

                        {/* File Upload */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-5">Attachments</label>
                            <div className="flex flex-wrap gap-4">
                                {attachments.map((url, i) => (
                                    <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-indigo-500/30 group">
                                        <img src={url} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeAttachment(i)}
                                            className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))}

                                <label className={`w-24 h-24 rounded-2xl bg-slate-800/50 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 hover:border-indigo-500 hover:text-indigo-400 transition-all cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    <FaCloudUploadAlt className="text-2xl mb-1" />
                                    <span className="text-[8px] font-black uppercase">Upload</span>
                                    <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} accept="image/*" />
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-3xl font-black text-sm transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? "Creating Ticket..." : <><FaPaperPlane className="text-xs" /> Submit Question</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewTicket;
