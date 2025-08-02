const asyncHandler = require('express-async-handler');
const Donation = require('../models/donationModel');
const Intern = require('../models/internModel');

// @desc    Process a new donation
// @route   POST /api/donations
// @access  Public
const createDonation = asyncHandler(async (req, res) => {
    const { amount, donorName, referralCode } = req.body;

    // Fix: Ensure amount is a valid number
    const donationAmount = parseInt(amount);

    if (isNaN(donationAmount) || donationAmount <= 0 || !referralCode) {
        res.status(400);
        throw new Error('Please provide a valid donation amount and referral code');
    }

    const intern = await Intern.findOne({ referralCode });

    if (!intern) {
        res.status(404);
        throw new Error('Intern with that referral code not found');
    }

    // Create the donation record
    const donation = await Donation.create({
        intern: intern._id,
        referralCode,
        donorName,
        amount: donationAmount, // Use the parsed number here
    });

    // Update the intern's dashboard stats with the number
    intern.totalAmountRaised += donationAmount; // Use the parsed number here
    intern.totalDonors += 1;

    // Check for milestone badges
    if (intern.totalAmountRaised >= 500 && !intern.badges.includes('₹500')) {
        intern.badges.push('₹500');
    }
    if (intern.totalAmountRaised >= 1000 && !intern.badges.includes('₹1000')) {
        intern.badges.push('₹1000');
    }
    if (intern.totalAmountRaised >= 2000 && !intern.badges.includes('₹2000')) {
        intern.badges.push('₹2000');
    }

    await intern.save();

    res.status(201).json({
        message: 'Donation successful!',
        donation,
    });
});

// @desc    Get all donations for a specific intern
// @route   GET /api/donations/intern
// @access  Private
const getInternDonations = asyncHandler(async (req, res) => {
    const donations = await Donation.find({ intern: req.intern._id }).sort({ date: -1 });
    res.status(200).json(donations);
});

module.exports = {
    createDonation,
    getInternDonations,
};