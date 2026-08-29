const { registerSchema, loginSchema } = require("../validators/auth.validators");
const { registerUser, loginUser ,logoutUser } = require("../services/auth.service");

const register = async(req,res) =>{
    try{
        // validate request body
        const validatedData = registerSchema.parse(req.body);

        // Register user

        const user = await registerUser(validatedData);

        return res.status(201).json({
            success: true,
            message: "User registered successfuully",
            data:{
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isEmailVerified: user.isEmailVerified,
                },
            },
        });
    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
};


const login = async (req, res) => {
    try {
        // Validate request body
        const validatedData = loginSchema.parse(req.body);

        // Login user
        const {user,accessToken} = await loginUser(validatedData);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                accessToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isEmailVerified: user.isEmailVerified,
                },
            },
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};



const logout = async (req, res) => {
    try {
        await logoutUser(req.user._id);

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    register,
    login,
    logout,
};