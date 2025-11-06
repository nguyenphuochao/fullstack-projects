import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from './config/connectDB.js';
import studentRouter from "./routes/studentRoute.js";
import subjectRouter from "./routes/subjectRoute.js";
import registerRouter from "./routes/registerRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Define router
app.use("/api/student", studentRouter);
app.use("/api/subject", subjectRouter);
app.use("/api/register", registerRouter);

// Start source with localhost PORT
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server bắt đầu trên cổng ${PORT}`);
    });
});