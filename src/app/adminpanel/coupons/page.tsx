"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";
import { FaTicketAlt, FaPercent, FaCalendarDay } from "react-icons/fa";

const AdminCouponsPage = () => {
    return (
        <div className="pt-32">
            <AdminCRUD
                title="Manage Coupons"
                apiPath="/api/coupons"
                fields={[
                    { name: "code", label: "Coupon Code", type: "text" },
                    { name: "discountType", label: "Discount Type", type: "select", options: ["percentage", "fixed"] },
                    { name: "discountValue", label: "Discount Value", type: "number" },
                    { name: "expiryDate", label: "Expiry Date", type: "date" },
                    { name: "usageLimit", label: "Usage Limit", type: "number" },
                    { name: "minOrderAmount", label: "Min Order Amount", type: "number" },
                ]}
                renderItem={(item, onDelete, onEdit) => (
                    <div key={item._id} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 relative group hover:border-indigo-500/30 transition-all">
                        <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => onEdit(item)} className="text-indigo-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-300">Edit</button>
                            <button onClick={() => onDelete(item._id)} className="text-red-500 font-black text-[10px] uppercase tracking-widest hover:text-red-400">Delete</button>
                        </div>

                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center text-2xl">
                                <FaTicketAlt />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-widest uppercase">{item.code}</h3>
                                <p className="text-indigo-400 font-bold text-xs">
                                    {item.discountType === 'percentage' ? `${item.discountValue}% OFF` : `Rs. ${item.discountValue} OFF`}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800/50">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Expires On</p>
                                <div className="flex items-center gap-2 text-white font-bold text-sm">
                                    <FaCalendarDay className="text-indigo-400 text-xs" />
                                    {new Date(item.expiryDate).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Usage</p>
                                <div className="text-white font-bold text-sm">
                                    {item.usageCount || 0} / {item.usageLimit}
                                </div>
                            </div>
                        </div>

                        {!item.isActive && (
                            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] rounded-[2.5rem] flex items-center justify-center border-2 border-dashed border-red-500/30">
                                <span className="bg-red-500 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">Inactive</span>
                            </div>
                        )}
                    </div>
                )}
            />
        </div>
    );
};

export default AdminCouponsPage;
