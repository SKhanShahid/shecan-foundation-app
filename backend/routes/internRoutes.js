const express = require('express');
const router = express.Router();
const { registerIntern, loginIntern, getInternDashboard, getLeaderboard } = require('../controllers/internController');
const { protect } = require('../middleware/authMiddleware');

// Route for intern registration
router.post('/', registerIntern);

// Route for intern login
router.post('/login', loginIntern);

// Route for intern dashboard (Protected)
router.get('/dashboard', protect, getInternDashboard);

// Route for the public leaderboard
router.get('/leaderboard', getLeaderboard);

module.exports = router;