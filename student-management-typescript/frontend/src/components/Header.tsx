import { NavLink } from "react-router"

const Header = () => {
    return (
        <>
            <NavLink to="/student/list" className="active btn btn-info mr-2">Students</NavLink>
            <NavLink to="/subject/list" className=" btn btn-info mr-2">Subject</NavLink>
            <NavLink to="/register/list" className=" btn btn-info mr-2">Register</NavLink>
        </>
    )
}

export default Header