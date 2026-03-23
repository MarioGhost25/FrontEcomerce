import './App.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import HomePage from './features/shop/pages/HomePage';
import { setCredentials } from './features/auth';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Recuperar datos de autenticación al iniciar la app
        const storedAccessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');

        let accessToken = null;

        if (storedAccessToken) {
            try {
                const parsedToken = JSON.parse(storedAccessToken);
                accessToken = typeof parsedToken === 'string'
                    ? parsedToken
                    : parsedToken?.accessToken;
            } catch {
                accessToken = storedAccessToken;
            }
        }

        if (accessToken && userId) {
            dispatch(setCredentials({
                accessToken,
                userId 
            }));
        }
    }, [dispatch]);

    return (
        <>
            <HomePage />
        </>
    )
}

export default App
