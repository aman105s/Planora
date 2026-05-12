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
const leadRoutes = require('./routes/leadRoute');

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from the React frontend (Vite dev server or Vercel prod)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://planora-dun-chi.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. mobile apps, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
}));

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

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
app.use('/api/leads', leadRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});