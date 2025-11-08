import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { useContext } from 'react';
import axios from 'axios';

const Login = () => {
    const { token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/auth/login', data);
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    {...register('email', { required: true })}
                />
                {errors.email && <div className="text-danger">Vui lòng nhập email.</div>}
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    {...register('password', { required: true })}
                />
                {errors.password && <div className="text-danger">Vui lòng nhập password.</div>}
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

export default Login;
