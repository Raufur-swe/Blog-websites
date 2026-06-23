// create a profile schema

import mongoose, { model } from "mongoose";
import { Iprofile } from "../types/profile.types.js";

const profileSchema = new mongoose.Schema<Iprofile>({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true ,
        unique : true,
    },
     image: {
      type: String,
      default: null,
      trim: true,
    },
      bio: {
      type: String,
      default: "",
      maxlength: 300,
      trim: true,
    },
    totalBlog :{
      type : Number,
      default : 0,

    },
    totalView :{
      type : Number,
      default : 0
    }
},{timestamps : true})

const profileModel = model<Iprofile>("profile" , profileSchema)

export default profileModel