const { registerSchema } = require("../validators/auth.validators");
const { registerUser } = require("../services/auth.service");

const register = async(req,res) =>{
    try{
        // validate request body
        const validatedData = registerSchema = registerSchema.parse(req.body);

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

module.exports = {
    register,
};