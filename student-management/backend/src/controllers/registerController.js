import registerModel from "../models/registerModel.js";
import subjectModel from "../models/subjectModel.js";
import studentModel from "../models/studentModel.js";

// Add register
const addRegister = async (req, res) => {
    try {
        const { student_id, subject_id } = req.body;
        const register = await registerModel.findOne({ studentId: student_id, subjectId: subject_id });
        const subject = await subjectModel.findById(subject_id);
        const student = await studentModel.findById(student_id);

        if (register) {
            return res.status(400).json({ success: false, message: `Sinh viên ${student.name} đã đăng kí môn học ${subject.name}` });
        }

        await registerModel.create({
            studentId: student_id,
            subjectId: subject_id
        });

        res.status(201).json({ success: true, message: "Đăng kí môn học thành công" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

// List register with student and subject
const listRegister = async (re, res) => {
    try {
        const registers = await registerModel.find().sort({ createdAt: 'desc' })
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

// Delete register by id
const deleteRegister = async (req, res) => {
    try {
        await registerModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Xóa đăng kí môn học thành công" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

// Update score register
const updateRegister = async (req, res) => {
    try {
        const _id = req.body.id;
        const score = req.body.score;
        await registerModel.findByIdAndUpdate(_id, { score });
        res.status(200).json({ success: true, message: "Cập nhật điểm thành công" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

// Detail register
const detailRegister = async (req, res) => {
    try {
        const register = await registerModel.findOne({ _id: req.params.id })
            .select('_id score')
            .populate({
                path: 'studentId',
                select: '_id name'
            })
            .populate({
                path: 'subjectId',
                select: '_id name'
            })

        res.status(200).json({ success: true, register });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

export { addRegister, listRegister, deleteRegister, updateRegister, detailRegister }