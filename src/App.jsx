import './App.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import HomePage from './features/shop/pages/HomePage';
import { setCredentials } from './features/auth';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Recuperar datos de autenticación al iniciar la app
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        if (token && userId) {
            dispatch(setCredentials({
                token: JSON.parse(token).token,
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
