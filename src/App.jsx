import './App.css'
import { Nav } from './components/nav'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './store/slices/authSlice';
import Home from './pages/Home';

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
            <Home />
        </>
    )
}

export default App
