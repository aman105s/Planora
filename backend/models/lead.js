const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
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
        enum: ['new', 'unlocked', 'contacted'],
        default: 'new'
    },
    name: { type: String, required: true },
    weddingDateLocation: { type: String },
    budget: { type: String },
    message: { type: String },
    priceToUnlock: { type: Number, default: 500 }
}, {timestamps: true});

module.exports = mongoose.model('Lead', leadSchema);
