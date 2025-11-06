import registerModel from "../models/registerModel.js";
import subjectModel from "../models/subjectModel.js";

// Add register
const addRegister = async (req, res) => {
    try {
        const { student_id, subject_id } = req.body;
        await registerModel.create({
            studentId: student_id,
            subjectId: subject_id
        });
        res.status(201).json({ success: true, message: "Register created success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

// List register with student and subject
const listRegister = async (re, res) => {
    try {
        const registers = await registerModel.find()
            .select('_id score')
            .populate({
                path: 'studentId',
                select: '_id name'
            })
            .populate({
                path: 'subjectId',
                select: '_id name'
            })

        res.status(200).json({ success: true, data: registers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

// get subject not registered by student
const getSujectNotRegistered = async () => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

export { addRegister, listRegister, getSujectNotRegistered }