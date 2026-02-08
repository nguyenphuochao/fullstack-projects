import { Link, useNavigate, useParams } from "react-router"
import { useStudentStore } from "../../store/useStudentStore";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const studentEditSchema = z.object({
    name: z.string().min(1, "Vui lòng nhập tên"),
    birthday: z.string().min(1, "Vui lòng nhập ngày sinh"),
    gender: z.string().min(1, "Vui lòng chọn giới tính")
});

type StudentEditFormValues = z.infer<typeof studentEditSchema>;

const StudentEdit = ({ className, ...props }: React.ComponentProps<"div">) => {
    const navigate = useNavigate();
    const [stating, setStating] = useState(true)
    const { detailStudent, student, updateStudent, loading } = useStudentStore();
    const { id } = useParams();

    useEffect(() => {
        detailStudent(id!);
        setStating(false)
        console.log(loading);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<StudentEditFormValues>({
        resolver: zodResolver(studentEditSchema),
    });

    const onSubmit = async (data: StudentEditFormValues) => {
        const { name, birthday, gender } = data;
        await updateStudent(id!, name, birthday, Number(gender));
        navigate("/");
    };

    if (loading || stating) {
        return (
            <div>Đang loading...</div>
        )
    }

    return (
        <>
            <h1>Chỉnh sửa sinh viên</h1>
            <form action="list.html" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" name="id" defaultValue={1} />
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">

                            <div className="form-group">
                                <label>Tên</label>
                                <input
                                    id="name"
                                    {...register("name")}
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên của bạn"
                                    defaultValue={student?.name} />
                                {errors.name && (
                                    <p className="text-danger">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Birthday</label>
                                <input
                                    id="birthday"
                                    {...register("birthday")}
                                    type="date"
                                    className="form-control"
                                    placeholder="Ngày sinh của bạn"
                                    defaultValue={student?.birthday} />
                                {errors.birthday && (
                                    <p className="text-danger">
                                        {errors.birthday.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Chọn Giới tính</label>
                                <select className="form-control" id="gender" {...register("gender")}>
                                    <option value={``} >-- Vui lòng nhập ngày sinh --</option>
                                    <option value={1} selected={student?.gender === 1 ? true : false}>Nam</option>
                                    <option value={2} selected={student?.gender === 2 ? true : false}>Nữ</option>
                                    <option value={3} selected={student?.gender === 3 ? true : false}>Khác</option>
                                </select>
                                {errors.gender && (
                                    <p className="text-danger">
                                        {errors.gender.message}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <button disabled={isSubmitting} className="btn btn-success" type="submit">Lưu</button>
                                <Link className="btn btn-warning ml-2" to={'/'}>Quay về</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default StudentEdit