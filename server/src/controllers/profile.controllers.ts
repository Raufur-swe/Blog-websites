// user can see their profiles and update it

import { Request, Response } from "express";
import TryCatch from "../middleware/TryCatch.js";
import profileModel from "../models/profile.model.js";

export const profileController = {

    getProfile: TryCatch(async (req: Request, res: Response) => {

        // check user id

        const userId = req.user?.id;

        const profile = await profileModel.findOne({ user: userId }).populate("user", "name , email , role");

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        res.status(200).json({
            success: true,
            profile,
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

        // Update profile and return updated document
        const profile = await profileModel.findOneAndUpdate(
            { author: userId },
            { $set: updates },
            {
                new: true, // return updated document
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