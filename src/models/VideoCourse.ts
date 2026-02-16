import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
    title: String,
    description: String,
    videoUrl: String,
    duration: String,
    isPreview: {
        type: Boolean,
        default: false,
    },
});

const VideoCourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    thumbnail: String,
    price: {
        type: Number,
        required: true,
    },
    originalPrice: Number,
    category: String,
    instructor: String,
    rating: {
        type: Number,
        default: 5,
    },
    lessons: [LessonSchema],
    totalHours: String,
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, { timestamps: true });

export default mongoose.models.VideoCourse || mongoose.model('VideoCourse', VideoCourseSchema);
