

import express from "express"
import { authMiddleware } from "../../middleware/auth.middleware.js"
import { authorize } from "../../middleware/role.middleware.js"
import { userController } from "../../controllers/user.controller.js"

const adminRoutes = express.Router()

adminRoutes.get("/profiles" , authMiddleware ,authorize("admin") , userController.getUsers )


export default adminRoutes