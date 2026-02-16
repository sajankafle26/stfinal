"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";

const LiveCoursesAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Live Trainings"
            apiPath="/api/live-courses"
            fields={[
                { name: "title", label: "Course Title", type: "text" },
                { name: "slug", label: "Slug (e.g. mern-stack-mastery)", type: "text" },
                { name: "category", label: "Category", type: "select", options: ["js", "dm", "wp", "robotics"] },
                { name: "description", label: "Description (Rich Text/HTML)", type: "richtext" },
                { name: "price", label: "Price (NPR)", type: "number" },
                { name: "originalPrice", label: "Original Price (for Discount Display)", type: "number" },
                { name: "duration", label: "Duration", type: "text" },
                { name: "module", label: "Module (e.g. Module I)", type: "text" },
                { name: "image", label: "Course Thumbnail", type: "image" },
                { name: "curriculum", label: "Curriculum Modules (JSON Array)", type: "json" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 relative group">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(item)} className="text-indigo-400 font-bold text-xs uppercase">Edit</button>
                        <button onClick={() => onDelete(item._id)} className="text-red-500 font-bold text-xs uppercase">Delete</button>
                    </div>
                    {item.image ? (
                        <img src={item.image} className="w-full aspect-video object-cover rounded-2xl mb-4" />
                    ) : (
                        <div className="w-full aspect-video bg-slate-800 rounded-2xl mb-4 flex items-center justify-center">
                            <span className="text-slate-500 text-xs font-bold uppercase">No Thumbnail</span>
                        </div>
                    )}
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <div className="flex justify-between items-center text-xs text-slate-400">
                        <span>{item.category}</span>
                        <div className="flex items-center gap-2">
                            {item.originalPrice && item.originalPrice > item.price && (
                                <span className="line-through text-[10px] opacity-50">Rs. {item.originalPrice}</span>
                            )}
                            <span className="text-indigo-400 font-bold">Rs. {item.price}</span>
                        </div>
                    </div>
                </div>
            )}
        />
    );
};

export default LiveCoursesAdmin;
