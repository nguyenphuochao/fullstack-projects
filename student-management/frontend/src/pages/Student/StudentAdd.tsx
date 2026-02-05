import { Link, useNavigate } from "react-router"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStudentStore } from "../../store/useStudentStore";

const studentAddSchema = z.object({
    name: z.string().min(1, "Vui lòng nhập tên"),
    birthday: z.string().min(1, "Vui lòng nhập ngày sinh"),
    gender: z.string().min(1, "Vui lòng chọn giới tính")
});

type StudentAddFormValues = z.infer<typeof studentAddSchema>;

const StudentAdd = ({ className, ...props }: React.ComponentProps<"div">) => {
    const { addStudent } = useStudentStore();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<StudentAddFormValues>({
        resolver: zodResolver(studentAddSchema),
    });

    const onSubmit = async (data: StudentAddFormValues) => {
        const { name, birthday, gender } = data;
        addStudent(name, birthday, Number(gender));
        navigate("/");
    };

    return (
        <>
            <h1>Thêm sinh viên</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group">
                                <label htmlFor="name">Tên</label>
                                <input type="text" className="form-control" placeholder="Tên của bạn"
                                    id="name"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-danger">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthday">Birthday</label>
                                <input type="date" className="form-control" placeholder="Ngày sinh của bạn"
                                    id="birthday"
                                    {...register("birthday")}
                                />
                                {errors.birthday && (
                                    <p className="text-danger">
                                        {errors.birthday.message}
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender">Chọn Giới tính</label>
                                <select className="form-control"
                                    id="gender"
                                    {...register("gender")}
                                >
                                    <option value="">-- Vui lòng chọn --</option>
                                    <option value={1}>Nam</option>
                                    <option value={2}>Nữ</option>
                                    <option value={3}>Khác</option>
                                </select>
                                {errors.gender && (
                                    <p className="text-danger">
                                        {errors.gender.message}
                                    </p>
                                )}
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success" type="submit" disabled={isSubmitting}>Lưu</button>
                                <Link className="btn btn-warning ml-2" to={'/'}>Quay về</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default StudentAdd