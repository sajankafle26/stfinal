import mongoose from 'mongoose';

const TechStackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    blurb: String,
    overview: String,
    icon: String,
    color: String,
    docs: String,
    snippet: String,
    sections: [{
        group: String,
        items: [{
            title: String,
            desc: String
        }]
    }]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export default mongoose.models.TechStack || mongoose.model('TechStack', TechStackSchema);
