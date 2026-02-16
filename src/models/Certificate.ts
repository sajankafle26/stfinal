import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VideoCourse',
        required: true,
    },
    certificateNumber: {
        type: String,
        required: true,
        unique: true,
    },
    issueDate: {
        type: Date,
        default: Date.now,
    },
    courseTitle: String,
    userName: String,
}, { timestamps: true });

export default mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
