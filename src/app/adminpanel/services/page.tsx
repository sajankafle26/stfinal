"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";

const ServicesAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Services"
            apiPath="/api/services"
            fields={[
                { name: "title", label: "Service Title", type: "text" },
                { name: "slug", label: "Slug (leave empty for auto-generation)", type: "text" },
                { name: "description", label: "Description", type: "richtext" },
                { name: "icon", label: "FontAwesome Icon Class (e.g. fa-solid fa-code)", type: "text" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 relative group">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(item)} className="text-indigo-400 font-bold text-xs">Edit</button>
                        <button onClick={() => onDelete(item._id)} className="text-red-500 font-bold text-xs">Delete</button>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center text-xl mb-4">
                        <i className={item.icon}></i>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <div
                        className="text-slate-500 text-sm prose prose-invert max-w-none line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                </div>
            )}
        />
    );
};

export default ServicesAdmin;
