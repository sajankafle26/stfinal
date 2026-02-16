'use client';
import React from 'react';
import { FaGraduationCap, FaBriefcase, FaWhatsapp, FaPhoneVolume, FaCircle } from 'react-icons/fa6';

const Support = () => {
  const [siteSettings, setSiteSettings] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchSettings = async () => {
      const { apiService } = await import("@/services/apiService");
      const data = await apiService.getSiteSettings();
      if (data) setSiteSettings(data);
    };
    fetchSettings();
  }, []);

  return (
    <section className="py-20 bg-white px-4 border-y border-gray-100">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* Left Section */}
        <div className="space-y-6">
          <div className="inline-block bg-blue-50 text-[#00548B] px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100">
            24/7 Dedicated Support
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Need Help With Your <span className="text-[#00548B]">Learning Journey?</span>
          </h2>
          <p className="text-lg text-gray-600">
            Whether it's a technical bug, academic query, or administrative help, our team is always ready to support you. We believe in learning without barriers.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">

            {/* Mentorship Card */}
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#00548B] text-xl shadow-sm group-hover:scale-110 transition">
                <FaGraduationCap />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Mentorship</h4>
                <p className="text-xs text-gray-500">One-on-one sessions</p>
              </div>
            </div>

            {/* Career Goal Card */}
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#00548B] text-xl shadow-sm group-hover:scale-110 transition">
                <FaBriefcase />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Career Goal</h4>
                <p className="text-xs text-gray-500">Job placement help</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Section */}
        <div className="grid gap-6">

          {/* WhatsApp Support Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-50 hover:shadow-2xl transition duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl">
                <FaWhatsapp />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">WhatsApp Support</h3>
              <p className="text-gray-500">Fastest response for quick technical or enrollment questions.</p>
              <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                <FaCircle className="text-[8px] animate-pulse" /> Online Now
              </div>
              <a
                href={`https://wa.me/${siteSettings?.whatsapp || '9851228383'}`}
                target="_blank"
                className="block w-full text-center bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition shadow-lg no-underline"
              >
                Start WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Phone Consultation Card */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-50 hover:shadow-2xl transition duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 bg-blue-100 text-[#00548B] rounded-2xl flex items-center justify-center text-3xl">
                <FaPhoneVolume />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Phone Consultation</h3>
              <p className="text-gray-500">Immediate assistance during office hours (Sun-Fri, 10am - 5pm).</p>
              <div className="text-gray-400 font-medium">{siteSettings?.phone || '9851228383 / 01-5839127'}</div>
              <a
                href={`tel:${siteSettings?.phone?.split('/')[0]?.trim() || '9851228383'}`}
                className="block w-full text-center bg-[#00548B] text-white py-4 rounded-xl font-bold hover:bg-[#003f66] transition shadow-lg no-underline"
              >
                Call Support Team
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Support;
