import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({ success: false, message: "Authenticate" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecode) return res.status(401).json({ success: false, message: "Authenticate" });

        req.user = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Error" });
    }
}

export default authMiddleware