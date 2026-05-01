const express = require('express');
const {registerUser, loginUser, changePassword, checkEmail} = require('../controllers/auth-controller');
const { googleLogin } = require('../controllers/google-auth-controller');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');

//all routes are related to authentication and authorization
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password',authMiddleware, changePassword);
router.post('/check-email', checkEmail);
router.post('/google', googleLogin);

module.exports = router;