// Backend/models/scanModel.js
const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Safe', 'Warning', 'Malicious'],
        required: true
    },
    riskScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    riskLevel: {
        type: String,
        enum: ['Low Risk', 'Medium Risk', 'High Risk'],
        required: true
    },
    riskFactors: [{
        type: String
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Scan', scanSchema);