"use client";
import React, { useState, useEffect } from "react";
import AdminCRUD from "@/components/AdminCRUD";
import axios from "axios";
import Link from "next/link";
import { slugify } from "@/utils/slug";

const BatchesAdmin = () => {
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get("/api/live-courses");
                setCourses(res.data);
            } catch (err) {
                console.error("Error fetching courses:", err);
            }
        };
        fetchCourses();
    }, []);

    const courseOptions = courses.map(c => c.title);

    return (
        <AdminCRUD
            title="Upcoming Batches"
            apiPath="/api/upcoming-batches"
            fields={[
                {
                    name: "courseTitle",
                    label: "Course Title",
                    type: "select",
                    options: courseOptions
                },
                { name: "startDate", label: "Start Date", type: "date" },
                { name: "time", label: "Time Schedule", type: "time" },
                { name: "status", label: "Status", type: "select", options: ["Enrolling", "Full", "Started"] },
                { name: "seatsLeft", label: "Seats Left", type: "number" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 relative group">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(item)} className="text-indigo-400 font-bold text-xs uppercase">Edit</button>
                        <button onClick={() => onDelete(item._id)} className="text-red-500 font-bold text-xs uppercase">Delete</button>
                    </div>
                    <div className="flex justify-between items-start mb-4">
                        <Link
                            href={`/courses/${slugify(item.courseTitle)}`}
                            target="_blank"
                            className="text-white font-bold text-lg hover:text-indigo-400 transition-colors"
                        >
                            {item.courseTitle}
                        </Link>
                        <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-[10px] uppercase font-black">{item.status}</span>
                    </div>
                    <p className="text-slate-400 text-sm">Starts: {item.startDate}</p>
                    <p className="text-slate-400 text-sm">Time: {item.time}</p>
                    <p className="text-indigo-400 text-xs font-bold mt-2">{item.seatsLeft} Seats Left</p>
                </div>
            )}
        />
    );
};

export default BatchesAdmin;
