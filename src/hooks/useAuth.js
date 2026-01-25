import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUserId } from '../store/slices/authSlice';
import { useGetUserQuery } from '../store/apis/userApi';


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
