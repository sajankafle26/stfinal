import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    parentName: { type: String },
    parentPhone: { type: String },
    gender: { type: String },
    dob: { type: String },
    occupation: { type: String },
    education: { type: String },
    courseTitle: { type: String, required: true },
    batchId: { type: String }, // Flexible for both ID and manual entry
    shift: { type: String },
    paymentMethod: { type: String, enum: ['esewa', 'khalti', 'cash'], default: 'cash' },
    amount: { type: Number },
    status: { type: String, enum: ['Pending', 'Contacted', 'Confirmed', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);
