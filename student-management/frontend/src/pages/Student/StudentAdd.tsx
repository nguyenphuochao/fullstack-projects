import { Link, useNavigate } from "react-router"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentService } from "../../services/studentService";
import { toast } from "sonner";

const studentAddSchema = z.object({
    name: z.string().min(1, "Vui lòng nhập tên"),
    birthday: z.string().min(1, "Vui lòng nhập ngày sinh"),
    gender: z.string().min(3, "Vui lòng chọn giới tính")
});

type StudentAddFormValues = z.infer<typeof studentAddSchema>;

const StudentAdd = ({ className, ...props }: React.ComponentProps<"div">) => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<StudentAddFormValues>({
        resolver: zodResolver(studentAddSchema),
    });

    const onSubmit = async (data: StudentAddFormValues) => {
        try {
            const { name, birthday, gender } = data;
            // call api add student
            const response = await studentService.addStudent(name, birthday, gender);
            toast.error(response.message);
            navigate("/");
        } catch (error: any) {
            console.log(error.message);
        }
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
                                    <option value={0}>Nam</option>
                                    <option value={1}>Nữ</option>
                                    <option value={2}>Khác</option>
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