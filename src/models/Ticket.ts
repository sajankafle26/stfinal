import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        subject: {
            type: String,
            required: [true, "Please provide a subject"],
            maxlength: [100, "Subject cannot be more than 100 characters"],
        },
        status: {
            type: String,
            enum: ["Open", "In Progress", "Resolved", "Closed"],
            default: "Open",
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "VideoCourse",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema);
