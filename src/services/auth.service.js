const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateAccessToken } = require("../utils/jwt");

const registerUser = async ({ name, email, password }) => {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return user;
};

const loginUser = async ({ email, password }) => {
    // Find user by email and include password
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists
    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    // Check password
    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }


  

    
    //  Generate access token 
    const accessToken = generateAccessToken(user);
    
    
    
    return {
        user,  
        accessToken,
        
    };
        


};


 const logoutUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // Remove refresh token
    user.refreshToken = null;

    await user.save();

    return true;
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};