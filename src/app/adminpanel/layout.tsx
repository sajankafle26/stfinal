"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGraduationCap, FaCalendarAlt, FaComments, FaRss, FaTools, FaCode, FaBoxOpen, FaVideo, FaBriefcase, FaTicketAlt, FaSignOutAlt, FaCog } from "react-icons/fa";
import { signOut } from "next-auth/react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const navItems = [
        { label: "Video Courses", href: "/adminpanel", icon: FaVideo },
        { label: "Live Trainings", href: "/adminpanel/live-courses", icon: FaGraduationCap },
        { label: "Upcoming Batches", href: "/adminpanel/batches", icon: FaCalendarAlt },
        { label: "Testimonials", href: "/adminpanel/testimonials", icon: FaComments },
        { label: "Blogs", href: "/adminpanel/blogs", icon: FaRss },
        { label: "Services", href: "/adminpanel/services", icon: FaTools },
        { label: "Tech Stack", href: "/adminpanel/tech-stack", icon: FaCode },
        { label: "Products", href: "/adminpanel/products", icon: FaBoxOpen },
        { label: "Internships", href: "/adminpanel/internships", icon: FaBriefcase },
        { label: "Enrollments", href: "/adminpanel/enrollments", icon: FaGraduationCap },
        { label: "Coupons", href: "/adminpanel/coupons", icon: FaTicketAlt },
        { label: "Certificates", href: "/adminpanel/certificates", icon: FaGraduationCap },
        { label: "Site Settings", href: "/adminpanel/site-settings", icon: FaCog },
    ];

    return (
        <div className="min-h-screen bg-[#0a1118] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900/50 border-r border-slate-800 p-6 pt-32 hidden md:block">
                <nav className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <item.icon className="text-lg" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-800">
                    <button
                        onClick={async () => {
                            await signOut({ redirect: false });
                            window.location.href = "/studentlogin";
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-400 hover:bg-red-400/10 transition-all"
                    >
                        <FaSignOutAlt className="text-lg" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 pt-32">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
