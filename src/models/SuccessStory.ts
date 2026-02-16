import mongoose from 'mongoose';

const SuccessStorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    image: String,
    linkedinUrl: String,
    course: String,
    placementDate: String,
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export default mongoose.models.SuccessStory || mongoose.model('SuccessStory', SuccessStorySchema);
