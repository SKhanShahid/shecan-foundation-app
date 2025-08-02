const mongoose = require('mongoose');

// Define the schema (blueprint) for our Intern data
const internSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true, // Ensures no two interns can have the same email
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        referralCode: {
            type: String,
            unique: true, // Ensures each referral code is unique
            required: true,
        },
        totalAmountRaised: {
            type: Number,
            default: 0, // Starts at 0
        },
        totalDonors: {
            type: Number,
            default: 0, // Starts at 0
        },
        badges: {
            type: [String], // This is an array of strings to store achievement badges
        },
    },
    {
        timestamps: true, // Adds 'createdAt' and 'updatedAt' fields automatically
    }
);

// Export the model so we can use it in our application
module.exports = mongoose.model('Intern', internSchema);