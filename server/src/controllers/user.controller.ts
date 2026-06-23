
// user data which can access only admin

import { Request, Response } from "express";

import profileModel from "../models/profile.model.js";
import TryCatch from "../middleware/TryCatch.js";

export const userController = {

    // get all users

    getUsers: TryCatch(async (req: Request, res: Response) => {
        const profiles = await profileModel
            .find()
            .populate({
                path: "user",
                match: { role: "user" },
                select: "name email role",
            })
            .select("image totalBlog totalView")
            .lean();

            // update existing users
        await profileModel.updateMany(
            {},
            {
                $set: {
                    totalBlog: 0,
                    totalView: 0,
                },
            }
        );

        console.log("Updated");

        const users = profiles
            .filter((profile) => profile.user)
            .map((profile: any) => ({
                id: profile.user._id,
                name: profile.user.name,
                email: profile.user.email,
                role: profile.user.role,
                image: profile.image,
                totalBlog: profile.totalBlog,
                totalView: profile.totalView,
            }));


        return res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    })
}