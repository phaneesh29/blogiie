import { validationResult } from "express-validator"
import { UserModel } from "../models/user.model.js"
import { sendEmail } from "../utils/mailer.js"

export const registerController = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fileds are required" })
        }

        const isUserAlreadyExistByEmail = await UserModel.findOne({ email }).select("-password")
        const isUserAlreadyExistByUsername = await UserModel.findOne({ username }).select("-password")

        if (isUserAlreadyExistByEmail) {
            return res.status(400).json({ error: 'email already exist' });
        }
        if (isUserAlreadyExistByUsername) {
            return res.status(400).json({ error: 'Username already exist' });
        }

        const hashedPassword = await UserModel.hashPassword(password)
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword
        })

        await sendEmail({ email, emailType: "VERIFY", userId: user._id })
        const userObject = user.toObject()
        delete userObject.password
        res.status(201).json({
            message: "User created, check your email to verify account",
            success: true,
            user: userObject
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }

}

export const verifyEmailContoller = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { token } = req.body

        if (!token) {
            return res.status(400).json({ error: "Token is required" })
        }

        const user = await UserModel.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return res.status(400).json({ error: "Invalid token" })
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return res.status(200).json({ message: "Email verified successfully", success: true })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const userLoginController = async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const user = await UserModel.findOne({ username })
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        if (!user.isVerified) {
            await sendEmail({ email: user.email, emailType: "VERIFY", userId: user._id })
            return res.status(401).json({ error: 'User not verified, Email sent again' });
        }

        const token = user.genrateAuthToken()

        res.cookie("token", token)

        const userObject = user.toObject()
        delete userObject.password

        res.status(200).json({ message: "Login Successfull", token, user: userObject })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

export const getprofileController = async (req, res) => {
    try {
        const user = req.user
        const userObject = user.toObject()
        delete userObject.password
        res.status(200).json({user:userObject});
    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

export const logoutController = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ message: 'Logged out' })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

export const forgotPasswordController = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ error: "Email is required" })
        }

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        await sendEmail({ email, emailType: "FORGOT", userId: user._id })

        return res.status(200).json({ message: "Email sent successfully" })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const changePasswordController = async (req, res) => {
    try {
        const { token, password, confirmPassword } = req.body

        if (!token) {
            return res.status(400).json({ errors: "Token is required" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password does not match" })
        }

        const user = await UserModel.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return res.status(400).json({ error: "Invalid token" })
        }

        const hashedPassword = await UserModel.hashPassword(password)
        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save()

        return res.status(200).json({ message: "Password changed successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}