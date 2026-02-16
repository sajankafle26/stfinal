"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaLocationDot,
  FaFileInvoice,
  FaCertificate,
  FaPhoneVolume,
  FaWhatsapp,
  FaEnvelope,
  FaBuildingColumns,
  FaTiktok,
  // NEW: icons for mobile bottom bar
  FaGraduationCap,
  FaScrewdriverWrench,
  FaBoxOpen,
} from "react-icons/fa6";

const Footer = () => {
  // ---------------- Background spotlight (throttled with rAF) ----------------
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = (((e.clientX - rect.left) / rect.width) * 100).toFixed(2) + "%";
    const my = (((e.clientY - rect.top) / rect.height) * 100).toFixed(2) + "%";

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", mx);
      el.style.setProperty("--my", my);
    });
  };

  // ---------------- Site Settings ----------------
  const [siteSettings, setSiteSettings] = React.useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await import("@/services/apiService").then(m => m.apiService.getSiteSettings());
      if (data) setSiteSettings(data);
    };
    fetchSettings();
  }, []);
  // ------------------------------------------------

  const FooterLogo = () => (
    <div className="flex items-center gap-3">
      <div className="bg-white w-10 h-10 flex items-center justify-center rounded-sm shrink-0">
        <span className="text-[#00548B] font-serif text-2xl font-bold italic tracking-tighter">
          ST
        </span>
      </div>
      <div className="flex flex-col justify-center border-b-[1px] border-white/50 pb-0.5">
        <h2 className="text-white text-lg font-bold tracking-widest leading-none font-serif">
          SANGALO TECH
        </h2>
        <p className="text-white text-[6px] font-bold tracking-[0.2em] leading-none mt-1">
          WE PUT THE FUTURE IN YOUR HANDS
        </p>
      </div>
    </div>
  );

  return (
    <footer
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative bg-[#00548B] text-white pt-20 pb-10 px-4 overflow-hidden"

    >
      {/* Depth veil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(0,0,0,0.06))",
        }}
      />

      {/* ===================== Main Footer Grid ===================== */}
      <div className="relative z-10 max-w-[1200px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        {/* Company Info */}
        <div className="space-y-6">
          <FooterLogo />
          <p className="text-blue-100/70 leading-relaxed pt-2">
            Leading the digital revolution in Nepal with high-quality IT training and
            software solutions since 2011.
          </p>
          <div className="space-y-3 text-sm">
            <p>
              <FaLocationDot className="mr-2 text-blue-200/90 inline" /> {siteSettings?.address || "Lokenthali, Bhaktapur, Nepal"}
            </p>
            <p>
              <FaFileInvoice className="mr-2 text-blue-200/90 inline" /> Pan No:
              602345817
            </p>
            <p>
              <FaCertificate className="mr-2 text-blue-200/90 inline" /> Reg No:
              11757/6371/04
            </p>
          </div>
          <div className="flex gap-4 pt-2">
            <a
              href={siteSettings?.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href={siteSettings?.youtube || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href={siteSettings?.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-400 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href={siteSettings?.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            {siteSettings?.tiktok && (
              <a
                href={siteSettings.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-slate-900 transition"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-l-4 border-blue-300/80 pl-3">
            Company
          </h3>
          <ul className="space-y-3 text-blue-100/75">
            <li>
              <a href="#about" className="hover:text-white transition">
                About Sangalo Tech
              </a>
            </li>
            <li>
              <a href="#internships" className="hover:text-white transition">
                Internship Hub
              </a>
            </li>
            <li>
              <a href="#videos" className="hover:text-white transition">
                Video Marketplace
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-white transition">
                Our Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Training Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-l-4 border-blue-300/80 pl-3">
            Popular Courses
          </h3>
          <ul className="space-y-3 text-blue-100/75">
            <li>
              <a href="/courses/full-stack-mern-development" className="hover:text-white transition">
                MERN Stack Mastery
              </a>
            </li>
            <li>
              <a href="/courses/digital-marketing-mastery" className="hover:text-white transition">
                Digital Marketing Pro
              </a>
            </li>
            <li>
              <a href="/courses/full-stack-laravel-development" className="hover:text-white transition">
                PHP Laravel Development
              </a>
            </li>
            <li>
              <a href="/courses/wordpress-theme-and-plugin-development" className="hover:text-white transition">
                WordPress Customization
              </a>
            </li>
            <li>
              <a href="/courses/ui-ux-design-training" className="hover:text-white transition">
                UI/UX Design Course
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-l-4 border-blue-300/80 pl-3">
            Get in Touch
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <FaPhoneVolume className="text-blue-200/90 mt-1" />
              <div>
                <p className="font-bold">Call Support</p>
                <p className="text-sm text-blue-100/75">{siteSettings?.phone || "9851228383 / 01-5839127"}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <FaWhatsapp className="text-green-300 mt-1" />
              <div>
                <p className="font-bold">Instant Chat</p>
                <p className="text-sm text-blue-100/75">{siteSettings?.whatsapp || "9851228383"} (WhatsApp/Viber)</p>
              </div>
            </div>
            <div className="flex gap-3">
              <FaEnvelope className="text-red-300 mt-1" />
              <div>
                <p className="font-bold">Email Us</p>
                <p className="text-sm text-blue-100/75">{siteSettings?.email || "support@sangalotech.com"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="relative z-10 max-w-[1200px] mx-auto py-10 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-1">
            <h4 className="text-sm font-black uppercase tracking-widest text-blue-200">
              Secure Payments
            </h4>
            <p className="text-xs text-blue-100/60 font-medium">
              We accept the following methods for all course enrollments &amp; video
              purchases.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 group hover:scale-105 transition-transform cursor-default">
              <div className="w-5 h-5 bg-[#60bb46] rounded-full" />
              <span className="text-[#60bb46] font-black text-[12px]">eSewa</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 group hover:scale-105 transition-transform cursor-default">
              <div className="w-5 h-5 bg-[#5c2d91] rounded-md" />
              <span className="text-[#5c2d91] font-black text-[12px]">Khalti</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 group hover:scale-105 transition-transform cursor-default">
              <div className="w-5 h-5 bg-[#e31e24] rounded-sm flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">F</span>
              </div>
              <span className="text-[#e31e24] font-black text-[12px]">fonepay</span>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2 border border-white/20 group hover:border-white/50 transition-colors cursor-default">
              <FaBuildingColumns className="text-blue-200" />
              <span className="text-white font-bold text-[12px]">Bank Transfer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer tail */}
      <div className="relative z-10 max-w-[1200px] mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-100/60">
        <p>© 2025 Sangalo Tech Pvt. Ltd. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-white transition-colors duration-300">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors duration-300">
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* Spacer to avoid overlap with bottom bar on mobile */}
      <div className="h-20 md:hidden" aria-hidden />

      {/* =================== Mobile Bottom Fixed Menu =================== */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-[70]"
        aria-label="Primary mobile actions"
      >
        <div className="mx-auto max-w-[1200px] px-3 pb-[env(safe-area-inset-bottom)]">
          <div className="m-3 rounded-2xl bg-white/90 text-[#00548B] shadow-2xl shadow-black/20 border border-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/90">
            <ul className="grid grid-cols-3">
              <li>
                <a
                  href="#programs"
                  className="flex flex-col items-center justify-center gap-1 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-2xl"
                  aria-label="Go to Training"
                >
                  <FaGraduationCap className="text-lg" />
                  <span className="text-[11px] font-extrabold tracking-wider uppercase">
                    Training
                  </span>
                </a>
              </li>
              <li>
                <Link
                  href="/services"
                  className="flex flex-col items-center justify-center gap-1 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-2xl"
                  aria-label="Go to Services"
                >
                  <FaScrewdriverWrench className="text-lg" />
                  <span className="text-[11px] font-extrabold tracking-wider uppercase">
                    Services
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="#products"
                  className="flex flex-col items-center justify-center gap-1 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-2xl"
                  aria-label="Go to Products"
                >
                  <FaBoxOpen className="text-lg" />
                  <span className="text-[11px] font-extrabold tracking-wider uppercase">
                    Products
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* ================= /Mobile Bottom Fixed Menu =================== */}
    </footer>
  );
};

export default Footer;