const express = require('express');
const router = express.Router();
const { createDonation, getInternDonations } = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');

// Public route to process a new donation
router.post('/', createDonation);

// Private route to get all donations for a logged-in intern
router.get('/intern', protect, getInternDonations);

module.exports = router;