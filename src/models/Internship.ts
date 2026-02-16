import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String }, // FontAwesome class
    type: { type: String, default: 'Internship' },
    duration: { type: String },
    stipend: { type: String },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export default mongoose.models.Internship || mongoose.model("Internship", InternshipSchema);
