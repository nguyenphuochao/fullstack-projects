import registerModel from '../models/registerModel.js';
import studentModel from '../models/studentModel.js'

// Add student
const addStudent = async (req, res) => {
    try {
        const { name, birthday, gender } = req.body

        // validate
        if (!name.trim() || !birthday.trim() || !gender) {
            return res.status(400).json({ success: false, message: "Vui lòng điền đầy đủ name, birthday, gender" });
        }

        // create student
        await studentModel.create({
            name,
            birthday,
            gender
        });
        res.status(201).json({ success: true, message: `Tạo mới thành công sinh viên ${name}` })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Có lỗi xảy ra" })
    }
}

// Get list student
const listStudents = async (req, res) => {
    try {
        let searchQuery = studentModel.find({});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Search params
        if (Object.hasOwn(req.query, 'search')) {
            searchQuery.find({
                name: { $regex: req.query.search, $options: 'i' }
            })
        }

        // Get all students with params ?limit=all
        if (req.query.limit === 'all') {
            const students = await studentModel.find(searchQuery).sort({ createdAt: 'desc' });
            res.status(200).json({ success: true, data: students });
        }

        const totalCount = await studentModel.countDocuments(searchQuery);
        const totalPages = Math.ceil(await studentModel.countDocuments(searchQuery) / limit);
        const pagination = { page, totalPages };

        searchQuery.skip(skip).limit(limit);

        const students = await studentModel.find(searchQuery).sort({ createdAt: 'desc' });
        res.status(200).json({ success: true, students, totalCount, pagination });
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

// Delete student by id
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.body.id;
        const student = await studentModel.findById(studentId);
        const register = await registerModel.findOne({ studentId });

        if (register) {
            return res.status(400).json({ success: true, message: `Sinh viên ${student.name} đã đăng kí môn học. Không thể xóa` });
        }

        await studentModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Student deleted success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" })
    }
}

// Update student by _id
const updateStudent = async (req, res) => {
    try {
        await studentModel.findByIdAndUpdate(req.body.id, req.body);
        res.status(200).json({ success: true, message: "Student updated success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error" })
    }
}

export { addStudent, listStudents, detailStudent, deleteStudent, updateStudent }