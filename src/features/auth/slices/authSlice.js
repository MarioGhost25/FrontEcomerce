import { createSlice } from '@reduxjs/toolkit';

// Función para obtener el estado inicial desde localStorage
const loadInitialState = () => {
    try {
        const serializedToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        if (serializedToken && userId) {
            let parsedAccessToken = null;

            try {
                const parsedToken = JSON.parse(serializedToken);
                parsedAccessToken = typeof parsedToken === 'string'
                    ? parsedToken
                    : parsedToken?.accessToken;
            } catch {
                parsedAccessToken = serializedToken;
            }

            return {
                accessToken: parsedAccessToken,
                userId: userId,
                isAuthenticated: true,
            };
        }
    } catch (err) {
        console.log('Error loading auth state:', err);
    }
    return {
        userId: null,
        accessToken: null,
        isAuthenticated: false,
    };
};

const initialState = loadInitialState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload: { userId, accessToken, } }) => {
            state.userId = userId;
            state.accessToken = accessToken;
            state.isAuthenticated = true;
            localStorage.setItem('accessToken', JSON.stringify({ accessToken }));
            localStorage.setItem('userId', userId);
        },
        logout: (state) => {
            state.userId = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUserId = (state) => state.auth.userId;
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
