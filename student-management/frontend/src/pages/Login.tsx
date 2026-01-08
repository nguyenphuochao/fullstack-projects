import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const signInSchema = z.object({
    email: z.string().min(1, "Vui lòng nhập email"),
    password: z.string().min(1, "Vui lòng nhập password"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const Login = () => {
    const { signIn } = useAuthStore();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: SignInFormValues) => {
        console.log('login');
        const { email, password } = data;
        await signIn(email, password);
        navigate("/");
    };

    return (
        <div className="container-login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email"
                        {...register("email")} />
                    {errors.email && (
                        <p className="text-danger">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password"
                        {...register("password")} />
                    {errors.password && (
                        <p className="text-danger">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
            </form>
        </div>

    )
}

export default Login