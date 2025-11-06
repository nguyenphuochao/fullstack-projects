import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

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

    const deleteRegister = async (e, id) => {
        e.preventDefault();
        try {
            if (confirm(' Bạn muốn xóa đăng ký này phải không?')) {
                const response = await axios.post('/register/delete', { id });
                toast.success(response.data.message);
                getRegisters();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getRegisters();
    }, []);

    return (
        <>
            <div>
                <h1>Danh sách sinh viên đăng ký môn học</h1>
                <Link to="/register/create" className="btn btn-info">
                    Add
                </Link>
                <form>
                    <label className="form-inline justify-content-end">
                        Tìm kiếm: <input type="search" name="search" className="form-control" defaultValue />
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
                        {registers.map((register, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{register.studentId._id}</td>
                                <td>{register.studentId.name}</td>
                                <td>{register.subjectId._id}</td>
                                <td>{register.subjectId.name}</td>
                                <td>{register.score || 'Chưa cập nhật'}</td>
                                <td>
                                    <Link to={`/register/edit/${register._id}`}>Cập nhật điểm</Link>
                                </td>
                                <td>
                                    <Link onClick={(e) => deleteRegister(e, register._id)}>Xóa</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <span>Số lượng: 4</span>
                </div>
            </div>
        </>
    );
};

export default RegisterList;
