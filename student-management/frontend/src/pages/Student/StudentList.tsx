import { Link } from "react-router"
import { useStudentStore } from "../../store/useStudentStore";
import ListStudent from "../../components/ListStudent";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";

const StudentList = () => {

    const { students, fetchStudent, totalCount, pagination } = useStudentStore();
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchStudent();
    }, []);

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const page = 1;
        fetchStudent(page, 'test');
    }

    return (
        <>
            <h1>Danh sách sinh viên</h1>
            <Link to="/student/add" className="btn btn-info">Add</Link>
            <form action="list.html" method="GET">
                <label className="form-inline justify-content-end">Tìm kiếm: <input onChange={(e) => setSearch(e.target.value)} type="search" name="search" className="form-control" />
                    <button onClick={handleSearch} className="btn btn-danger">Tìm</button>
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
                <span>Số lượng: {totalCount}</span>
            </div>

            <Pagination pagination={pagination} />
        </>
    )
}

export default StudentList