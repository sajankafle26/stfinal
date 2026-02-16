import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Certificate from "@/models/Certificate";
import { auth } from "@/auth";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const url = new URL(req.url);
        const isAdmin = session.user.role === 'admin';

        let query = {};
        if (!isAdmin) {
            query = { user: session.user.id };
        }

        const certificates = await Certificate.find(query).sort({ issueDate: -1 });
        return NextResponse.json(certificates);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
