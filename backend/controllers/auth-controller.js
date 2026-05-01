const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register controller
const registerUser = async(req, res) => {
    try{
        //extracting data from request body
        const {username, email, password, role} = req.body;

        //if the user is already exist in the database
        const checkExistingUser = await User.findOne({$or: [{email}, {username}]});
        if(checkExistingUser){
            return res.status(400).json({
                success: false,
                message: "User is already exists either with the same email or username! Please try with different email or username."
            });
        }
        //hashing the password before saving to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating new user in the database
        const newlyCreatedUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user' //if role is not provided, default to 'user'
        });
        await newlyCreatedUser.save();

        if(newlyCreatedUser){
            res.status(201).json({
                success: true,
                message: "User registered successfully! Please login to continue."
            })
        }else{
            res.status(400).json({
                success: false,
                message: "User registration failed! Please try again later."
            });
        }


    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured! Please try again later."
        });
    }
}

//login controller
const loginUser = async (req, res) => {
    try{
        const {username, password} = req.body;

        //check if the user exist in the database
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid username or password!"
            });
        }
        //if the password is correct or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid username or password!"
            });
        }

        //create user token 
        const accessToken = jwt.sign({
        userId: user._id,
        username: user.username,
        role: user.role
        }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15m'
        });

        res.status(200).json({
        success: true,
        message: "User logged in successfully!",
        accessToken
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured! Please try again later."
        });
    };
};

const changePassword = async(req, res)=>{
    try{
        const userId = req.userInfo.userId;

        //extract old and new password
        const {oldPassword, newPassword} = req.body;

        //find the current logged in user
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found.'
            });
        }

        //check if the old password is correct
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: 'Old Password is not correct! Please try again.',
            })
        }

        //hash the new password 
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        //update user password
        user.password = newHashedPassword
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully.'
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured! Please try again later."
        });
    };
};

const checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.status(200).json({ success: true, exists: true });
        } else {
            res.status(404).json({ success: true, exists: false, message: 'No account found with this email.' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    changePassword,
    checkEmail
};