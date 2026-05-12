const Lead = require('../models/lead');
const Message = require('../models/message');

const createLead = async (req, res) => {
    try {
        const { vendorId, name, weddingDate, budget, message } = req.body;
        
        const lead = new Lead({
            clientId: req.userInfo.userId,
            vendorId,
            name,
            weddingDateLocation: weddingDate,
            budget,
            message,
            status: 'new',
            priceToUnlock: 500
        });
        await lead.save();

        if (message && message.trim() !== '') {
            const initialMsg = new Message({
                senderId: req.userInfo.userId,
                receiverId: vendorId,
                content: message
            });
            await initialMsg.save();
        }

        res.status(201).json({ success: true, lead });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const getVendorLeads = async (req, res) => {
    try {
        const leads = await Lead.find({ vendorId: req.userInfo.userId }).populate('clientId', 'username email').sort({ createdAt: -1 });
        const validLeads = leads.filter(l => l.clientId); // Filter out deleted users
        res.status(200).json({ success: true, leads: validLeads });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const unlockLead = async (req, res) => {
    try {
        const { id } = req.params;
        const lead = await Lead.findOne({ _id: id, vendorId: req.userInfo.userId });
        if (!lead) return res.status(404).json({ success: false, message: 'Lead not found or not yours' });

        lead.status = 'unlocked';
        await lead.save();

        res.status(200).json({ success: true, lead });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const getCategoryOpportunities = async (req, res) => {
    try {
        const { category } = req.params;
        
        // In a real app, you'd aggregate real Leads or VendorProfiles matching this category.
        // Here we mock data intelligently to act as a business growth tool.
        
        // Generate pseudo-random data based on category string length for stability
        const seed = category.length;
        const activeLeads = (seed * 15) + Math.floor(Math.random() * 50); // e.g. 150 - 300
        const demandLevel = activeLeads > 200 ? 'High' : (activeLeads > 100 ? 'Medium' : 'Growing');
        
        const priceMap = {
            'Photographer': '₹80,000 - ₹1,50,000',
            'Videographer': '₹60,000 - ₹1,20,000',
            'Makeup Artist': '₹15,000 - ₹40,000',
            'Wedding Planner': '₹1,00,000+',
            'Caterer': '₹1,200/plate',
            'Decorator': '₹2,00,000+',
            'DJ & Music': '₹30,000 - ₹70,000',
            'Venue': '₹5,00,000+'
        };
        const averagePrice = priceMap[category] || 'Variable Pricing';

        res.status(200).json({
            success: true,
            data: {
                category,
                activeLeads,
                demandLevel,
                averagePrice
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { createLead, getVendorLeads, unlockLead, getCategoryOpportunities };
