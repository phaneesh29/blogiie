import { Router } from "express";
import { body } from "express-validator";
import { authUser } from "../middlewares/user.middleware.js";
import { addBlog, blogByUser, deleteBlog, editBlog, getAllBlog, getBlogById, searchBlog } from "../controllers/blog.controller.js";

const blogRouter = Router()

blogRouter.post("/add", authUser, [
    body("title").isString().withMessage("Title is required"),
    body("description").isString().withMessage("Title is required")
], addBlog)

blogRouter.get("/all-blogs", getAllBlog)

blogRouter.get("/blog/:id", getBlogById)

blogRouter.post("/edit", authUser, [
    body("title").isString().withMessage("Title is required"),
    body("description").isString().withMessage("Title is required")
], editBlog)

blogRouter.post("/delete", authUser, deleteBlog)
blogRouter.post("/search", searchBlog)

blogRouter.get("/user/:un",blogByUser)




export { blogRouter }
