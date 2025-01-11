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
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    }
})

const CommentModel = mongoose.model('Comment', commentSchema);
export { CommentModel }