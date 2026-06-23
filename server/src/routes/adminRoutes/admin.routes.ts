

import express from "express"
import { authMiddleware } from "../../middleware/auth.middleware.js"
import { authorize } from "../../middleware/role.middleware.js"
import { userController } from "../../controllers/user.controller.js"
import { blogController } from "../../controllers/blog.controller.js"

const adminRoutes = express.Router()

adminRoutes.get("/profiles" , authMiddleware ,authorize("admin") , userController.getUsers )

adminRoutes.get("/pending-blogs" , authMiddleware ,authorize("admin") , blogController.getPendingBlog )

adminRoutes.patch("/blogs/:id/status" ,authMiddleware , authorize("admin") , blogController.updateBlogStatus)


export default adminRoutes