import { createContext, useEffect, useState } from 'react';

export const StoreContext = createContext(null);

function StoreContextProvider(props) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
        console.log('token:', token);
    }, [token]);

    const contextValue = {
        token,
        setToken,
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
}

export default StoreContextProvider;
