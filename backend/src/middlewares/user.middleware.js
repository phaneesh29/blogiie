import {UserModel} from "../models/user.model.js";
import jwt from "jsonwebtoken"


export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findById(decoded._id)
        req.user = user
        return next()
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized', errors: error });
    }
}