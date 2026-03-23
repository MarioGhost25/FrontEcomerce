import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../api/endpoints/userApi';
import { selectCurrentUserId, selectIsAuthenticated } from '../features/auth';

export const PrivateRoute = ({ requireRole, children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userId = useSelector(selectCurrentUserId);
    
    // Si tenemos token pero no userId, esperar a que se recupere el estado
    if (!isAuthenticated && localStorage.getItem('accessToken')) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/user" replace />;
    }

    const { data: userData, isLoading } = useGetUserQuery(userId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (requireRole && (!userData || userData.role !== requireRole)) {
        return <Navigate to="/" replace />;
    }

    return children || <Outlet />;
};
