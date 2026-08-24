const bcrypt = require("bcrypt");
const User = require("../models/User");


const  registerUser = async({name,email,password})=>{
    // check if user already exists


    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new Error("User with this email already exsist");
    }

    // Now hash password
    const hashedPassword = await bcrypt.hash(password,12);

    // creare user 
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return user;
}

module.exports = {
   
    registerUser,
    
}