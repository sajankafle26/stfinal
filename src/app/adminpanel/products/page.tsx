"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";

const ProductsAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Products"
            apiPath="/api/products"
            fields={[
                { name: "title", label: "Product Title", type: "text" },
                { name: "slug", label: "Slug (optional)", type: "text" },
                { name: "description", label: "Description", type: "richtext" },
                { name: "image", label: "Product Image", type: "image" },
                { name: "link", label: "Product Link", type: "text" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 relative group">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(item)} className="text-indigo-400 font-bold text-xs">Edit</button>
                        <button onClick={() => onDelete(item._id)} className="text-red-500 font-bold text-xs">Delete</button>
                    </div>
                    <img src={item.image} className="w-full aspect-video object-cover rounded-2xl mb-4" />
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <div
                        className="text-slate-500 text-sm line-clamp-3 prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                </div>
            )}
        />
    );
};

export default ProductsAdmin;
