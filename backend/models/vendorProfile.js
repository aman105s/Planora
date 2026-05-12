const mongoose = require('mongoose');

const vendorProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    businessName: { type: String, required: true },
    experienceYears: { type: Number },
    contactMode: { type: String },
    category: [{ type: String }],
    startingPrice: { type: String },
    coverageAreas: [{ type: String }],
    location: { type: String }, // To support the specific location filtering
    subscriptionPlan: { type: String, enum: ['free', 'pro', 'premium'], default: 'free' },
    tags: [{ type: String }] // e.g., 'Featured', 'Sponsored'
}, {timestamps: true});

module.exports = mongoose.model('VendorProfile', vendorProfileSchema);
