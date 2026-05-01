const CoupleProfile = require('../models/coupleProfile');

const upsertProfile = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        const { partnerName, weddingDate, guestCount, style, budget, priority, vendorRequirements } = req.body;

        let profile = await CoupleProfile.findOne({ userId });
        if (profile) {
            if(partnerName) profile.partnerName = partnerName;
            if(weddingDate) profile.weddingDate = weddingDate;
            if(guestCount) profile.guestCount = guestCount;
            if(style) profile.style = style;
            if(budget) profile.budget = budget;
            if(priority) profile.priority = priority;
            if(vendorRequirements) profile.vendorRequirements = vendorRequirements;
            await profile.save();
        } else {
            profile = new CoupleProfile({
                userId, partnerName, weddingDate, guestCount, style, budget, priority, vendorRequirements
            });
            await profile.save();
        }
        res.status(200).json({ success: true, profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const getMyProfile = async (req, res) => {
    try {
        const profile = await CoupleProfile.findOne({ userId: req.userInfo.userId });
        if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
        res.status(200).json({ success: true, profile });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { upsertProfile, getMyProfile };
