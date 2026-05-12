const express = require('express');
const { upsertProfile, getMyProfile, getAllVendors, getVendorById } = require('../controllers/vendor-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();

router.get('/', getAllVendors);
router.post('/profile', authMiddleware, upsertProfile);
router.get('/profile/me', authMiddleware, getMyProfile);
router.get('/:id', getVendorById);

module.exports = router;
