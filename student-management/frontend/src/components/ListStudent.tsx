import { Link } from "react-router"
import type { Student } from "../types/student"

interface ListStudentProps {
    student: Student,
    index: number
}

const ListStudent = ({ student, index }: ListStudentProps) => {
    const getGender = (gender: number) => {
        if (gender === 1) {
            return "Nam"
        } else if (gender === 2) {
            return "Nữ"
        } else {
            return "Khác"
        }
    }

    const handleConfirmDelete = () => {
        if (confirm("Bạn chắc xóa sinh viên này?")) {
            alert('Deleted')
        }
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{student._id}</td>
            <td>{student.name}</td>
            <td>{student.birthday}</td>
            <td>{getGender(student.gender)}</td>
            <td>
                <Link to="/student/edit/1">Sửa</Link>
            </td>
            <td>
                <Link onClick={handleConfirmDelete} to="#">Xóa</Link>
            </td>
        </tr>
    )
}

export default ListStudent