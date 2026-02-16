import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: String,
    icon: String, // FA icon class
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

ServiceSchema.pre('save', function () {
    const doc = this as any;
    if (doc.title && !doc.slug) {
        doc.slug = doc.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
