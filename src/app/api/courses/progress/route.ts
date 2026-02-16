import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import VideoCourse from "@/models/VideoCourse";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { courseId, lessonId } = await req.json();
        if (!courseId || !lessonId) {
            return NextResponse.json({ message: "Course ID and Lesson ID are required" }, { status: 400 });
        }

        await dbConnect();
        const user = await User.findById(session.user.id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Find if progress already exists for this course
        const progressIndex = user.completedLessons.findIndex(
            (p: any) => p.courseId.toString() === courseId
        );

        if (progressIndex > -1) {
            // Add lessonId if not already present
            if (!user.completedLessons[progressIndex].lessonIds.includes(lessonId)) {
                user.completedLessons[progressIndex].lessonIds.push(lessonId);
            }
        } else {
            // Create new progress entry
            user.completedLessons.push({
                courseId,
                lessonIds: [lessonId]
            });
        }

        await user.save();

        // Check for completion
        const course = await VideoCourse.findById(courseId);
        const completedCount = user.completedLessons.find(
            (p: any) => p.courseId.toString() === courseId
        )?.lessonIds.length || 0;

        const isFullyCompleted = course && completedCount >= course.lessons.length;

        return NextResponse.json({
            message: "Progress updated",
            completedCount,
            totalLessons: course?.lessons.length || 0,
            isFullyCompleted
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get('courseId');

        await dbConnect();
        const user = await User.findById(session.user.id);

        if (courseId) {
            const progress = user.completedLessons.find(
                (p: any) => p.courseId.toString() === courseId
            );
            return NextResponse.json(progress || { courseId, lessonIds: [] });
        }

        return NextResponse.json(user.completedLessons);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
