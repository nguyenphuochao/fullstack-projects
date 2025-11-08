import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

const Header = () => {
    const navigate = useNavigate();
    const { token } = useContext(StoreContext);
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            const response = await axios.get('/user/profile', { headers: { token } });
            setUser(response.data.user);
            if (user) setIsLogin(true);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        if (confirm('Bạn muốn đăng xuất?')) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <header>
                <div className="menu-left">
                    <NavLink to="/" className="btn btn-info">
                        Students
                    </NavLink>
                    <NavLink to="/subject/list" className="btn btn-info">
                        Subject
                    </NavLink>
                    <NavLink to="/register/list" className="btn btn-info">
                        Register
                    </NavLink>
                </div>
                <div className="menu-right">
                    Xin chào: <span className="fw-bold">{ user?.fullname }</span>
                    <button onClick={logout} className="btn btn-danger btn-sm">
                        Đăng xuất
                    </button>
                </div>
            </header>
        </>
    );
};

export default Header;
