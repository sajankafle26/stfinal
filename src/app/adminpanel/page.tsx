"use client";
import React, { useEffect, useState } from "react";
import AdminCRUD from "@/components/AdminCRUD";
import axios from "axios";
import { FaDollarSign, FaShoppingCart, FaUsers, FaHourglassHalf } from "react-icons/fa";

const AdminDashboard = () => {
    const [stats, setStats] = useState<any>(null);

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("/api/admin/stats");
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch stats:", err);
                setError("Failed to load dashboard data. Please try again.");
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: "Total Earnings", value: `Rs. ${stats?.totalEarnings?.toLocaleString() || 0}`, icon: FaDollarSign, color: "text-green-400", bg: "bg-green-400/10" },
        { label: "Total Sales", value: stats?.totalSales || 0, icon: FaShoppingCart, color: "text-blue-400", bg: "bg-blue-400/10" },
        { label: "Active Students", value: stats?.totalStudents || 0, icon: FaUsers, color: "text-indigo-400", bg: "bg-indigo-400/10" },
        { label: "Pending Orders", value: stats?.pendingOrders || 0, icon: FaHourglassHalf, color: "text-orange-400", bg: "bg-orange-400/10" },
    ];

    return (
        <div className="space-y-12">
            {/* Stats Grid */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm">
                    {error}
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 flex items-center gap-6 group hover:border-slate-700 transition-all">
                        <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                            <stat.icon />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
                            <p className="text-xl font-black text-white">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8">
                    <AdminCRUD
                        title="Manage Video Courses"
                        apiPath="/api/courses"
                        fields={[
                            { name: "title", label: "Course Title", type: "text" },
                            { name: "category", label: "Category", type: "text" },
                            { name: "description", label: "Description", type: "textarea" },
                            { name: "price", label: "Price (NPR)", type: "number" },
                            { name: "originalPrice", label: "Original Price (NPR)", type: "number" },
                            { name: "thumbnail", label: "Course Thumbnail", type: "image" },
                            { name: "instructor", label: "Instructor", type: "text" },
                            { name: "totalHours", label: "Total Hours", type: "text" },
                            { name: "lessons", label: "Lessons (JSON)", type: "json" },
                        ]}
                        renderItem={(item, onDelete, onEdit) => (
                            <div key={item._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 relative group">
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => onEdit(item)} className="text-indigo-400 font-bold text-xs uppercase hover:text-indigo-300">Edit</button>
                                    <button onClick={() => onDelete(item._id)} className="text-red-500 font-bold text-xs uppercase hover:text-red-400">Delete</button>
                                </div>
                                <img src={item.thumbnail} className="w-full aspect-video object-cover rounded-2xl mb-4 shadow-2xl" />
                                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                                <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-800/50">
                                    <span className="text-indigo-400 font-black text-sm text-[10px] uppercase">Rs. {item.price}</span>
                                    <span className="text-slate-600 font-black text-[10px] uppercase tracking-widest">{item.category}</span>
                                </div>
                            </div>
                        )}
                    />
                </div>

                <div className="lg:col-span-4">
                    <div className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-8 sticky top-32">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-lg font-black text-white">Recent Purchases</h2>
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        </div>

                        <div className="space-y-4">
                            {stats?.recentPurchases?.map((order: any) => (
                                <div key={order._id} className="p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center font-black text-xs uppercase">
                                                {order.user?.name?.[0] || 'U'}
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">{order.user?.name || 'Unknown'}</p>
                                                <p className="text-slate-500 text-[10px]">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <span className="text-green-400 font-black text-sm">Rs. {order.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="text-[10px] font-black text-indigo-400/60 uppercase tracking-widest">
                                        {order.courseTitle || 'Video Course'}
                                    </div>
                                </div>
                            ))}

                            {(!stats?.recentPurchases || stats.recentPurchases.length === 0) && (
                                <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-[2rem]">
                                    <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">No recent sales</p>
                                </div>
                            )}
                        </div>

                        <button className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">
                            View All Transactions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
