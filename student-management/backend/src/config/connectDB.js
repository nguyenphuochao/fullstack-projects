import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/student-management');
        console.log("Liên kết CSDL thành công!");
    } catch (error) {
        console.log("Lỗi khi kết nối CSDL:", error);
        process.exit(1);
    }
};