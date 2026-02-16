import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: String,
    excerpt: String,
    image: String,
    link: String,
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    description: String,
    image: String,
    link: String,
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

ProductSchema.pre('save', function () {
    const doc = this as any;
    if (doc.title && !doc.slug) {
        doc.slug = doc.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
});

export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
