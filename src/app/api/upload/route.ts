import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join, resolve } from "path";
import { existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/auth";

export const runtime = "nodejs";

// Configuration
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];

export async function POST(req: Request) {
    try {
        console.log("--- UPLOAD ATTEMPT STARTED ---");

        // 1. Check Authentication
        const session = await auth();
        if (!session || (session.user as any)?.role !== "admin") {
            console.error("Upload unauthorized: User is not an admin or NOT logged in");
            return NextResponse.json({
                error: "Unauthorized. You must be an admin to upload files."
            }, { status: 401 });
        }

        // 2. Parse Form Data
        let formData;
        try {
            formData = await req.formData();
        } catch (err) {
            console.error("Failed to parse form data:", err);
            return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
        }

        const file = formData.get("file") as File | null;

        if (!file) {
            console.error("Upload error: No file received in form data");
            return NextResponse.json({
                error: "No file uploaded. Please select a file to upload."
            }, { status: 400 });
        }

        console.log(`Receiving file: ${file.name} (Size: ${file.size} bytes, Type: ${file.type})`);

        // 3. Validate file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            console.error(`Upload error: Invalid file type (${file.type})`);
            return NextResponse.json({
                error: `Invalid file type. Received: ${file.type}. Allowed: ${ALLOWED_EXTENSIONS.join(", ")}`
            }, { status: 400 });
        }

        // 4. Validate file size
        if (file.size > MAX_FILE_SIZE) {
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            console.error(`Upload error: File too large (${sizeMB}MB)`);
            return NextResponse.json({
                error: `File is too large (${sizeMB}MB). Maximum file size is 10MB.`
            }, { status: 400 });
        }

        // 5. Check for Cloud Storage (Vercel Blob)
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            console.log("Using Vercel Blob for storage");
            const blob = await put(file.name, file, {
                access: 'public',
            });
            return NextResponse.json(blob);
        }

        // 6. Fallback to Local Storage (Development only)
        console.warn("--- WARNING: USING LOCAL STORAGE. THIS WILL NOT WORK ON VERCEL ---");

        // 5. Process File Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // 6. Generate filename and define path
        const originalName = file.name || "image.png";
        const extension = originalName.split(".").pop()?.toLowerCase() || "png";
        const filename = `${uuidv4()}.${extension}`;

        // Use resolve to get absolute path from project root
        const uploadDir = resolve(process.cwd(), "public", "uploads");

        // 7. Ensure upload directory exists
        if (!existsSync(uploadDir)) {
            console.log(`Creating upload directory: ${uploadDir}`);
            try {
                await mkdir(uploadDir, { recursive: true });
            } catch (e: any) {
                console.error("Failed to create upload directory:", e);
                return NextResponse.json({
                    error: "Server error: Failed to prepare upload storage."
                }, { status: 500 });
            }
        }

        const path = join(uploadDir, filename);
        console.log(`Writing file to absolute path: ${path}`);

        // 8. Write File
        await writeFile(path, buffer);

        const url = `/uploads/${filename}`;
        console.log(`Upload successful! Accessible at: ${url}`);

        return NextResponse.json({
            url,
            filename,
            size: file.size,
            type: file.type
        });
    } catch (error: any) {
        console.error("Upload failure (Catch Block):", error);
        return NextResponse.json({
            error: error.message || "An unexpected error occurred during upload."
        }, { status: 500 });
    }
}
