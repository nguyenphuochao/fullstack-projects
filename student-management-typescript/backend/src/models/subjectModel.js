import mongoose from 'mongoose'

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    numberOfCredits: { type: Number, required: true },
}, { timestamps: true });

const subjectModel = mongoose.models.subject || mongoose.model('subject', subjectSchema);

export default subjectModel;