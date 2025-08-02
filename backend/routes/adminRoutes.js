const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAllInterns } = require('../controllers/adminController');
const { adminProtect } = require('../middleware/adminMiddleware');

// Public routes for admin authentication
router.post('/', registerAdmin);
router.post('/login', loginAdmin);

// Private route for fetching all interns (Admin-only access)
router.get('/interns', adminProtect, getAllInterns);

module.exports = router;