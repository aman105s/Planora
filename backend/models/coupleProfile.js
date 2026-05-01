const mongoose = require('mongoose');

const coupleProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    partnerName: { type: String },
    weddingDate: { type: String },
    guestCount: { type: String },
    style: { type: String },
    budget: { type: Number },
    priority: { type: String },
    vendorRequirements: [{ type: String }]
}, {timestamps: true});

module.exports = mongoose.model('CoupleProfile', coupleProfileSchema);
