import { Router } from "express";
import { changePasswordController, forgotPasswordController, getprofileController, logoutController, registerController, userLoginController, verifyEmailContoller } from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authUser } from "../middlewares/user.middleware.js";
const userRouter = Router()

userRouter.post("/register", [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("username").isString().isLength({ min: 4 }).withMessage("Username must be at least 4 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
], registerController)


userRouter.post("/login", [
    body("username").isString().isLength({ min: 4 }).withMessage("Username must be at least 4 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
], userLoginController)

userRouter.post("/verifyemail", [
    body("token").isString().withMessage("Token not valid"),
], verifyEmailContoller)

userRouter.post("/forgot", [
    body("email").isEmail().withMessage("Enter a valid email"),
], forgotPasswordController)

userRouter.post("/change", [
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("confirmPassword").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("token").isString().withMessage("Token not valid"),
], changePasswordController)

userRouter.get("/me", authUser, getprofileController)
userRouter.get("/logout", authUser, logoutController)


export { userRouter }