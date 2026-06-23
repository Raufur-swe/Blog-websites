import express from "express"
import { authMiddleware } from "../../middleware/auth.middleware.js"
import { blogController } from "../../controllers/blog.controller.js"

const blogRoutes = express.Router()

blogRoutes.post("/" ,authMiddleware , blogController.createBlog )


export default blogRoutes