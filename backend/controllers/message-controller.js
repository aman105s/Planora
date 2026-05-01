const Message = require('../models/message');
const User = require('../models/user');
const VendorProfile = require('../models/vendorProfile');
const CoupleProfile = require('../models/coupleProfile');

const sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;
        const message = new Message({
            senderId: req.userInfo.userId,
            receiverId,
            content
        });
        await message.save();
        res.status(201).json({ success: true, message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const getConversation = async (req, res) => {
    try {
        const { otherUserId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId: req.userInfo.userId, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: req.userInfo.userId }
            ]
        }).sort({ createdAt: 1 });
        res.status(200).json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const getConversationsList = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        // Find all distinct users we have exchanged messages with
        const sent = await Message.distinct('receiverId', { senderId: userId });
        const received = await Message.distinct('senderId', { receiverId: userId });
        
        const otherUserIds = [...new Set([
            ...sent.filter(id => id).map(id => id.toString()), 
            ...received.filter(id => id).map(id => id.toString())
        ])];
        
        const users = await User.find({ _id: { $in: otherUserIds } }).select('username email role');
        
        // Enrich with profile names for better UI
        const enriched = await Promise.all(users.map(async (u) => {
            let displayName = u.username;
            if (u.role === 'admin' || u.role === 'vendor') {
                const vp = await VendorProfile.findOne({ userId: u._id });
                if (vp) displayName = vp.businessName;
            } else {
                const cp = await CoupleProfile.findOne({ userId: u._id });
                if (cp && cp.partnerName) displayName = `${u.username} & ${cp.partnerName}`;
            }
            return {
                _id: u._id,
                username: u.username,
                displayName,
                role: u.role
            };
        }));

        res.status(200).json({ success: true, conversations: enriched });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { sendMessage, getConversation, getConversationsList };
