const jwt = require("jsonwebtoken");

const generateAccessToken = (user) =>{

    return jwt.sign(

       {  // this is payload
         userID: user._id.toString(),
        role: user.role,
       },
       process.env.JWT_ACCESS_SECRET,
       {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
       }
    );
};

module.exports ={
    generateAccessToken,
}