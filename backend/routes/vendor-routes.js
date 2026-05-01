const express = require('express');
const { upsertProfile, getMyProfile, getAllVendors } = require('../controllers/vendor-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();

router.get('/', getAllVendors); // public route
router.post('/profile', authMiddleware, upsertProfile);
router.get('/profile/me', authMiddleware, getMyProfile);

module.exports = router;
