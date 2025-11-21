import { NavLink } from "react-router"

const Header = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="menu-list">
                <NavLink to="/student/list" className="active btn btn-info mr-2">Students</NavLink>
                <NavLink to="/subject/list" className=" btn btn-info mr-2">Subject</NavLink>
                <NavLink to="/register/list" className=" btn btn-info mr-2">Register</NavLink>
            </div>
            <div className="info-user">
                <div className="show-fullname">Xin chào: <span className="text-bold">Nguyễn Phước Hảo</span></div>
                <button className="btn btn-info">Thông tin người dùng</button>
                <button className="btn btn-danger ml-2">Logout</button>
            </div>
        </div>
    )
}

export default Header