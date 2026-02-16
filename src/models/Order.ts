import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, // Changed to false for multi-item orders
    },
    items: [{
        courseId: { type: mongoose.Schema.Types.ObjectId, required: true },
        courseType: { type: String, enum: ['VideoCourse', 'LiveCourse'], default: 'VideoCourse' },
        courseTitle: String,
        price: Number
    }],
    courseType: {
        type: String,
        enum: ['VideoCourse', 'LiveCourse'],
        default: 'VideoCourse',
    },
    courseTitle: String, // Cache the title for easier tracking (primary or aggregate)
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    transactionId: String,
    paymentDetails: Object,
}, { timestamps: true });

if (mongoose.models.Order) {
    delete mongoose.models.Order;
}

export default mongoose.model('Order', OrderSchema);
