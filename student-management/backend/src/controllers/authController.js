import userModel from '../models/userModel.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const registerAuth = async (req, res) => {
    try {
        // get params from request body
        const { fullname, email, password } = req.body;

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

// Login use email and password
const loginAuth = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate email
        if (!email) {
            return res.status(422).json({ success: false, message: "Vui lý nhập email" });
        }

        // validate password
        if (!password) {
            return res.status(422).json({ success: false, message: "Vui lý nhập password" });
        }

        // validate invalid user
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Thông tin đăng nhập sai" });
        }

        // validate compare password
        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.json({ success: false, message: "Thông tin đăng nhập sai" });
        }

        // create token
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Logout to destroy  oy tokens
const logoutAuth = () => {
    jwt.destroy(token);
}

// Create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}


export { registerAuth, loginAuth, logoutAuth }