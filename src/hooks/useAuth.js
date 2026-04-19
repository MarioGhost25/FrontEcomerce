import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUserId } from '../features/auth/slices/authSlice';
import { useGetUserQuery } from '../api/endpoints/userApi';


export const useAuth = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userId = useSelector(selectCurrentUserId);

    const { data: user, isLoading } = useGetUserQuery(userId, {
        skip: !isAuthenticated
    });

    return {
        isAuthenticated,
        userId,
        user,
        isLoading
    };
};
