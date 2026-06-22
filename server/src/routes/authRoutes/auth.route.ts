import express from "express"
import { authController } from "../../controllers/auth.Controllers.js"
import { authRateLimit } from "../../middleware/rateLimit.js"
import { authMiddleware } from "../../middleware/auth.middleware.js"
const authRouter = express.Router()

authRouter.post("/register" , authRateLimit, authController.register) 
authRouter.post("/login" , authRateLimit, authController.login)
authRouter.post("/refresh" ,authController.refreshToken) 
authRouter.post("/logout" ,authMiddleware ,authController.logout) 



export default authRouter