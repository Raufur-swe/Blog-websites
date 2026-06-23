// user can see their profiles and update it

import { Request, Response } from "express";
import TryCatch from "../middleware/TryCatch.js";
import profileModel from "../models/profile.model.js";
import { blogModel } from "../models/blog,model.js";

export const profileController = {

    getProfile: TryCatch(async (req: Request, res: Response) => {

        // check user id

        const userId = req.user?.id;

        const profile = await profileModel.findOne({ user: userId }).populate("user", "name , email , role" );

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        const totalBlog = await blogModel.countDocuments({
            author : userId,
            status : "active"
        })

        // only active blog
        const ViewResult = await blogModel.aggregate([
            {
                $match :{
                    author : userId,
                    status : "active",
                },
            },
            {
                $group:{
                    _id : null,
                   totalViewS : {$sum  : "$views"}
                }
            }
        ])
const totalViews = ViewResult[0]?.totalViews || 0;

        res.status(200).json({
            success: true,
            profile,
            stats:{
                totalBlog,
                totalViews
            }
        });
    }),

    updateProfile: TryCatch(async (req: Request, res: Response) => {
        const userId = req.user?.id

        // Object to store only the fields that need updating
        const updates: Record<string, unknown> = {};

        // Update image only if image is provided in request body
        if (req.body.image !== undefined) {
            updates.image = req.body.image;
        }

        // Update bio only if bio is provided in request body
        if (req.body.bio !== undefined) {
            updates.bio = req.body.bio;
        }


        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided to update",
            });
        }

        // Update profile and return updated document
        const profile = await profileModel.findOneAndUpdate(
            { user: userId },
            { $set: updates },
            {
                returnDocument: 'after', // return updated document
                runValidators: true, // apply schema validations
            }
        );


        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile,
        });

    })
}