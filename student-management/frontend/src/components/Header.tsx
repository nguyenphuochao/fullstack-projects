import { NavLink, useNavigate } from "react-router"
import { useAuthStore } from "../store/useAuthStore"

const Header = () => {

    const { user, signOut } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (confirm('Bạn muốn đăng xuất?')) {
            await signOut();
            navigate('/login');
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="menu-list">
                <NavLink to="/" className="active btn btn-info mr-2">Students</NavLink>
                <NavLink to="/subject" className=" btn btn-info mr-2">Subject</NavLink>
                <NavLink to="/register" className=" btn btn-info mr-2">Register</NavLink>
            </div>
            <div className="info-user">
                <div className="show-fullname">Xin chào: <span className="text-bold">{user?.fullname}</span></div>
                <button className="btn btn-info">Thông tin người dùng</button>
                <button className="btn btn-danger ml-2" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Header