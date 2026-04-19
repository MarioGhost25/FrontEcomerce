import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserQuery, useRefreshTokenMutation } from '../api/endpoints/userApi';
import { selectCurrentUserId, selectIsAuthenticated, setCredentials } from '../features/auth';

export const PrivateRoute = ({ requireRole, children }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userId = useSelector(selectCurrentUserId);
    const [refreshAttempted, setRefreshAttempted] = useState(false);
    const [refreshToken, { isLoading: isRefreshingToken }] = useRefreshTokenMutation();

    useEffect(() => {
        if (isAuthenticated || refreshAttempted) {
            return;
        }

        const attemptRefresh = async () => {
            try {
                const data = await refreshToken().unwrap();
                const refreshedAccessToken = data?.accessToken ?? data?.token;
                const refreshedUserId = data?.id ?? data?.userId ?? data?.user?.id ?? data?.user?._id;
                const refreshedCartId = data?.cartId ?? data?.user?.cartId ?? data?.cart?.id ?? data?.cart?._id;

                if (refreshedAccessToken && refreshedUserId) {
                    dispatch(setCredentials({
                        userId: refreshedUserId,
                        accessToken: refreshedAccessToken,
                        cartId: refreshedCartId,
                    }));
                }
            } catch {
                // The guard will redirect when refresh is not possible.
            } finally {
                setRefreshAttempted(true);
            }
        };

        attemptRefresh();
    }, [dispatch, isAuthenticated, refreshAttempted, refreshToken]);

    const shouldFetchUser = Boolean(isAuthenticated && userId);

    const { data: userData, isLoading, isError } = useGetUserQuery(userId, {
        skip: !shouldFetchUser,
    });

    if (!isAuthenticated && (!refreshAttempted || isRefreshingToken)) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/user" replace />;
    }

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
