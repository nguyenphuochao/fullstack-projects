import { Link, useSearchParams } from "react-router"
import { useStudentStore } from "../../store/useStudentStore";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { updateParam } from "../../helper/util";
import StudentItem from "../../components/StudentItem";

const StudentList = () => {
    const { students, fetchStudent, totalCount, pagination } = useStudentStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [search, setSearch] = useState(searchParams.get('search') || '');

    useEffect(() => {
        fetchStudent(page, search);
    }, []);

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newParams = { search: search, page: 1 };
        updateParam(searchParams, setSearchParams, newParams);
        fetchStudent(page, search);
    }

    const handlePrevPage = () => {
        if (page <= 1) return;
        setPage(page - 1);
        const newParams = { page: page - 1 };
        updateParam(searchParams, setSearchParams, newParams);
        fetchStudent(page - 1);
    }

    const handleNextPage = () => {
        if (page >= pagination.totalPages) return;
        setPage(page + 1);
        const newParams = { page: page + 1 };
        updateParam(searchParams, setSearchParams, newParams);
        fetchStudent(page + 1);
    }

    const handleClickPage = (page: number) => {
        const newParams = { page: page };
        updateParam(searchParams, setSearchParams, newParams);
        fetchStudent(page);
    }

    return (
        <>
            <h1>Danh sách sinh viên</h1>
            <Link to="/student/add" className="btn btn-info">Add</Link>
            <form action="list.html" method="GET">
                <label className="form-inline justify-content-end">Tìm kiếm: <input onChange={(e) => setSearch(e.target.value)} type="search" name="search" className="form-control" value={search} />
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
                        students.length > 0 ? (
                            students.map((student, index) => (
                                <StudentItem student={student} index={index} />
                            ))
                        ) : (
                            <tr className="text-center">
                                <td colSpan={7}>Chưa có dữ liệu sinh viên. <Link to={'/student/add'}>Thêm sinh viên</Link></td>
                            </tr>
                        )

                    }
                </tbody>
            </table>

            {/* Total students */}
            {
                students.length > 0 && (
                    <div className="total-students">
                        <span>Số lượng: {totalCount}</span>
                    </div>
                )
            }

            {/* Pagination */}
            {
                students.length > 0 && (
                    <Pagination pagination={pagination} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} handleClickPage={handleClickPage} />
                )
            }

        </>
    )
}

export default StudentList