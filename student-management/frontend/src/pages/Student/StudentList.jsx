import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';

const StudentList = () => {
    const [search, setSearch] = useState('');

    const handleSearchForm = (e) => {
        e.preventDefault();
        alert(search);
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
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>Nguyễn Thị Bé Bảy</td>
                        <td>09/03/2000</td>
                        <td>nữ</td>
                        <td>
                            <a href="edit.html">Sửa</a>
                        </td>
                        <td>
                            <a data={1} className="delete" href="list.html" type="student">
                                Xóa
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>2</td>
                        <td>Nguyễn Văn Tèo</td>
                        <td>15/03/1995</td>
                        <td>nam</td>
                        <td>
                            <a href="edit.html">Sửa</a>
                        </td>
                        <td>
                            <a data={2} className="delete" href="list.html" type="student">
                                Xóa
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>3</td>
                        <td>Cao Thị Mẫn</td>
                        <td>16/03/1990</td>
                        <td>khác</td>
                        <td>
                            <a href="edit.html">Sửa</a>
                        </td>
                        <td>
                            <a data={3} className="delete" href="list.html" type="student">
                                Xóa
                            </a>
                        </td>
                    </tr>
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
