import mongoose from 'mongoose';

const UpcomingBatchSchema = new mongoose.Schema({
    courseTitle: { type: String, required: true },
    startDate: String,
    time: String,
    status: { type: String, enum: ['Enrolling', 'Full', 'Started'], default: 'Enrolling' },
    seatsLeft: Number,
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export default mongoose.models.UpcomingBatch || mongoose.model('UpcomingBatch', UpcomingBatchSchema);
