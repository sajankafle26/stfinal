import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Message from "@/models/Message";
import Ticket from "@/models/Ticket";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const { id } = await params; // Ticket ID

        // Check ticket existence and access (optional, but good practice)
        const ticket = await Ticket.findById(id);
        if (!ticket) return NextResponse.json({ message: "Ticket not found" }, { status: 404 });

        // @ts-ignore
        const role = session.user.role;
        // @ts-ignore
        const userId = session.user.id;

        if (role !== "admin" && ticket.studentId.toString() !== userId) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        const messages = await Message.find({ ticketId: id })
            .populate("senderId", "name email role avatar")
            .sort({ createdAt: 1 });

        return NextResponse.json(messages);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const { content, codeSnippet, attachments } = await req.json();
        const { id } = await params; // Ticket ID

        // @ts-ignore
        const userId = session.user.id;

        const ticket = await Ticket.findById(id);
        if (!ticket) return NextResponse.json({ message: "Ticket not found" }, { status: 404 });

        const newMessage = await Message.create({
            ticketId: id,
            senderId: userId,
            content,
            codeSnippet,
            attachments
        });

        // Optionally update ticket "updatedAt" or status
        // If admin replies, maybe set status to "In Progress" or "Resolved"?
        // If student replies, maybe reopen?
        // Leaving basic for now.

        return NextResponse.json(newMessage, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
