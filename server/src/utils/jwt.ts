
// create jwt token

import jwt from "jsonwebtoken"
import { env } from "../config/env.js"

interface jwtPlayload {
    id : string ,
    role : string
}

// genarate access token

export const genarateAccessToken = (payload : jwtPlayload) : string =>{
    return jwt.sign(payload , env.ACCESS_TOKEN , {expiresIn : "15m"} )
}

/*here we generate token for redirect or auto login */

// genarate refresh token
export const genarateRefreshToken = (payload : jwtPlayload) : string =>{
    return jwt.sign(payload , env.REFRESH_TOKEN , {expiresIn : "7d"} )
}

export const verifyAccessToken = (token : string)=>{
    return jwt.verify(
        token,
        env.ACCESS_TOKEN
    )
}
export const verifyRefreshToken = (token : string)=>{
    return jwt.verify(
        token,
        env.REFRESH_TOKEN
    )
}