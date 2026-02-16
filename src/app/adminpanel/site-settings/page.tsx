"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPhoneVolume, FaWhatsapp, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok, FaLocationDot, FaCircleCheck } from "react-icons/fa6";

const SiteSettingsAdmin = () => {
    const [settings, setSettings] = useState({
        phone: '',
        whatsapp: '',
        viber: '',
        email: '',
        address: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        youtube: '',
        tiktok: '',
    });
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/site-settings");
            setSettings(res.data);
        } catch (err) {
            console.error("Failed to fetch settings:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await axios.post("/api/site-settings", settings);
            alert("Settings saved successfully!");
        } catch (err) {
            console.error("Failed to save settings:", err);
            alert("Failed to save settings.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-sm uppercase tracking-widest text-slate-500">Loading Site Settings...</p>
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="space-y-1 border-b border-slate-800 pb-8">
                <h1 className="text-3xl font-black text-white tracking-tight">Site Settings</h1>
                <p className="text-slate-500 text-sm font-medium">Manage site-wide contact information and social media links.</p>
            </div>

            <form onSubmit={handleSave} className="grid lg:grid-cols-2 gap-12 animate-in fade-in duration-500">
                <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white">Contact Information</h2>
                        <p className="text-slate-400 text-sm">Primary contact channels used in footer and support sections.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FaPhoneVolume /> Phone Numbers
                            </label>
                            <input
                                type="text"
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                value={settings.phone}
                                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                placeholder="9851228383 / 01-5839127"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FaWhatsapp /> WhatsApp Number
                            </label>
                            <input
                                type="text"
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                value={settings.whatsapp}
                                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                                placeholder="9851228383"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                Viber Number
                            </label>
                            <input
                                type="text"
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                value={settings.viber}
                                onChange={(e) => setSettings({ ...settings, viber: e.target.value })}
                                placeholder="9851228383"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FaEnvelope /> Support Email
                            </label>
                            <input
                                type="email"
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                value={settings.email}
                                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                placeholder="support@sangalotech.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <FaLocationDot /> Physical Address
                            </label>
                            <input
                                type="text"
                                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                value={settings.address}
                                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                placeholder="Lokenthali, Bhaktapur, Nepal"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-8 h-full flex flex-col">
                    <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 space-y-8 flex-1">
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white">Social Media Links</h2>
                            <p className="text-slate-400 text-sm">Full URLs to your social profiles.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <FaFacebookF /> Facebook
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                    value={settings.facebook}
                                    onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <FaInstagram /> Instagram
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                    value={settings.instagram}
                                    onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <FaLinkedinIn /> LinkedIn
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                    value={settings.linkedin}
                                    onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                                    placeholder="https://linkedin.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <FaYoutube /> YouTube
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                    value={settings.youtube}
                                    onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                                    placeholder="https://youtube.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <FaTiktok /> TikTok
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500"
                                    value={settings.tiktok}
                                    onChange={(e) => setSettings({ ...settings, tiktok: e.target.value })}
                                    placeholder="https://tiktok.com/..."
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {isSaving ? "Saving..." : <><FaCircleCheck /> Update Site Settings</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SiteSettingsAdmin;
