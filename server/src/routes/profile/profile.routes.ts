import express from "express"
import { authMiddleware } from "../../middleware/auth.middleware.js"
import { profileController } from "../../controllers/profile.controllers.js"

const profileRoute = express.Router()

profileRoute.get("/my-profile" , authMiddleware , profileController.getProfile ) 

profileRoute.patch("/update" , authMiddleware , profileController.updateProfile)

export default profileRoute