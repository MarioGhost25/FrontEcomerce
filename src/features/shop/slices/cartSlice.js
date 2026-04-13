import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../../auth/slices/authSlice";

const getProductId = (item) => {
    return item?.id ?? item?._id ?? item?.product?.id ?? item?.product?._id ?? null;
};

const getProductName = (item) => {
    return item?.name ?? item?.product?.name ?? '';
};

const getLineQuantity = (item) => Number(item?.quantity ?? 0);

const getLinePrice = (item) => Number(item?.price ?? item?.product?.price ?? 0);

const recalculateCartTotals = (state) => {
    state.quantity = state.products.reduce((acc, cartItem) => acc + getLineQuantity(cartItem), 0);
    state.totalPrice = state.products.reduce(
        (acc, cartItem) => acc + getLinePrice(cartItem) * getLineQuantity(cartItem),
        0,
    );
};


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        totalPrice: 0,

    },
    reducers: {
        setCartFromServer: (state, action) => {
            const payload = action.payload || {};
            state.products = Array.isArray(payload.products) ? payload.products : [];
            recalculateCartTotals(state);

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('cartItems', JSON.stringify(state.products));
            }
        },

        addToCart: (state, action) =>{
            const { product, quantity} = action.payload; //desestructuramos el payload para obtener el item, la cantidad y el precio
            const productId = getProductId(product);

            if (!productId) return;

            const existingItem = state.products.find((cartItem) => getProductId(cartItem) === productId); // Buscamos si el item ya existe en el carrito

            if (existingItem) {
                existingItem.quantity = getLineQuantity(existingItem) + Number(quantity ?? 1); // Si el item ya existe, aumentamos su cantidad
            } else {
                // Si el item no existe, lo agregamos al carrito con la cantidad y el precio normalizados
                state.products.push({ 
                    id: productId,
                    name: getProductName(product),
                    quantity: Number(quantity ?? 1),
                });
            }

            // Actualizamos la cantidad total y el precio total del carrito
            recalculateCartTotals(state);
            // Guardamos el estado del carrito en localStorage para persistencia
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('cartItems', JSON.stringify(state.products));
            }

        },

        

        
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state) => {
            state.products = [];
            state.quantity = 0;
            state.totalPrice = 0;

            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem('cartItems');
            }
        });
    }


})

export const { addToCart, setCartFromServer } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.products;