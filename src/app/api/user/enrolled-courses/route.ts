import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import VideoCourse from "@/models/VideoCourse";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        // Ensure VideoCourse is registered for populate
        const _vc = VideoCourse;
        const user = await User.findById((session.user as any).id).populate("enrolledCourses");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user.enrolledCourses);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
