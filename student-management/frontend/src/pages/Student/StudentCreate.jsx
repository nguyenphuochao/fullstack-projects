import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const StudentCreate = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <h1>Thêm sinh viên</h1>
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
                                    {...register('gender', { required: true })}
                                >
                                    <option value="">-- Vui lòng chọn --</option>
                                    <option value={0}>Nam</option>
                                    <option value={1}>Nữ</option>
                                    <option value={2}>Khác</option>
                                </select>
                                {errors.gender && <div className="text-danger">Vui lòng chọn giới tính.</div>}
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success" type="submit">
                                    Lưu
                                </button>
                                <Link className="btn btn-warning ml-2" to="/">
                                    Quay về
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default StudentCreate;
