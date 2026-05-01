const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; // Password is required ONLY if googleId is missing
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows multiple users to have 'null' googleId
    },
    profilePic: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],//only allow user or admin roles
        default: 'user'
    }

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);