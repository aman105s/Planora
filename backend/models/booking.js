const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'declined'],
        default: 'pending'
    },
    coupleNames: { type: String },
    weddingDateLocation: { type: String }, // e.g. "October 12th, Udaipur"
    message: { type: String }
}, {timestamps: true});

module.exports = mongoose.model('Booking', bookingSchema);
