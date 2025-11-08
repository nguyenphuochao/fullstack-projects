import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from './config/connectDB.js';
import studentRouter from "./routes/studentRoute.js";
import subjectRouter from "./routes/subjectRoute.js";
import registerRouter from "./routes/registerRoute.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Public API
app.use("/api/auth", authRouter);

// Private API
app.use(authMiddleware);
app.use("/api/student", studentRouter);
app.use("/api/subject", subjectRouter);
app.use("/api/register", registerRouter);
app.use("/api/user", userRouter);

// Start source with localhost PORT
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server bắt đầu trên cổng ${PORT}`);
    });
});