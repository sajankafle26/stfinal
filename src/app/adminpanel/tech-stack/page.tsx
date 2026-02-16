"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";

const TechStackAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Tech Stack"
            apiPath="/api/tech-stack"
            fields={[
                { name: "name", label: "Technology Name", type: "text" },
                { name: "blurb", label: "Short Blurb", type: "text" },
                { name: "overview", label: "Overview (HTML/Rich Text)", type: "richtext" },
                { name: "icon", label: "Icon Name (e.g. FaHtml5)", type: "text" },
                { name: "color", label: "Color Class (e.g. text-orange-400)", type: "text" },
                { name: "docs", label: "Docs Link", type: "text" },
                { name: "snippet", label: "Code Snippet", type: "textarea" },
                { name: "sections", label: "Topic Index (JSON Array)", type: "json" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 relative group">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(item)} className="text-indigo-400 font-bold text-xs uppercase">Edit</button>
                        <button onClick={() => onDelete(item._id)} className="text-red-500 font-bold text-xs uppercase">Delete</button>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`text-3xl ${item.color}`}>
                            {/* Icon display needs mapping, for admin we just show name */}
                            <span className="text-sm font-bold">{item.icon}</span>
                        </div>
                        <h3 className="text-white font-bold text-lg">{item.name}</h3>
                    </div>
                    <p className="text-slate-500 text-sm line-clamp-2">{item.blurb}</p>
                </div>
            )}
        />
    );
};

export default TechStackAdmin;
