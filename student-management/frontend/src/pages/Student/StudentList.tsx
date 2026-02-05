import { Link } from "react-router"
import { useStudentStore } from "../../store/useStudentStore";
import ListStudent from "../../components/ListStudent";
import { useEffect } from "react";

const StudentList = () => {

    const { students ,fetchStudent, totalCount } = useStudentStore();

    useEffect(() => {
        fetchStudent();
    }, [])

    return (
        <>
            <h1>Danh sách sinh viên</h1>
            <Link to="/student/add" className="btn btn-info">Add</Link>
            <form action="list.html" method="GET">
                <label className="form-inline justify-content-end">Tìm kiếm: <input type="search" name="search" className="form-control" />
                    <button className="btn btn-danger">Tìm</button>
                </label>
            </form>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã SV</th>
                        <th>Tên</th>
                        <th>Ngày Sinh</th>
                        <th>Giới Tính</th>
                        <th />
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student, index) => (
                            <ListStudent student={student} index={index} />
                        ))
                    }
                </tbody>
            </table>
            <div className="total-students">
                <span>Số lượng: { totalCount }</span>
            </div>
        </>
    )
}

export default StudentList