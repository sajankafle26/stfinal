"use client";
import React from "react";
import Link from "next/link";
import { apiService } from "@/services/apiService";

const PaymentFailurePage = () => {
    const [siteSettings, setSiteSettings] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchSettings = async () => {
            const data = await apiService.getSiteSettings();
            if (data) setSiteSettings(data);
        };
        fetchSettings();
    }, []);

    return (
        <div className="min-h-screen bg-[#0a1118] flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-slate-900/50 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl text-center">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                    <i className="fa-solid fa-xmark text-4xl text-red-500"></i>
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Payment Failed</h2>
                <p className="text-slate-400 mb-8 font-medium">Unfortunately, your transaction could not be completed. Please try again.</p>

                <div className="space-y-4">
                    <Link href="/#videos" className="block w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98]">
                        Back to Courses
                    </Link>
                    <a href={`https://wa.me/${siteSettings?.whatsapp || '9851228383'}`} target="_blank" className="block w-full bg-slate-800 text-white font-black py-4 rounded-xl transition-all hover:bg-slate-700 no-underline">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailurePage;
