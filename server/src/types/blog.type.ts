import { Types } from "mongoose";

export type BlogStatus = "pending" | "active" |"rejected"

export interface Iblog{
    author : Types.ObjectId,
    blogTitle : String ,
    blogPeragraph : String,
    Status : BlogStatus,
    Totalviewer : Number,
    comments : string,
    Totalcommnets : Number,

}