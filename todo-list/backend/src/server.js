import express from "express";
import mongoose, { Schema } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/todo_list");
        console.log("connectDB success");
    } catch (error) {
        console.log("connectDB failed:", error);
    }
};

// connect to DB
connectDB();

// model task
const taskSchema = new Schema(
    {
        title: {
            required: true,
            trim: true,
            type: String,
        },
        status: {
            enum: ["active", "completed"],
            type: String,
        },
        completedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);

const app = express();

const port = 5001;

// list tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({});
        return res.status(200).json(tasks);
    } catch (error) {
        console.log("Lổi xảy ra khi gọi listTasks:", error);
        return res.status(500).json({ message: "Error server" });
    }
});

// create task
app.get("/api/tasks", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Vui lòng nhập title" });
        }

        const task = await Task.create({
            title,
            status: "active",
            completedAt: null,
        });

        return res.status(201).json(task);
    } catch (error) {
        console.log("Lổi xảy ra khi gọi listTasks:", error);
        return res.status(500).json({ message: "Error server" });
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
