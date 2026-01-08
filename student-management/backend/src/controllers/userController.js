import userModel from "../models/userModel.js";

const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user).select("-password");
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

export { getUser }