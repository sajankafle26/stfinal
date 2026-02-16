import mongoose from 'mongoose';

const CurriculumItemSchema = new mongoose.Schema({
    title: String,
    objectives: [String],
    keyTopics: [String],
    activities: [String],
    deliverables: [String],
    tools: [String],
    duration: String,
});

const LiveCourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    category: String,
    description: String,
    price: Number,
    originalPrice: Number,
    duration: String,
    image: String,
    module: String,
    curriculum: [CurriculumItemSchema],
    instructor: {
        name: String,
        title: String,
        bio: String,
        avatar: String,
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export default mongoose.models.LiveCourse || mongoose.model('LiveCourse', LiveCourseSchema);
