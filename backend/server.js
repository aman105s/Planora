require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');
const uploadImageRoutes = require('./routes/image-routes');
const vendorRoutes = require('./routes/vendor-routes');
const coupleRoutes = require('./routes/couple-routes');
const bookingRoutes = require('./routes/booking-routes');
const messageRoutes = require('./routes/message-routes');

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from the React frontend (Vite dev server)
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
    credentials: true
}));

//middleware to parse incoming JSON data
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/image', uploadImageRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/couples', coupleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});