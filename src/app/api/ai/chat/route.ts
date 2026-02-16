import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { askGemini } from "@/lib/gemini";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { prompt, context } = await req.json();
        const response = await askGemini(prompt, context);

        return NextResponse.json({ response });
    } catch (error: any) {
        console.error("AI Chat Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
