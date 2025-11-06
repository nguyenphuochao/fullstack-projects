import registerModel from "../models/registerModel.js";

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

const listRegister = async () => {
    try {
        const registers = await registerModel.find({});
        res.status(200).json({ success: true, data: registers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" });
    }
}

export { addRegister, listRegister }