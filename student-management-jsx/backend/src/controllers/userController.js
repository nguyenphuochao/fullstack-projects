import userModel from "../models/userModel.js";

const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user).select("-password");
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { getUser }