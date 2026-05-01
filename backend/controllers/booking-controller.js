const Booking = require('../models/booking');
const VendorProfile = require('../models/vendorProfile');

const createBooking = async (req, res) => {
    try {
        const { vendorId, coupleNames, weddingDateLocation, message } = req.body;
        const booking = new Booking({
            clientId: req.userInfo.userId,
            vendorId,
            coupleNames,
            weddingDateLocation,
            message,
            status: 'pending'
        });
        await booking.save();
        res.status(201).json({ success: true, booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const getClientBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ clientId: req.userInfo.userId }).populate('vendorId', 'username email').sort({ createdAt: -1 });
        
        // Also attach vendor business name
        const result = [];
        for (let b of bookings) {
            if (!b.vendorId) continue; // Skip bookings with deleted vendors
            const vp = await VendorProfile.findOne({ userId: b.vendorId._id });
            result.push({
                ...b._doc,
                vendorBusinessName: vp ? vp.businessName : b.vendorId.username,
                vendorCategory: vp ? vp.category : 'Vendor'
            });
        }
        res.status(200).json({ success: true, bookings: result });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const getVendorBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ vendorId: req.userInfo.userId }).populate('clientId', 'username email').sort({ createdAt: -1 });
        const validBookings = bookings.filter(b => b.clientId); // Filter out bookings with deleted clients
        res.status(200).json({ success: true, bookings: validBookings });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const booking = await Booking.findOne({ _id: id, vendorId: req.userInfo.userId });
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found or not yours' });

        booking.status = status;
        await booking.save();

        res.status(200).json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { createBooking, getClientBookings, getVendorBookings, updateBookingStatus };
