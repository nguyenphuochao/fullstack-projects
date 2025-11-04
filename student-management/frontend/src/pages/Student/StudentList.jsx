import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import axios from 'axios';
import { updateParam, getGenderName } from '../../helper/util';
import { toast } from 'react-toastify';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalpages, setTotalPages] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [search, setSearch] = useState(searchParams.get('search') || '');

    // Get list students
    const getStudents = async () => {
        try {
            const response = await axios.get(`/student/list?page=${page}&search=${search}`);
            setStudents(response.data.data);
            setTotalCount(response.data.totalCount);
            setTotalPages(response.data.pagination.totalPages);
            setPage(response.data.pagination.page);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Init load
    useEffect(() => {
        getStudents();
    }, [page, search]);

    // Click page number to go to page
    const handleClickPageNumber = (e, page) => {
        e.preventDefault();
        setPage(page);
        const newParams = { page: page };
        updateParam(searchParams, setSearchParams, newParams);
    };

    // Click prev page button
    const handlePrevPage = (e) => {
        e.preventDefault();
        setPage(page - 1);
        const newParams = { page: page - 1 };
        updateParam(searchParams, setSearchParams, newParams);
    };

    // Click next page button
    const handleNextPage = (e) => {
        e.preventDefault();
        setPage(page + 1);
        const newParams = { page: page + 1 };
        updateParam(searchParams, setSearchParams, newParams);
    };

    // Search params by name
    const handleSearchForm = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value;
        setSearch(searchValue);
        const newParams = { search: searchValue, page: 1 };
        updateParam(searchParams, setSearchParams, newParams);
    };

    // Delete student by _id
    const handleDeleteStudent = async (id) => {
        if (confirm('Bạn chắc xóa chứ?')) {
            try {
                const response = await axios.post(`/student/delete`, { id });
                toast.success(response.data.message);
                getStudents();
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    return (
        <>
            <h1>Danh sách sinh viên</h1>
            <Link to="/student/create" className="btn btn-info">
                Add
            </Link>
            <form onSubmit={handleSearchForm}>
                <label className="form-inline justify-content-end">
                    Tìm kiếm: <input type="search" name="search" className="form-control" defaultValue={search} />
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
                    {students.length > 0 ? (
                        students.map((student, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{student._id}</td>
                                <td>{student.name}</td>
                                <td>{student.birthday}</td>
                                <td>{getGenderName(student.gender)}</td>
                                <td>
                                    <Link to={`/student/edit/${student._id}`}>Sửa</Link>
                                </td>
                                <td>
                                    <Link onClick={(e) => handleDeleteStudent(student._id)} className="delete">
                                        Xóa
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="text-center" colSpan={7}>
                                Danh sách trống
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="total-count">
                <span>Số lượng: {totalCount}</span>
            </div>

            {/* Pagination component */}
            {students.length > 0 && (
                <Pagination
                    page={page}
                    totalPages={totalpages}
                    handleClickPageNumber={handleClickPageNumber}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
            )}
        </>
    );
};

export default StudentList;
