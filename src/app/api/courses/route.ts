import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import VideoCourse from "@/models/VideoCourse";
import { auth } from "@/auth";

export async function GET() {
    await dbConnect();
    try {
        const courses = await VideoCourse.find({});
        return NextResponse.json(courses);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        await dbConnect();

        const course = await VideoCourse.create(body);
        return NextResponse.json(course, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
