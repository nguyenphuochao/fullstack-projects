import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const RegisterList = () => {

    const [registers, setRegisters] = useState([]);

    const getRegisters = async () => {
        try {
            const response = await axios.get('/register/list');
            setRegisters(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRegisters();
    }, [])


    return (
        <>
            <div>
                <h1>Danh sách sinh viên đăng ký môn học</h1>
                <Link to="/register/create" className="btn btn-info">Add</Link>
                <form>
                    <label className="form-inline justify-content-end">Tìm kiếm: <input type="search" name="search" className="form-control" defaultValue />
                        <button className="btn btn-danger">Tìm</button>
                    </label>
                    <input type="hidden" name="c" defaultValue="register" />
                </form>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã SV</th>
                            <th>Tên SV</th>
                            <th>Mã MH</th>
                            <th>Tên MH</th>
                            <th>Điểm</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            registers.map((register, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{register.studentId._id}</td>
                                    <td>{register.studentId.name}</td>
                                    <td>{register.subjectId._id}</td>
                                    <td>{register.subjectId.name}</td>
                                    <td>{register.score || 'Chưa cập nhật'}</td>
                                    <td><a href="edit.html">Cập nhật điểm</a></td>
                                    <td><a onclick="return confirm('Bạn muốn xóa đăng ký này phải không?')" href="list.html">Xóa</a></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div>
                    <span>Số lượng: 4</span>
                </div>
            </div>
        </>
    )
}

export default RegisterList