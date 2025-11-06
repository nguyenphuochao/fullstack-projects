import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {
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
                    Xin chào: <span className='fw-bold'>Nguyễn Phước Hảo</span>
                    <button className='btn btn-danger btn-sm'>Đăng xuất</button>
                </div>
            </header>
        </>
    );
};

export default Header;
