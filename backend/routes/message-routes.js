const express = require('express');
const { sendMessage, getConversation, getConversationsList } = require('../controllers/message-controller');
const authMiddleware = require('../middleware/auth-middleware');

const router = express.Router();

router.post('/', authMiddleware, sendMessage);
router.get('/conversations', authMiddleware, getConversationsList);
router.get('/:otherUserId', authMiddleware, getConversation);

module.exports = router;
