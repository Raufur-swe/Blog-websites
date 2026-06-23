import { Types } from "mongoose";

export interface Iprofile {
    user : Types.ObjectId;
    image ? : string | null ;
    bio ? : string ;
    totalBlog : number ,
    totalView : number,
}