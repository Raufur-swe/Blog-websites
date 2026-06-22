import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { JwtPayload } from "jsonwebtoken";
import { IUserPayload } from "../types/express.js";

export const authMiddleware =(req: Request , res: Response , next : NextFunction)=>{
   try {
     const token = req.cookies?.accessToken ;

    if(!token){
       return res.status(401).json({
            messaage : "unautharised access",
        })
    }

    const decode = verifyAccessToken(token) as IUserPayload ;

    req.user = decode

    next()

   } catch (error) {
    return res.status(401).json({
        message : "invalid token"
    })
   }
}