"use client";
import React, { useState } from "react";
import axios from "axios";

export default function TestUploadPage() {
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            console.log("No file selected");
            return;
        }

        console.log("Selected file:", {
            name: file.name,
            size: file.size,
            type: file.type
        });

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log("Uploading to /api/upload...");
            const res = await axios.post("/api/upload", formData);
            console.log("Upload response:", res.data);
            setImageUrl(res.data.url);
            alert(`Upload successful! URL: ${res.data.url}`);
        } catch (err: any) {
            console.error("Upload error:", err);
            alert(`Upload failed: ${err.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-12">
            <div className="max-w-2xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold">Image Upload Test</h1>

                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm font-semibold mb-2 block">Select an image to upload:</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                            className="block w-full text-sm text-slate-400
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-indigo-600 file:text-white
                                hover:file:bg-indigo-700
                                file:cursor-pointer cursor-pointer"
                        />
                    </label>

                    {uploading && (
                        <div className="text-indigo-400 font-semibold">
                            Uploading...
                        </div>
                    )}

                    {imageUrl && (
                        <div className="space-y-4">
                            <div className="bg-slate-800 p-4 rounded-lg">
                                <p className="text-xs text-slate-400 mb-2">Uploaded URL:</p>
                                <code className="text-green-400 text-sm break-all">{imageUrl}</code>
                            </div>

                            <div className="bg-slate-800 p-4 rounded-lg">
                                <p className="text-xs text-slate-400 mb-2">Preview:</p>
                                <img
                                    src={imageUrl}
                                    alt="Uploaded preview"
                                    className="max-w-full rounded-lg border-2 border-slate-700"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-slate-800 p-6 rounded-lg text-sm space-y-2">
                    <p className="font-bold text-indigo-400">Instructions:</p>
                    <ol className="list-decimal list-inside space-y-1 text-slate-300">
                        <li>Open browser DevTools (F12) and go to the Console tab</li>
                        <li>Select an image file using the file input above</li>
                        <li>Check the console for detailed logs</li>
                        <li>If successful, the image preview will appear below</li>
                        <li>If it fails, check both browser console and terminal for errors</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
