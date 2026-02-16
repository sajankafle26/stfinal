import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function askGemini(prompt: string, context?: string) {
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const fullPrompt = context
        ? `Context: ${context}\n\nQuestion: ${prompt}`
        : prompt;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
}

export async function generateJSON(prompt: string, schemaDescription: string) {
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    const fullPrompt = `You are a professional educational content creator. ${prompt}\n\nReturn the result in valid JSON format following this schema: ${schemaDescription}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return JSON.parse(response.text());
}
