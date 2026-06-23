// blog model

import mongoose, { model } from "mongoose";
import { Iblog, IComment } from "../types/blog.type.js";

// comments model
const commentsSchema = new mongoose.Schema<IComment>({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
    },
},{timestamps : true})

// blog model

const blogSchema = new mongoose.Schema<Iblog>({
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    comments: [commentsSchema],

    status: {
      type: String,
      enum: ["pending", "active", "rejected"],
      default: "pending",
    },
},{timestamps : true})

const blogModel = model<Iblog>("blog" , blogSchema);
const commentsModel = model<IComment>("comment",commentsSchema)

export {blogModel ,  commentsModel}