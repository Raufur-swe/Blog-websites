import { Types } from "mongoose";

export type BlogStatus = "pending" | "active" |"rejected"

// comments data
export interface IComment {
  user: Types.ObjectId;
  comment: string;
  createdAt: Date;
}

// blog data type
export interface Iblog{
    author: Types.ObjectId;

  title: string;

  description: string;

  views: number;

  comments: IComment[];

  status: BlogStatus;

}