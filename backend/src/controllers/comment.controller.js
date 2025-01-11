import BlogModel from "../models/blog.model.js"
import { CommentModel } from "../models/comment.model.js"


export const addCommentController = async (req, res) => {
    try {
        const user = req.user
        const { content, blogId } = req.body
        if (!content) {
            return res.status(400).json({ error: "Comment required" })
        }
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found." });
        }
        const comment = await CommentModel.create({
            user: user._id,
            content,
            blogId
        })
        return res.status(201).json({ message: "Comment created", comment })


    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

export const getAllCommentController = async (req, res) => {
    try {
        const { blogId } = req.body

        if (!blogId) {
            return res.status(400).json({ error: "Blog ID is required." });
        }

        const blog = await BlogModel.findById(blogId);

        if (!blog) {
            return res.status(404).json({ error: "Blog not found." });
        }

        const comments = await CommentModel.find({ blogId }).populate("user", "username").exec()
        return res.status(200).json({ message: "Comment Fetched", comments })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

export const deleteCommentController = async (req, res) => {
    try {
        const user = req.user;

        const { commentId } = req.body;

        if (!commentId) {
            return res.status(400).json({ error: "Comment ID is required." });
        }

        const comment = await CommentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found." });
        }

        if (comment.user.toString() !== user._id.toString()) {
            return res.status(403).json({ error: "You are not authorized to delete this comment." });
        }

        await CommentModel.findByIdAndDelete(commentId);
        return res.status(200).json({ message: "Comment deleted successfully." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}