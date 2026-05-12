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
        
        const validVendors = vendors.filter(v => v.userId && v.userId._id);
        
        const result = validVendors.map(v => {
            const vendorImages = allImages.filter(img => img.uploadedBy.toString() === v.userId._id.toString());
            const img = vendorImages.length > 0 ? vendorImages[0].url : "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400";
            return {
                id: v.userId._id,
                name: v.businessName,
                category: Array.isArray(v.category) ? v.category.join(', ') : v.category,
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

const getVendorById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await VendorProfile.findOne({ userId: id }).populate('userId', 'username');
        if (!profile) return res.status(404).json({ success: false, message: 'Vendor not found' });
        const images = await Image.find({ uploadedBy: id });
        const urls = images.map(img => img.url);
        const fallback = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600';
        res.status(200).json({
            success: true,
            vendor: {
                id,
                name: profile.businessName,
                category: Array.isArray(profile.category) ? profile.category.join(', ') : profile.category,
                location: profile.location || (profile.coverageAreas && profile.coverageAreas[0]) || 'India',
                coverageAreas: profile.coverageAreas || [],
                price: profile.startingPrice,
                startingPrice: profile.startingPrice,
                rating: 5.0,
                reviewCount: 0,
                isVerified: true,
                experienceYears: profile.experienceYears,
                coverImage: urls[0] || fallback,
                images: urls.length ? urls : [fallback],
                description: `${profile.businessName} is a professional ${Array.isArray(profile.category) ? profile.category[0] : profile.category} with ${profile.experienceYears || 'several'} years of experience, serving ${(profile.coverageAreas || [profile.location || 'India']).join(', ')}.`,
                services: [...(Array.isArray(profile.category) ? profile.category : [profile.category]), 'Custom Packages', 'Event Coverage', 'Consultation'],
                packages: [
                    { name: 'Essential', price: profile.startingPrice, desc: 'Core package — contact for full details' },
                    { name: 'Premium', price: Math.round((profile.startingPrice || 50000) * 1.8), desc: 'Enhanced coverage with premium deliverables' },
                ],
                reviews: [],
                bookingsThisMonth: Math.floor(Math.random() * 20) + 5,
                trending: true,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { upsertProfile, getMyProfile, getAllVendors, getVendorById };
