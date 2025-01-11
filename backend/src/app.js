import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user.route.js";
import { blogRouter } from "./routes/blog.route.js";
import { commentrouter } from "./routes/comment.route.js";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/users",userRouter)
app.use("/blogs",blogRouter)
app.use("/comments",commentrouter)

app.get("/status",(req,res)=>{
    res.status(200).json({
        message:"Running",
        date:Date.now()
    })
})

export { app }