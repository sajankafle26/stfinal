import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LexicalEditor from "./LexicalEditor/LexicalEditor";
import { FaUpload, FaWandMagicSparkles } from "react-icons/fa6";

interface AdminCRUDProps {
    title: string;
    apiPath: string;
    fields: { name: string; label: string; type: string; options?: string[] }[];
    renderItem: (item: any, onDelete: (id: string) => void, onEdit: (item: any) => void) => React.ReactNode;
}

const AdminCRUD: React.FC<AdminCRUDProps> = ({ title, apiPath, fields, renderItem }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploading, setUploading] = useState<string | null>(null);

    useEffect(() => {
        if (status === "unauthenticated" || (session?.user as any)?.role !== "admin") {
            router.push("/studentlogin");
        } else if (status === "authenticated") {
            fetchItems();
        }
    }, [status, session]);

    const fetchItems = async () => {
        try {
            const res = await axios.get(apiPath);
            setItems(res.data);
        } catch (err) {
            console.error("Error fetching items:", err);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0];
        console.log(`[AdminCRUD] File input changed for field: ${fieldName}`, {
            fileName: file?.name,
            fileSize: file?.size,
            fileType: file?.type
        });

        if (!file) {
            console.log("[AdminCRUD] No file selected or selection cancelled");
            return;
        }

        // Client-side validation
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (!allowedTypes.includes(file.type)) {
            console.error(`[AdminCRUD] Invalid file type: ${file.type}`);
            alert(`Invalid file type. Please upload an image file (JPG, PNG, GIF, or WebP).\n\nYou selected: ${file.type}`);
            e.target.value = ""; // Clear the input
            return;
        }

        if (file.size > maxSize) {
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            console.error(`[AdminCRUD] File too large: ${sizeMB}MB`);
            alert(`File is too large (${sizeMB}MB). Maximum file size is 10MB.\n\nPlease select a smaller image.`);
            e.target.value = ""; // Clear the input
            return;
        }

        console.log(`[AdminCRUD] Starting upload to /api/upload...`);
        setUploading(fieldName);

        const data = new FormData();
        data.append("file", file);

        try {
            const res = await axios.post("/api/upload", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("[AdminCRUD] Upload success response:", res.data);

            if (res.data?.url) {
                setFormData((prev: any) => ({ ...prev, [fieldName]: res.data.url }));
                console.log(`[AdminCRUD] Form field '${fieldName}' updated with URL:`, res.data.url);
            } else {
                console.warn("[AdminCRUD] Upload succeeded but no URL was returned in the response");
            }
        } catch (err: any) {
            console.error("[AdminCRUD] Upload failed:", err);
            const errorMessage = err.response?.data?.error || err.message || "Upload failed. Please try again.";

            if (err.response?.status === 401) {
                alert("Upload Error: Unauthorized. Please ensure you are logged in as an admin.");
                router.push("/studentlogin");
            } else {
                alert(`Upload Error:\n\n${errorMessage}`);
            }
            e.target.value = ""; // Clear the input on error
        } finally {
            setUploading(null);
        }
    };

    const handleAiGenerate = async (fieldName: string) => {
        const promptText = prompt(`What should the AI generate for ${fieldName}?`);
        if (!promptText) return;

        setUploading(fieldName);
        try {
            const res = await axios.post("/api/ai/generate", {
                prompt: promptText,
                context: `Context: Generating content for field '${fieldName}' in the '${title}' dashboard.`
            });
            setFormData((prev: Record<string, any>) => ({ ...prev, [fieldName]: res.data.response }));
        } catch (err: any) {
            console.error("AI Gen Error", err);
            alert("AI Generation Failed");
        } finally {
            setUploading(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const processedData = { ...formData };
            fields.forEach(field => {
                if (field.type === 'json' && typeof processedData[field.name] === 'string') {
                    try {
                        processedData[field.name] = JSON.parse(processedData[field.name]);
                    } catch (err) {
                        console.error(`Invalid JSON in field ${field.name}`);
                        alert(`Invalid JSON in field ${field.label}`);
                        throw new Error("Invalid JSON");
                    }
                }
            });

            console.log(`[AdminCRUD] Submitting form data to ${apiPath}${editingId ? '/' + editingId : ''}`, processedData);
            if (editingId) {
                console.log("[AdminCRUD] Executing PUT request...");
                const res = await axios.put(`${apiPath}/${editingId}`, processedData);
                console.log("[AdminCRUD] PUT request successful:", res.data);
            } else {
                console.log("[AdminCRUD] Executing POST request...");
                const res = await axios.post(apiPath, processedData);
                console.log("[AdminCRUD] POST request successful:", res.data);
            }

            setShowForm(false);
            setEditingId(null);
            fetchItems();
            setFormData({});
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await axios.delete(`${apiPath}/${id}`);
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (item: any) => {
        const initialFormData = { ...item };
        fields.forEach(field => {
            if (field.type === 'json' && typeof initialFormData[field.name] === 'object') {
                initialFormData[field.name] = JSON.stringify(initialFormData[field.name], null, 2);
            }
        });
        setFormData(initialFormData);
        setEditingId(item._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (status === "loading") return <div className="text-white min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto py-10">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-2xl font-black text-white">{title}</h1>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        if (showForm) {
                            setEditingId(null);
                            setFormData({});
                        }
                    }}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-indigo-500 transition shadow-xl shadow-indigo-600/20 active:scale-95"
                >
                    {showForm ? "Cancel" : "Add New Item"}
                </button>
            </div>

            {showForm && (
                <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-[2.5rem] mb-12 backdrop-blur-xl shadow-2xl">
                    <h2 className="text-2xl font-black text-white mb-8">{editingId ? "Edit Item" : "Create New Item"}</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {fields.map((field) => (
                            <div key={field.name} className={`space-y-3 ${field.type === 'textarea' || field.type === 'richtext' || field.type === 'json' ? 'md:col-span-2' : ''}`}>
                                <label className="text-slate-400 text-xs font-black uppercase tracking-widest ml-1">{field.label}</label>

                                {field.type === "richtext" ? (
                                    <div className="relative group/ai">
                                        <button
                                            type="button"
                                            onClick={() => handleAiGenerate(field.name)}
                                            className="absolute -top-10 right-0 text-[10px] font-black uppercase text-indigo-400 flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-full hover:bg-indigo-500/20 transition-all opacity-0 group-hover/ai:opacity-100 z-10 border border-indigo-500/20"
                                        >
                                            <FaWandMagicSparkles /> AI Generate
                                        </button>
                                        <LexicalEditor
                                            value={formData[field.name] || ""}
                                            onChange={(html) => setFormData({ ...formData, [field.name]: html })}
                                        />
                                    </div>
                                ) : field.type === "textarea" || field.type === "json" ? (
                                    <div className="relative group/ai">
                                        <button
                                            type="button"
                                            onClick={() => handleAiGenerate(field.name)}
                                            className="absolute -top-10 right-0 text-[10px] font-black uppercase text-indigo-400 flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-full hover:bg-indigo-500/20 transition-all opacity-0 group-hover/ai:opacity-100 z-10 border border-indigo-500/20"
                                        >
                                            <FaWandMagicSparkles /> AI Generate
                                        </button>
                                        <textarea
                                            className="w-full bg-slate-800/50 border-2 border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium h-48 text-sm"
                                            value={formData[field.name] || ""}
                                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                            placeholder={
                                                field.type === "json" ? '[{"group": "Title", "items": [{"title": "Sub", "desc": "Text"}]}]' : ""
                                            }
                                        />
                                    </div>
                                ) : field.type === "image" ? (
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                className="flex-1 bg-slate-800/50 border-2 border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium text-sm"
                                                value={formData[field.name] || ""}
                                                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                                placeholder="Paste Image URL or Upload..."
                                            />
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                                    className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                                    onChange={(e) => handleFileUpload(e, field.name)}
                                                    disabled={!!uploading}
                                                />
                                                <button
                                                    type="button"
                                                    className={`h-full px-6 rounded-2xl font-bold transition flex items-center gap-2 border-2 whitespace-nowrap ${uploading === field.name
                                                        ? "bg-indigo-600 text-white border-indigo-600 cursor-wait"
                                                        : uploading
                                                            ? "bg-slate-700 text-slate-500 border-slate-700 cursor-not-allowed"
                                                            : "bg-slate-800 text-white border-slate-800 hover:bg-slate-700 cursor-pointer"
                                                        }`}
                                                    disabled={!!uploading}
                                                >
                                                    {uploading === field.name ? (
                                                        <>
                                                            <span className="inline-block animate-spin">⏳</span>
                                                            Uploading...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaUpload />
                                                            Upload
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-[11px] text-slate-500 font-medium ml-1">
                                            Accepted: JPG, PNG, GIF, WebP • Max size: 10MB
                                        </div>
                                        {formData[field.name] && (
                                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-slate-800 group">
                                                <img src={formData[field.name]} alt="Preview" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white font-bold text-sm">Image Preview</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : field.type === "select" ? (
                                    <select
                                        className="w-full bg-slate-800/50 border-2 border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium text-sm"
                                        value={formData[field.name] || ""}
                                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    >
                                        <option value="">Select Option</option>
                                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        className="w-full bg-slate-800/50 border-2 border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium text-sm"
                                        value={formData[field.name] || ""}
                                        onChange={(e) => setFormData({ ...formData, [field.name]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                                    />
                                )}
                            </div>
                        ))}
                        <div className="md:col-span-2 pt-4">
                            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black text-sm transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98]">
                                {editingId ? "Update Item" : "Create Item"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.length > 0 ? (
                    items.map((item: any) => renderItem(item, handleDelete, handleEdit))
                ) : (
                    <div className="md:col-span-3 py-20 text-center text-slate-500 italic font-bold text-sm bg-slate-900/20 rounded-[3rem] border-2 border-dashed border-slate-800">
                        No items found. Create one above.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCRUD;
