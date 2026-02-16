"use client";
import AdminCRUD from "@/components/AdminCRUD";
import React from "react";

const SuccessStoriesPage = () => {
    const fields = [
        { name: "name", label: "Student Name", type: "text" },
        { name: "role", label: "Job Role", type: "text" },
        { name: "company", label: "Company", type: "text" },
        { name: "course", label: "Course Taken", type: "text" },
        { name: "image", label: "Student Image", type: "image" },
        { name: "linkedinUrl", label: "LinkedIn URL", type: "text" },
        { name: "placementDate", label: "Placement Date", type: "date" },
    ];

    const renderItem = (item: any, onDelete: (id: string) => void, onEdit: (item: any) => void) => (
        <div key={item._id} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={item.image || `https://i.pravatar.cc/150?u=${item.name}`}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h3 className="font-bold text-white text-lg">{item.name}</h3>
                    <p className="text-slate-400 text-sm">{item.role} @ {item.company}</p>
                </div>
            </div>
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => onEdit(item)}
                    className="flex-1 bg-indigo-600/20 text-indigo-400 py-2 rounded-lg font-bold hover:bg-indigo-600/30 transition text-xs"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(item._id)}
                    className="flex-1 bg-red-600/20 text-red-400 py-2 rounded-lg font-bold hover:bg-red-600/30 transition text-xs"
                >
                    Delete
                </button>
            </div>
        </div>
    );

    return (
        <AdminCRUD
            title="Success Stories"
            apiPath="/api/success-stories"
            fields={fields}
            renderItem={renderItem}
        />
    );
};

export default SuccessStoriesPage;
