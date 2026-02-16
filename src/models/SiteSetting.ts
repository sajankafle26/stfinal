import mongoose from 'mongoose';

const SiteSettingSchema = new mongoose.Schema({
    phone: { type: String, default: '9851228383 / 01-5839127' },
    whatsapp: { type: String, default: '9851228383' },
    viber: { type: String, default: '9851228383' },
    email: { type: String, default: 'support@sangalotech.com' },
    address: { type: String, default: 'Lokenthali, Bhaktapur, Nepal' },
    facebook: { type: String, default: '#' },
    instagram: { type: String, default: '#' },
    linkedin: { type: String, default: '#' },
    youtube: { type: String, default: '#' },
    tiktok: { type: String, default: '#' },
}, { timestamps: true });

export default mongoose.models.SiteSetting || mongoose.model('SiteSetting', SiteSettingSchema);
