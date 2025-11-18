import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../../components/Loading';

const StudentEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Get student by _id
    const getStudent = async () => {
        try {
            const response = await axios.get(`/student/detail/${id}`);
            setStudent(response.data.student);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Init load
    useEffect(() => {
        getStudent();
        console.log('id:', id);
    }, []);

    // Update student by _id
    const onSubmit = async (data) => {
        try {
            const studentObject = {
                id,
                name: data.name,
                birthday: data.birthday,
                gender: data.gender,
            };
            const response = await axios.post(`/student/update`, studentObject);
            toast.success(response.data.message);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <div>
                <h1>Chỉnh sửa sinh viên</h1>
                {loading ? (
                    <Loading />
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <label>Tên</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tên của bạn"
                                            name="name"
                                            defaultValue={student?.name}
                                            {...register('name', { required: true })}
                                        />
                                        {errors.name && <div className="text-danger">Vui lòng nhập tên.</div>}
                                    </div>
                                    <div className="form-group">
                                        <label>Birthday</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="Ngày sinh của bạn"
                                            name="birthday"
                                            defaultValue={student?.birthday}
                                            {...register('birthday', { required: true })}
                                        />
                                        {errors.birthday && <div className="text-danger">Vui lòng nhập ngày sinh.</div>}
                                    </div>
                                    <div className="form-group">
                                        <label>Chọn Giới tính</label>
                                        <select
                                            className="form-control"
                                            id="gender"
                                            name="gender"
                                            defaultValue={student?.gender}
                                            {...register('gender', { required: true })}
                                        >
                                            <option value="">--Vui lòng chọn--</option>
                                            <option value={0} selected={student?.gender === 0 ? 'selected' : ''}>
                                                Nam
                                            </option>
                                            <option value={1} selected={student?.gender === 1 ? 'selected' : ''}>
                                                Nữ
                                            </option>
                                            <option value={2} selected={student?.gender === 2 ? 'selected' : ''}>
                                                Khác
                                            </option>
                                        </select>
                                        {errors.gender && <div className="text-danger">Vui lòng chọn giới tính</div>}
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-success" type="submit">
                                            Lưu
                                        </button>
                                        <Link to="/" className="btn btn-warning ml-2" type="submit">
                                            Quay về
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default StudentEdit;
