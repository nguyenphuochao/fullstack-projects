import mongoose from 'mongoose'

const registerSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'subject', required: true },
    score: { type: String },
}, { timestamps: true });

const registerModel = mongoose.models.register || mongoose.model('register', registerSchema);

export default registerModel;