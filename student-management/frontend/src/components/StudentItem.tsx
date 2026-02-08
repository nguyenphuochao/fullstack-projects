import { Link } from "react-router"
import type { Student } from "../types/student"
import { useStudentStore } from "../store/useStudentStore"

interface StudentItemProps {
    student: Student,
    index: number
}

const StudentItem = ({ student, index }: StudentItemProps) => {

    const { deleteStudent, fetchStudent } = useStudentStore();

    const getGenderName = (gender: number) => {
        if (gender === 1) {
            return "Nam"
        } else if (gender === 2) {
            return "Nữ"
        } else {
            return "Khác"
        }
    }

    const handleConfirmDelete = async (id: string) => {
        if (confirm("Bạn chắc xóa sinh viên này?")) {
            await deleteStudent(id);
            await fetchStudent();
        }
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{student._id}</td>
            <td>{student.name}</td>
            <td>{student.birthday}</td>
            <td>{getGenderName(student.gender)}</td>
            <td>
                <Link to={`/student/edit/${student._id}`}>Sửa</Link>
            </td>
            <td>
                <Link onClick={() => handleConfirmDelete(student._id)} to="#">Xóa</Link>
            </td>
        </tr>
    )
}

export default StudentItem