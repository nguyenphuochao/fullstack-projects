import studentModel from '../models/studentModel.js'

// add student
const addStudent = async (req, res) => {
    try {
        const { name, birthday, gender } = req.body
        await studentModel.create({
            name,
            birthday,
            gender
        });
        res.status(201).json({ success: true, message: "Student created success" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" })
    }
}

// get list student
const listStudent = async (req, res) => {
    try {
        let searchQuery = studentModel.find({});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        if (Object.hasOwn(req.query, 'search')) {
            searchQuery.find({
                name: { $regex: req.query.search, $options: 'i' }
            })
        }

        const totalCount = await studentModel.countDocuments(searchQuery);
        const totalPages = Math.ceil(await studentModel.countDocuments(searchQuery) / limit);
        const pagination = { page, totalPages };

        searchQuery.skip(skip).limit(limit);

        const students = await studentModel.find(searchQuery);
        res.status(200).json({ success: true, data: students, totalCount, pagination });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" })
    }
}

// Detail student by _id
const detailStudent = async (req, res) => {
    try {
        const student = await studentModel.findById(req.params.id);
        res.status(200).json({ success: true, student });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" })
    }
}

// delete student by _id
const deleteStudent = async (req, res) => {
    try {
        await studentModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Student deleted success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" })
    }
}

// update student by _id
const updateStudent = async (req, res) => {
    try {
        await studentModel.findByIdAndUpdate(req.body.id, req.body);
        res.status(200).json({ success: true, message: "Student updated success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" })
    }
}

export { addStudent, listStudent, detailStudent, deleteStudent, updateStudent }