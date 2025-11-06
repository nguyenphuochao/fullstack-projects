import mongoose from 'mongoose'

const registerSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    subjectId: { type: String, required: true },
    score: { type: Number, required: false },
}, { timestamps: true });

const registerModel = mongoose.models.register || mongoose.model('register', registerSchema);

export default registerModel;