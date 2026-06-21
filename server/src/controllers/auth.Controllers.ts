import { Request, Response } from "express";
import TryCatch from "../middleware/TryCatch.js";
import { registerValidator } from "../config/zod.js";
import sanitize from "mongo-sanitize";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genarateAccessToken, genarateRefreshToken } from "../utils/jwt.js";
import { refreshCookieOptions } from "../utils/cookie.js";

export const authController = {

    // registration
    register: TryCatch(async (req: Request, res: Response) => {
        const sanitizedBody = sanitize(req.body)

        const validation = registerValidator.safeParse(sanitizedBody)

        if (!validation.success) {
            const errors = validation.error.issues.map((issue) => ({
                field: issue.path.join(".") || "unknown",
                message: issue.message,
                code: issue.code
            }));

            return res.status(400).json({
                message: "Invalid credentials",
                errors
            });
        }

        const { name, email, password } = validation.data

        //find email already exit or not

        const exituser = await userModel.findOne({ email })
        if (exituser) {
            return res.status(400).json({
                message: "user already exist , try another email"
            })
        }

        // hash the pass
        const hashpassword = await bcrypt.hash(password, 10)

        // create useer 
        const user = await userModel.create({
            name,
            email,
        password : hashpassword
        })

        // genarate accesstoken and refreshtoken

        const accessToken = genarateAccessToken({
            id: user._id.toString(),
            role: user.role,
        })

        const refreshToken = genarateRefreshToken({
            id: user._id.toString(),
            role: user.role,
        })

        // set refresh token in cookie
        res.cookie("refreshToken", refreshToken, refreshCookieOptions)
       
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    })
}