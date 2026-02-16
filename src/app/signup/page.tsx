"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.post("/api/auth/signup", formData);
            router.push("/studentlogin");
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a1118] flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-slate-900/50 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
                <h2 className="text-3xl font-black text-white mb-2">Create Account</h2>
                <p className="text-slate-400 mb-8 font-medium">Join our marketplace today.</p>

                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98]"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-slate-500 mt-8 text-sm">
                    Already have an account?{" "}
                    <Link href="/studentlogin" className="text-indigo-400 font-bold hover:text-indigo-300">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
