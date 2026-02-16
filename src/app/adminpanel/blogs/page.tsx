"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";

const BlogsAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Blogs"
            apiPath="/api/blogs"
            fields={[
                { name: "title", label: "Blog Title", type: "text" },
                { name: "date", label: "Date", type: "text" },
                { name: "excerpt", label: "Excerpt", type: "textarea" },
                { name: "image", label: "Feature Image", type: "image" },
                { name: "link", label: "Read More Link", type: "text" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 relative group">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(item)} className="text-indigo-400 font-bold text-xs">Edit</button>
                        <button onClick={() => onDelete(item._id)} className="text-red-500 font-bold text-xs">Delete</button>
                    </div>
                    <img src={item.image} className="w-full aspect-video object-cover rounded-2xl mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-xs mb-2">{item.date}</p>
                    <p className="text-slate-500 text-sm line-clamp-2">{item.excerpt}</p>
                </div>
            )}
        />
    );
};

export default BlogsAdmin;
