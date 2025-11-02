import studentModel from '../models/studentModel.js'

const addStudent = async (req, res) => {
    try {
        const { name, birthday, gender } = req.body
        await studentModel.create({
            name,
            birthday,
            gender
        });
        res.status(201).json({ success: true, message: "Student create success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" })
    }
}

const listStudent = async (req, res) => {
    try {
        const students = await studentModel.find({});
        res.status(200).json({ success: true, data: students })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" })
    }
}

export { addStudent, listStudent }