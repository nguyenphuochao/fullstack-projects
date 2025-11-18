import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    gender: { type: Number, required: true },
}, { timestamps: true });

const studentModel = mongoose.models.student || mongoose.model('student', studentSchema);

export default studentModel;