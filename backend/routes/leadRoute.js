const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const { createLead, getVendorLeads, unlockLead, getCategoryOpportunities } = require('../controllers/lead-controller');

router.post('/', authMiddleware, createLead);
router.get('/vendor', authMiddleware, getVendorLeads);
router.get('/opportunities/:category', getCategoryOpportunities);
router.put('/:id/unlock', authMiddleware, unlockLead);

module.exports = router;
