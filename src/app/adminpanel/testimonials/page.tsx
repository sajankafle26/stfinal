"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";

const TestimonialsAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Testimonials"
            apiPath="/api/testimonials"
            fields={[
                { name: "name", label: "Student Name", type: "text" },
                { name: "course", label: "Course Name", type: "text" },
                { name: "quote", label: "Quote", type: "richtext" },
                { name: "image", label: "Student Image", type: "image" },
                { name: "placement", label: "Placement", type: "text" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 relative group">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(item)} className="text-indigo-400 font-bold text-xs">Edit</button>
                        <button onClick={() => onDelete(item._id)} className="text-red-500 font-bold text-xs">Delete</button>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <img src={item.image} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <h3 className="text-white font-bold">{item.name}</h3>
                            <p className="text-slate-500 text-xs">{item.course}</p>
                        </div>
                    </div>
                    <p className="text-slate-300 text-sm italic">"{item.quote}"</p>
                </div>
            )}
        />
    );
};

export default TestimonialsAdmin;
