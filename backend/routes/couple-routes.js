const express = require('express');
const { upsertProfile, getMyProfile } = require('../controllers/couple-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();

router.post('/profile', authMiddleware, upsertProfile);
router.get('/profile/me', authMiddleware, getMyProfile);

module.exports = router;
