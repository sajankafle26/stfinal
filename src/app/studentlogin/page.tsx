"use client";
import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaGithub } from "react-icons/fa";

const LoginPage = (props: {
    params: Promise<any>;
    searchParams: Promise<any>;
}) => {
    const params = use(props.params);
    const searchParams = use(props.searchParams);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (res?.error) {
                setError(res.error === "CredentialsSignin" ? "Invalid email or password" : res.error);
                setLoading(false);
            } else {
                // Fetch the session to check the role
                const sessionRes = await fetch("/api/auth/session");
                const sessionData = await sessionRes.json();

                if (sessionData?.user?.role === "admin") {
                    window.location.href = "/adminpanel";
                } else {
                    window.location.href = "/";
                }
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Glow Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />

            <div className="max-w-5xl w-full grid md:grid-cols-2 rounded-[3.5rem] overflow-hidden shadow-2xl shadow-indigo-500/10 border border-slate-800/50 backdrop-blur-2xl bg-slate-900/40 relative z-10 transition-all duration-500 hover:shadow-indigo-500/20">

                {/* Left Side: Brand/Marketing */}
                <div className="hidden md:flex flex-col justify-center p-16 bg-gradient-to-br from-indigo-600 to-blue-700 relative overflow-hidden group">
                    {/* Animated geometric patterns */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:24px_24px] group-hover:scale-110 transition-transform duration-1000" />

                    <div className="relative z-10">
                        <Link href="/" className="inline-block mb-12">
                            <h1 className="text-3xl font-black text-white tracking-tighter">
                                SANGALO<span className="text-indigo-200">TECH</span>
                            </h1>
                        </Link>

                        <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-8">
                            Accelerate Your <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                                Tech Journey.
                            </span>
                        </h2>

                        <p className="text-indigo-100/80 text-lg font-medium mb-12 max-w-sm leading-relaxed">
                            Join Nepal's premier community of developers and designers building the future.
                        </p>

                        <div className="space-y-4">
                            {[
                                "Job-Ready Curriculum",
                                "Expert Mentorship",
                                "Live Project Portfolios"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-white/90">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                                        <FaArrowRight className="text-xs" />
                                    </div>
                                    <span className="font-bold text-sm tracking-wide">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="p-10 lg:p-16 flex flex-col justify-center bg-slate-900/50 border-l border-white/5">
                    <div className="mb-10">
                        <h3 className="text-3xl font-black text-white mb-3">Welcome Back</h3>
                        <p className="text-slate-400 font-medium">Log in to access your dashboard.</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl mb-8 text-sm font-bold flex items-center gap-3 animate-shake">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="block w-full bg-slate-800/50 border-2 border-slate-800 rounded-2xl pl-12 pr-5 py-4.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                    Password
                                </label>
                                <Link href="/forgot-password" title="Coming Soon" className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors">
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <FaLock className="text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full bg-slate-800/50 border-2 border-slate-800 rounded-2xl pl-12 pr-5 py-4.5 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-3 mt-4 text-sm uppercase tracking-widest"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Continue <FaArrowRight className="text-xs" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-10 border-t border-white/5 space-y-8 text-center">
                        <p className="text-slate-500 text-sm font-bold">
                            New here?{" "}
                            <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .py-4.5 { padding-top: 1.125rem; padding-bottom: 1.125rem; }
                .border-3 { border-width: 3px; }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
            `}</style>
        </div>
    );
};

export default LoginPage;
