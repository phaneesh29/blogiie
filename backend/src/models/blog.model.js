import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const blogSchema = new Schema({
    image: {
        type: String,
        default: "https://picsum.photos/200/300"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        default: [],
    },
    comments: [commentSchema]
}, { timestamps: true })
const BlogModel = mongoose.model('Blog', blogSchema);
export default BlogModel;