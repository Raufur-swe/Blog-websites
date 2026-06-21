import express from "express"
import { authController } from "../../controllers/auth.Controllers.js"
import { authRateLimit } from "../../middleware/rateLimit.js"
const authRouter = express.Router()

authRouter.post("/register" , authRateLimit, authController.register) 



export default authRouter