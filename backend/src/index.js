import "dotenv/config"
import connectDB from "./db/db.config.js"
import { app } from "./app.js";

connectDB().then(() => {
    app.on("error", (error) => {
        console.log("Ann express error", error)
        process.exit(1)
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
})