import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CertificateSetting from "@/models/CertificateSetting";
import { auth } from "@/auth";

export async function GET() {
    try {
        await dbConnect();
        let settings = await CertificateSetting.findOne();
        if (!settings) {
            settings = await CertificateSetting.create({});
        }
        return NextResponse.json(settings);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        await dbConnect();

        const settings = await CertificateSetting.findOneAndUpdate({}, data, { upsert: true, new: true });
        return NextResponse.json(settings);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
