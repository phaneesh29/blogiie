import { validationResult } from "express-validator";
import BlogModel from "../models/blog.model.js";

export const addBlog = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tags, image } = req.body;

        const userId = req.user._id

        if (!title || !description) {
            return res.status(400).json({ error: "Title and Description is required" });
        }

        const newBlog = await BlogModel.create({
            title,
            description,
            image: image || "https://picsum.photos/300/200",
            tags: tags || [],
            user: userId
        })
        res.status(201).json({
            message: "Blog created successfully",
            blog: newBlog,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllBlog = async (req, res) => {
    try {
        const allBlogs = await BlogModel.find({}).populate("user", "username email").exec()
        res.status(200).json({
            message: "Fetched all blogs",
            blogs: allBlogs,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: "No ID provided" });
        }
        const getBlog = await BlogModel.findById(id).populate("user", "username email").exec()

        if (!getBlog) {
            return res.status(404).json({ error: "No blog found with the provided ID" });
        }
        res.status(200).json({
            message: "Blog Fetched",
            blog: getBlog,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

export const editBlog = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = req.user

        const { title, description, tags, image, blogId } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: "Title and Description is required" });
        }

        const existingBlog = await BlogModel.findById(blogId)
        if (!existingBlog) {
            return res.status(404).json({ error: "Blog not found." });
        }

        if (existingBlog.user.toString() !== user._id.toString()) {
            return res.status(400).json({ error: "You can't edit this blog" });
        }

        const updatedBlog = await BlogModel.findOneAndUpdate({ _id: blogId, user: user._id }, {
            title,
            description,
            image: image || "https://picsum.photos/300/200",
            tags: tags || []
        }, { new: true })

        res.status(200).json({
            message: "Blog Edited",
            editedBlog: updatedBlog,
        });


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const user = req.user
        const { blogId } = req.body

        const existingBlog = await BlogModel.findById(blogId)
        if (!existingBlog) {
            return res.status(404).json({ error: "Blog not found." });
        }
        if (existingBlog.user.toString() !== user._id.toString()) {
            return res.status(403).json({ error: "You can't delete this blog" });
        }
        const deletedBlog = await BlogModel.findOneAndDelete({ _id: blogId, user: user._id })

        res.status(200).json({
            message: "Blog deleted",
            deletedBlog: deletedBlog,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const searchBlog = async (req, res) => {
    try {
        const { query } = req.body
        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }
        const searchedBlogs = await BlogModel.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { tags: { $in: [query] } }
            ]
        }).populate("user", "username email").exec()
        if (searchedBlogs.length === 0) {
            return res.status(404).json({ error: "No blogs found matching your query." });
        }
        res.status(200).json({ query, searchedBlogs: searchedBlogs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
