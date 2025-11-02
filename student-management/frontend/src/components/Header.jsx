import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <Link to="/" className="active btn btn-info">
                Students
            </Link>
            <Link href="/subject/list" className="btn btn-info">
                Subject
            </Link>
            <Link href="/register/list" className="btn btn-info">
                Register
            </Link>
        </>
    );
};

export default Header;
