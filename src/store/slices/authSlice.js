import { createSlice } from '@reduxjs/toolkit';

// Función para obtener el estado inicial desde localStorage
const loadInitialState = () => {
    try {
        const serializedToken = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (serializedToken && userId) {
            return {
                token: JSON.parse(serializedToken).token,
                userId: userId,
                isAuthenticated: true
            };
        }
    } catch (err) {
        console.log('Error loading auth state:', err);
    }
    return {
        userId: null,
        token: null,
        isAuthenticated: false
    };
};

const initialState = loadInitialState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload: { userId, token, } }) => {
            state.userId = userId;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem('token', JSON.stringify({ token }));
            localStorage.setItem('userId', userId);
        },
        logout: (state) => {
            state.userId = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUserId = (state) => state.auth.userId;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
