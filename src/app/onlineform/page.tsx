"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaPhone, FaLocationDot, FaSchool, FaBriefcase, FaCalendar, FaClock, FaCreditCard, FaMoneyBillWave, FaArrowRight, FaCircleCheck, FaSpinner } from "react-icons/fa6";
import axios from "axios";
import { COURSES } from "@/constants";

const OnlineFormContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const courseFromUrl = searchParams.get("course");
    const batchIdFromUrl = searchParams.get("batch");

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        parentName: "",
        parentPhone: "",
        gender: "Male",
        dob: "",
        occupation: "Student",
        education: "",
        courseTitle: courseFromUrl || "",
        batchId: batchIdFromUrl || "",
        shift: "Morning (7-9 AM)",
        paymentMethod: "cash",
    });

    const steps = [
        { id: 1, title: "Personal Details", icon: <FaUser /> },
        { id: 2, title: "Academic Info", icon: <FaSchool /> },
        { id: 3, title: "Course Selection", icon: <FaCalendar /> },
        { id: 4, title: "Payment", icon: <FaCreditCard /> },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const course = COURSES.find(c => c.title === formData.courseTitle);
            const amount = course ? course.price : 0;

            const res = await axios.post("/api/enrollments", {
                ...formData,
                amount
            });

            if (formData.paymentMethod !== "cash") {
                // Handle eSewa/Khalti redirection logic here if needed, 
                // but for now, we follow the "Pending" flow for all.
                // In a real scenario, we might redirect to /api/payment/initiate
            }

            setSubmitted(true);
        } catch (err) {
            console.error(err);
            alert("Failed to submit enrollment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <main className="flex-1 flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl shadow-blue-900/5 border border-slate-100">
                        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">
                            <FaCircleCheck />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-4">Registration Successful!</h2>
                        <p className="text-slate-500 font-medium leading-relaxed mb-8">
                            Thank you for enrolling in <b>{formData.courseTitle}</b>. Our team will contact you within 24 hours to confirm your shift and payment.
                        </p>
                        <button
                            onClick={() => router.push("/")}
                            className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-[#00548B] transition-all"
                        >
                            Return Home
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            <main className="flex-1 py-20 px-6">
                <div className="max-w-[1000px] mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                            Start Your <span className="text-[#00548B]">Future</span> Today.
                        </h1>
                        <p className="text-slate-500 font-medium text-lg">Complete the form below to secure your internship-guaranteed seat.</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex justify-between mb-12 relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
                        {steps.map((s) => (
                            <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 ${step >= s.id ? 'bg-[#00548B] text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-50' : 'bg-white text-slate-400 border border-slate-200'}`}>
                                    {s.icon}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-[#00548B]' : 'text-slate-400'}`}>
                                    {s.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-10 md:p-16">

                            {/* Step 1: Personal Info */}
                            {step === 1 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <div className="relative">
                                                <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 text-slate-900 font-bold focus:border-[#00548B] transition-all outline-none" placeholder="Enter your full name" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 text-slate-900 font-bold focus:border-[#00548B] transition-all outline-none" placeholder="name@example.com" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                            <div className="relative">
                                                <FaPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 text-slate-900 font-bold focus:border-[#00548B] transition-all outline-none" placeholder="+977 98XXXXXXXX" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Address</label>
                                            <div className="relative">
                                                <FaLocationDot className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 text-slate-900 font-bold focus:border-[#00548B] transition-all outline-none" placeholder="Street, City" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-8 pt-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                                            <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 text-slate-900 font-bold focus:border-[#00548B] outline-none">
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date of Birth</label>
                                            <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 text-slate-900 font-bold focus:border-[#00548B]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Occupation</label>
                                            <select name="occupation" value={formData.occupation} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 text-slate-900 font-bold focus:border-[#00548B] outline-none">
                                                <option>Student</option>
                                                <option>Professional</option>
                                                <option>Freelancer</option>
                                                <option>Job Seeker</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Academic Info */}
                            {step === 2 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Education Qualification</label>
                                        <textarea required name="education" value={formData.education} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 px-6 text-slate-900 font-bold focus:border-[#00548B] min-h-[120px]" placeholder="e.g. Bachelor in CSIT, 4th Year - Tribhuvan University" />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Guardian Name</label>
                                            <input type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 text-slate-900 font-bold focus:border-[#00548B]" placeholder="Father/Mother/Guardian" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Guardian Phone</label>
                                            <input type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 text-slate-900 font-bold focus:border-[#00548B]" placeholder="+977 98XXXXXXXX" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Course Selection */}
                            {step === 3 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Course</label>
                                            <select name="courseTitle" value={formData.courseTitle} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 text-slate-900 font-bold focus:border-[#00548B] outline-none">
                                                {COURSES.map(c => <option key={c.id}>{c.title}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preferred Shift</label>
                                            <select name="shift" value={formData.shift.startsWith("Other") ? "Other" : formData.shift} onChange={(e) => {
                                                if (e.target.value === "Other") {
                                                    setFormData(v => ({ ...v, shift: "Other: " }));
                                                } else {
                                                    setFormData(v => ({ ...v, shift: e.target.value }));
                                                }
                                            }} className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-6 text-slate-900 font-bold focus:border-[#00548B] outline-none">
                                                <option>Morning (7-9 AM)</option>
                                                <option>Day (11-1 PM)</option>
                                                <option>Afternoon (4-6 PM)</option>
                                                <option value="Other">Other (Custom Time)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {formData.shift.startsWith("Other") && (
                                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <label className="text-[10px] font-black text-[#00548B] uppercase tracking-widest ml-1">Specify Your Preferred Time</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="e.g. 8-10 AM or Evening"
                                                value={formData.shift.replace("Other: ", "")}
                                                onChange={(e) => setFormData(v => ({ ...v, shift: `Other: ${e.target.value}` }))}
                                                className="w-full bg-blue-50/30 border border-blue-100 rounded-2xl py-5 px-6 text-slate-900 font-bold focus:border-[#00548B] outline-none"
                                            />
                                        </div>
                                    )}
                                    <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#00548B] shrink-0">
                                            <FaClock />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900 text-sm">Flexible Scheduling</h4>
                                            <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">Don't worry if the shift isn't perfect. We will try our best to accommodate your preferred time during the final orientation.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Payment */}
                            {step === 4 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            { id: 'cash', name: 'Pay by Cash', icon: <FaMoneyBillWave />, color: 'bg-green-600' },
                                            { id: 'esewa', name: 'eSewa', icon: <span className="font-black italic text-xs">eSewa</span>, color: 'bg-[#60bb46]' },
                                            { id: 'khalti', name: 'Khalti', icon: <span className="font-black italic text-xs">Khalti</span>, color: 'bg-[#5c2d91]' },
                                        ].map((p) => (
                                            <button
                                                key={p.id}
                                                type="button"
                                                onClick={() => setFormData(v => ({ ...v, paymentMethod: p.id as any }))}
                                                className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 ${formData.paymentMethod === p.id ? 'border-[#00548B] bg-blue-50/50' : 'border-slate-100 hover:border-slate-200 bg-slate-50/30'}`}
                                            >
                                                <div className={`w-14 h-14 ${p.color} text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-black/10`}>
                                                    {p.icon}
                                                </div>
                                                <span className="font-black text-xs uppercase tracking-widest text-slate-900">{p.name}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Selected Course</span>
                                            <span className="font-black">{formData.courseTitle}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-2xl font-black">
                                            <span className="text-slate-400 text-sm">Total Fee</span>
                                            <span className="text-blue-400">Rs. {COURSES.find(c => c.title === formData.courseTitle)?.price?.toLocaleString()}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-medium italic border-t border-white/5 pt-6 text-center">
                                            {formData.paymentMethod === 'cash'
                                                ? "You can pay the fee manually at our center during orientation."
                                                : "Secure digital payment processed via local gateway."}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Controls */}
                            <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className={`px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    Go Back
                                </button>

                                {step < 4 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="w-full md:w-auto bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#00548B] transition-all flex items-center justify-center gap-4"
                                    >
                                        Next Step <FaArrowRight />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full md:w-auto bg-[#00548B] text-white px-16 py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-blue-500/20"
                                    >
                                        {loading ? <FaSpinner className="animate-spin" /> : "Submit Enrollment"}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

const OnlineFormPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <FaSpinner className="text-4xl text-[#00548B] animate-spin" />
                    <p className="text-slate-500 font-medium">Loading form...</p>
                </div>
            </div>
        }>
            <OnlineFormContent />
        </Suspense>
    );
};

export default OnlineFormPage;
