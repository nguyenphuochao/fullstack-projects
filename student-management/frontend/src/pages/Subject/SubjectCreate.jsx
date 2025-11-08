import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from "react";

const SubjectCreate = () => {
    const { token } = useContext(StoreContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/subject/add', data, { headers: { token } });
            toast.success(response.data.message);
            navigate('/subject/list');
            console.log(response);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <div>
                <h1>Thêm Môn Học</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên Môn Học Mới"
                                        name="name"
                                        {...register('name', { required: true })}
                                    />
                                    {errors.name && <div className="text-danger">Vui lòng nhập tên.</div>}
                                </div>
                                <div className="form-group">
                                    <label>Số tín chỉ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Chỉ số tín chỉ"
                                        name="number_of_credits"
                                        {...register('number_of_credits', { required: true })}
                                    />
                                    {errors.number_of_credits && (
                                        <div className="text-danger">Vui lòng nhập số tín chỉ.</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-success" type="submit">
                                        Lưu
                                    </button>
                                    <Link className="btn btn-warning ml-2" to="/subject/list">
                                        Quay về
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SubjectCreate;
