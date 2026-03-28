import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../api/endpoints/userApi';
import { selectCurrentUserId, selectIsAuthenticated } from '../features/auth';

export const PrivateRoute = ({ requireRole, children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userId = useSelector(selectCurrentUserId);

    const shouldFetchUser = Boolean(isAuthenticated && userId);

    if (!isAuthenticated) {
        return <Navigate to="/user" replace />;
    }

    const { data: userData, isLoading, isError } = useGetUserQuery(userId, {
        skip: !shouldFetchUser,
    });

    if (requireRole && !shouldFetchUser) {
        return <Navigate to="/user" replace />;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (requireRole && (isError || !userData || userData.role !== requireRole)) {
        return <Navigate to="/" replace />;
    }

    return children || <Outlet />;
};
