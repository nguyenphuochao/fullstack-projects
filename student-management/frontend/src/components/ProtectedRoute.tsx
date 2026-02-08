import { Navigate, Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import Loading from './Loading';

const ProtectedRoute = () => {
    const [starting, setStarting] = useState(true);
    const { accessToken, user, loading, refresh, fetchMe } = useAuthStore();

    const init = async () => {
        if (!accessToken) {
            await refresh();
        }

        if (accessToken && !user) {
            await fetchMe();
        }

        setStarting(false);

    }

    useEffect(() => {
        init();
    }, []);

    if (starting || loading) {
        return <Loading />
    }

    if (!accessToken) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return (
        <>
            <div className="container" style={{ marginTop: '20px' }}>
                <Header />
                <Outlet />
                <Footer />
            </div>

        </>
    )
}

export default ProtectedRoute