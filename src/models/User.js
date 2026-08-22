const mongoose = require("mongoose");
const { lowercase } = require("zod");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Name is required"],
            trim : true,
            minlength: [2,"Name must be two char long"],
            maxLength: [50, "Name cannot be exceed 50 characters"],


        },
        email:{
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
 
        },
    }
)