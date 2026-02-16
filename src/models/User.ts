import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select: false,
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student',
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VideoCourse'
    }],
    completedLessons: [{
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoCourse' },
        lessonIds: [String]
    }],
    certificates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate'
    }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
