import { Router } from "express";
import { authUser } from "../middlewares/user.middleware.js";
import { addCommentController, deleteCommentController, getAllCommentController } from "../controllers/comment.controller.js";

const commentrouter = Router()

commentrouter.post("/add", authUser, addCommentController)

commentrouter.post("/get", getAllCommentController)

commentrouter.post("/delete", authUser, deleteCommentController)

export { commentrouter }

