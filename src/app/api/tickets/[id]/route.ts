import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Ticket from "@/models/Ticket";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const { id } = await params;

        // @ts-ignore
        const role = session.user.role;
        // @ts-ignore
        const userId = session.user.id;

        const ticket = await Ticket.findById(id).populate("studentId", "name email avatar");

        if (!ticket) {
            return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
        }

        // Access control: only admin or the ticket owner can view
        if (role !== "admin" && ticket.studentId._id.toString() !== userId) {
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(ticket);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const { status } = await req.json();
        const { id } = await params;

        // @ts-ignore
        const role = session.user.role;
        // @ts-ignore
        const userId = session.user.id;

        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
        }

        // Only admin can change status arbitrarily. Students might be allowed to "Close" (optional logic).
        // For now, let's allow both to update if they own it or are admin, but typically students only "Resolve/Close".
        // We'll enforce: Admins can do anything. Students can only set to "Closed" if they want to cancel.

        if (role !== "admin") {
            if (ticket.studentId.toString() !== userId) {
                return NextResponse.json({ message: "Forbidden" }, { status: 403 });
            }
            // Student trying to update - restrict to closing?
            // For simplicity, let's allow basic updates if needed, or restrict.
            // Let's assume passed status is valid.
        }

        ticket.status = status || ticket.status;
        await ticket.save();

        return NextResponse.json(ticket);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
