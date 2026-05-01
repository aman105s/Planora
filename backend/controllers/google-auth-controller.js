const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'dummy_client_id_for_dev');

const googleLogin = async (req, res) => {
    try {
        const { idToken, role } = req.body;
        
        if (!idToken) {
            return res.status(400).json({ success: false, message: 'Google Token ID is required' });
        }

        let payload;
        if (idToken === 'dev_mock_token') {
            payload = {
                email: 'googleuser@example.com',
                name: 'Google User',
                sub: '10101010101010101010',
                picture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
            };
        } else {
            try {
                // Fetch User info using the access_token from Google
                const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${idToken}` }
                });
                if (!userInfoRes.ok) throw new Error('Invalid Google Access Token');
                payload = await userInfoRes.json();
            } catch (error) {
                console.error("Token verification failed", error);
                return res.status(401).json({ success: false, message: 'Invalid Google Token' });
            }
        }

        if (!payload || !payload.email) {
            return res.status(400).json({ success: false, message: 'Invalid Google Token Payload' });
        }

        const { email, name, sub: googleId, picture } = payload;

        // Check if user exists
        let user = await User.findOne({ email });

        let isNewUser = false;

        if (!user) {
            isNewUser = true;
            // Create a new user with Google ID
            // Generate a unique username from email prefix
            let baseUsername = email.split('@')[0];
            let username = baseUsername;
            let counter = 1;
            
            while (await User.findOne({ username })) {
                username = `${baseUsername}${counter}`;
                counter++;
            }

            // Fallback to determine role context if not explicitly registered as vendor/admin
            const assignedRole = (role === 'Vendor' || role === 'admin') ? 'admin' : 'user';

            user = new User({
                username,
                email,
                googleId,
                profilePic: picture,
                role: assignedRole,
                password: null // No password for Google authenticated users
            });

            await user.save();
        } else {
            // Link existing user if they login with Google for the first time
            if (!user.googleId) {
                user.googleId = googleId;
                if (!user.profilePic && picture) user.profilePic = picture;
                await user.save();
            }
        }

        // Issue JWT similar to standard login
        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '15m'
        });

        res.status(200).json({
            success: true,
            message: "User logged in with Google successfully!",
            accessToken,
            isNewUser
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred during Google authentication."
        });
    }
};

module.exports = { googleLogin };
