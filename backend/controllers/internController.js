const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Intern = require('../models/internModel');

// @desc    Register a new intern
// @route   POST /api/interns
// @access  Public
const registerIntern = asyncHandler(async (req, res) => {
    // Get the intern data from the request body
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    // Check if intern already exists
    const internExists = await Intern.findOne({ email });
    if (internExists) {
        res.status(400);
        throw new Error('Intern already exists');
    }

    // Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a unique referral code
    const referralCode = `SC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Create the new intern
    const intern = await Intern.create({
        name,
        email,
        password: hashedPassword,
        referralCode,
    });

    // Respond with the new intern data
    if (intern) {
        res.status(201).json({
            _id: intern._id,
            name: intern.name,
            email: intern.email,
            referralCode: intern.referralCode,
            totalAmountRaised: intern.totalAmountRaised,
            token: generateToken(intern._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid intern data');
    }
});
// @desc    Authenticate an intern and get a token
// @route   POST /api/interns/login
// @access  Public
const loginIntern = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for intern's email
    const intern = await Intern.findOne({ email });

    if (intern && (await bcrypt.compare(password, intern.password))) {
        res.json({
            _id: intern._id,
            name: intern.name,
            email: intern.email,
            referralCode: intern.referralCode,
            token: generateToken(intern._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});
// @desc    Get the leaderboard data
// @route   GET /api/interns/leaderboard
// @access  Public
const getLeaderboard = asyncHandler(async (req, res) => {
    const leaderboard = await Intern.find({})
        .sort({ totalAmountRaised: -1 })
        .limit(10)
        .select('name totalAmountRaised totalDonors referralCode');

    res.status(200).json(leaderboard);
});
// @desc    Get intern dashboard data
// @route   GET /api/interns/dashboard
// @access  Private
const getInternDashboard = asyncHandler(async (req, res) => {
    // The intern data is already attached to the request by the middleware
    res.status(200).json(req.intern);
});

// Helper function to generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerIntern,
    loginIntern,
    getInternDashboard,
    getLeaderboard,
};