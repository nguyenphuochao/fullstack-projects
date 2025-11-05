import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <NavLink to="/" className="btn btn-info">
                Students
            </NavLink>
            <NavLink to="/subject/list" className="btn btn-info">
                Subject
            </NavLink>
            <NavLink to="/register/list" className="btn btn-info">
                Register
            </NavLink>
        </>
    );
};

export default Header;
