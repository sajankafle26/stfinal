import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/models/Enrollment";
import { auth } from "@/auth";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { id } = await params;
        await dbConnect();
        await Enrollment.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { id } = await params;
        const body = await req.json();
        await dbConnect();
        const enrollment = await Enrollment.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json(enrollment);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
