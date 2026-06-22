import { Types } from "mongoose";

export interface Iprofile {
    author : Types.ObjectId;
    image ? : string | null ;
    bio ? : string ;
}