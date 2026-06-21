// create a user model for auth

import mongoose, { model } from "mongoose";
import { Iuser } from "../types/user.interface.js";

const userSchema = new mongoose.Schema<Iuser>({
    name :{
        type : String ,
        required : [true , "name is required" ],
        trim : true ,
        minLength : 4 ,
        maxLength : 50,  
    },

    email:{
         type : String ,
        required : [true , "email is required" ],
        trim : true ,
        unique : true ,
        lowercase : true
    },
    password : {
          type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
      role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // Default role
    },
},{timestamps : true})


 const userModel = model<Iuser>("user" , userSchema)

 export default userModel