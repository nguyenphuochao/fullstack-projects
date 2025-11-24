import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {

        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

        if (!token) {
            return res.status(401).json({ message: "Không tìm thấy access token" });
        }

        const tokenDecode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!tokenDecode) return res.status(401).json({ success: false, message: "Authenticate" });

        req.user = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Error" });
    }
}

export default authMiddleware