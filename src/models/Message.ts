import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        ticketId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: [true, "Please provide message content"],
        },
        codeSnippet: {
            type: String, // Optional code block
        },
        attachments: {
            type: [String], // Array of URLs (images)
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
