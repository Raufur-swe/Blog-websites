import { Request, Response } from "express";
import TryCatch from "../middleware/TryCatch.js";
import { loginValidator, registerValidator } from "../config/zod.js";
import sanitize from "mongo-sanitize";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genarateAccessToken, genarateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { accessCookieOption, refreshCookieOptions } from "../utils/cookie.js";
import { JwtPayload } from "jsonwebtoken";
import profileModel from "../models/profile.model.js";

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
            password: hashpassword
        })

        // create profile
        await profileModel.create({
            user : user._id
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
    }),

    // login

    login: TryCatch(async (req: Request, res: Response) => {

        const sanitizedBody = sanitize(req.body)

        const validation = loginValidator.safeParse(sanitizedBody)

        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid credentials",

            });
        }

        const { email, password } = validation.data;

        const user = await userModel.findOne({ email }).select("+password")

        if (!user) {
            return res.status(404).json({
                message: "User not foound"
            })
        }

        const isPass = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPass) {
            return res.status(401).json({
                message: "invalid ccredintials"
            })
        }

        const accessToken = genarateAccessToken({
            id: user._id.toString(),
            role: user.role
        })

        const refreshToken = genarateRefreshToken({
            id: user._id.toString(),
            role: user.role
        })

        res.cookie("refreshToken", refreshToken, refreshCookieOptions)
        res.cookie("accessToken", accessToken, accessCookieOption)

        return res.status(200).json({
            success: true,
            message: `Welcome ${user.name}`,
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    }),

    //refreshToken

    refreshToken: TryCatch(async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "invalid refresh token"
            })
        }

        const decode = verifyRefreshToken(refreshToken) as JwtPayload & {
            id: string,
            role: string,
        }
        if (!decode) {
            return res.status(401).json({
                message: "INvalid refresh Token"
            })
        }

        const user = await userModel.findById(decode.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No such user"
            })
        }

        // genarate new access token

        const accessToken = genarateAccessToken({
            id: user._id.toString(),
            role: user.role
        })

        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            accessToken,
        });
    }),

    // logout

    logout : TryCatch(async(req:Request , res: Response)=>{
        // clear cookie
        res.clearCookie("refreshToken" , refreshCookieOptions)
        res.clearCookie("accessToken" , accessCookieOption)

        return res.status(200).json({
             success: true,
        message: "Logged out successfully",
        })

    })



}