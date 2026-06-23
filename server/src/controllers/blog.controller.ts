import { Request, Response } from "express";
import TryCatch from "../middleware/TryCatch.js";
import { blogModel } from "../models/blog,model.js";


export const blogController = {

    // create blog 
   createBlog: TryCatch(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    const { title, description } = req.body;

    const newBlog = await blogModel.create({
        author: userId,
        title,
        description,
    });

    const blog = await blogModel
        .findById(newBlog._id)
        .populate("author", "name email image");

    return res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog,
    });
}) ,

// get all pending blog for admin dashboard
getPendingBlog : TryCatch(async(req : Request , res: Response)=>{

    const blogs = await blogModel.find({status : "pending"}).populate("author" , "name email")

    return res.status(200).json({
        success: true,
    count: blogs.length,
    blogs,
    })
}),
// update blog
updateBlogStatus: TryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const blog = await blogModel.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: `Blog ${status} successfully`,
    blog,
  });
})

}