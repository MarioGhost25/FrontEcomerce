import { createSlice } from '@reduxjs/toolkit';

const normalizeCartId = (value) => {
    if (value === null || value === undefined) {
        return null;
    }

    const normalizedValue = String(value).trim();

    if (!normalizedValue || normalizedValue === 'null' || normalizedValue === 'undefined') {
        return null;
    }

    return normalizedValue;
};

// Función para obtener el estado inicial desde localStorage
const loadInitialState = () => {
    try {
        const serializedToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        const cartId = normalizeCartId(localStorage.getItem('cartId'));
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
                cartId: cartId,
            };
        }
    } catch (err) {
        console.log('Error loading auth state:', err);
    }
    return {
        userId: null,
        accessToken: null,
        isAuthenticated: false,
        cartId: null,
    };
};

const initialState = loadInitialState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            const { userId, accessToken, cartId } = payload || {};
            const normalizedCartId = normalizeCartId(cartId);

            state.userId = userId;
            state.accessToken = accessToken;
            state.isAuthenticated = true;
            state.cartId = normalizedCartId;
            localStorage.setItem('accessToken', JSON.stringify({ accessToken }));
            localStorage.setItem('userId', userId);
            if (normalizedCartId) {
                localStorage.setItem('cartId', normalizedCartId);
            } else {
                localStorage.removeItem('cartId');
            }

        },
        setIdcart: (state, { payload: { cartId } }) => {
            const normalizedCartId = normalizeCartId(cartId);
            state.cartId = normalizedCartId;

            if (normalizedCartId) {
                localStorage.setItem('cartId', normalizedCartId);
            } else {
                localStorage.removeItem('cartId');
            }
        },
        logout: (state) => {
            state.userId = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.cartId = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('cartId');
            localStorage.removeItem('cartItems');
        }
    }
});

export const { setCredentials, logout, setIdcart } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUserId = (state) => state.auth.userId;
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentCartId = (state) => state.auth.cartId;