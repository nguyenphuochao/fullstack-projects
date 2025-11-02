import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import axios from 'axios';

const StudentList = () => {
    const [search, setSearch] = useState('');
    const [students, setStudents] = useState([]);

    const getStudents = async () => {
        try {
            const response = await axios.get('/student/list');
            setStudents(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStudents();
    }, []);

    const handleSearchForm = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <h1>Danh sách sinh viên</h1>
            <Link to="/student/create" className="btn btn-info">
                Add
            </Link>
            <form onSubmit={handleSearchForm}>
                <label className="form-inline justify-content-end">
                    Tìm kiếm:{' '}
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        name="search"
                        className="form-control"
                    />
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
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{student._id}</td>
                            <td>{student.name}</td>
                            <td>{student.birthday}</td>
                            <td>{student.gender}</td>
                            <td>
                                <Link to={`/student/edit/${student._id}`}>Sửa</Link>
                            </td>
                            <td>
                                <a data={1} className="delete" href="list.html" type="student">
                                    Xóa
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <span>Số lượng: 3</span>
            </div>

            <Pagination />
        </>
    );
};

export default StudentList;
