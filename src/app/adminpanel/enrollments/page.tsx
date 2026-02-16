"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";

const EnrollmentsAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Enrollments"
            apiPath="/api/enrollments"
            fields={[
                { name: "name", label: "Student Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "phone", label: "Phone Number", type: "text" },
                { name: "address", label: "Address", type: "text" },
                { name: "courseTitle", label: "Course Title", type: "text" },
                { name: "shift", label: "Shift", type: "text" },
                { name: "paymentMethod", label: "Payment", type: "text" },
                { name: "status", label: "Status", type: "select", options: ["Pending", "Contacted", "Confirmed", "Cancelled"] },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 relative group">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(item)} className="text-indigo-400 font-bold text-xs uppercase">Edit</button>
                        <button onClick={() => onDelete(item._id)} className="text-red-500 font-bold text-xs uppercase">Delete</button>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-white font-bold text-lg">{item.name}</h3>
                        <p className="text-indigo-400 text-sm font-bold">{item.courseTitle}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4">
                        <p className="text-slate-400 text-[11px]"><span className="text-slate-600">Email:</span> {item.email}</p>
                        <p className="text-slate-400 text-[11px]"><span className="text-slate-600">Phone:</span> {item.phone}</p>
                        <p className="text-slate-400 text-[11px]"><span className="text-slate-600">Address:</span> {item.address}</p>
                        <p className="text-slate-400 text-[11px]"><span className="text-slate-600">Shift:</span> {item.shift}</p>
                        <p className="text-slate-400 text-[11px] font-bold"><span className="text-slate-600 font-normal">Method:</span> <span className="uppercase text-indigo-300">{item.paymentMethod}</span></p>
                        {item.parentName && <p className="text-slate-400 text-[11px] col-span-2"><span className="text-slate-600">Guardian:</span> {item.parentName} ({item.parentPhone})</p>}
                    </div>
                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                        <span className="text-[10px] text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${item.status === 'Confirmed' ? 'bg-green-500/10 text-green-400' :
                            item.status === 'Pending' ? 'bg-orange-500/10 text-orange-400' :
                                item.status === 'Cancelled' ? 'bg-red-500/10 text-red-400' :
                                    'bg-blue-500/10 text-blue-400'
                            }`}>
                            {item.status}
                        </span>
                    </div>
                </div>
            )}
        />
    );
};

export default EnrollmentsAdmin;
