const mongoose = require('mongoose');

const donationSchema = mongoose.Schema(
    {
        intern: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Intern', // This links the donation to a specific intern
        },
        referralCode: {
            type: String,
            required: true,
        },
        donorName: {
            type: String,
            default: 'Anonymous',
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
    }
);

module.exports = mongoose.model('Donation', donationSchema);