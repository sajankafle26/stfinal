import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/models/Enrollment";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();
        const enrollment = await Enrollment.create(body);
        return NextResponse.json(enrollment, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await dbConnect();
        const enrollments = await Enrollment.find({}).sort({ createdAt: -1 });
        return NextResponse.json(enrollments);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
