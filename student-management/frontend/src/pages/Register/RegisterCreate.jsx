import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const RegisterCreate = () => {
    const { token } = useContext(StoreContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);

    // Get list students
    const getStudents = async () => {
        // call api from BE
        try {
            const res = await axios.get('/student/list?limit=all', { headers: { token } });
            setStudents(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Get list subjects
    const getSubjects = async () => {
        // call api from BE
        try {
            const res = await axios.get('/subject/list?limit=all', { headers: { token } });
            setSubjects(res.data.data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // Submit form
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/register/add', data, { headers: { token } });
            toast.success(response.data.message);
            navigate('/register/list');
        } catch (error) {
            if (error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
        }
    };

    // Init load
    useEffect(() => {
        getStudents();
        getSubjects();
    }, []);

    return (
        <>
            <h1>Thêm đăng ký môn học</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="student_id">Tên sinh viên</label>
                                <select
                                    className="form-control"
                                    name="student_id"
                                    id="student_id"
                                    {...register('student_id', { required: true })}
                                >
                                    <option value="">Vui lòng chọn sinh viên</option>
                                    {students.map((student, indexStudent) => (
                                        <option key={indexStudent} value={student._id}>
                                            {student._id} - {student.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.student_id && <div className="text-danger">Vui lòng chọn sinh viên.</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject_id">Tên môn học</label>
                                <span id="load" className="text-primary" />
                                <select
                                    className="form-control"
                                    name="subject_id"
                                    id="subject_id"
                                    {...register('subject_id', { required: true })}
                                >
                                    <option value="">Vui lòng chọn môn học</option>
                                    {subjects.map((subject, indexSubject) => (
                                        <option key={indexSubject} value={subject._id}>
                                            {subject._id} - {subject.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.subject_id && <div className="text-danger">Vui lòng chọn môn học.</div>}
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success" type="submit">
                                    Lưu
                                </button>
                                <button
                                    onClick={() => navigate('/register/list')}
                                    className="btn btn-warning ml-2"
                                    type="button"
                                >
                                    Quay về
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default RegisterCreate;
