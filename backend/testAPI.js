const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();

async function testIt() {
  await mongoose.connect(process.env.MONGO_URI);
  const users = await User.find({});
  
  for (let user of users) {
    const token = require('jsonwebtoken').sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
        
    try {
      const res = await fetch('http://localhost:3000/api/messages/conversations', { 
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      console.log(`User ${user.username} (${user.role}) - messages:`, res.status, data.success);
    } catch(e) {
      console.error(e);
    }
  }
  process.exit(0);
}

testIt();
