import { createContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';

export const StoreContext = createContext(null);

function StoreContextProvider(props) {
    const [token, setToken] = useState(null);
    const [starting, setStarting] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
        setStarting(false);
    }, []);

    const contextValue = {
        token,
        setToken,
    };

    if (starting) {
        return <Loading />;
    }

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
}

export default StoreContextProvider;
