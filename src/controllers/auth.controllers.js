const { registerSchema, loginSchema } = require("../validators/auth.validators");
const { registerUser, loginUser } = require("../services/auth.service");

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
        const user = await loginUser(validatedData);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
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



module.exports = {
    register,
    login,
};