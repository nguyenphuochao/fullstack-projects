import { useContext, useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import { Outlet, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const LayoutMain = () => {
    const navigate = useNavigate();
    const { token } = useContext(StoreContext);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default LayoutMain;
