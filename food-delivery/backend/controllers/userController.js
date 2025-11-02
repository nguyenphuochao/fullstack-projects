import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // checking is user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter password 8 digits or more" });
        }

        // hasing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        return res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" });
    }
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        return res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" });
    }
}

// create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

export { registerUser, loginUser }