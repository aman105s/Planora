const VendorProfile = require('../models/vendorProfile');
const User = require('../models/user');
const Image = require('../models/image');

const upsertProfile = async (req, res) => {
    try {
        const userId = req.userInfo.userId;
        const { businessName, experienceYears, contactMode, category, startingPrice, coverageAreas, location } = req.body;

        let profile = await VendorProfile.findOne({ userId });
        if (profile) {
            profile.businessName = businessName || profile.businessName;
            profile.experienceYears = experienceYears || profile.experienceYears;
            profile.contactMode = contactMode || profile.contactMode;
            profile.category = category || profile.category;
            profile.startingPrice = startingPrice || profile.startingPrice;
            profile.coverageAreas = coverageAreas || profile.coverageAreas;
            profile.location = location || profile.location;
            await profile.save();
        } else {
            profile = new VendorProfile({
                userId, businessName, experienceYears, contactMode, category, startingPrice, coverageAreas, location
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
        const profile = await VendorProfile.findOne({ userId: req.userInfo.userId });
        if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
        res.status(200).json({ success: true, profile });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const getAllVendors = async (req, res) => {
    try {
        const { location, category } = req.query;
        let query = {};
        
        // We can search either by exact location or if location is in coverageAreas
        if (location && location !== 'All India') {
            query.$or = [
                { location: location },
                { coverageAreas: location }
            ];
        }
        if (category) {
            query.category = category;
        }

        const vendors = await VendorProfile.find(query).populate('userId', 'username email');
        
        // Fetch a portfolio image for each vendor
        const allImages = await Image.find({});
        
        const result = vendors.map(v => {
            const vendorImages = allImages.filter(img => img.uploadedBy.toString() === v.userId._id.toString());
            const img = vendorImages.length > 0 ? vendorImages[0].url : "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400";
            return {
                id: v.userId._id,
                name: v.businessName,
                category: v.category,
                location: v.location || (v.coverageAreas && v.coverageAreas[0]) || 'India',
                price: v.startingPrice,
                rating: 5.0, // Mocked rating for UI consistency
                img
            };
        });

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { upsertProfile, getMyProfile, getAllVendors };
