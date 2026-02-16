"use client";
import React, { useState } from "react";
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaCheckCircle, FaSpinner } from "react-icons/fa";
import axios from "axios";

interface EnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    batch: any;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose, batch }) => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [course, setCourse] = useState<any>(null);

    React.useEffect(() => {
        if (isOpen && batch) {
            axios.get("/api/live-courses").then(res => {
                const found = res.data.find((c: any) => c.title === batch.courseTitle);
                setCourse(found);
            });
        }
    }, [isOpen, batch]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        try {
            await axios.post("/api/enrollments", {
                ...formData,
                courseTitle: batch.courseTitle,
                batchId: batch._id || batch.id,
                amount: course?.price || 0
            });
            setStatus("success");
            setTimeout(() => {
                onClose();
                setStatus("idle");
                setFormData({ name: "", email: "", phone: "" });
            }, 2000);
        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors z-10"
                >
                    <FaTimes className="text-xl" />
                </button>

                <div className="p-10">
                    <div className="mb-8">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Join Batch</h2>
                        <p className="text-slate-500 font-bold text-sm">
                            Enroll in <span className="text-[#00548B]">{batch.courseTitle}</span>
                        </p>
                        {course && (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm font-black text-slate-800">Rs. {course.price}</span>
                                {course.originalPrice && course.originalPrice > course.price && (
                                    <span className="text-[10px] text-slate-400 line-through font-bold">Rs. {course.originalPrice}</span>
                                )}
                            </div>
                        )}
                    </div>

                    {status === "success" ? (
                        <div className="text-center py-10">
                            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                            <h3 className="text-2xl font-black text-slate-900">Success!</h3>
                            <p className="text-slate-500 font-bold mt-2">We'll contact you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative">
                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 focus:outline-none focus:border-[#00548B] transition-colors font-bold"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        required
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 focus:outline-none focus:border-[#00548B] transition-colors font-bold"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                <div className="relative">
                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+977 98XXXXXXX"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 focus:outline-none focus:border-[#00548B] transition-colors font-bold"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="w-full bg-slate-900 hover:bg-[#00548B] text-white py-5 rounded-2xl font-black text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                {status === "submitting" ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Confirm Enrollment"
                                )}
                            </button>

                            {status === "error" && (
                                <p className="text-red-500 text-xs font-bold text-center">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnrollmentModal;
