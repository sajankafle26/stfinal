import mongoose from 'mongoose';

const CertificateSettingSchema = new mongoose.Schema({
    directorName: {
        type: String,
        default: "Program Director"
    },
    instructorName: {
        type: String,
        default: "Lead Instructor"
    },
    organizationName: {
        type: String,
        default: "Sangalo Tech"
    },
    academicCouncil: {
        type: String,
        default: "Academic Council"
    }
}, { timestamps: true });

export default mongoose.models.CertificateSetting || mongoose.model('CertificateSetting', CertificateSettingSchema);
