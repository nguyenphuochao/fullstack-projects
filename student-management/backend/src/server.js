import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from './config/connectDB.js';
import studentRouter from "./routes/studentRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/student", studentRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server bắt đầu trên cổng ${PORT}`);
    });
});