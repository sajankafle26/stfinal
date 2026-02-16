import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCertificate, FaAward, FaStamp } from "react-icons/fa";

interface CertificateProps {
    cert: {
        userName: string;
        courseTitle: string;
        certificateNumber: string;
        issueDate: string;
    };
}

const CertificateTemplate: React.FC<CertificateProps> = ({ cert }) => {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get("/api/certificates/settings");
                setSettings(res.data);
            } catch (err) {
                console.error("Failed to fetch certificate settings:", err);
            }
        };
        fetchSettings();
    }, []);

    const s = settings || {
        directorName: "Program Director",
        instructorName: "Lead Instructor",
        organizationName: "Sangalo Tech",
        academicCouncil: "Academic Council"
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white p-1 md:p-12 relative overflow-hidden border-[16px] border-double border-slate-200 aspect-[1.414/1]">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-[12px] border-t-[12px] border-indigo-900/10" />
            <div className="absolute top-0 right-0 w-32 h-32 border-r-[12px] border-t-[12px] border-indigo-900/10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-l-[12px] border-b-[12px] border-indigo-900/10" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-[12px] border-b-[12px] border-indigo-900/10" />

            <div className="h-full border-4 border-slate-100 p-8 flex flex-col items-center justify-between text-center relative z-10">
                {/* Header */}
                <div className="space-y-4">
                    <div className="w-24 h-24 bg-indigo-900 text-white rounded-full flex items-center justify-center text-4xl mx-auto shadow-2xl mb-6">
                        <FaAward />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-black text-indigo-900 tracking-tighter uppercase">
                        Certificate
                        <span className="block text-2xl md:text-3xl font-light tracking-[0.3em] font-sans mt-2">of Completion</span>
                    </h1>
                </div>

                {/* Body */}
                <div className="space-y-8 w-full">
                    <p className="text-xl md:text-2xl font-medium text-slate-500 italic">This is to certify that</p>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 underline decoration-indigo-900/20 underline-offset-8">
                        {cert.userName}
                    </h2>
                    <p className="text-xl md:text-2xl font-medium text-slate-500">
                        has successfully completed the industrial training program in
                    </p>
                    <h3 className="text-3xl md:text-4xl font-black text-indigo-900 tracking-tight">
                        {cert.courseTitle}
                    </h3>
                </div>

                {/* Footer */}
                <div className="grid grid-cols-3 w-full items-end pt-12">
                    <div className="text-left space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Issued On</p>
                        <p className="text-lg font-bold text-slate-900">{new Date(cert.issueDate).toLocaleDateString()}</p>
                    </div>

                    <div className="flex justify-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-indigo-900/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                            <FaStamp className="text-6xl text-indigo-900/20 relative z-10 rotate-12" />
                            <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black uppercase text-indigo-900/40 tracking-tighter pointer-events-none">
                                Verified <br /> Official
                            </div>
                        </div>
                    </div>

                    <div className="text-right space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verify At</p>
                        <p className="text-sm font-black text-indigo-900 font-mono tracking-tighter">
                            {cert.certificateNumber}
                        </p>
                    </div>
                </div>

                {/* Signature Simulation */}
                <div className="w-full flex justify-between mt-12 px-12">
                    <div className="border-t-2 border-slate-200 pt-2 w-48">
                        <p className="text-xs font-bold text-slate-900">{s.directorName}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-black">{s.organizationName}</p>
                    </div>
                    <div className="border-t-2 border-slate-200 pt-2 w-48">
                        <p className="text-xs font-bold text-slate-900">{s.instructorName}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-black">{s.academicCouncil}</p>
                    </div>
                </div>
            </div>

            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[size:24px_24px]" />
        </div>
    );
};

export default CertificateTemplate;
