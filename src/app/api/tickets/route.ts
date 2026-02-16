import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Ticket from "@/models/Ticket";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        // @ts-ignore
        const role = session.user.role;
        // @ts-ignore
        const userId = session.user.id;

        let filter: any = {};
        if (role !== "admin") {
            filter.studentId = userId;
        }

        const url = new URL(req.url);
        const courseId = url.searchParams.get("courseId");
        if (courseId) {
            filter.courseId = courseId;
        }

        const tickets = await Ticket.find(filter)
            .populate("studentId", "name email avatar")
            .sort({ createdAt: -1 });

        return NextResponse.json(tickets);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const { subject, priority, courseId } = await req.json();

        // @ts-ignore
        const userId = session.user.id;

        const newTicket = await Ticket.create({
            studentId: userId,
            subject,
            priority,
            courseId,
            status: "Open",
        });

        return NextResponse.json(newTicket, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
