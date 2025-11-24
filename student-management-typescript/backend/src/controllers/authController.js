import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sessionModel from '../models/sessionModel.js';

const ACCESS_TOKEN_TTL = '30m'; // 30 minutes
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 days

// Sign up
const signUp = async (req, res) => {
    try {
        // get params from request body
        const { fullname, email, password } = req.body;

        // validate fullname, email and password
        if (!fullname || !email || !password) {
            return res.status(400).json({ success: false, message: "Vui lý nhập đầy đủ thông tin" });
        }

        // check email exists
        const emailExists = await userModel.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ success: false, message: "Email này đã được đăng kí. Vui lòng thử email khác" });
        }

        // hasing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // save user to db
        await userModel.create({ fullname, email, password: hashedPassword });

        res.status(201).json({ success: true, message: "Đăng kí tài khoản thành công" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

// Sign in
const signIn = async (req, res) => {
    try {
        // get inputs
        const { email, password } = req.body;

        // validate email and password
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Vui lý nhập email và password" });
        }

        // check invalid user
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "Thông tin đăng nhập sai" });
        }

        // check compare password
        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.status(401).json({ success: false, message: "Thông tin đăng nhập sai" });
        }

        // create access token with JWT
        const token = createToken(user._id);

        // create refresh token
        const refreshToken = crypto.randomBytes(64).toString("hex");

        // create new session model
        await sessionModel.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
        })

        // return refresh token in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true, // support https
            sameSite: "none", // backend and frontend in different domain
            maxAge: REFRESH_TOKEN_TTL, // 14 days
        });

        // return access token response
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

const signOut = async (req, res) => {
    try {
        // get refresh token from cookie
        const token = req.cookies?.refreshToken;

        if (token) {
            // detele refresh token in DB
            await sessionModel.deleteOne({ refreshToken: token });

            // clear cookie
            res.clearCookie("refreshToken");
        }

        return res.sendStatus(204); // return nocontent
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

// Create access token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
}

export { signUp, signIn, signOut }